import Benefits from "@/components/modules/Benefits/benefits";
import BrandCarosel from "@/components/modules/BrandCarosel/BrandCarosel";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import ArticleBox from "@/components/templates/ArticleBox/ArticleBox";
import HomeCarousel from "@/components/templates/HomeCarousel/HomeCarousel";
import SpecialProposal from "@/components/templates/SpecialProposal/SpecialProposal";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const brands = await fetchBrands();
  // const categories = await fetchCategries();
  const brands = [];
  const categories = [];

  return (
    <>
      <section className="px-2 sm:px-8 py-4">
        <HomeCarousel />
        <div className="bg-background rounded-3xl px-4 py-8 -mt-8 sm:-mt-20 z-[1] mx-4 sm:mx-10 relative">
          <h4 className="text-3xl text-center mb-8 font-Lalezar">دسته‌بندی محصولات</h4>
          <ul className="flex justify-center items-center flex-wrap gap-4">
            {categories.map((item) => {
              return (
                <Link href={`/products?category=${item.name}`} key={item._id}>
                  <li className="text-center bg-accent/10 rounded-full">
                    <img className="w-28 mx-auto" src={item.img} alt="Product-Category" />
                    <p className="mt-4">{item.name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
      <SpecialProposal />
      <ul className="w-full my-8 px-2 sm:px-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <li>
          <Link href="/products?category=ابزار دستی">
            <Image
              className="rounded-xl cursor-pointer"
              width="700"
              height="200"
              src="/images/Categor_Baner_1.jpg"
              alt="Category-Baner"
            />
          </Link>
        </li>
        <li>
          <Link href="/products?category=ابزار برقی و شارژی">
            <Image
              className="rounded-xl cursor-pointer"
              width="700"
              height="200"
              src="/images/Categor_Baner_2.jpg"
              alt="Category-Baner"
            />
          </Link>
        </li>
      </ul>
      <ProductsSlider title="پرفروش ترین ها" route="/seller" />
      <ProductsSlider title="جدیدترین محصولات" route="/news" />
      <ul className="w-full my-8 px-2 sm:px-8 grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-4">
        <li>
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_1.jpg"
            alt="Category-Image"
          />
        </li>
        <li>
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_2.jpg"
            alt="Category-Image"
          />
        </li>
        <li>
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_3.jpg"
            alt="Category-Image"
          />
        </li>
        <li>
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_4.jpg"
            alt="Category-Image"
          />
        </li>
      </ul>
      <ArticleBox />
      <section className="flex items-center justify-between bg-background mx-2 sm:mx-8 rounded-3xl overflow-hidden">
        <div className="lg:min-w-[350px] p-2 sm:px-8 sm:py-4 bg-gradient-to-l from-accent to-yellow-300 mx-auto">
          <h4 className="min-w-40 md:min-w-44 text-center text-xl md:text-2xl lg:text-3xl">
            <span className="leading-loose">برندهای موجود در </span>
            <span className="text-primary text-3xl md:text-4xl lg:text-5xl font-Lalezar leading-loose">
              TOOLSHOP
            </span>
          </h4>
        </div>
        <BrandCarosel brands={brands} />
      </section>
      <Benefits />
    </>
  );
}

// async function fetchBrands() {
//   const res = await fetch(`${process.env.BASE_URL}/api/brands`, {
//     next: { revalidate: 604800 /* 1 Week */ },
//   });
//   if (res.status === 200) {
//     return await res.json();
//   } else {
//     return [];
//   }
// }
// async function fetchCategries() {
//   const res = await fetch(`${process.env.BASE_URL}/api/categories`, {
//     next: { revalidate: 604600 /*1 Week */ },
//   });
//   return res.json();
// }
