"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const WholeProfile = () => {
    
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <p className="text-center text-gray-500">No user data available</p>;
  };

  return (
    <>
      {user.role === "admin" ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Card className="w-full max-w-lg shadow-md rounded-2xl p-6">
            <CardHeader className="flex flex-col items-center">
              <Image
                src={user?.image?._secure_url}
                alt={user.fullName}
                width={80}
                height={80}
                className="rounded-full mb-2 object-cover"
              />
              <CardTitle className="text-xl font-semibold">
                Admin Dashboard
              </CardTitle>
              <Badge variant="destructive">{user.role}</Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center text-gray-600">
                Welcome back,{" "}
                <span className="font-semibold">{user.fullName}</span> 👋
                <p className="text-sm">
                  Here you can manage users and system settings.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button variant="default">Manage Users</Button>
                <Button variant="outline">View Reports</Button>
                <Button variant="secondary">Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-md shadow-lg rounded-2xl">
            <CardHeader className="flex flex-col items-center">
              <Image
                src={user?.image?._secure_url}
                alt={user.fullName}
                width={80}
                height={80}
                className="rounded-full mb-2 object-cover"
              />
              <CardTitle className="text-xl font-semibold">
                {user.fullName}
              </CardTitle>
              <Badge variant="default">{user.role}</Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Email:</span>
                <span className="text-gray-600">{user.email}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Phone:</span>
                <span className="text-gray-600">{user.phone || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Verified:</span>
                <span
                  className={`${
                    user.isVerified ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WholeProfile;
