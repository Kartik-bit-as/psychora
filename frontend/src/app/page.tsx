"use client";

import ContinueLearning from "@/components/dashboard/ContinueLearning";
import Hero from "@/components/dashboard/Hero";
import ProgressPanel from "@/components/dashboard/ProgressPanel";
import SubjectGrid from "@/components/dashboard/SubjectGrid";
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

const CARD = "rounded-2xl bg-[#faf1ea] border border-black/5 shadow-sm";
const CARD_HOVER = "transition-all duration-300 hover:-translate-y-1 hover:shadow-md";
const WARM = "bg-gradient-to-r from-[#f78a43] to-[#ef885f]";

const learningSubjects = [
  { id: 1, title: "Cognitive Psychology", topicCount: 12, icon: Brain, tint: "from-[#f9efe9] to-[#faf1e8]", iconBg: "from-[#e8a87c] to-[#d4a574]" },
  { id: 2, title: "Social Psychology", topicCount: 9, icon: Users, tint: "from-[#faf1e8] to-[#fbf0e8]", iconBg: "from-[#d4a5a5] to-[#c99595]" },
  { id: 3, title: "Abnormal Psychology", topicCount: 10, icon: HeartPulse, tint: "from-[#fbf2ea] to-[#faf1ea]", iconBg: "from-[#c8a5c8] to-[#b895b8]" },
  { id: 4, title: "Developmental", topicCount: 11, icon: Baby, tint: "from-[#f2e2d7] to-[#f5e4d8]", iconBg: "from-[#a5c8a5] to-[#95b895]" },
  { id: 5, title: "Biopsychology", topicCount: 8, icon: Dna, tint: "from-[#eae4d7] to-[#ece5d8]", iconBg: "from-[#c8a5b8] to-[#b895a8]" },
  { id: 6, title: "Research Methods", topicCount: 6, icon: FlaskConical, tint: "from-[#ece3d6] to-[#ede4d7]", iconBg: "from-[#d4b88a] to-[#c4a87a]" },
];

const continueLearning = [
  { id: 1, title: "The Human Memory", subject: "Cognitive Psychology", lesson: "Lesson 6 of 10", progress: 60, icon: Brain, bg: "from-[#f9efe9] to-[#faf1e8]" },
  { id: 2, title: "Attitude & Persuasion", subject: "Social Psychology", lesson: "Lesson 4 of 8", progress: 45, icon: Users, bg: "from-[#faf1e8] to-[#fbf0e8]" },
  { id: 3, title: "Freud's Psychoanalysis", subject: "Personality", lesson: "Lesson 2 of 6", progress: 35, icon: HeartPulse, bg: "from-[#fbf2ea] to-[#faf1ea]" },
  { id: 4, title: "Experimental Design", subject: "Research Methods", lesson: "Lesson 3 of 5", progress: 55, icon: FlaskConical, bg: "from-[#ece3d6] to-[#ede4d7]" },
];

const TOOLS = [
  { label: "Mind Maps", hint: "Visualize connections", icon: Map },
  { label: "Flashcards", hint: "Quick recall", icon: Layers },
  { label: "Case Studies", hint: "Real-life insight", icon: FileText },
  { label: "Assessments", hint: "Test your knowledge", icon: ClipboardCheck },
  { label: "Notes", hint: "Capture & organize", icon: StickyNote },
];

const DAILY_GOALS = [
  { id: 1, label: "Complete 1 topic", done: true },
  { id: 2, label: "Review flashcards", done: true },
  { id: 3, label: "Read a case study", done: false },
  { id: 4, label: "Practice quiz", done: false },
];

const rewards = [
  { id: 1, title: "Neuron Navigator", description: "Completed first topic", icon: "🧠", unlocked: true },
  { id: 2, title: "Synapse Synchronizer", description: "7-day streak achieved", icon: "⚡", unlocked: true },
  { id: 3, title: "Hippocampus Hero", description: "10 hours of learning", icon: "🦛", unlocked: true },
  { id: 4, title: "Amygdala Ace", description: "Mastered abnormal psychology", icon: "😰", unlocked: false },
  { id: 5, title: "Cortex Conqueror", description: "Completed 50 topics", icon: "🧩", unlocked: false },
  { id: 6, title: "Dopamine Dynamo", description: "30-day streak", icon: "🎯", unlocked: false },
  { id: 7, title: "Mirror Neuron", description: "100 quizzes passed", icon: "🪞", unlocked: false },
  { id: 8, title: "Prefrontal Sage", description: "30 days of practice", icon: "🧙", unlocked: false },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen text-[#3c2832] bg-[#f8eee4]">
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
                <h2 className="text-lg font-semibold mb-4 text-[#3c2832]">Quick Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {TOOLS.map(({ label, hint, icon: Icon }) => (
                    <button key={label} className={`${CARD} ${CARD_HOVER} p-4 flex items-center gap-3 text-left`}>
                      <div className={`h-10 w-10 rounded-xl ${WARM} text-white flex items-center justify-center shadow-sm`}>
                        <Icon size={18} />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-medium text-[#3c2832]">{label}</p>
                        <p className="text-[10px] text-[#8c7882]">{hint}</p>
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
                  <p className="text-sm font-semibold text-[#3c2832]">Daily Goals</p>
                  <span className="text-[10px] text-[#8c7882]">{DAILY_GOALS.filter(g => g.done).length} / {DAILY_GOALS.length}</span>
                </div>
                <ul className="space-y-2">
                  {DAILY_GOALS.map((goal) => (
                    <li key={goal.id} className="flex items-center gap-3 rounded-xl bg-[#f5ebe3] p-3 hover:bg-[#efe5dd] transition">
                      <div className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-bold ${goal.done ? `${WARM} text-white shadow-sm` : "bg-white border border-[#d4c8c0] text-transparent"}`}>
                        {goal.done ? "✓" : ""}
                      </div>
                      <span className={`text-sm ${goal.done ? "text-[#8c7882] line-through" : "text-[#3c2832]"}`}>{goal.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className={`${CARD} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#3c2832]">Achievements</p>
                  <span className="text-[10px] text-[#8c7882]">{rewards.filter(r => r.unlocked).length} / {rewards.length}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={[
                        "aspect-square rounded-xl flex items-center justify-center text-xl",
                        reward.unlocked ? `${WARM} shadow-sm` : "bg-[#f0e6de] grayscale opacity-60",
                      ].join(" ")}
                    >
                      {reward.icon}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-[#8c7882]">
                  Unlock <span className="text-[#9a5b6f] font-medium">"Focus Master"</span> after 2 more sessions today.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
