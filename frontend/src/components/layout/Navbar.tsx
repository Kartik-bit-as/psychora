"use client";

import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";
import { useXPStore } from "@/store/xpStore";
import { Bell, Flame, LogOut, Moon, Search, Settings, Sparkles, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { xp, streak } = useXPStore();
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout?.();
    router.push("/login");
  };

  const initial = (user?.name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100/30 bg-white/40 backdrop-blur-xl dark:border-white/5 dark:bg-neutral-950/40">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search lessons, flashcards, concepts…"
            className="w-full rounded-xl border border-neutral-200 bg-white/80 py-2 pl-10 pr-16 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200/60 dark:border-white/10 dark:bg-white/5"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:border-white/10 dark:bg-white/5">
            ⌘K
          </kbd>
        </div>

        {/* Streak */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
          <Flame className="h-4 w-4" />
          {streak ?? 0}
        </div>

        {/* XP */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white">
          <Sparkles className="h-4 w-4" />
          {xp ?? 0} XP
        </div>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-sm font-semibold text-white ring-2 ring-white transition hover:opacity-90 dark:ring-neutral-900"
          >
            {initial}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-900"
            >
              <div className="border-b border-neutral-100 px-4 py-3 dark:border-white/10">
                <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {user?.name ?? "Your account"}
                </p>
                {user?.email && (
                  <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                    {user.email}
                  </p>
                )}
              </div>
              <nav className="py-1 text-sm">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-orange-50 dark:text-neutral-200 dark:hover:bg-white/5"
                  role="menuitem"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-orange-50 dark:text-neutral-200 dark:hover:bg-white/5"
                  role="menuitem"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 border-t border-neutral-100 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:border-white/10 dark:hover:bg-red-500/10"
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
