import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CartItem = ({shippinFee,cart=[],cartsProducts=[],totalPrice, buttonText, quantity, carstPrice}) => {

  // const [deleveryCost, setDeleveryCost] = useState(50);
console.log(shippinFee)
   const router = useRouter();

   const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  //  console.log(totalQuantity);
  const deleveryCost = totalQuantity * 50;
  let total = deleveryCost + totalPrice;

   const itemsCount = quantity || cartsProducts.length || cart.length;

     

  const handleCheckout = () => {
    router.push(
      `/product/checkout?products=${encodeURIComponent(
        JSON.stringify(cart)
      )}&totalPrice=${total}&deleveryCost=${deleveryCost}`
    );
  };
  
 

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Total ({itemsCount} items)</span>
            <span>${totalPrice ? totalPrice: carstPrice}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping Fee</span>
            <span>{deleveryCost ? deleveryCost : shippinFee}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold text-base">
            <span>Subtotal</span>
            <span className="text-orange-600">${totalPrice ? totalPrice: carstPrice}</span>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold"
            onClick={buttonText === "Proceed to Pay" ? undefined : handleCheckout}
            type={buttonText === "Proceed to Pay" ? "submit" : "button"}
          >
            {buttonText} {itemsCount}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItem;
