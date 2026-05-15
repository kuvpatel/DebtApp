import React, { useEffect, useState } from "react";
import { getDebts } from "../services/debtService";

export default function DebtTable({ onDebtSelected }) {
  const [debts, setDebts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDebts();
  }, []);

  async function loadDebts() {
    try {
      const data = await getDebts(101);
      setDebts(data);
    } catch (err) {
      setError("Unable to obtain debt information");
    }
  }

  return (
    <div className="container mt-4">
      {/* Header Card */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Debts</h3>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table Card */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Customer Id</th>
                  <th>Current Balance</th>
                  <th>Creditor Name</th>
                  <th>Debt Status</th>
                </tr>
              </thead>

              <tbody>
                {debts && debts.length > 0 ? (
                  debts.map((debt) => (
                    <tr
                      key={debt.id}
                      onClick={() => onDebtSelected(debt.id)}
                      style={{ cursor: "pointer" }}
                      className="table-row-hover"
                    >
                      <td className="fw-semibold">{debt.id}</td>

                      <td>{debt.customerId}</td>

                      <td>£{Number(debt.currentBalance).toFixed(2)}</td>

                      <td>{debt.creditor}</td>

                      <td>
                        <span
                          className={`badge ${
                            debt.debtStatus === "Active"
                              ? "bg-success"
                              : debt.debtStatus === "Closed"
                              ? "bg-secondary"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {debt.debtStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No debts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
