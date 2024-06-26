import Image from "next/image";

function ArticleBox() {
  return (
    <section className="px-2 sm:px-8 py-4 my-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xl sm:text-2xl font-bold">آخرین مقالات</h4>
        <a href="#" className="btn btn-primary btn-sm sm:btn-md">
          مشاهده همه
        </a>
      </div>
      <ul className="my-4 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4">
        <li className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <Image
            className="w-full brightness-50 transition-transform group-hover:scale-110"
            width="400"
            height="400"
            src="/images/Article_Image.jpg"
            alt="Category-Baner"
          />

          <p className="absolute bottom-6 right-0 px-2 text-white">
            هر آنچه که لازم است درباره مینی فرز بدانید.
          </p>
        </li>
        <li className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <Image
            className="w-full brightness-50 transition-transform group-hover:scale-110"
            width="400"
            height="400"
            src="/images/Article_Image.jpg"
            alt="Category-Baner"
          />

          <p className="absolute bottom-6 right-0 px-2 text-white">
            هر آنچه که لازم است درباره مینی فرز بدانید.
          </p>
        </li>
        <li className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <Image
            className="w-full brightness-50 transition-transform group-hover:scale-110"
            width="400"
            height="400"
            src="/images/Article_Image.jpg"
            alt="Category-Baner"
          />

          <p className="absolute bottom-6 right-0 px-2 text-white">
            هر آنچه که لازم است درباره مینی فرز بدانید.
          </p>
        </li>
        <li className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <Image
            className="w-full brightness-50 transition-transform group-hover:scale-110"
            width="400"
            height="400"
            src="/images/Article_Image.jpg"
            alt="Category-Baner"
          />

          <p className="absolute bottom-6 right-0 px-2 text-white">
            هر آنچه که لازم است درباره مینی فرز بدانید.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default ArticleBox;
