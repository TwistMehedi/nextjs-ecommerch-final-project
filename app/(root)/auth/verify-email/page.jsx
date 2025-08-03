"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEmailVerifyMutation } from "@/app/redux/api/authApi";
import { useDispatch } from "react-redux";
import { loginUser } from "@/app/redux/features/authSlice";

const EmailVerify = () => {
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [verifyEmail, { isLoading, isError, error }] = useEmailVerifyMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const saveEmail = async () => {
      if (token) {
        try {
          const res = await verifyEmail(token).unwrap();
          dispatch(loginUser(res.user));
          if (res.user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        } catch (err) {
          console.error("Email verification failed:", err);
        }
      }
    };

    saveEmail();
  }, [token, verifyEmail, dispatch]);

  return (
    <div>
      <h2>Email Verify</h2>
      {isLoading && <p>Verifying...</p>}
      {isError && (
        <p style={{ color: "red" }}>
          Verification failed: {error?.data?.message}
        </p>
      )}
      {!isLoading && !isError && <p>Verification completed.</p>}
    </div>
  );
};

export default EmailVerify;
