import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductCounter from "@/components/modules/ProductCounter/ProductCounter";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import ProductImages from "@/components/templates/ProductImages/ProductImages";
import { discountCalculate } from "@/utils/calculates";
import Image from "next/image";

export default async function DetailProducts({ params }) {
  const product = await fetchProducts(params.productName);

  const breadcrumbPath = [
    { title: "خانه", href: "/" },
    { title: "محصولات", href: "/products" },
    { title: product.category.main, href: `/products?category=${product.category.main}` },
    { title: product.category.sub, href: `/products?category=${product.category.sub}` },
    { title: product.name },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-2 lg:mx-8 my-4">
        <Breadcrumbs path={breadcrumbPath} />
      </div>
      {/* End Breadcrumbs */}

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-2 lg:mx-8 my-4 p-2 lg:p-8 bg-background rounded-3xl border border-solid border-text/20">
        {/* Product Images */}
        <div className="col-span-1">
          <ProductImages img={product.img} />
        </div>
        {/* End Product Images */}

        {/* Product Content */}
        <div className="col-span-1 lg:col-span-2">
          {/* Product Title */}
          <div className="flex justify-between items-center">
            <h1 className="font-Lalezar text-xl lg:text-2xl">{product.name}</h1>
            <img src={product.brand.img} alt="Product-Image" className="w-40 h-14 object-contain" />
          </div>
          {/* End Product Title */}

          <hr />

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Right Content */}
            <div className="col-span-1">
              {/* Product Attributes */}
              <div>
                <h4 className="font-bold mb-2">ویژگی های محصول :</h4>
                <ul className="list-disc text-text/60 mr-8 mb-4 leading-loose text-sm">
                  {product.attributes.length ? (
                    product.attributes.map((item, index) => {
                      return <li key={"attributes_product_" + index + item}>{item}</li>;
                    })
                  ) : (
                    <li>ویژگی برای محصول درج نشده است</li>
                  )}
                </ul>
              </div>
              {/* End Product Attributes */}

              <hr />

              {/* Product Labels */}
              <div className="text-xs py-2 mb-4">
                <h6 className="font-bold inline-block mx-2">برچسب :</h6>
                {!!product.labels.length ? (
                  [product.labels.join(" ، ")].map((item, index) => {
                    return (
                      <span key={item + index} className="text-text/60">
                        {item}
                      </span>
                    );
                  })
                ) : (
                  <span>برچسبی برای محصول وجود ندارد.</span>
                )}
              </div>
              {/* End Product Labels */}

              {/* Free Delivery */}
              <div className="shadow border border-solid border-text/20 p-2 rounded-lg flex justify-between items-center">
                <div>
                  <div className="mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary inline-block"
                    >
                      <path d="M14.5401 1.88C13.3101 1.88 12.3101 2.87999 12.3101 4.10999V8.75C12.3101 9.98 13.3101 10.98 14.5401 10.98C15.7701 10.98 16.7701 9.98 16.7701 8.75V4.10999C16.7701 2.88999 15.7701 1.88 14.5401 1.88Z" />
                      <path d="M20.18 7.10999C19.11 7.10999 18.24 7.97999 18.24 9.04999V10.62C18.24 10.83 18.41 11 18.62 11H20.19C21.26 11 22.13 10.13 22.13 9.06C22.13 7.99 21.25 7.10999 20.18 7.10999Z" />
                      <path d="M8.49988 6.98999H3.85988C2.62988 6.98999 1.62988 7.99 1.62988 9.22C1.62988 10.45 2.62988 11.45 3.85988 11.45H8.49988C9.72988 11.45 10.7299 10.45 10.7299 9.22C10.7299 7.99 9.72988 6.98999 8.49988 6.98999Z" />
                      <path d="M8.79008 1.62C7.72008 1.62 6.8501 2.49 6.8501 3.56C6.8501 4.63 7.72008 5.5 8.79008 5.5H10.3601C10.5701 5.5 10.7401 5.33 10.7401 5.12V3.54999C10.7301 2.49999 9.86009 1.62 8.79008 1.62Z" />
                      <path d="M9.42995 13.03C8.19995 13.03 7.19995 14.03 7.19995 15.26V19.9C7.19995 21.13 8.19995 22.13 9.42995 22.13C10.6599 22.13 11.66 21.13 11.66 19.9V15.26C11.66 14.03 10.6599 13.03 9.42995 13.03Z" />
                      <path d="M5.36009 13.03H3.79008C2.72008 13.03 1.8501 13.9 1.8501 14.97C1.8501 16.04 2.72008 16.91 3.79008 16.91C4.86009 16.91 5.73009 16.04 5.73009 14.97V13.4C5.73009 13.2 5.56009 13.03 5.36009 13.03Z" />
                      <path d="M20.11 12.57H15.47C14.24 12.57 13.24 13.57 13.24 14.8C13.24 16.03 14.24 17.03 15.47 17.03H20.11C21.34 17.03 22.34 16.03 22.34 14.8C22.34 13.57 21.34 12.57 20.11 12.57Z" />
                      <path d="M15.18 18.47H13.61C13.4 18.47 13.23 18.64 13.23 18.85V20.42C13.23 21.49 14.1 22.36 15.17 22.36C16.24 22.36 17.11 21.49 17.11 20.42C17.12 19.34 16.25 18.47 15.18 18.47Z" />
                    </svg>
                    <h6 className="font-bold inline-block mx-1">ارسال رایگان</h6>
                  </div>
                  <p className="text-xs">ارسال سفارشات پستی بالای 5 میلیون تومان رایگان می باشد.</p>
                </div>
                <Image
                  width="100"
                  height="60"
                  src="/images/shipping_free.png"
                  alt="Shipping-Free"
                  className="flex-1 h-full bg-cover object-cover w-full"
                />
              </div>
              {/* End Free Delivery */}
            </div>
            {/* End Right Content */}

            {/* Left Content */}
            <div className="col-span-1 px-4 py-2 bg-secondary border border-solid border-black/20 rounded">
              {/* Garanty */}
              <div className="mb-4 mt-2">
                <div>
                  <svg
                    className="inline-block fill-accent"
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                  >
                    <path
                      d="M13.8099 3.49V4.23L10.2699 2.18C8.92994 1.41 7.05994 1.41 5.72994 2.18L2.18994 4.24V3.49C2.18994 1.24 3.41994 0 5.66994 0H10.3299C12.5799 0 13.8099 1.24 13.8099 3.49Z"
                      fill="#FFBF00"
                    />
                    <path
                      d="M13.84 5.97L13.7 5.9L12.34 5.12L9.52 3.49C8.66 2.99 7.34 2.99 6.48 3.49L3.66 5.11L2.3 5.91L2.12 6C0.37 7.18 0.25 7.4 0.25 9.29V13.81C0.25 15.7 0.37 15.92 2.16 17.13L6.48 19.62C6.91 19.88 7.45 19.99 8 19.99C8.54 19.99 9.09 19.87 9.52 19.62L13.88 17.1C15.64 15.92 15.75 15.71 15.75 13.81V9.29C15.75 7.4 15.63 7.18 13.84 5.97ZM10.79 11.5L10.18 12.25C10.08 12.36 10.01 12.57 10.02 12.72L10.08 13.68C10.12 14.27 9.7 14.57 9.15 14.36L8.26 14C8.12 13.95 7.89 13.95 7.75 14L6.86 14.35C6.31 14.57 5.89 14.26 5.93 13.67L5.99 12.71C6 12.56 5.93 12.35 5.83 12.24L5.21 11.5C4.83 11.05 5 10.55 5.57 10.4L6.5 10.16C6.65 10.12 6.82 9.98 6.9 9.86L7.42 9.06C7.74 8.56 8.25 8.56 8.58 9.06L9.1 9.86C9.18 9.99 9.36 10.12 9.5 10.16L10.43 10.4C11 10.55 11.17 11.05 10.79 11.5Z"
                      fill="#FFBF00"
                    />
                  </svg>
                  <h4 className="inline-block font-bold mx-2">گارانتی محصول :</h4>
                </div>
                <div className="flex justify-between my-4">
                  <span className="text-text/60">گارانتی :</span>
                  <span className="font-bold">اصالت و سلامت فیزیکی کالا</span>
                </div>
              </div>
              {/* End Garanty */}

              <hr />

              {/* Delivery */}
              <div className="my-4">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="fill-accent inline-block"
                  >
                    <path d="M21.5 15.5C21.78 15.5 22 15.72 22 16V17C22 18.66 20.66 20 19 20C19 18.35 17.65 17 16 17C14.35 17 13 18.35 13 20H11C11 18.35 9.65 17 8 17C6.35 17 5 18.35 5 20C3.34 20 2 18.66 2 17V15C2 14.45 2.45 14 3 14H12.5C13.88 14 15 12.88 15 11.5V6C15 5.45 15.45 5 16 5H16.84C17.56 5 18.22 5.39 18.58 6.01L19.22 7.13C19.31 7.29 19.19 7.5 19 7.5C17.62 7.5 16.5 8.62 16.5 10V13C16.5 14.38 17.62 15.5 19 15.5H21.5Z" />
                    <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" />
                    <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" />
                    <path d="M22 12.53V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L21.74 11.54C21.91 11.84 22 12.18 22 12.53Z" />
                    <path d="M13.08 2H5.69C3.9 2 2.4 3.28 2.07 4.98H6.44C6.82 4.98 7.12 5.29 7.12 5.67C7.12 6.05 6.82 6.35 6.44 6.35H2V7.73H4.6C4.98 7.73 5.29 8.04 5.29 8.42C5.29 8.8 4.98 9.1 4.6 9.1H2V10.48H2.77C3.15 10.48 3.46 10.79 3.46 11.17C3.46 11.55 3.15 11.85 2.77 11.85H2V12.08C2 12.63 2.45 13.08 3 13.08H12.15C13.17 13.08 14 12.25 14 11.23V2.92C14 2.41 13.59 2 13.08 2Z" />
                    <path d="M2.07 4.98H1.92H0.94C0.56 4.98 0.25 5.29 0.25 5.67C0.25 6.05 0.56 6.35 0.94 6.35H1.85H2V5.69C2 5.45 2.03 5.21 2.07 4.98Z" />
                    <path d="M1.85 7.73H0.94C0.56 7.73 0.25 8.04 0.25 8.42C0.25 8.8 0.56 9.1 0.94 9.1H1.85H2V7.73H1.85Z" />
                    <path d="M1.85 10.48H0.94C0.56 10.48 0.25 10.79 0.25 11.17C0.25 11.55 0.56 11.85 0.94 11.85H1.85H2V10.48H1.85Z" />
                  </svg>
                  <h4 className="inline-block mx-2">ارسال توسط پست و تیپاکس</h4>
                </div>
                <ul className="list-inside list-disc text-sm text-primary my-4">
                  <li className="my-2">
                    <span className="text-primary ml-2">ارسال به تمام نقاط کشور : </span>
                    <span className="font-bold text-text/60">بین 3 تا 5 روز کاری</span>
                  </li>
                  <li className="my-2">
                    <span className="text-primary ml-2">ارسال در کاشان : </span>
                    <span className="font-bold text-text/60">ارسال فوری</span>
                  </li>
                </ul>
              </div>
              {/* End Delivery */}

              <hr />

              {/* Product Price */}
              <div className="flex justify-center items-cente my-4 text-center bg-secondary rounded-xl divide-x-2 divide-solid divide-base-300 divide-x-reverse">
                <div className="w-1/2 px-2">
                  <h5 className="text-lg font-bold mb-4">قیمت تک</h5>
                  {!!product.discount && (
                    <del className="text-text/40">{product.price.toLocaleString("fa")} تومان</del>
                  )}
                  <p className="font-bold text-primary text-xl mt-1 mb-4">
                    {discountCalculate(product.price, product.discount).toLocaleString("fa")} تومان
                  </p>
                </div>

                {!!product.wholesale.price && (
                  <div className="w-1/2 px-2 min-w-fit">
                    <h5 className="text-lg font-bold mb-4">
                      قیمت عمده{" "}
                      <span className="text-sm font-normal">
                        ({product.wholesale.number.toLocaleString("fa")} عدد به بالا)
                      </span>
                    </h5>
                    {!!product.discount && (
                      <del className="text-text/40">{product.wholesale.price.toLocaleString("fa")} تومان</del>
                    )}
                    <p className="font-bold text-primary text-xl mt-1 mb-4">
                      {discountCalculate(product.wholesale.price, product.discount).toLocaleString("fa")}{" "}
                      تومان
                    </p>
                  </div>
                )}
              </div>
              {/* End Product Price */}

              {/* Add To Basket */}
              <div className="flex gap-4">
                <ProductCounter {...product} />
              </div>
              {/* End Add To Basket */}
            </div>
            {/* End Left Content */}
          </div>
          {/* End Content */}
        </div>
        {/* End Product Content */}
      </main>
      {/* End Main Content */}

      {/* Product Descriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-8 px-2 lg:px-8 py-4 my-4">
        <div className="col-span-2 h-fit p-8 bg-background border-2 border-solid border-text/10 rounded-3xl">
          <div className="mb-8">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary inline-block"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM16.6667 8.33333C16.6667 9.25381 15.9205 10 15 10C14.0795 10 13.3333 9.25381 13.3333 8.33333C13.3333 7.41286 14.0795 6.66667 15 6.66667C15.9205 6.66667 16.6667 7.41286 16.6667 8.33333ZM16 23.3333V13.3333H14V23.3333H16Z"
              />
            </svg>

            <h3 className="font-bold inline-block mx-2">توضیحات محصول</h3>
          </div>
          {product.describtion ? (
            <div dangerouslySetInnerHTML={{ __html: product.describtion }}></div>
          ) : (
            <p className="text-sm text-center">برای این محصول توضیحاتی درج نشده است</p>
          )}
        </div>
        <div className="col-span-1 h-fit p-8 bg-background border-2 border-solid border-text/10 rounded-3xl">
          <div className="mb-8">
            <svg
              className="fill-primary inline-block"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.6666 0.583313H8.33325C3.16659 0.583313 0.583252 3.16665 0.583252 8.33331V25.125C0.583252 25.8354 1.1645 26.4166 1.87492 26.4166H18.6666C23.8333 26.4166 26.4166 23.8333 26.4166 18.6666V8.33331C26.4166 3.16665 23.8333 0.583313 18.6666 0.583313ZM16.0833 17.6979H7.04159C6.512 17.6979 6.07284 17.2587 6.07284 16.7291C6.07284 16.1996 6.512 15.7604 7.04159 15.7604H16.0833C16.6128 15.7604 17.052 16.1996 17.052 16.7291C17.052 17.2587 16.6128 17.6979 16.0833 17.6979ZM19.9583 11.2396H7.04159C6.512 11.2396 6.07284 10.8004 6.07284 10.2708C6.07284 9.74123 6.512 9.30206 7.04159 9.30206H19.9583C20.4878 9.30206 20.927 9.74123 20.927 10.2708C20.927 10.8004 20.4878 11.2396 19.9583 11.2396Z" />
            </svg>

            <h3 className="font-bold inline-block mx-2">مشخصات محصول</h3>
          </div>
          <ul className="divide-y divide-solid divide-base-300">
            {product.specifications?.length ? (
              product.specifications.map((item) => {
                return (
                  <li key={item._id} className="flex justify-between items-center py-4">
                    <p>{item.key} : </p>
                    <p className="font-bold">{item.value}</p>
                  </li>
                );
              })
            ) : (
              <li className="text-sm text-center">مشخصاتی برای محصول درج نشده است</li>
            )}
          </ul>
        </div>
      </div>
      {/* End Product Descriptions */}

      <ProductsSlider title="محصولات مرتبط" route="/" />
    </>
  );
}

async function fetchProducts(product) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${product}`, { cache: "no-store" });
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}
