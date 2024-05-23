const statBoxs = [
  { id: 1, title: "تعداد سفارش جاری", value: 2, desc: "", icon: "" },
  { id: 2, title: "تعداد تحویل سفارش", value: 9, desc: "", icon: "" },
  { id: 3, title: "سفارشات مرجوعی", value: 1, desc: "", icon: "" },
  { id: 4, title: "سفارشات لغو شده", value: 2, desc: "", icon: "" },
];

export default function AdminPanel() {
  return (
    <div className="bg-background flex-1 w-2/3">
      <h3 className="text-3xl font-bold m-4">داشبورد</h3>

      <hr />

      <div className="grid grid-cols-4 items-center gap-2 m-4">
        {statBoxs.map((item) => {
          return (
            <div
              key={item.id}
              className="stat px-4 border border-solid border-text/20 rounded-xl bg-secondary"
            >
              <div className="stat-figure ">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-8 h-8 stroke-primary"
                >
                  <path
                    d="M9.75079 17.9917C11.9599 17.9917 13.7508 16.2008 13.7508 13.9917C13.7508 11.7826 11.9599 9.9917 9.75079 9.9917C7.54165 9.9917 5.75079 11.7826 5.75079 13.9917C5.75079 16.2008 7.54165 17.9917 9.75079 17.9917Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0008 12.7417V13.6717C10.0008 14.0217 9.82079 14.3517 9.51079 14.5317L8.75079 14.9917"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.7508 20.9917H12.7508C16.7708 20.9917 17.4908 19.3817 17.7008 17.4217L18.4508 11.4217C18.7208 8.9817 18.0208 6.9917 13.7508 6.9917H5.7508C1.4808 6.9917 0.780803 8.9817 1.0508 11.4217L1.8008 17.4217C2.0108 19.3817 2.7308 20.9917 6.7508 20.9917Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.25079 6.66171V5.69171C5.25079 3.44171 7.06079 1.23171 9.31079 1.02171C11.9908 0.761708 14.2508 2.87171 14.2508 5.50171V6.88171"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-title">{item.title}</div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-desc">1.000.000 تومان خرید</div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 my-8 border border-solid border-text/20 rounded-xl">
        <h4 className="text-xl font-bold m-4">لیست سفارشات جاری</h4>
        <hr />
        <ul className="p-4">
          <li className="">سفارشی برای نمایش یافت نشد !</li>
        </ul>
      </div>

      <div className="mx-4 my-8 border border-solid border-text/20 rounded-xl">
        <h4 className="text-xl font-bold m-4">آخرین اطلاعیه ها</h4>
        <hr />
        <ul className="p-4">
          <li className="">اطلاعیه ای برای نمایش یافت نشد !</li>
        </ul>
      </div>
    </div>
  );
}
