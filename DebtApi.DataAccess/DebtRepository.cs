using Microsoft.EntityFrameworkCore;

namespace DebtApi.DataAccess
{
    public class DebtRepository : IDebtRepository
    {
        private readonly DebtDbContext _debtDbContext;

        public DebtRepository(DebtDbContext db)
        {
            _debtDbContext = db;
        }

        public async Task<List<Models.Debt>> GetDebtAsync(int customerId)
        {
            var debtResult = await (
            from d in _debtDbContext.Debt
            join ds in _debtDbContext.DebtStatus
                on d.DebtStatusId equals ds.Id
            where d.CustomerId == customerId
            select new Models.Debt
            {
                Id = d.Id,
                Creditor = d.Creditor,
                CurrentBalance = d.CurrentBalance,
                CustomerId = d.CustomerId,
                DebtStatusId = d.DebtStatusId,
                DebtStatus = ds.Name
            })
            .ToListAsync();

            return debtResult;
        }

        public async Task<Models.DebtDetail> GetDebtDetailAsync(int id)
        {
            var debtDetailResult = (
                                        from d in _debtDbContext.Debt
                                        join ds in _debtDbContext.DebtStatus
                                        on d.DebtStatusId equals ds.Id
                                        where d.Id == id
                                        select new Models.DebtDetail
                                        {
                                            Id = d.Id,
                                            Creditor = d.Creditor,
                                            CurrentBalance = d.CurrentBalance,
                                            CustomerId = d.CustomerId,
                                            DebtStatusId = d.DebtStatusId,
                                            DebtStatus = ds.Name,
                                            DebtCreatedDate = d.DebtCreatedDate,
                                            DebtReference = d.DebtReference,
                                            OriginalBalance = d.OriginalBalance
                                        }).FirstOrDefault();

            var repaymentPlan = (
            from d in _debtDbContext.RepaymentPlan
            where d.DebtId == id
            orderby d.Id descending
            select new Models.RepaymentPlan
            {
                DateStarted = d.DateStarted,
                DebtId = d.DebtId,
                Id = d.Id,
                MonthlyPaymentAmount = d.MonthlyPaymentAmount
            })
            .FirstOrDefault();


            if (debtDetailResult != null)
            {
                debtDetailResult.RepaymentPlan = repaymentPlan ?? new Models.RepaymentPlan();
            }
            return debtDetailResult ?? new Models.DebtDetail();
        }


        public async Task<int> AddRepaymentPlanAsync(Entities.RepaymentPlan repaymentPlan)
        {
            _debtDbContext.RepaymentPlan.Add(repaymentPlan);
            await _debtDbContext.SaveChangesAsync();
            return repaymentPlan.Id;
        }
    }
}