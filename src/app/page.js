import Benefits from "@/components/modules/Benefits/benefits";
import BrandCarosel from "@/components/modules/BrandCarosel/BrandCarosel";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import ArticleBox from "@/components/templates/ArticleBox/ArticleBox";
import HomeCarousel from "@/components/templates/HomeCarousel/HomeCarousel";
import SpecialProposal from "@/components/templates/SpecialProposal/SpecialProposal";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const brands = await fetchBrands();
  const categories = await fetchCategries();

  return (
    <>
      <section className="px-8 py-4">
        <HomeCarousel />
        <div className="bg-background rounded-3xl px-4 py-8 -mt-20 z-[1] mx-20 relative">
          <h4 className="text-3xl text-center mb-8 font-Lalezar">دسته‌بندی محصولات</h4>
          <ul className="flex justify-between items-center">
            {categories.map((item) => {
              return (
                <Link href={`/products?category=${item.name}`} key={item._id}>
                  <li className="text-center bg-accent/20 rounded-full">
                    <img className="w-28" src={item.img} alt="Product-Category" />
                    <p className="mt-4">{item.name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
      <SpecialProposal />
      <ul className="w-full my-8 px-8 flex justify-between items-center gap-4">
        <li className="w-1/2">
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
        <li className="w-1/2">
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
      <ProductsSlider title="پرفروش ترین ها" />
      <ProductsSlider title="جدیدترین محصولات" />
      <ul className="w-full my-8 px-8 flex justify-between items-center gap-4">
        <li className="w-1/4">
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_1.jpg"
            alt="Category-Image"
          />
        </li>
        <li className="w-1/4">
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_2.jpg"
            alt="Category-Image"
          />
        </li>
        <li className="w-1/4">
          <Image
            className="w-full rounded-xl cursor-pointer"
            width="380"
            height="160"
            src="/images/Categor_Image_3.jpg"
            alt="Category-Image"
          />
        </li>
        <li className="w-1/4">
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
      <section className="flex items-center justify-between bg-background mx-8 rounded-3xl overflow-hidden">
        <div className="min-w-[350px] px-8 py-4 bg-gradient-to-l from-accent to-yellow-300">
          <h4 className="text-center text-3xl leading-loose">
            برندهای موجود در <br />
            <span className="text-primary text-5xl font-Lalezar">TOOLSHOP</span>
          </h4>
        </div>
        <BrandCarosel brands={brands} />
      </section>
      <Benefits />
    </>
  );
}

async function fetchBrands() {
  const res = await fetch("http://localhost:3000/api/brands");
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}
async function fetchCategries() {
  const res = await fetch("http://localhost:3000/api/categories");
  return res.json();
}
