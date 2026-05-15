namespace DebtApi.Models
{
    public class DebtDetail
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public string DebtReference { get; set; }

        public decimal OriginalBalance { get; set; }

        public decimal CurrentBalance { get; set; }

        public string Creditor { get; set; }

        public int DebtStatusId { get; set; }

        public string DebtStatus { get; set; }

        public DateTime DebtCreatedDate { get; set; }

        public RepaymentPlan? RepaymentPlan { get; set; }

    }
}