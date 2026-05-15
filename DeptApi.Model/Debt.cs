namespace DebtApi.Models
{
    public class Debt
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public decimal CurrentBalance { get; set; }

        public string Creditor { get; set; }

        public int DebtStatusId { get; set; }

        public string DebtStatus { get; set; }

    }
}