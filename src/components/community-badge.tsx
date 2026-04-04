import { Star, Award, Heart, Gem, Flame, Zap, Shield, Eye } from "lucide-react";
import type { CommunityBadge as BadgeType } from "@/data/printers";

const BADGE_CONFIG: Record<BadgeType, { icon: typeof Star; color: string; bg: string }> = {
  "Reddit Favorite":        { icon: Flame,  color: "text-primary",     bg: "bg-primary/10 border-primary/25" },
  "YouTube Most Reviewed":  { icon: Eye,    color: "text-primary",     bg: "bg-primary/10 border-primary/25" },
  "Editor's Choice":        { icon: Award,  color: "text-amber-400",   bg: "bg-amber-950/40 border-amber-500/30" },
  "Best Value":             { icon: Gem,    color: "text-emerald-400", bg: "bg-emerald-950/40 border-emerald-500/30" },
  "Best First Printer":     { icon: Star,   color: "text-primary",     bg: "bg-primary/10 border-primary/25" },
  "Community Pick":         { icon: Heart,  color: "text-primary",     bg: "bg-primary/10 border-primary/25" },
  "Pro Workhorse":          { icon: Shield, color: "text-zinc-300",    bg: "bg-zinc-800/60 border-zinc-600/30" },
  "Hidden Gem":             { icon: Zap,    color: "text-amber-400",   bg: "bg-amber-950/40 border-amber-500/30" },
  "Detail King":            { icon: Gem,    color: "text-primary",     bg: "bg-primary/10 border-primary/25" },
};

export function CommunityBadge({ badge, compact }: { readonly badge: BadgeType; readonly compact?: boolean }) {
  const config = BADGE_CONFIG[badge];
  const Icon = config.icon;

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${config.bg} ${config.color}`}>
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
