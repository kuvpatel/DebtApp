using Microsoft.AspNetCore.Mvc;
using DebtApi.Services;
using DebtApi.Models;

namespace DebtApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DebtController : Controller
    {
        private readonly IDebtService _debtService;

        public DebtController(IDebtService debtService)
        {
            _debtService = debtService;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet("customerid")]
        public async Task<IActionResult> GetDebt(int customerId)
        {
            var customerDebt = await _debtService.GetDebtAsync(customerId);
            return Ok(customerDebt);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetDebtDetail(int id)
        {
            var customerDebt = await _debtService.GetDebtDetails((int)id);
            return Ok(customerDebt);
        }
        
        [HttpPost()]
        public async Task<IActionResult> AddRepaymentPlan(RepaymentPlanRequest request)
        {
            var result  = await _debtService.AddRepaymentPlan(request);

            if (!result.Success)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(result.Id);
        }
    }
}