"use client";

import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/actions/order.actions";
import { useFormStatus } from "react-dom";
import Cookies from "js-cookie";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // dodat try chatch

    /*     gffghfhgfhg  */

    const shipAddress = Cookies.get("guestAddress") || null;
    const paymentMethod = Cookies.get("guestPayment") || null;

    console.log("shipADress: ", shipAddress);
    console.log("payment: ", paymentMethod);

    const res = await createOrder(
      JSON.parse(shipAddress as string),
      JSON.parse(paymentMethod as string)
    );

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton></PlaceOrderButton>
    </form>
  );
};

export default PlaceOrderForm;
