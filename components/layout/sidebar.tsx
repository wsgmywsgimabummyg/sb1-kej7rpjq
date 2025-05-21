"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  CheckSquare,
  Settings,
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Video,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTaskStore } from "@/lib/store";
import { Platform } from "@/lib/types";
import { platformConfigs } from "@/lib/data";

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Instagram className="mr-2 h-4 w-4" />,
  twitter: <Twitter className="mr-2 h-4 w-4" />,
  linkedin: <Linkedin className="mr-2 h-4 w-4" />,
  tiktok: <Video className="mr-2 h-4 w-4" />,
  youtube: <Youtube className="mr-2 h-4 w-4" />,
  facebook: <Facebook className="mr-2 h-4 w-4" />,
};

export function Sidebar() {
  const pathname = usePathname();
  const { user, selectedPlatform, setSelectedPlatform } = useTaskStore();

  return (
    <ScrollArea className="h-full py-6 pr-6 lg:pr-0">
      <div className="flex flex-col gap-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/tasks" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/tasks">
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/progress" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/progress">
                <BarChart2 className="mr-2 h-4 w-4" />
                Progress
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-semibold tracking-tight">Platforms</h2>
            {!user.isPremium && user.platforms.length >= 2 && (
              <span className="text-xs text-muted-foreground">2/2</span>
            )}
          </div>
          <div className="space-y-1 mt-2">
            {user.platforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedPlatform(platform)}
                style={{
                  color:
                    selectedPlatform === platform
                      ? `hsl(var(--primary))`
                      : undefined,
                }}
              >
                {platformIcons[platform]}
                {platformConfigs[platform].name}
              </Button>
            ))}

            {user.isPremium || user.platforms.length < 2 ? (
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
              >
                <Link href="/platforms">+ Add Platform</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
              >
                <Link href="/upgrade" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  Upgrade for more
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            {!user.isPremium && (
              <Button
                asChild
                variant="default"
                className="w-full justify-start mt-6"
              >
                <Link href="/upgrade">
                  <Zap className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}