import Link from "next/link";

export default async function ProductsBrandFilter() {
  const brands = await fetchBrands();
  return (
    <div className="bg-background rounded-3xl py-4 px-2">
      <h4 className="text-2xl font-bold mb-4">فیلتر براساس برند</h4>
      <hr />

      <ul>
        {brands.map((brand) => {
          return (
            <li className="flex justify-between items-center my-2 px-2 transition-colors hover:bg-base-200">
              <Link href={`/products?brand=${brand.name}`} className="flex-1">
                <img
                  className="w-20 h-10 object-contain inline-block mx-2"
                  src={brand.img}
                  alt="Baner-Image"
                />
                <span className="text-sm font-bold text-text/60">{brand.name}</span>
              </Link>
              <span className="badge border-primary">5</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

async function fetchBrands() {
  const res = await fetch("http://localhost:3000/api/brands");
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}
