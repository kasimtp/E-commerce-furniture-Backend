import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../utils/api"; // your axios instance

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 100; // from checkout page (in rupees)

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order on backend
      const { data } = await apiClient.post("/api/payment/orders/create", {
        amount: amount * 100, // convert to paise
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Furniture Store",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await apiClient.post("/api/payment/orders/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            toast.success("Payment Successful!");
            navigate("/"); // redirect to home or order success page
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2b8a3e",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed to start");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>
      <p className="mb-6 text-gray-600">Amount to pay: ₹{amount}</p>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
