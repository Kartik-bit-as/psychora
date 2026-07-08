"use client";

import { useLearningStore } from "@/store/learningStore";
import { useXPStore } from "@/store/xpStore";

const CARD = "rounded-2xl bg-[#faf1ea] border border-black/5 shadow-sm";
const WARM = "bg-gradient-to-r from-[#f78a43] to-[#ef885f]";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-[#f5ebe3] py-2">
      <p className="text-sm font-semibold text-[#3c2832]">{value}</p>
      <p className="text-[10px] text-[#8c7882]">{label}</p>
    </div>
  );
}

export default function ProgressPanel() {
  const progressPercentage = useLearningStore((state) => state.progressPercentage);
  const completedLessons = useLearningStore((state) => state.completedLessons);
  const xp = useXPStore((state) => state.xp);
  const level = useXPStore((state) => state.level);

  const progress = [
    { label: "Completed", value: Math.round(progressPercentage * 0.6) },
    { label: "In Progress", value: Math.round(progressPercentage * 0.3) },
    { label: "Not Started", value: Math.round(progressPercentage * 0.1) },
  ];

  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#3c2832]">Your Progress</p>
        <span className="text-[10px] uppercase tracking-wider text-[#8c7882]">Level {level}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 rounded-full bg-[#f0e6de] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#ef885f 0 ${progressPercentage}%, #f0e6de ${progressPercentage}% 100%)`,
            }}
          />
          <div className="relative h-16 w-16 rounded-full bg-[#faf1ea] flex items-center justify-center shadow-inner">
            <span className="text-lg font-semibold text-[#3c2832]">{progressPercentage}%</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2 text-xs">
          {progress.map((p) => (
            <li key={p.label} className="flex items-center justify-between">
              <span className="text-[#8c7882]">{p.label}</span>
              <span className="font-medium text-[#3c2832]">{p.value}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-[#8c7882] mb-1">
          <span>{xp} XP</span>
          <span>Level {level + 1} · {(level + 1) * 100} XP</span>
        </div>
        <div className="h-2 rounded-full bg-[#f0e6de] overflow-hidden">
          <div className={`h-full ${WARM}`} style={{ width: `${(xp % 100)}%` }} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Stat value={String(completedLessons.length)} label="Topics" />
        <Stat value="14h" label="Learned" />
        <Stat value="87%" label="Goal" />
      </div>
    </div>
  );
}
