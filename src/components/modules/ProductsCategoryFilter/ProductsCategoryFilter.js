import Link from "next/link";

export default async function ProductsCategoryFilter() {
  const category = await fetchCategries();
  return (
    <div className="bg-background rounded-3xl p-4 mb-4">
      <h4 className="text-2xl font-bold mb-4">دسته‌بندی محصولات</h4>
      <hr />
      <div className="join join-vertical w-full">
        {category.map((item) => {
          return (
            <div key={item._id} className="collapse collapse-arrow join-item">
              <input type="radio" name="category-accordion" />
              <h4 className="collapse-title">{item.name}</h4>
              <ul className="collapse-content">
                {item.subs.map((sub) => {
                  return (
                    <li key={sub._id}>
                      <Link
                        href={`/products?category=${sub}`}
                        className="border-r-2 border-solid border-black/20 px-4 py-1 flex justify-between items-center cursor-pointer transition-colors hover:text-accent"
                      >
                        {sub}
                        <span className="text-xs badge border-primary">5</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function fetchCategries() {
  const res = await fetch("http://localhost:3000/api/categories");
  return res.json();
}
