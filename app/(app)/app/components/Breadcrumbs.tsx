import Link from "next/link";
import React from "react";
interface BreadcrumbsProps {
  items: Array<{ href?: string; label: string }>;
}
function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index: number) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <a>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
