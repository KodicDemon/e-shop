import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  gettAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },

  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = ["newest", "lowest", "highest", "rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""}
         ${isCategorySet ? `: Category ${category}` : ""}
         ${isPriceSet ? `: Price ${price}` : ""} 
         ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1", //To jsou defaultni hodnoty, kdyz se nic nenapise do searche, tak to vyhleda vse (all) vsechny q, vsechny category a jsou to hodnoty, které dosáváme z URL
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  });

  const categories = await gettAllCategories();
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/*   category links filters */}
        <div className="text-xl mb-2 mt-3">Department</div>
        <ul className="space-y-1">
          <li>
            <Link
              href={getFilterUrl({ c: "all" })}
              className={`${
                (category === "all" || category === "") && "font-bold"
              }`}
            >
              Any
            </Link>
          </li>
          {categories.map((x) => (
            <li key={x.category}>
              <Link
                href={getFilterUrl({ c: x.category })}
                className={`${category === x.category && "font-bold"}`}
              >
                {x.category}
              </Link>
            </li>
          ))}
        </ul>

        {/*   Price links filters */}
        <div className="text-xl mb-2 mt-8">Price</div>
        <ul className="space-y-1">
          <li>
            <Link
              href={getFilterUrl({ p: "all" })}
              className={`${price === "all" && "font-bold"}`}
            >
              Any
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                href={getFilterUrl({ p: p.value })}
                className={`${price === p.value && "font-bold"}`}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        {/*   Rating links filters */}
        <div className="text-xl mb-2 mt-8">Customer Ratings</div>
        <ul className="space-y-1">
          <li>
            <Link
              href={getFilterUrl({ r: "all" })}
              className={`${rating === "all" && "font-bold"}`}
            >
              Any
            </Link>
          </li>
          {ratings.map((r) => (
            <li key={r}>
              <Link
                href={getFilterUrl({ r: `${r}` })}
                className={`${rating === r.toString() && "font-bold"}`}
              >
                {`${r} stars & up `}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className=" flex-between flex-col my-4 md:flex-row">
          <div className="flex items-center">
            {q !== "all" && q !== "" && "Query : " + q}
            {category !== "all" &&
              category !== "" &&
              "   Category : " + category}
            {price !== "all" && "    Price: " + price}
            {rating !== "all" && "    Rating: " + rating + " & up"}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>

          <div>
            {" "}
            {/* Sort */}
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                href={getFilterUrl({ s })}
                key={s}
                className={`mx-2 ${sort == s && "font-bold"}`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid-cols-1 grid gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
