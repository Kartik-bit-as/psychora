// app/dashboard/page.tsx
"use client";

import ContinueLearning from "@/components/dashboard/ContinueLearning";
import Hero from "@/components/dashboard/Hero";
import ProgressPanel from "@/components/dashboard/ProgressPanel";
import SubjectGrid from "@/components/dashboard/SubjectGrid";
import type {
  ActivityItem,
  ContinueLearningItem,
  DailyGoal,
  LearningSubject,
  ProgressItem,
  Reward,
  ToolItem,
  UserStats,
} from "@/components/dashboard/types";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import {
  Baby,
  Brain,
  ClipboardCheck,
  Dna,
  FileText,
  FlaskConical,
  HeartPulse,
  Layers,
  Map,
  StickyNote,
  Users
} from "lucide-react";

const CARD =
  "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";
const CARD_HOVER =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(60,20,80,0.35)]";
const WARM =
  "bg-gradient-to-r from-orange-500 to-rose-500";

const userStats: UserStats = {
  streakDays: 12,
  progress: 63,
  completedTopics: 6,
  hoursLearned: 14,
};

const learningSubjects: LearningSubject[] = [
  { id: 1, title: "Cognitive Psychology", topicCount: 12, icon: Brain, tint: "from-rose-200/70 to-orange-100/60", iconBg: "from-rose-400 to-orange-400" },
  { id: 2, title: "Social Psychology", topicCount: 9, icon: Users, tint: "from-amber-200/70 to-rose-100/60", iconBg: "from-amber-400 to-rose-400" },
  { id: 3, title: "Abnormal Psychology", topicCount: 10, icon: HeartPulse, tint: "from-fuchsia-200/60 to-pink-100/60", iconBg: "from-fuchsia-500 to-pink-400" },
  { id: 4, title: "Developmental Psychology", topicCount: 11, icon: Baby, tint: "from-lime-200/60 to-orange-100/60", iconBg: "from-lime-500 to-emerald-400" },
  { id: 5, title: "Biopsychology", topicCount: 8, icon: Dna, tint: "from-rose-200/70 to-fuchsia-100/60", iconBg: "from-rose-500 to-fuchsia-400" },
  { id: 6, title: "Research Methods", topicCount: 6, icon: FlaskConical, tint: "from-orange-200/70 to-amber-100/60", iconBg: "from-orange-500 to-amber-400" },
];

const continueLearning: ContinueLearningItem[] = [
  { id: 1, title: "The Human Memory", subject: "Cognitive Psychology", lesson: "Lesson 6 of 10", progress: 60, icon: Brain, bg: "from-rose-200 to-orange-100" },
  { id: 2, title: "Attitude & Persuasion", subject: "Social Psychology", lesson: "Lesson 4 of 8", progress: 45, icon: Users, bg: "from-amber-200 to-rose-100" },
  { id: 3, title: "Freud's Psychoanalysis", subject: "Personality", lesson: "Lesson 2 of 6", progress: 35, icon: HeartPulse, bg: "from-fuchsia-200 to-pink-100" },
  { id: 4, title: "Experimental Design", subject: "Research Methods", lesson: "Lesson 3 of 5", progress: 55, icon: FlaskConical, bg: "from-orange-200 to-amber-100" },
];

const rewards: Reward[] = [
  { id: 1, title: "Neuron Navigator", description: "Completed first topic", icon: "🧠", unlocked: true },
  { id: 2, title: "Synapse Synchronizer", description: "7-day streak achieved", icon: "⚡", unlocked: true },
  { id: 3, title: "Hippocampus Hero", description: "10 hours of learning", icon: "🦛", unlocked: true },
  { id: 4, title: "Serotonin Seeker", description: "Mastered abnormal psychology", icon: "😊", unlocked: false },
  { id: 5, title: "Cortex Conqueror", description: "Completed 50 topics", icon: "🧩", unlocked: false },
  { id: 6, title: "Dopamine Dynamo", description: "30-day streak", icon: "🎯", unlocked: false },
  { id: 7, title: "Mirror Neuron", description: "100 quizzes passed", icon: "🪞", unlocked: false },
  { id: 8, title: "Prefrontal Sage", description: "30 days of practice", icon: "🧙", unlocked: false },
];

const activity: ActivityItem[] = [
  { id: 1, action: "Completed Memory Encoding", time: "2 hours ago" },
  { id: 2, action: "Started Attribution Theory", time: "5 hours ago" },
  { id: 3, action: "Earned Synapse Synchronizer", time: "1 day ago" },
  { id: 4, action: "Completed Classical Conditioning", time: "2 days ago" },
  { id: 5, action: "Started Anxiety Disorders", time: "3 days ago" },
];

const PROGRESS: ProgressItem[] = [
  { label: "Completed", value: 60 },
  { label: "In Progress", value: 30 },
  { label: "Not Started", value: 10 },
];

const TOOLS: ToolItem[] = [
  { label: "Mind Maps", hint: "Visualize connections", icon: Map },
  { label: "Flashcards", hint: "Quick recall", icon: Layers },
  { label: "Case Studies", hint: "Real-life insight", icon: FileText },
  { label: "Assessments", hint: "Test your knowledge", icon: ClipboardCheck },
  { label: "Notes", hint: "Capture & organize", icon: StickyNote },
];

const DAILY_GOALS: DailyGoal[] = [
  { id: 1, label: "Complete 1 topic", done: true },
  { id: 2, label: "Review flashcards", done: true },
  { id: 3, label: "Read a case study", done: false },
  { id: 4, label: "Practice quiz", done: false },
];

export default function DashboardPage() {


  return (
    <div
      className="flex min-h-screen text-neutral-800"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 0%, #fbe9d1 0%, transparent 60%), radial-gradient(1000px 500px at 100% 100%, #f3d9e7 0%, transparent 55%), #f6efe4",
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT / CENTER */}
            <section className="lg:col-span-2 space-y-6">
              <Hero />
              <SubjectGrid subjects={learningSubjects} />
              <ContinueLearning items={continueLearning} />

              {/* Quick Tools */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Quick Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {TOOLS.map(({ label, hint, icon: Icon }) => (
                    <button key={label} className={`${CARD} ${CARD_HOVER} p-4 flex items-center gap-3 text-left`}>
                      <div className={`h-10 w-10 rounded-xl ${WARM} text-white flex items-center justify-center shadow-md`}>
                        <Icon size={18} />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-[10px] text-neutral-500">{hint}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* RIGHT PANEL */}
            <aside className="space-y-6">
              <ProgressPanel />

              {/* Daily Goals */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">Daily Goals</p>
                  <span className="text-[10px] text-neutral-500">{DAILY_GOALS.filter(g => g.done).length} / {DAILY_GOALS.length}</span>
                </div>
                <ul className="space-y-2">
                  {DAILY_GOALS.map((goal) => (
                    <li key={goal.id} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3 hover:bg-neutral-100 transition">
                      <div className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-bold ${goal.done ? `${WARM} text-white shadow` : "bg-white border border-neutral-200 text-transparent"}`}>
                        {goal.done ? "✓" : ""}
                      </div>
                      <span className={`text-sm ${goal.done ? "text-neutral-400 line-through" : "text-neutral-700"}`}>{goal.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">Achievements</p>
                  <span className="text-[10px] text-neutral-500">{rewards.filter(r => r.unlocked).length} / {rewards.length}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={[
                        "aspect-square rounded-xl flex items-center justify-center text-xl",
                        reward.unlocked ? `${WARM} shadow-md` : "bg-neutral-100 grayscale opacity-60",
                      ].join(" ")}
                    >
                      {reward.icon}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-neutral-500">
                  Unlock <span className="text-purple-700 font-medium">"Focus Master"</span> after 2 more sessions today.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
