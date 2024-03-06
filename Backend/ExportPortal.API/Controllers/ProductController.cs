using ExportPortal.API.Data;
using ExportPortal.API.Models.Domain;
using ExportPortal.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExportPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ExportPortalDbContext dbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProductController(ExportPortalDbContext dbContext, IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            List<Product> products = await dbContext.Products.Include("Certification")
                .Include("VendorCategory").Include(u => u.UserProfile1)
                .Include(u => u.UserProfile2).Include(u => u.UserProfile3).ToListAsync();
            if (products != null)
            {
                List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
                foreach (var productDomain in products)
                {
                    var productResponseDTO = new ProductResponseDTO
                    {
                        Id = productDomain.Id, // Assuming CustomId is a string
                        Name = productDomain.Name,
                        ImgPath = productDomain.ImgPath,
                        ScientificName = productDomain.ScientificName,
                        VendorCategory = productDomain.VendorCategory,
                        VendorId1 = productDomain.UserProfile1?.Id,
                        VendorName1 = productDomain.UserProfile1?.Name,
                        VendorId2 = productDomain.UserProfile2?.Id,
                        VendorName2 = productDomain.UserProfile2?.Name,
                        VendorId3 = productDomain.UserProfile3?.Id,
                        VendorName3 = productDomain.UserProfile3?.Name,
                        HSNCode = productDomain.HSNCode,
                        ToPuneFreight = productDomain.ToPuneFreight,
                        InnerPackageMaterial = productDomain.InnerPackageMaterial,
                        OuterPackageMaterial = productDomain.OuterPackageMaterial,
                        ManualPackage = productDomain.ManualPackage,
                        MachinePackage = productDomain.MachinePackage,
                        LocalTransport = productDomain.LocalTransport,
                        Fumigation = productDomain.Fumigation,
                        TotalRate = productDomain.TotalRate,
                        GrossWeight = productDomain.GrossWeight,
                        PouchType = productDomain.PouchType,
                        BumperisPouches = productDomain.BumperisPouches,
                        BagOrBox = productDomain.BagOrBox,
                        BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
                        Ingredients = productDomain.Ingredients,
                        ManufacturingProcess = productDomain.ManufacturingProcess,
                        DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
                        IsForHumanConsumption = productDomain.IsForHumanConsumption,
                        Certification = productDomain.Certification,
                    };

                    productDTO.Add(productResponseDTO);
                };
                return Ok(productDTO);
            }
            return BadRequest();
        }



        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromForm] ProductDTO productDto)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(Path.GetExtension(productDto.File.FileName)))
            {
                return BadRequest("No file or unsupported file type.");
            }

            if (productDto.File.Length > 10485760)
            {
                return BadRequest("File size more than 10MB, please upload a smaller size file");
            }

            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
                $"{productDto.File.FileName}{Path.GetExtension(productDto.File.FileName)}");

            // Upload Image to Local Path
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await productDto.File.CopyToAsync(stream);

            // https://localhost:1234/images/image.jpg

            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{productDto.File.FileName}{Path.GetExtension(productDto.File.FileName)}";

            // Generate string ID in the format "Prod_{auto-increment}"
            //int productCount = await dbContext.Products.CountAsync();
            //string stringId = $"Prod_{productCount + 1}";

            // Get the maximum auto-incremental ID from the database
            //int productId = await dbContext.Products.MaxAsync(p => p.Id) + 1;
            // Get the maximum auto-incremental ID from the database

            var maxId = await dbContext.Products.MaxAsync(p => p.Id);
            int nextId = 1;
            if (!string.IsNullOrEmpty(maxId))
            {
                // Extract the numeric part from the ID and increment it
                nextId = int.Parse(maxId.Replace("Prod_", "")) + 1;
            }

            // Generate the custom ID with the prefix "Prod_" and the auto-incremental value
            string productId = $"Prod_{nextId}";


            var productDomain = new Product
            {
                Id = productId, // Assign the auto-incremental ID
                Name = productDto.Name,
                ScientificName = productDto.ScientificName,
                ImgPath = urlFilePath,
                VendorCategoryId = productDto.VendorCategoryId,
                VendorId1 = productDto?.VendorId1,
                VendorId2 = productDto?.VendorId2,
                VendorId3 = productDto?.VendorId3,
                HSNCode = productDto.HSNCode,
                ToPuneFreight = productDto.ToPuneFreight,
                InnerPackageMaterial = productDto.InnerPackageMaterial,
                OuterPackageMaterial = productDto.OuterPackageMaterial,
                ManualPackage = productDto.ManualPackage,
                MachinePackage = productDto.MachinePackage,
                LocalTransport = productDto.LocalTransport,
                Fumigation = productDto.Fumigation,
                TotalRate = productDto.TotalRate,
                GrossWeight = productDto.GrossWeight,
                PouchType = productDto.PouchType,
                BumperisPouches = productDto.BumperisPouches,
                BagOrBox = productDto.BagOrBox,
                BagOrBoxBumpers = productDto.BagOrBoxBumpers,
                Ingredients = productDto.Ingredients,
                ManufacturingProcess = productDto.ManufacturingProcess,
                DairyDeclarationRequired = productDto.DairyDeclarationRequired,
                IsForHumanConsumption = productDto.IsForHumanConsumption,
                CertificationId = productDto.CertificationId,
            };

            await dbContext.Products.AddAsync(productDomain);
            await dbContext.SaveChangesAsync();
            return Ok(productDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            //if (!int.TryParse(id, out int productId))
            //{
            //   return BadRequest("Invalid product ID format.");
            //}

            // In GetById method
            var productDomain = await dbContext.Products.Include("Certification").Include("VendorCategory")
                .Include(u => u.UserProfile1).Include(u => u.UserProfile2)
                .Include(u => u.UserProfile3).FirstOrDefaultAsync(x => x.Id == id);

            if (productDomain != null)
            {
                var productResponseDto = new ProductResponseDTO
                {
                    Name = productDomain.Name,
                    ScientificName = productDomain.ScientificName,
                    VendorCategory = productDomain.VendorCategory,
                    VendorId1 = productDomain.UserProfile1?.Id,
                    VendorName1 = productDomain.UserProfile1?.Name,
                    VendorId2 = productDomain.UserProfile2?.Id,
                    VendorName2 = productDomain.UserProfile2?.Name,
                    VendorId3 = productDomain.UserProfile3?.Id,
                    VendorName3 = productDomain.UserProfile3?.Name,
                    HSNCode = productDomain.HSNCode,
                    ToPuneFreight = productDomain.ToPuneFreight,
                    InnerPackageMaterial = productDomain.InnerPackageMaterial,
                    OuterPackageMaterial = productDomain.OuterPackageMaterial,
                    ManualPackage = productDomain.ManualPackage,
                    MachinePackage = productDomain.MachinePackage,
                    LocalTransport = productDomain.LocalTransport,
                    Fumigation = productDomain.Fumigation,
                    TotalRate = productDomain.TotalRate,
                    GrossWeight = productDomain.GrossWeight,
                    PouchType = productDomain.PouchType,
                    BumperisPouches = productDomain.BumperisPouches,
                    BagOrBox = productDomain.BagOrBox,
                    BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
                    Ingredients = productDomain.Ingredients,
                    ManufacturingProcess = productDomain.ManufacturingProcess,
                    DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
                    IsForHumanConsumption = productDomain.IsForHumanConsumption,
                    Certification = productDomain.Certification,
                };
                return Ok(productResponseDto);
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("Vendor/{id}")]
        public async Task<IActionResult> GetAllProductsAssigned([FromRoute] string id)
        {
            // Convert string ID to Guid for comparison
            //Guid guidId;
            //if (!Guid.TryParse(id, out guidId))
            //{
            //    return BadRequest("Invalid vendor ID format.");
            //}

            // In GetAllProductsAssigned method
            List<Product> products = await dbContext.Products.Include("Certification")
                .Include("VendorCategory").Include(u => u.UserProfile1)
                .Include(u => u.UserProfile2).Include(u => u.UserProfile3)
                .Where(x => x.VendorId1 == id || x.VendorId2 == id || x.VendorId3 == id)
                .ToListAsync();


            if (products != null)
            {
                List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
                foreach (var productDomain in products)
                {
                    var productResponseDTO = new ProductResponseDTO
                    {
                        Id = productDomain.Id,
                        Name = productDomain.Name,
                        ScientificName = productDomain.ScientificName,
                        VendorCategory = productDomain.VendorCategory,
                        VendorId1 = productDomain.UserProfile1?.Id,
                        VendorName1 = productDomain.UserProfile1?.Name,
                        VendorId2 = productDomain.UserProfile2?.Id,
                        VendorName2 = productDomain.UserProfile2?.Name,
                        VendorId3 = productDomain.UserProfile3?.Id,
                        VendorName3 = productDomain.UserProfile3?.Name,
                        HSNCode = productDomain.HSNCode,
                        ToPuneFreight = productDomain.ToPuneFreight,
                        InnerPackageMaterial = productDomain.InnerPackageMaterial,
                        OuterPackageMaterial = productDomain.OuterPackageMaterial,
                        ManualPackage = productDomain.ManualPackage,
                        MachinePackage = productDomain.MachinePackage,
                        LocalTransport = productDomain.LocalTransport,
                        Fumigation = productDomain.Fumigation,
                        TotalRate = productDomain.TotalRate,
                        GrossWeight = productDomain.GrossWeight,
                        PouchType = productDomain.PouchType,
                        BumperisPouches = productDomain.BumperisPouches,
                        BagOrBox = productDomain.BagOrBox,
                        BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
                        Ingredients = productDomain.Ingredients,
                        ManufacturingProcess = productDomain.ManufacturingProcess,
                        DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
                        IsForHumanConsumption = productDomain.IsForHumanConsumption,
                        Certification = productDomain.Certification,
                    };

                    productDTO.Add(productResponseDTO);
                };
                return Ok(productDTO);
            }
            return BadRequest("Something went wrong");
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] ProductUpdateDTO productUpdateDTO)
        {
            // Parse id as string, since it's a string now
            if (id == null)
            {
                return BadRequest("Invalid product ID format.");
            }

            var updateResult = await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (updateResult != null)
            {
                updateResult.ToPuneFreight = productUpdateDTO.ToPuneFreight;
                updateResult.InnerPackageMaterial = productUpdateDTO.InnerPackageMaterial;
                updateResult.OuterPackageMaterial = productUpdateDTO.OuterPackageMaterial;
                updateResult.ManualPackage = productUpdateDTO.ManualPackage;
                updateResult.MachinePackage = productUpdateDTO.MachinePackage;
                updateResult.LocalTransport = productUpdateDTO.LocalTransport;
                updateResult.Fumigation = productUpdateDTO.Fumigation;
                updateResult.TotalRate = productUpdateDTO.TotalRate;
                updateResult.GrossWeight = productUpdateDTO.GrossWeight;
                updateResult.PouchType = productUpdateDTO.PouchType;
                updateResult.BumperisPouches = productUpdateDTO.BumperisPouches;
                updateResult.BagOrBox = productUpdateDTO.BagOrBox;
                updateResult.BagOrBoxBumpers = productUpdateDTO.BagOrBoxBumpers;
                updateResult.Ingredients = productUpdateDTO.Ingredients;
                updateResult.ManufacturingProcess = productUpdateDTO.ManufacturingProcess;
                updateResult.DairyDeclarationRequired = productUpdateDTO.DairyDeclarationRequired;
                updateResult.IsForHumanConsumption = productUpdateDTO.IsForHumanConsumption;

                await dbContext.SaveChangesAsync();

                return Ok(productUpdateDTO);
            }

            return BadRequest("Product not found");
        }

    }
}


//-----------------------------

// using ExportPortal.API.Data;
// using ExportPortal.API.Models.Domain;
// using ExportPortal.API.Models.DTO;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace ExportPortal.API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class ProductController : ControllerBase
//     {
//         private readonly ExportPortalDbContext dbContext;
//         private readonly IWebHostEnvironment webHostEnvironment;
//         private readonly IHttpContextAccessor httpContextAccessor;

//         public ProductController(ExportPortalDbContext dbContext, IWebHostEnvironment webHostEnvironment,
//             IHttpContextAccessor httpContextAccessor)
//         {
//             this.dbContext = dbContext;
//             this.webHostEnvironment = webHostEnvironment;
//             this.httpContextAccessor = httpContextAccessor;
//         }

//         [HttpGet]
//         public async Task<IActionResult> GetAllProducts()
//         {
//             List<Product> products = await dbContext.Products.Include("Certification")
//                 .Include("VendorCategory").Include(u => u.UserProfile1)
//                 .Include(u => u.UserProfile2).Include(u => u.UserProfile3).ToListAsync();
//             if (products != null)
//             {
//                 List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
//                 foreach (var productDomain in products) {
//                     var productResponseDTO = new ProductResponseDTO
//                     {
//                         Id = productDomain.Id,
//                         Name = productDomain.Name,
//                         ImgPath = productDomain.ImgPath,
//                         ScientificName = productDomain.ScientificName,
//                         VendorCategory = productDomain.VendorCategory,
//                         VendorId1 = productDomain.UserProfile1?.Id,
//                         VendorName1 = productDomain.UserProfile1?.Name,
//                         VendorId2 = productDomain.UserProfile2?.Id,
//                         VendorName2 = productDomain.UserProfile2?.Name,
//                         VendorId3 = productDomain.UserProfile3?.Id,
//                         VendorName3 = productDomain.UserProfile3?.Name,
//                         HSNCode = productDomain.HSNCode,
//                         ToPuneFreight = productDomain.ToPuneFreight,
//                         InnerPackageMaterial = productDomain.InnerPackageMaterial,
//                         OuterPackageMaterial = productDomain.OuterPackageMaterial,
//                         ManualPackage = productDomain.ManualPackage,
//                         MachinePackage = productDomain.MachinePackage,
//                         LocalTransport = productDomain.LocalTransport,
//                         Fumigation = productDomain.Fumigation,
//                         TotalRate = productDomain.TotalRate,
//                         GrossWeight = productDomain.GrossWeight,
//                         PouchType = productDomain.PouchType,
//                         BumperisPouches = productDomain.BumperisPouches,
//                         BagOrBox = productDomain.BagOrBox,
//                         BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
//                         Ingredients = productDomain.Ingredients,
//                         ManufacturingProcess = productDomain.ManufacturingProcess,
//                         DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
//                         IsForHumanConsumption = productDomain.IsForHumanConsumption,
//                         Certification = productDomain.Certification,
//                     };

//                     productDTO.Add(productResponseDTO);
//                 };
//                 return Ok(productDTO);
//             }
//             return BadRequest();
//         }


//         [HttpPost]
//         //[Authorize(Roles = "Admin")]
//         public async Task<ActionResult<Product>> AddProduct([FromForm] ProductDTO productDto)
//         {
//             var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

//             if (!allowedExtensions.Contains(Path.GetExtension(productDto.File.FileName)))
//             {
//                 return BadRequest("No file or unsupported file type.");
//             }

//             if (productDto.File.Length > 10485760)
//             {
//                 return BadRequest("File size more than 10MB, please upload a smaller size file");
//             }

//             var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
//                 $"{productDto.File.FileName}{Path.GetExtension(productDto.File.FileName)}");

//             // Upload Image to Local Path
//             using var stream = new FileStream(localFilePath, FileMode.Create);
//             await productDto.File.CopyToAsync(stream);

//             // https://localhost:1234/images/image.jpg

//             var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{productDto.File.FileName}{Path.GetExtension(productDto.File.FileName)}";


//             var productDomain = new Product
//             {
//                 Name = productDto.Name,
//                 ScientificName = productDto.ScientificName,
//                 ImgPath = urlFilePath,
//                 VendorCategoryId = productDto.VendorCategoryId,
//                 VendorId1 = productDto?.VendorId1,
//                 VendorId2 = productDto?.VendorId2,
//                 VendorId3 = productDto?.VendorId3,
//                 HSNCode = productDto.HSNCode,
//                 ToPuneFreight = productDto.ToPuneFreight,
//                 InnerPackageMaterial = productDto.InnerPackageMaterial,
//                 OuterPackageMaterial = productDto.OuterPackageMaterial,
//                 ManualPackage = productDto.ManualPackage,
//                 MachinePackage = productDto.MachinePackage,
//                 LocalTransport = productDto.LocalTransport,
//                 Fumigation = productDto.Fumigation,
//                 TotalRate = productDto.TotalRate,
//                 GrossWeight = productDto.GrossWeight,
//                 PouchType = productDto.PouchType,
//                 BumperisPouches = productDto.BumperisPouches,
//                 BagOrBox = productDto.BagOrBox,
//                 BagOrBoxBumpers = productDto.BagOrBoxBumpers,
//                 Ingredients = productDto.Ingredients,
//                 ManufacturingProcess = productDto.ManufacturingProcess,
//                 DairyDeclarationRequired = productDto.DairyDeclarationRequired,
//                 IsForHumanConsumption = productDto.IsForHumanConsumption,
//                 CertificationId = productDto.CertificationId,
//             };

//             await dbContext.Products.AddAsync(productDomain);
//             await dbContext.SaveChangesAsync();
//             return Ok(productDto);
//         }

//         [HttpGet]
//         [Route("{id:Guid}")]
//         public async Task<IActionResult> GetById([FromRoute] Guid id)
//         {
//             var productDomain = await dbContext.Products.Include("Certification").Include("VendorCategory")
//                 .Include(u => u.UserProfile1).Include(u => u.UserProfile2)
//                 .Include(u => u.UserProfile3).FirstOrDefaultAsync(x => x.Id == id);
//             if (productDomain != null)
//             {
//                 var productResponseDto = new ProductResponseDTO
//                 {
//                     Id = productDomain.Id,
//                     Name = productDomain.Name,
//                     ImgPath = productDomain.ImgPath,
//                     ScientificName = productDomain.ScientificName,
//                     VendorCategory = productDomain.VendorCategory,
//                     VendorId1 = productDomain.UserProfile1?.Id,
//                     VendorName1 = productDomain.UserProfile1?.Name,
//                     VendorId2 = productDomain.UserProfile2?.Id,
//                     VendorName2 = productDomain.UserProfile2?.Name,
//                     VendorId3 = productDomain.UserProfile3?.Id,
//                     VendorName3 = productDomain.UserProfile3?.Name,
//                     HSNCode = productDomain.HSNCode,
//                     ToPuneFreight = productDomain.ToPuneFreight,
//                     InnerPackageMaterial = productDomain.InnerPackageMaterial,
//                     OuterPackageMaterial = productDomain.OuterPackageMaterial,
//                     ManualPackage = productDomain.ManualPackage,
//                     MachinePackage = productDomain.MachinePackage,
//                     LocalTransport = productDomain.LocalTransport,
//                     Fumigation = productDomain.Fumigation,
//                     TotalRate = productDomain.TotalRate,
//                     GrossWeight = productDomain.GrossWeight,
//                     PouchType = productDomain.PouchType,
//                     BumperisPouches = productDomain.BumperisPouches,
//                     BagOrBox = productDomain.BagOrBox,
//                     BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
//                     Ingredients = productDomain.Ingredients,
//                     ManufacturingProcess = productDomain.ManufacturingProcess,
//                     DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
//                     IsForHumanConsumption = productDomain.IsForHumanConsumption,
//                     Certification = productDomain.Certification,
//                 };
//                 return Ok(productResponseDto);
//             }
//             return BadRequest();
//         }

//         [HttpGet]
//         [Route("Vendor/{id:Guid}")]
//         public async Task<IActionResult> GetAllProductsAssigned([FromRoute] string id)
//         {
//             List<Product> products = await dbContext.Products.Include("Certification")
//                 .Include("VendorCategory").Include(u => u.UserProfile1)
//                 .Include(u => u.UserProfile2).Include(u => u.UserProfile3)
//                 .Where(x => x.VendorId1 == id || x.VendorId2 == id || x.VendorId3 == id)
//                 .ToListAsync();

//             if (products != null)
//             {
//                 List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
//                 foreach (var productDomain in products)
//                 {
//                     var productResponseDTO = new ProductResponseDTO
//                     {
//                         Id = productDomain.Id,
//                         Name = productDomain.Name,
//                         ScientificName = productDomain.ScientificName,
//                         VendorCategory = productDomain.VendorCategory,
//                         VendorId1 = productDomain.UserProfile1?.Id,
//                         VendorName1 = productDomain.UserProfile1?.Name,
//                         VendorId2 = productDomain.UserProfile2?.Id,
//                         VendorName2 = productDomain.UserProfile2?.Name,
//                         VendorId3 = productDomain.UserProfile3?.Id,
//                         VendorName3 = productDomain.UserProfile3?.Name,
//                         HSNCode = productDomain.HSNCode,
//                         ToPuneFreight = productDomain.ToPuneFreight,
//                         InnerPackageMaterial = productDomain.InnerPackageMaterial,
//                         OuterPackageMaterial = productDomain.OuterPackageMaterial,
//                         ManualPackage = productDomain.ManualPackage,
//                         MachinePackage = productDomain.MachinePackage,
//                         LocalTransport = productDomain.LocalTransport,
//                         Fumigation = productDomain.Fumigation,
//                         TotalRate = productDomain.TotalRate,
//                         GrossWeight = productDomain.GrossWeight,
//                         PouchType = productDomain.PouchType,
//                         BumperisPouches = productDomain.BumperisPouches,
//                         BagOrBox = productDomain.BagOrBox,
//                         BagOrBoxBumpers = productDomain.BagOrBoxBumpers,
//                         Ingredients = productDomain.Ingredients,
//                         ManufacturingProcess = productDomain.ManufacturingProcess,
//                         DairyDeclarationRequired = productDomain.DairyDeclarationRequired,
//                         IsForHumanConsumption = productDomain.IsForHumanConsumption,
//                         Certification = productDomain.Certification,
//                     };

//                     productDTO.Add(productResponseDTO);
//                 };
//                 return Ok(productDTO);
//             }
//             return BadRequest("Something went wrong");
//         }

//         [HttpPut]
//         [Route("{id:Guid}")]
//         public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] ProductUpdateDTO productUpdateDTO)
//         {

//             var updateResult = await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

//             if (updateResult != null)
//             {
//                 updateResult.ToPuneFreight = productUpdateDTO.ToPuneFreight;
//                 updateResult.InnerPackageMaterial = productUpdateDTO.InnerPackageMaterial;
//                 updateResult.OuterPackageMaterial = productUpdateDTO.OuterPackageMaterial;
//                 updateResult.ManualPackage = productUpdateDTO.ManualPackage;
//                 updateResult.MachinePackage = productUpdateDTO.MachinePackage;
//                 updateResult.LocalTransport = productUpdateDTO.LocalTransport;
//                 updateResult.Fumigation = productUpdateDTO.Fumigation;
//                 updateResult.TotalRate = productUpdateDTO.TotalRate;
//                 updateResult.GrossWeight = productUpdateDTO.GrossWeight;
//                 updateResult.PouchType = productUpdateDTO.PouchType;
//                 updateResult.BumperisPouches = productUpdateDTO.BumperisPouches;
//                 updateResult.BagOrBox = productUpdateDTO.BagOrBox;
//                 updateResult.BagOrBoxBumpers = productUpdateDTO.BagOrBoxBumpers;
//                 updateResult.Ingredients = productUpdateDTO.Ingredients;
//                 updateResult.ManufacturingProcess = productUpdateDTO.ManufacturingProcess;
//                 updateResult.DairyDeclarationRequired = productUpdateDTO.DairyDeclarationRequired;
//                 updateResult.IsForHumanConsumption = productUpdateDTO.IsForHumanConsumption;

//                 dbContext.SaveChangesAsync();

//                 return Ok(productUpdateDTO);
//             }

//             return BadRequest("Something went wrong");
//         }

//     }
// }
