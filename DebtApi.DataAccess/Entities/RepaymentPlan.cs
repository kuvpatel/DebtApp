namespace DebtApi.DataAccess.Entities
{
    public class RepaymentPlan
    {
        public int Id { get; set; }

        public int DebtId { get; set; }

        public decimal MonthlyPaymentAmount { get; set; }

        public DateTime DateStarted { get; set; }
    }
}