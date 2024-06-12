import Benefits from "@/components/modules/Benefits/benefits";
import BrandCarosel from "@/components/modules/BrandCarosel/BrandCarosel";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "درباره ما" }];

const statistics = [
  { id: 1, title: "سفارش موفق", stat: "+۷K" },
  { id: 2, title: "رضایت مشتریان", stat: "۹۶%" },
  { id: 3, title: "اعضای تیم", stat: "۱۰" },
  { id: 4, title: "سال سابقه فعالیت", stat: "+۴۳" },
  { id: 5, title: "تنوع محصولات", stat: "+۲K" },
];

export default async function AboutUs() {
  const res = await fetch("/api/brands");
  const brands = await res.json();
  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative">
        <div className="absolute top-4 right-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">درباره ما</h1>
        <p className="text-justify mx-auto leading-loose max-w-[70rem]">
          چندین سال تیم جوان و پرتلاش TOOLSHOP در یکی از مغازه های بازار ایران به کار واردات ابزار و تجهیزات
          صنعتی مشغول بودند در همین سالها بود که ایده راه اندازی یک سایت فروش ابزار شکل گرفت.
          <br />
          <br />
          در طی 7 سال گذشته فروش آنلاین به گستردگی امروز نبود و هنوز سایت های اینترنتی امکان فروش آنلاین را
          نداشتند و زیرساخت های خرید اینترنتی با امنیت امروز فراهم نشده بود و در ابزار ایران نیز خرید محصولات
          از طریق تلفن انجام می شد اما ویژگی های منحصر به فرد ابزار ایران باعث شد که به سرعت به عنوان سایت
          مجبوب کاربران تبدیل شود.
          <br />
          <br />
          فروشگاه TOOLSHOP نماینده محصولات محک، آینهل، مجیک، رونیکس، آروا، ای المکس، آی پی ان، پوکا، جیت،
          ادون، گرتیک، باس، پی ام، تاپ گاردن، ماسوس و … می باشد. روحیه کار تیمی، همدلی، مشتری مداری، احترام و
          ارتباط نزدیک با مشتریان از استاندارد های اولیه TOOLSHOP است که توسط مدیر عامل این مجموعه به کل تیم و
          کارکنان انتقال پیدا کرده و همین استاندارد ها باعث شده تا TOOLSHOP در مشتری مداری و ارائه خدمات خود
          را از دیگر رقبا به طور کلی متمایز نماید.
        </p>
      </div>
      <Benefits />
      <div className="bg-[url('/images/bg-overlay.png')] bg-primary relative p-8 h-48  my-20 mx-8 rounded-3xl">
        <h4 className="font-bold text-4xl text-center text-primary-content drop-shadow mb-8">
          کارنامه کاری TOOLSHOP
        </h4>
        <div className="flex justify-between gap-8">
          {statistics.map((item) => {
            return (
              <div className="flex-1 h-40 bg-background flex flex-col justify-center items-center rounded-3xl shadow-xl">
                <p className="text-6xl text-primary mb-2" dir="ltr">
                  {item.stat}
                </p>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-40">
        <h4 className="text-xl font-bold text-center mb-2">برندهای موجود در TOOLSHOP</h4>
        <hr />
        <BrandCarosel brands={brands} />
      </div>
    </>
  );
}
