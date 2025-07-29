"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Login } from "@/lib/zodSchema";
import { BriefcaseBusiness, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = Login.pick({ email: true, password: true });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const passwordVisibleAndHide = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto mt-20 p-8 border border-gray-200 rounded-2xl shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
        <BriefcaseBusiness className="text-blue-600" /> <span>Your Store</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-1">Login to Your Account</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Fill the form below to access your account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={passwordVisibleAndHide}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      {/* Footer links */}
      <div className="mt-6 w-full text-center space-y-1 text-sm text-gray-600">
        <p>
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 underline">
            Create account
          </Link>
        </p>
        <p>
          <a href="/forgot-password" className="text-blue-600 underline">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
