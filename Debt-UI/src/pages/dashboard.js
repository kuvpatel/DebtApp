import React, { useState } from "react";
import DebtTable from "../components/debt-table";
import DebtDetails from "../components/debt-details";
export default function Dashboard() {
  const [selectedDebtId, setSelectedDebtId] = useState(null);

  return (
    <div>
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-light rounded shadow-sm">
          <h2 className="mb-0 fw-bold">Dashboard</h2>
        </div>
      </div>

      <DebtTable onDebtSelected={setSelectedDebtId} />
      <DebtDetails debtId={selectedDebtId} />
    </div>
  );
}
