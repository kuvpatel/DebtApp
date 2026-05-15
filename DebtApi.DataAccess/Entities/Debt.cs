namespace DebtApi.DataAccess.Entities
{
    public class Debt
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public string DebtReference { get; set; }

        public decimal OriginalBalance { get; set; }

        public decimal CurrentBalance { get; set; }

        public string Creditor { get; set; }

        public int DebtStatusId { get; set; }

        public DateTime DebtCreatedDate { get; set; }

        public DebtStatus DebtStatus { get; set; }
    }
}