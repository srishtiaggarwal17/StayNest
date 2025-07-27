import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      toast.success("Payment successful!");
    } else {
      toast.error("No session ID found in URL.");
    }

    // Optional: Auto-redirect to MyBookings after a delay
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">🎉 Payment Successful!</h1>
        <p className="text-gray-600">You’ll be redirected to your bookings shortly.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
