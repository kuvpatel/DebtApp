using DebtApi.DataAccess;
using DebtApi.Models;
using debtEntities = DebtApi.DataAccess.Entities;

namespace DebtApi.Services
{
    public class DebtService : IDebtService
    {
        private readonly IDebtRepository _debtRepository;

        public DebtService(IDebtRepository debtRepository)
        {
            _debtRepository = debtRepository;
        }

        public async Task<List<Debt>> GetDebtAsync(int customerId)
        {
            return await _debtRepository.GetDebtAsync(customerId);
        }

        public async Task<DebtDetail> GetDebtDetails(int id)
        {
            return await _debtRepository.GetDebtDetailAsync(id);
        }

        public async Task<ServiceResult> AddRepaymentPlan(RepaymentPlanRequest request)
        {
            if (request.MonthlyPaymentAmount <= 0)
            {
                return new ServiceResult
                {
                    Success = false,
                    ErrorMessage = "Monthly payment amount must be greater than 0"
                };
            }
            
            if (request.DateStarted <= DateTime.UtcNow)
            {
                return new ServiceResult
                {
                    Success = false,
                    ErrorMessage = "Date started must be in the future"
                };
            }

            var repaymentPlan = new debtEntities.RepaymentPlan
            {
                DebtId = request.DebtId,
                MonthlyPaymentAmount = request.MonthlyPaymentAmount,
                DateStarted = request.DateStarted
            };

            var repaymentPlanId  = await _debtRepository.AddRepaymentPlanAsync(repaymentPlan);

            return new ServiceResult
            {
                Success = true,
                Id = repaymentPlanId
            };
        }
    }
}