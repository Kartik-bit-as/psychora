"use client";

import { useAuthStore } from "@/store/authStore";
import { useXPStore } from "@/store/xpStore";
import { Flame, Gift, Play, Sparkles, Trophy } from "lucide-react";
import type { StreakDay } from "./types";

const WARM = "bg-gradient-to-r from-orange-500 to-rose-500";
const CARD = "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";

const STREAK_DAYS: StreakDay[] = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: true },
  { d: "T", done: true },
  { d: "F", done: true },
  { d: "S", done: false, today: true },
  { d: "S", done: false },
];

export default function Hero() {
  const user = useAuthStore((state) => state.user);
  const streak = useXPStore((state) => state.streak);

  return (
    <div className={`relative overflow-hidden ${CARD} p-7`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-orange-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-purple-400/30 blur-3xl" />
      <div className="relative flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-xl">
          <p className="text-sm text-neutral-600 flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" /> Good evening, {user?.name || "Learner"}
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Organized Learning.
            <br />
            <span className="bg-gradient-to-r from-purple-700 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              Stronger Understanding.
            </span>
          </h1>
          <p className="mt-3 text-sm text-neutral-600 max-w-md">
            A 10-minute lesson today keeps your {streak || 0}-day streak alive.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button className={`${WARM} text-white text-sm font-medium rounded-xl px-4 py-2.5 hover:opacity-90 transition inline-flex items-center gap-2 shadow-md`}>
              <Play size={14} /> Resume Human Memory
            </button>
            <button className="rounded-xl border border-black/10 bg-white text-sm px-4 py-2.5 hover:shadow-sm transition inline-flex items-center gap-2">
              <Gift size={14} className="text-purple-700" /> Claim daily reward
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 p-4 min-w-[260px] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-500" />
              <p className="text-sm font-semibold">{streak || 0}-day streak</p>
            </div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">This week</span>
          </div>
          <div className="flex items-center gap-1.5">
            {STREAK_DAYS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={[
                    "h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-medium",
                    s.done
                      ? `${WARM} text-white shadow`
                      : s.today
                        ? "bg-white border-2 border-orange-400 text-orange-500"
                        : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {s.done ? "✓" : s.d}
                </div>
                <span className="text-[9px] text-neutral-500">{s.d}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="inline-flex items-center gap-1"><Trophy size={12} className="text-orange-500"/> Next: 14-day badge</span>
            <span>+50 XP today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
