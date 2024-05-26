import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import UsernameEmail from "@/components/templates/UsernameEmail/UsernameEmail";
import PanelMenu from "@/components/templates/PanelMenu/PanelMenu";

const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "داشبورد" }];

export default async function PanelLayout({ children }) {
  return (
    <>
      <div className="mx-10 my-4">
        <Breadcrumbs path={breadcrumbPath} />
      </div>

      <div className="flex gap-8 mx-8 my-4 ">
        {/* Sidebar Menu */}
        <div className="bg-background w-1/3 h-fit max-w-[350px] rounded-3xl overflow-hidden">
          <div className="flex gap-4 items-center bg-accent/80 px-4 pt-4 rounded-t">
            <div className="w-20 h-20 rounded-full bg-gray-400 p-4 border-2 border-solid border-gray-300">
              <svg viewBox="0 0 16 20" fill="none" className="w-full h-full fill-secondary">
                <path d="M8.00003 0C5.38003 0 3.25003 2.13 3.25003 4.75C3.25003 7.32 5.26003 9.4 7.88003 9.49C7.96003 9.48 8.04003 9.48 8.10003 9.49C8.12003 9.49 8.13003 9.49 8.15003 9.49C8.16003 9.49 8.16003 9.49 8.17003 9.49C10.73 9.4 12.74 7.32 12.75 4.75C12.75 2.13 10.62 0 8.00003 0Z" />
                <path d="M13.08 12.15C10.29 10.29 5.74002 10.29 2.93002 12.15C1.66002 13 0.960022 14.15 0.960022 15.38C0.960022 16.61 1.66002 17.75 2.92002 18.59C4.32002 19.53 6.16002 20 8.00002 20C9.84002 20 11.68 19.53 13.08 18.59C14.34 17.74 15.04 16.6 15.04 15.36C15.03 14.13 14.34 12.99 13.08 12.15Z" />
              </svg>
            </div>

            <div>
              <UsernameEmail />
            </div>
          </div>
          <svg viewBox="0 50 1440 300" className="fill-accent/80">
            <path
              d="M 0,400 L 0,150 C 126.53333333333336,172 253.06666666666672,194 431,185 C 608.9333333333333,176 838.2666666666667,136.00000000000003 1015,150 C 1191.7333333333333,163.99999999999997 1315.8666666666668,232 1440,300 L 1440,400 L 0,400 Z"
              transform="rotate(-180 720 200)"
            ></path>
          </svg>
          <PanelMenu />
        </div>

        {/* Main Content */}
        {children}
      </div>
    </>
  );
}
