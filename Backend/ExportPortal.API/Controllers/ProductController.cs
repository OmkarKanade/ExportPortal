﻿using ExportPortal.API.Data;
using ExportPortal.API.Models.Domain;
using ExportPortal.API.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

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
        public async Task<IActionResult> GetAllProducts([FromQuery] string? filterOn, [FromQuery] string? filterVal)
        {
            var products = dbContext.Products.Include("Certification")
                .Include("VendorCategory").Include(u => u.UserProfile1)
                .Include(u => u.UserProfile2).Include(u => u.UserProfile3).AsQueryable();

            if (String.IsNullOrWhiteSpace(filterOn) == false && String.IsNullOrWhiteSpace(filterVal) == false)
            {
                if (filterOn.Equals("ProductId", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.ProductId.ToLower().Contains(filterVal.ToLower()));

                }
                if (filterOn.Equals("Certification", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.Certification.Name.ToLower().Contains(filterVal.ToLower()));

                }
                if (filterOn.Equals("VendorCategory", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.VendorCategory.Name.ToLower().Contains(filterVal.ToLower()));

                }
            }

            if (products != null)
            {
                List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
                foreach (var productDomain in products)
                {
                    var productResponseDTO = new ProductResponseDTO
                    {
                        Id = productDomain.Id,
                        ProductId = productDomain.ProductId,
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
            return BadRequest("Something went wrong");
        }


        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> AddProduct([FromForm] ProductDTO productDto)
        {
            ValidateFileUpload(productDto.File);

            if (ModelState.IsValid)
            {
                string imgPath = await Upload(productDto.File);

                var productDomain = new Product
                {
                    Name = productDto.Name,
                    ScientificName = productDto.ScientificName,
                    ImgPath = imgPath,
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
                return Ok(productDomain);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var productDomain = await dbContext.Products.Include("Certification").Include("VendorCategory")
                .Include(u => u.UserProfile1).Include(u => u.UserProfile2)
                .Include(u => u.UserProfile3).FirstOrDefaultAsync(x => x.Id == id);
            if (productDomain != null)
            {
                var productResponseDto = new ProductResponseDTO
                {
                    Id = productDomain.Id,
                    ProductId = productDomain.ProductId,
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
                return Ok(productResponseDto);
            }
            return BadRequest("Something went wrong");
        }

        [HttpGet]
        [Route("Vendor/{id:Guid}")]
        public async Task<IActionResult> GetAllProductsAssigned([FromRoute] string id, [FromQuery] string? filterOn, [FromQuery] string? filterVal)
        {
            var products = dbContext.Products.Include("Certification")
                .Include("VendorCategory").Include(u => u.UserProfile1)
                .Include(u => u.UserProfile2).Include(u => u.UserProfile3)
                .Where(x => x.VendorId1 == id || x.VendorId2 == id || x.VendorId3 == id).AsQueryable();

            if (String.IsNullOrWhiteSpace(filterOn) == false && String.IsNullOrWhiteSpace(filterVal) == false)
            {
                if (filterOn.Equals("ProductId", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.ProductId.ToLower().Contains(filterVal.ToLower()));

                }
                if (filterOn.Equals("Certification", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.Certification.Name.ToLower().Contains(filterVal.ToLower()));

                }
                if (filterOn.Equals("VendorCategory", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.VendorCategory.Name.ToLower().Contains(filterVal.ToLower()));

                }
            }

            if (products != null)
            {
                List<ProductResponseDTO> productDTO = new List<ProductResponseDTO>();
                foreach (var productDomain in products)
                {
                    var productResponseDTO = new ProductResponseDTO
                    {
                        Id = productDomain.Id,
                        ProductId = productDomain.ProductId,
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
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] ProductUpdateDTO productUpdateDTO)
        {

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

                dbContext.SaveChangesAsync();

                return Ok(updateResult);
            }

            return BadRequest("Something went wrong");
        }

        [HttpPut]
        [Route("UpdatePrice/{productId:Guid}")]
        public async Task<IActionResult> UpdateProductPrice([FromRoute] Guid productId, [FromBody] UpdatePriceRequest request)
        {
            var product = await dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);

            if (product != null)
            {
                if (request.VendorId == product.VendorId1)
                    product.Vendor1Price = request.Price;
                else if (request.VendorId == product.VendorId2)
                    product.Vendor2Price = request.Price;
                else if (request.VendorId == product.VendorId3)
                    product.Vendor3Price = request.Price;
                else
                    return BadRequest("Something went wrong");

                await dbContext.SaveChangesAsync();
                return Ok($"Price for vendor {request.VendorId} updated successfully for product {productId}.");
               
            }
            return BadRequest("Something went wrong");

        }

        private async Task<string> Upload(IFormFile image)
        {
            var folder = Path.Combine(webHostEnvironment.ContentRootPath, "Files", "ProductsImages");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string uniqueName = Guid.NewGuid().ToString();
            string fileExt = Path.GetExtension(image.FileName);
            var localFilePath = Path.Combine(folder, $"{uniqueName}{fileExt}");

            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.CopyToAsync(stream);
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Files/ProductsImages/{uniqueName}{fileExt}";
            var FilePath = urlFilePath;
            return FilePath;
        }

        private void ValidateFileUpload(IFormFile document)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(Path.GetExtension(document.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file extension");
            }

            if (document.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size more than 10MB, please upload a smaller size file.");
            }
        }

    }
}
