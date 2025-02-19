"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
    ? "/admin/users"
    : "/admin/products";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(
    searchParams.get("querry") || ""
  );
  useEffect(() => {
    setQueryValue(searchParams.get("querry") || "");
  }, [searchParams]);
  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
