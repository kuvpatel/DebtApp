import React, { useEffect, useState } from "react";
import { getDebtDetails } from "../services/debtService";
import RepaymentPlan from "./repayment-plan";

export default function DebtDetails({ debtId }) {
  const [debt, setDebt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (debtId) {
      loadDebtDetails();
    }
  }, [debtId]);

  async function loadDebtDetails() {
    try {
      const data = await getDebtDetails(debtId);
      setDebt(data);
    } catch (error) {
      console.error(error);
    }
  }

  const refreshDebt = async () => {
    await loadDebtDetails();
  };

  if (!debt) {
    return;
  }

  return (
    <div className="container mt-4">
      {/* Header Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-1">Debt Details</h3>
              <small className="text-muted">ID: {debt.id}</small>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + Add Payment Plan
            </button>
          </div>
        </div>
      </div>

      {/* Debt Info Card */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0 fw-bold">Debt Summary</h5>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-muted small">Debt Reference</div>
              <div className="fw-semibold">{debt.debtReference}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Creditor</div>
              <div className="fw-semibold">{debt.creditor}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Current Balance</div>
              <div className="fw-semibold">
                £{Number(debt.currentBalance).toFixed(2)}
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Status</div>
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
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Debt Start Date</div>
              <div className="fw-semibold">
                {new Date(debt.debtCreatedDate).toLocaleDateString()}
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Original Balance</div>
              <div className="fw-semibold">
                £{Number(debt.originalBalance).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Plans Placeholder (optional) */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Payment Plan</h5>
        </div>

        <div className="card-body">
          {debt.repaymentPlan ? (
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-muted small">Monthly Payment</div>
                <div className="fw-semibold">
                  £{Number(debt.repaymentPlan.monthlyPaymentAmount).toFixed(2)}
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Start Date</div>
                <div className="fw-semibold">
                  {new Date(
                    debt.repaymentPlan.dateStarted
                  ).toLocaleDateString()}
                </div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Plan ID</div>
                <div className="fw-semibold">{debt.repaymentPlan.id}</div>
              </div>
            </div>
          ) : (
            <p className="text-muted mb-0">
              No repayment plan found. Click <strong>Add Plan</strong> to create
              one.
            </p>
          )}
        </div>
      </div>
      <RepaymentPlan
        show={showModal}
        debtId={debt.id}
        onClose={() => setShowModal(false)}
        onSuccess={refreshDebt}
      />
    </div>
  );
}
