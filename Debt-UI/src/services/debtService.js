export async function getDebts(customerId) {
  const response = await fetch(
    "https://localhost:7111/api/Debt/customerid?customerId=" + customerId
  );

  if (!response.ok) {
    throw new Error("Failed to fetch debts");
  }

  return await response.json();
}

export async function getDebtDetails(debtId) {
  const response = await fetch(
    "https://localhost:7111/api/Debt/id?id=" + debtId
  );

  if (!response.ok) {
    throw new Error("Failed to fetch debtdetails");
  }

  return await response.json();
}

export async function addRepaymentPlan(repaymentPlanRequest) {
  const response = await fetch("https://localhost:7111/api/Debt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(repaymentPlanRequest),
  });

  return response;
}
