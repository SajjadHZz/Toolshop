import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductsBrandFilter from "@/components/modules/ProductsBrandFilter/ProductsBrandFilter";
import ProductsCategoryFilter from "@/components/modules/ProductsCategoryFilter/ProductsCategoryFilter";
import ProductsPriceFilter from "@/components/modules/ProductsPriceFilter/ProductsPriceFilter";
import ShowProducts from "@/components/templates/ShowProducts/ShowProducts";

const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "محصولات" }];

export default async function Products() {
  return (
    <>
      <div className="flex justify-between items-center px-8 py-4">
        <Breadcrumbs path={breadcrumbPath} />
        <p className="text-text/60 text-sm">نمایش 1–20 از 373 نتیجه</p>
      </div>
      <div className="flex justify-between gap-8 px-8">
        <div className="w-1/4">
          <ProductsCategoryFilter />
          <ProductsPriceFilter />
          <ProductsBrandFilter />
        </div>
        <div className="w-3/4">
          <ShowProducts />

          <div className="text-center" dir="ltr">
            <button className="btn mr-1 px-4 py-2 rounded-xl bg-primary text-white">1</button>
            <button className="btn btn-ghost mr-1">2</button>
            <span className="mr-1">...</span>
            <button className="btn btn-ghost mr-1">6</button>
            <button className="btn btn-ghost mr-1">7</button>
          </div>
        </div>
      </div>
    </>
  );
}
