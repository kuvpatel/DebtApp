using DebtApi.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DebtApi.DataAccess
{
    public class DebtDbContext : DbContext
    {

        public DebtDbContext(DbContextOptions<DebtDbContext> options)
            : base(options) { }

        public DbSet<Debt> Debt => Set<Debt>();

        public DbSet<RepaymentPlan> RepaymentPlan => Set<RepaymentPlan>();

        public DbSet<DebtStatus> DebtStatus => Set<DebtStatus>();

    }
}