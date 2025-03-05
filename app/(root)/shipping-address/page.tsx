import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import Cookies from "js-cookie";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;

  let userAddress = null;

  if (userId) {
    // Fetch user address only if logged in
    const user = await getUserById(userId);
    userAddress = user.address || null;
  }

  /*  if (!userId) throw new Error("No user ID");
const user = await getUserById(userId); */ //toto je pro případ, kdy kontroluji, zda je uživatel přihlášený a jen tomu přihlášenému umožním procceed to checkout

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={userAddress as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
