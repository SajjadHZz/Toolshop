import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import {
  CubesIcon,
  InfoIconFill,
  MenuBoard,
  PersonIcon,
  ShoppingCartFill,
  WalletIcon,
} from "@/components/modules/Svgs/Svgs";
import Link from "next/link";
const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "سوالات متداول" }];

const questionsLink = [
  {
    id: "1",
    title: "روند ورود و ثبت‌نام",
    icon: <PersonIcon />,
    path: "/frequently-questions",
    borderClass: "border-l border-b",
  },
  {
    id: "2",
    title: "روند ثبت و پردازش سفارش",
    icon: <MenuBoard />,
    path: "/frequently-questions",
    borderClass: "border-x border-b",
  },
  {
    id: "3",
    title: "روند پرداخت سفارش",
    icon: <WalletIcon />,
    path: "/frequently-questions",
    borderClass: "border-r border-b",
  },
  {
    id: "4",
    title: "روند ارسال سفارش",
    icon: <ShoppingCartFill />,
    path: "/frequently-questions",
    borderClass: "border-l border-t",
  },
  {
    id: "5",
    title: "روند مرجوعی سفارش",
    icon: <CubesIcon />,
    path: "/frequently-questions",
    borderClass: "border-x border-t",
  },
  {
    id: "6",
    title: "سوالات عمومی",
    icon: <InfoIconFill />,
    path: "/frequently-questions",
    borderClass: "border-r border-t",
  },
];

export default function FrequentlyQuestions() {
  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative">
        <div className="absolute top-4 right-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">سوالات متداول</h1>
        <p className="text-center max-w-[50rem] mx-auto leading-loose">
          درصورتی که در مورد هر یک از بخش های TOOLSHOP سوالی دارید ابتدا سوالات متداول را بخوانید.
          <br /> درصورتی که پاسخ سوال خود را نیافتید میتوانید از پنل کاربری خود تیکت ثبت کرده یا با شماره
          پشتیبانی تماس برقرار نمایید.
        </p>
      </div>
      <div className="grid grid-cols-3 max-w-[60rem] mx-auto mt-8">
        {questionsLink.map((item) => {
          return (
            <div key={item.id} className={" py-4 border-solid border-text/20 " + item.borderClass}>
              <Link href={item.path} className="flex flex-col items-center gap-4">
                {item.icon}
                <p className="hover:text-primary">{item.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
