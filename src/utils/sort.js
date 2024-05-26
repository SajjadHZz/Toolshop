export const latestProducts = "LATEST_PRODUCTS";
export const bestSellingProducts = "BEST_SELLING_PRODUCTS";
export const cheapestProducts = "CHEAPEST_PRODUCTS";
export const expensiveProducts = "EXPENSIVE_PRODUCTS";
export const oldestProducts = "OLDEST_PRODUCTS";

export function ToastAlert({ title, status, icon }) {
  return (
    <div role="alert" className={`alert alert-${status} text-white text-sm w-fit animate-fade-in`}>
      {icon}
      <span>{title}</span>
    </div>
  );
}
