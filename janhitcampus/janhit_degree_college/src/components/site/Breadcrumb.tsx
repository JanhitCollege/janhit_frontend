import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
}

export function Breadcrumb({ items, title }: BreadcrumbProps) {
  return (
    <div className="bg-beige border-b border-gold/20 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-3">{title}</h1>
        )}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-navy/70">
            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-gold transition-colors font-medium">
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-gold" />
                {item.path ? (
                  <Link to={item.path} className="hover:text-gold transition-colors font-medium">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-navy font-bold">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
