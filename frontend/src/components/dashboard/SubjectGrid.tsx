"use client";

import { useLearningStore } from "@/store/learningStore";
import type { SubjectGridProps } from "./types";

const CARD = "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";
const CARD_HOVER = "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(60,20,80,0.35)]";

export default function SubjectGrid({ subjects }: SubjectGridProps) {
  const setCurrentSubject = useLearningStore((state) => state.setCurrentSubject);
  const currentSubject = useLearningStore((state) => state.currentSubject);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {subjects.map(({ id, title, topicCount, icon: Icon, tint, iconBg }) => (
        <button
          key={id}
          onClick={() => setCurrentSubject(String(id))}
          className={`group relative text-left ${CARD} ${CARD_HOVER} p-4 overflow-hidden ${currentSubject === String(id) ? 'ring-2 ring-orange-400' : ''}`}
        >
          <div className={`relative h-28 rounded-xl bg-gradient-to-br ${tint} overflow-hidden mb-3 flex items-center justify-center`}>
            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
              <Icon size={30} className="text-white drop-shadow" />
            </div>
          </div>
          <p className="font-medium text-sm">{title}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-neutral-500">{topicCount} Topics</p>
            <span className="text-[10px] font-medium text-purple-700 opacity-0 group-hover:opacity-100 transition">Open →</span>
          </div>
        </button>
      ))}
    </div>
  );
}
