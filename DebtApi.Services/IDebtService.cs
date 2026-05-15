using DebtApi.Models;

namespace DebtApi.Services
{
    public interface IDebtService
    {
        public  Task<List<Debt>> GetDebtAsync(int customerId);

        public Task<DebtDetail> GetDebtDetails(int id);

        public Task<ServiceResult> AddRepaymentPlan(RepaymentPlanRequest request);
    }
}