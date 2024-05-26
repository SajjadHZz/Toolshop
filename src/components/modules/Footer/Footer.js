import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <>
      <svg
        className="w-full mt-8 -mb-1 fill-primary"
        width="1440"
        height="50"
        viewBox="0 0 1440 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M720 48.5005C182.448 48.1505 1.152 9.90049 0 0.000488281V50.0005H1440V0.500488C1440 9.70049 1257.55 48.9005 720 48.5005Z" />
      </svg>
      <footer className="bg-primary px-8 py-4 text-background">
        <div className="flex justify-between gap-8 my-8">
          <div className="w-2/3">
            <h4 className="text-4xl font-Lalezar mb-8">فروشگاه اینترنتی TOOLSHOP</h4>
            <p className="text-justify leading-relaxed">
              فـروشـگاه اینترنتی TOOLSHOP افتخار دارد با حدود نیم قرن تجربه در زمینه فروش ابزارآلات در خدمت
              شما هموطنان گـرامی باشد.
              <br />
              <br />
              این مجموعه مشاور و مجـری تخصصی تجهیز کارگاه های صنعتـی، تـجاری و ابزار آلات در زمینه های
              ساختمانی ، نجاری ، تعمیرگـاهی و خانگی می باشد. TOOLSHOP نماینده بسیاری از برندهای مطرح ابزار از
              جمله محصولات محک ، آینهل ، مجیک ، رونیکس ،  آروا ، بوش ، دیوالت ، ماکیتا و… می باشد.
            </p>
          </div>
          <div className="w-1/3">
            <h4 className="text-4xl font-Lalezar mb-8">نمادهای اعتماد</h4>
            <div className="flex items-stretch justify-center gap-2">
              <div className="w-40 p-4 bg-background rounded-xl">
                <Image
                  width="100"
                  height="100"
                  src="/images/Licenses/enamad.png"
                  alt="Enamad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-40 p-4 bg-background rounded-xl">
                <Image
                  width="100"
                  height="100"
                  src="/images/Licenses/namad-etehadieh.png"
                  alt="Namad-Etehadieh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-40 p-4 bg-background rounded-xl">
                <Image
                  width="100"
                  height="100"
                  src="/images/Licenses/samandehi.png"
                  alt="Samandehi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="text-text bg-background flex justify-center items-center py-4 rounded-xl divide-x divide-solid divide-black/20 divide-x-reverse">
          <li className="px-4 cursor-pointer transition-colors hover:text-primary">
            <Link scroll={true} href="/">
              خانه
            </Link>
          </li>
          <li className="px-4 cursor-pointer transition-colors hover:text-primary">
            <Link scroll={true} href="/about">
              درباره ما
            </Link>
          </li>
          <li className="px-4 cursor-pointer transition-colors hover:text-primary">
            <Link scroll={true} href="/contact-us">
              تماس با ما
            </Link>
          </li>
          <li className="px-4 cursor-pointer transition-colors hover:text-primary">
            <Link scroll={true} href="/frequently-questions">
              سوالات متداول
            </Link>
          </li>
          <li className="px-4 cursor-pointer transition-colors hover:text-primary">
            <Link scroll={true} href="/privacy-policy">
              سیاست حفظ حریم خصوصی
            </Link>
          </li>
        </ul>

        <div className="flex justify-between items-center text-xl mt-8 mb-4 ">
          <p className="">آدرس : کاشان، خ طالقانی، ابزارالات TOOLSHOP</p>
          <p className="">
            شماره تماس : <span dir="ltr">0902 604 3580</span>
          </p>
          <p className="">ایمیل : Sajadhz1381@gmail.com</p>
        </div>
      </footer>
      <div className="flex justify-between items-center bg-accent text-text text-xs w-full px-8 py-4">
        <p>
          تمامی حقوق برای ابزار فروشی <span className="font-bold underline underline-offset-4">TOOLSHOP</span>
           محفوظ است
        </p>
        <p>
          طراحی و پیاده سازی با ❤ توسط{" "}
          <span className="font-bold underline underline-offset-4">سجاد حسین زاده</span>
        </p>
      </div>
    </>
  );
}

export default Footer;
