import Image from "next/image";

export default function Benefits() {
  return (
    <ul className="flex justify-center lg:justify-between items-center flex-wrap gap-4 px-2 sm:px-8 pt-16">
      <Benefit title="ارسال رایگان سفارشات" subTitle="خرید بالای دو میلیون" icon="/images/Delivery.svg" />
      <Benefit title="ضمانت بازگشت کالا" subTitle="تا 30 روز پس از خرید" icon="/images/Free-Return.svg" />
      <Benefit title="ضمانت اصالت کالا" subTitle="ابزار آلات اصیل و معتبر" icon="/images/Warranty.svg" />
      <Benefit title="مشاوره تخصصی رایگان" subTitle="خرید آگاهانه ابزار آلات" icon="/images/Support.svg" />
      <Benefit title="روش های پرداخت متنوع" subTitle="کلیه کارت های عضو شتاب" icon="/images/Payment.svg" />
    </ul>
  );
}

function Benefit({ title, subTitle, icon }) {
  return (
    <li className="flex items-center gap-2">
      <Image className="w-12" width={60} height={60} alt="" src={icon} />
      <div>
        <p className="font-bold text-sm leading-8">{title}</p>
        <p className="opacity-80 text-xs">{subTitle}</p>
      </div>
    </li>
  );
}
