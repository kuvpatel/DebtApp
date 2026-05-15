import { useState } from "react";
import { useForm } from "react-hook-form";
import { addRepaymentPlan } from "../services/debtService";

const RepaymentPlan = ({ debtId, show, onClose, onSuccess }) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const request = {
      id: 0,
      debtId: debtId,
      monthlyPaymentAmount: parseFloat(data.monthlyPaymentAmount),
      dateStarted: data.dateStarted,
    };

    try {
      const response = await addRepaymentPlan(request);

      if (!response.ok) {

      // Try to read error message from API
      let errorMessage = "Request failed";

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {

        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);

      } else {

        errorMessage = await response.text();
      }

      setMessage(errorMessage);
      setMessageType("danger");

      return;
    }

      const result = await response.json();
      if (result > 0) {
        setMessage("Payment plan added successfully");
        setMessageType("success");
        reset();

        // short delay then close modal
        setTimeout(() => {
          setMessage("");
          onClose();

           if (onSuccess) {
            onSuccess();
          }
        }, 1500);

      } else {
        setMessage("Failed to add payment plan");
        setMessageType("danger");
      }
    } catch {
      setMessage("Error calling API");
      setMessageType("danger");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Repayment Plan</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {message && (
                <div className={`alert alert-${messageType}`}>{message}</div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Monthly Payment Amount</label>

                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    {...register("monthlyPaymentAmount", {
                      required: "Monthly payment amount is required",
                    })}
                  />

                  {errors.monthlyPaymentAmount && (
                    <div className="text-danger">
                      {errors.monthlyPaymentAmount.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Date Started</label>

                  <input
                    type="date"
                    className="form-control"
                    {...register("dateStarted", {
                      required: "Date started is required",
                    })}
                  />

                  {errors.dateStarted && (
                    <div className="text-danger">
                      {errors.dateStarted.message}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepaymentPlan;
