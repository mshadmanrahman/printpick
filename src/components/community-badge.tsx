import { Star, Award, Heart, Gem, Flame, Zap, Shield, Eye } from "lucide-react";
import type { CommunityBadge as BadgeType } from "@/data/printers";

const BADGE_CONFIG: Record<BadgeType, { icon: typeof Star; color: string; bg: string }> = {
  "Reddit Favorite": { icon: Flame, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  "YouTube Most Reviewed": { icon: Eye, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  "Editor's Choice": { icon: Award, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  "Best Value": { icon: Gem, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  "Best First Printer": { icon: Star, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  "Community Pick": { icon: Heart, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  "Pro Workhorse": { icon: Shield, color: "text-violet-600", bg: "bg-violet-50 border-violet-200" },
  "Hidden Gem": { icon: Zap, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" },
  "Detail King": { icon: Gem, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
};

export function CommunityBadge({ badge, compact }: { readonly badge: BadgeType; readonly compact?: boolean }) {
  const config = BADGE_CONFIG[badge];
  const Icon = config.icon;

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${config.bg} ${config.color}`}>
        <Icon className="h-2.5 w-2.5" />
        {badge}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.color}`}>
      <Icon className="h-3 w-3" />
      {badge}
    </span>
  );
}
