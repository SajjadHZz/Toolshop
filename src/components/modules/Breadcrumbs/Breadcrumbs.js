import Link from "next/link";

export default function Breadcrumbs({ path }) {
  return (
    <div className="text-sm breadcrumbs [&::-webkit-scrollbar]:hidden">
      <ul>
        {path.map(({ title, href }, index) => {
          if (href) {
            return (
              <li key={index} className="text-text/60">
                <Link href={href}>{title}</Link>
              </li>
            );
          } else {
            return <li key={index}>{title}</li>;
          }
        })}
      </ul>
    </div>
  );
}
