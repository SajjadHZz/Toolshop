import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import {
  AparatIcon,
  EtaIcon,
  InstagramIcon,
  RobikaIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/modules/Svgs/Svgs";
const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "تماس با ما" }];
const socialSize = 60;

export default function ContactUs() {
  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative mb-8">
        <div className="absolute top-4 right-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">تماس با ما</h1>
        <p className="text-center mx-auto leading-loose">
          برای تماس با پشتیبانان TOOLSHOP می توانید از راه های ارتباطی زیر استفاده کنید تا در اسرع وقت به
          درخواست شما رسیدگی شود.
        </p>
      </div>
      <div className="flex justify-between items-stretch gap-10 mx-auto mb-16 px-8 ">
        <div className="relative flex-1 bg-background p-4 text-center rounded-xl border border-solid border-black">
          <svg width="50" height="50" viewBox="0 0 54 53" fill="none" className="absolute -top-4 -right-4">
            <circle cx="26.6357" cy="26.5" r="26" fill="#FFBF00" stroke="black" />
            <path
              d="M41.1357 35.862C41.1357 36.366 41.0236 36.884 40.7852 37.388C40.5469 37.892 40.2384 38.368 39.8318 38.816C39.1448 39.572 38.3876 40.118 37.5323 40.468C36.6911 40.818 35.7797 41 34.7982 41C33.3681 41 31.8398 40.664 30.2274 39.978C28.615 39.292 27.0025 38.368 25.4041 37.206C23.7917 36.03 22.2634 34.728 20.8052 33.286C19.3611 31.83 18.0571 30.304 16.8934 28.708C15.7437 27.112 14.8183 25.516 14.1453 23.934C13.4722 22.338 13.1357 20.812 13.1357 19.356C13.1357 18.404 13.304 17.494 13.6405 16.654C13.977 15.8 14.5098 15.016 15.2529 14.316C16.1503 13.434 17.1317 13 18.1693 13C18.5619 13 18.9545 13.084 19.305 13.252C19.6695 13.42 19.992 13.672 20.2444 14.036L23.4973 18.614C23.7497 18.964 23.9319 19.286 24.0581 19.594C24.1843 19.888 24.2544 20.182 24.2544 20.448C24.2544 20.784 24.1563 21.12 23.96 21.442C23.7777 21.764 23.5113 22.1 23.1748 22.436L22.1092 23.542C21.955 23.696 21.8849 23.878 21.8849 24.102C21.8849 24.214 21.8989 24.312 21.9269 24.424C21.969 24.536 22.0111 24.62 22.0391 24.704C22.2915 25.166 22.7261 25.768 23.3431 26.496C23.974 27.224 24.647 27.966 25.3761 28.708C26.1332 29.45 26.8623 30.136 27.6054 30.766C28.3345 31.382 28.9374 31.802 29.4142 32.054C29.4843 32.082 29.5684 32.124 29.6665 32.166C29.7787 32.208 29.8909 32.222 30.0171 32.222C30.2554 32.222 30.4377 32.138 30.5919 31.984L31.6575 30.934C32.0081 30.584 32.3446 30.318 32.667 30.15C32.9895 29.954 33.312 29.856 33.6625 29.856C33.9289 29.856 34.2094 29.912 34.5178 30.038C34.8263 30.164 35.1488 30.346 35.4993 30.584L40.1402 33.874C40.5048 34.126 40.7572 34.42 40.9114 34.77C41.0516 35.12 41.1357 35.47 41.1357 35.862Z"
              fill="white"
              stroke="black"
              strokeMiterlimit="10"
            />
          </svg>

          <p className="font-bold text-xl">شماره تماس</p>
          <hr className="my-4" />
          <p>
            <span>امور مشتریان : </span>
            <span dir="ltr">۰۹۰۲ ۶۰۴ ۳۵۸۰</span>
          </p>
        </div>
        <div className="relative flex-1 bg-background p-4 text-center rounded-xl border border-solid border-black">
          <svg width="50" height="50" viewBox="0 0 53 53" fill="none" className="absolute -top-4 -right-4">
            <circle cx="26.5" cy="26.5" r="26" fill="#FFBF00" stroke="black" />
            <path
              d="M14.3519 22.0883C17.2077 9.96124 35.8068 9.97525 38.6481 22.1023C40.3152 29.2161 35.7343 35.2376 31.7188 38.9625C28.805 41.6792 24.1951 41.6792 21.2668 38.9625C17.2657 35.2376 12.6848 29.2021 14.3519 22.0883Z"
              fill="white"
              stroke="black"
            />
            <path
              d="M26.5 29C28.9853 29 31 26.9853 31 24.5C31 22.0147 28.9853 20 26.5 20C24.0147 20 22 22.0147 22 24.5C22 26.9853 24.0147 29 26.5 29Z"
              fill="#FFBF00"
              stroke="black"
            />
          </svg>

          <p className="font-bold text-xl">آدرس</p>
          <hr className="my-4" />
          <p>کاشان ، خ طالقانی ، ابزارالات TOOLSHOP</p>
        </div>
        <div className="relative flex-1 bg-background p-4 text-center rounded-xl border border-solid border-black">
          <svg width="50" height="50" viewBox="0 0 52 52" fill="none" className="absolute -top-4 -right-4">
            <path
              d="M51 26C51 39.8 39.8 51 26 51C12.2 51 1 39.8 1 26C1 12.2 12.2 1 26 1C39.8 1 51 12.2 51 26Z"
              fill="#FFBF00"
              stroke="#292D32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33.6255 34.3298L33.6151 34.323L33.6044 34.3167L26.3772 30.0802C26.3771 30.0802 26.377 30.0801 26.377 30.0801C24.7327 29.1151 23.5 26.9651 23.5 25.1069V15.7176C23.5 15.0632 24.0604 14.5 24.7486 14.5C25.4368 14.5 25.9971 15.0632 25.9971 15.7176V25.1069C25.9971 25.6396 26.215 26.2372 26.5045 26.7372C26.7934 27.2362 27.2032 27.7234 27.6688 27.99L34.8939 32.2252L34.8939 32.2253L34.8982 32.2277C35.4851 32.564 35.6734 33.2996 35.3269 33.8908C35.0696 34.2903 34.6491 34.5 34.2375 34.5C34.0125 34.5 33.8091 34.45 33.6255 34.3298Z"
              fill="white"
              stroke="black"
            />
          </svg>

          <p className="font-bold text-xl">ساعات کاری</p>
          <hr className="my-4" />
          <p>هر روز هفته همکاران ما برای رضایت بیشتر شما همراهان عزیز در خدمت شما هستند.</p>
        </div>
      </div>
      <div className="bg-background p-8 flex justify-between gap-8 mx-8 rounded-3xl">
        <div className="flex-1">
          <h5 className="font-bold text-xl mb-2">همراه با TOOLSHOP</h5>
          <p className="text-sm">
            از طریق لینک های زیر میتوانید با ما در ارتباط باشید و یا ما را در شبکه های اجتماعی دنبال کنید.
          </p>
        </div>

        <EtaIcon socialSize={socialSize} />
        <RobikaIcon socialSize={socialSize} />
        <WhatsappIcon socialSize={socialSize} />
        <TelegramIcon socialSize={socialSize} />
        <InstagramIcon socialSize={socialSize} />
        <AparatIcon socialSize={socialSize} />
      </div>
    </>
  );
}
