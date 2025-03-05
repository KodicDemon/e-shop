import { Button } from "@/components/ui/button";
import ModeToggle from "./mood-toggle";
import Link from "next/link";
import { EllipsisVertical, LogOut, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import { signOutUser } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

const Menu = async () => {
  const session = await auth();

  const LogoutButton = async () => {
    if (session) {
      return (
        <Button onClick={signOutUser} className="md:hidden" variant="ghost">
          <LogOut /> Sign Out
        </Button>
      );
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href={`/cart`}>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton></UserButton>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col rounded-sm w-[250px] h-[270px]">
            <SheetTitle className="flex justify-center mt-2">Menu</SheetTitle>
            <div
              className={cn("flex flex-col items-start", !session && "gap-4")}
            >
              <ModeToggle />
              <Button asChild variant="ghost">
                <Link href={`/cart`}>
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <UserButton></UserButton>
              <LogoutButton></LogoutButton>
            </div>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
