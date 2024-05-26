import { TicketDiscount } from "../Svgs/Svgs";

export default function OrderBox({ img, name, price, count, discount }) {
  return (
    <>
      <img src={img} alt="Image-Product" className="w-20 mask mask-squircle" />
      <div>
        <p className=" text-sm text-justify mb-4">{name}</p>
        <p className="text-xs mb-2">
          <span>{count.toLocaleString("fa")} عدد</span>
          <span> به قیمت {price.toLocaleString("fa")} تومان</span>
        </p>
        {!!discount && (
          <p className="text-xs text-error badge">
            <TicketDiscount size="10" color="error" />
            <span className="mr-1">شامل {discount.toLocaleString("fa")} تومان تخفیف</span>
          </p>
        )}
      </div>
    </>
  );
}
