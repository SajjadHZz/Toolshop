import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import SigninForm from "@/components/templates/SignupForm/SignupForm";

import "./globals.css";
import ReduxProvider from "@/redux/provider";
import QuicklyAccessProducts from "@/components/templates/QuicklyAccessProducts/QuicklyAccessProducts";
import { Toaster } from "react-hot-toast";
import SearchBoxNav from "@/components/templates/SearchBoxNav/SearchBoxNav";

export const metadata = {
  title: "ToolShop | فروشگاه ابزار",
  description: "Tool For All",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="bg-secondary">
      <body className="font-IranSans font-light">
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />

          {/* Signin Modal */}
          <input type="checkbox" id="signin-modal" className="modal-toggle" />
          <div className="modal" role="dialog">
            <label className="modal-backdrop" htmlFor="signin-modal">
              Close
            </label>
            <div className="modal-box">
              <label htmlFor="signin-modal" className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                ✕
              </label>
              <h4 className="text-4xl font-Lalezar">عضویت</h4>

              <SigninForm />
            </div>
          </div>

          {/* Search Modal */}
          <input type="checkbox" id="search-navbar-modal" className="modal-toggle" />
          <div className="modal" role="dialog">
            <label className="modal-backdrop" htmlFor="search-navbar-modal">
              Close
            </label>
            <div className="modal-box overflow-visible">
              <SearchBoxNav modal="true" />
            </div>
          </div>

          <QuicklyAccessProducts />
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
