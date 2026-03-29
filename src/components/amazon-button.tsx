import { getAmazonUrl } from "@/data/printers";
import { cn } from "@/lib/utils";

interface AmazonButtonProps {
  readonly asin: string;
  readonly label?: string;
  readonly className?: string;
}

export function AmazonButton({ asin, label = "Check Price on Amazon", className }: AmazonButtonProps) {
  return (
    <a
      href={getAmazonUrl(asin)}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-[#FF9900] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#e68a00]",
        className,
      )}
    >
      {label}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}
