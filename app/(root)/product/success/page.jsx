"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SuccessPage() {

  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (session_id) {
      axios
        .get(`/api/users/cart/success/${session_id}`)
        .then((res) => {
          setStatus("success");
          setOrder(res.data.order);
        })
        .catch(() => setStatus("error"));
    }
  }, [session_id]);

  if (status === "loading") return <p>Checking payment...</p>;
  if (status === "error") return <p>❌ Payment failed or not confirmed.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
      <p className="mt-2">Your order has been placed successfully.</p>
      {order && (
        <div className="mt-4 p-4 border rounded-lg text-left">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total Paid:</strong> ${order.subtotal}</p>
        </div>
      )}
      <a href="/" className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
        Go Back Home
      </a>
    </div>
  );
}
