export default function OrderBox({ img, name, price, count }) {
  return (
    <div className="border border-solid border-text/20 w-fit p-4 rounded-3xl">
      <img src={img} alt="" className="w-52 mx-auto mb-4" />
      <p className="w-60 text-justify mb-4">{name}</p>
      <p className="text-sm">
        <span>{count.toLocaleString("fa")} عدد</span>
        <span>به قیمت {price.toLocaleString("fa")} تومان</span>
      </p>
    </div>
  );
}
