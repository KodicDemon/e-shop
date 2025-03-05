import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  /*  if (!userId) throw new Error("User not found");
  const user = await getUserById(userId); */ //musís mít ucet aby ses dostal k platbe
  let preferredPaymentMethod = null;

  if (userId) {
    // Fetch user data only if logged in
    const user = await getUserById(userId);
    preferredPaymentMethod = user.paymentMethod || null;
  }

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={preferredPaymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
