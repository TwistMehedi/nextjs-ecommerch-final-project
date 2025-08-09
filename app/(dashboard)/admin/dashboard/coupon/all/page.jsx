"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, isValid } from "date-fns";
import useFetch from "@/hooks/useFeatch";

const AllCoupon = () => {
  const { data, loading } = useFetch("/api/admin/coupon/all");
 
  if (loading) {
    return <p className="text-center py-10">Loading coupons...</p>;
  };


  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Coupons</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Discount (%)</TableHead>
            <TableHead>Min Shopping Price</TableHead>
            <TableHead>Validity Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.length > 0 ? (
            data?.data.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discountPercentage}</TableCell>
                <TableCell>{coupon.minShoppingPrice}</TableCell>
                <TableCell>
                  {coupon.validity && isValid(new Date(coupon.validity))
                    ? format(new Date(coupon.validity), "dd/MM/yyyy")
                    : "Invalid Date"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No coupons found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllCoupon;
