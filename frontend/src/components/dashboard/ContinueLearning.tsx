"use client";

import { useLearningStore } from "@/store/learningStore";
import { Play } from "lucide-react";
import type { ContinueLearningProps } from "./types";

const CARD = "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";
const CARD_HOVER = "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(60,20,80,0.35)]";
const WARM = "bg-gradient-to-r from-orange-500 to-rose-500";

export default function ContinueLearning({ items }: ContinueLearningProps) {
  const currentSubject = useLearningStore((state) => state.currentSubject);
  const currentLesson = useLearningStore((state) => state.currentLesson);

  // Filter items by current subject if one is selected
  const filteredItems = currentSubject
    ? items.filter((item) => String(item.id) === currentSubject)
    : items;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Continue Learning</h2>
        <button className="text-xs text-neutral-500 hover:text-neutral-800">View all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredItems.map((l) => {
          const Icon = l.icon;
          return (
            <div key={l.id} className={`${CARD} ${CARD_HOVER} p-4 flex flex-col group`}>
              <div className={`relative h-24 rounded-xl bg-gradient-to-br ${l.bg} mb-3 overflow-hidden flex items-center justify-center`}>
                <div className="h-14 w-14 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Icon size={26} className="text-purple-700" />
                </div>
              </div>
              <p className="text-sm font-medium leading-tight">{l.title}</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{l.subject}</p>
              <p className="text-[11px] text-neutral-500 mt-1">{l.lesson}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                  <div className={`h-full ${WARM}`} style={{ width: `${l.progress}%` }} />
                </div>
                <span className="text-[10px] text-neutral-500 w-8 text-right">{l.progress}%</span>
                <button className={`h-7 w-7 rounded-full ${WARM} text-white flex items-center justify-center hover:scale-110 transition`}>
                  <Play size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
