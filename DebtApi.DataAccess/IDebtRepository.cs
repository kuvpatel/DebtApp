using DebtApi.Models;

namespace DebtApi.DataAccess
{
    public interface IDebtRepository
    {
        public Task<List<Debt>> GetDebtAsync(int customerId);

        public Task<DebtDetail> GetDebtDetailAsync(int id);

        public Task<int> AddRepaymentPlanAsync(Entities.RepaymentPlan repaymentPlan);
    }
}