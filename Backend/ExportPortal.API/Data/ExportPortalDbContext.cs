using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ExportPortal.API.Data
{
    public class ExportPortalDbContext: IdentityDbContext
    {
        public ExportPortalDbContext(DbContextOptions<ExportPortalDbContext> dbContextOptions): base(dbContextOptions)
        {

        }

    }
}
