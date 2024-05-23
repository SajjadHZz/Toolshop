// "use client";
// import { usePathname, useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function Breadcrumbs({ path }) {
  // const pathname = usePathname();
  // const router = useRouter();
  // const params = useParams();
  // const search = useSearchParams();
  // console.log("pathname:", pathname);
  // console.log("router:", router);
  // console.log("params:", params);
  // console.log("search:", search.get("category"));
  // if()
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {path.map(({ title, href }, index) => {
          if (href) {
            return (
              <li key={index} className="text-text/60">
                <Link href={href}>{title}</Link>
              </li>
            );
          } else {
            return (
              <li key={index} className="">
                {title}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
