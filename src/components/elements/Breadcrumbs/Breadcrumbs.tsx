import { Link } from '@/lib/router';
import type { BreadcrumbItem } from '@/lib/routes';

interface BreadcrumbsProps {
    /** Full trail including the current page as the last item. */
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD emitted by the
 * same page, so the markup and the structured data always agree.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    if (items.length < 2) {
        return null;
    }

    return (
        <nav aria-label="Навігаційний ланцюжок" className={className}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;

                    return (
                        <li key={item.path} className="flex items-center gap-2">
                            {isCurrent ? (
                                <span aria-current="page" className="opacity-80">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="underline-offset-4 transition-opacity hover:underline hover:opacity-100 opacity-80"
                                >
                                    {item.name}
                                </Link>
                            )}
                            {!isCurrent && (
                                <span aria-hidden className="opacity-50">
                                    /
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
