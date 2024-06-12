import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductsBrandFilter from "@/components/modules/ProductsBrandFilter/ProductsBrandFilter";
import ProductsCategoryFilter from "@/components/modules/ProductsCategoryFilter/ProductsCategoryFilter";
import ProductsPriceFilter from "@/components/modules/ProductsPriceFilter/ProductsPriceFilter";
import ShowProducts from "@/components/templates/ShowProducts/ShowProducts";

export default async function Products({ searchParams }) {
  const res = await fetch(`${process.env.BASE_URL}/api/categories/${searchParams?.category}`, {
    cache: "no-store",
  });
  const category = await res.json();

  const breadcrumbPath =
    category?.name && searchParams?.category === category.name
      ? [
          { title: "خانه", href: "/" },
          { title: "محصولات", href: "/products" },
          { title: searchParams.category },
        ]
      : category?.name && searchParams?.category !== category.name
      ? [
          { title: "خانه", href: "/" },
          { title: "محصولات", href: "/products" },
          {
            title: category.name,
            href: `/products?category=${category.name}`,
          },
          { title: searchParams.category },
        ]
      : searchParams?.category
      ? [
          { title: "خانه", href: "/" },
          { title: "محصولات", href: "/products" },
          { title: searchParams.category },
        ]
      : searchParams?.brand
      ? [
          { title: "خانه", href: "/" },
          { title: "محصولات", href: "/products" },
          { title: `برند ${searchParams?.brand}` },
        ]
      : [{ title: "خانه", href: "/" }, { title: "محصولات" }];

  return (
    <>
      <div className="flex justify-between items-center px-8 py-4 ">
        <Breadcrumbs path={breadcrumbPath} />
        {/* <p className="text-text/60 text-sm">نمایش 1–20 از 373 نتیجه</p> */}
      </div>
      <div className="grid grid-cols-4 gap-8 px-8">
        <div className="col-span-1 hidden lg:block min-w-60">
          <ProductsCategoryFilter />
          <ProductsPriceFilter />
          <ProductsBrandFilter />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <ShowProducts />
        </div>
      </div>
    </>
  );
}
