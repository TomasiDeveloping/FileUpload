using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
