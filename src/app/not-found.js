import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "سیاست حفظ حریم خصوصی" }];

export default function NotFound() {
  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative mb-8 h-[25rem]">
        <Image
          width="625"
          height="464"
          src="/images/404.png"
          className="absolute top-20 left-1/2 -translate-x-1/2 -z-[1]"
        />
        <h1 className="font-Lalezar text-6xl text-center mb-8">صفحه مورد نظر شما یافت نشد</h1>
        <p className="text-center mx-auto leading-loose mb-20">
          ممکن است لینکی که وارد کرده اید اشتباه باشد یا آدرس صفحه تغییر کرده باشد. لطفا لینک را بررسی کرده و
          مجددا امتحان کنید یا به صفحه اصلی وبسایت مراجعه کنید.
        </p>
        <div className="mx-auto w-fit">
          <Link href="/" scroll={true} className="btn btn-primary px-20">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </>
  );
}
