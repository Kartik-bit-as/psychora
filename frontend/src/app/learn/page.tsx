"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import type { DifficultyLevel } from "@/data/subjects";
import { SUBJECTS } from "@/data/subjects";
import { TOPICS } from "@/data/topics";
import { useState } from "react";

const CARD =
  "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";
const CARD_HOVER =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(60,20,80,0.35)]";
const WARM =
  "bg-gradient-to-r from-orange-500 to-rose-500";

const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  BEGINNER: "bg-green-100 text-green-700",
  INTERMEDIATE: "bg-yellow-100 text-yellow-700",
  ADVANCED: "bg-red-100 text-red-700",
};

export default function LearnPage() {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const filteredTopics = selectedSubject
    ? TOPICS.filter(topic => topic.subjectId === selectedSubject)
    : TOPICS;

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
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-semibold tracking-tight mb-3">Learn Psychology</h1>
              <p className="text-neutral-600 max-w-2xl">
                Explore comprehensive psychology content organized by subject. Choose a subject to dive deeper or browse all topics.
              </p>
            </div>

            {/* Subject Filter */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedSubject(null)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition ${
                  selectedSubject === null
                    ? `${WARM} text-white shadow-md`
                    : "bg-white text-neutral-700 border border-black/10 hover:bg-neutral-50"
                }`}
              >
                All Subjects
              </button>
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition ${
                    selectedSubject === subject.id
                      ? `${WARM} text-white shadow-md`
                      : "bg-white text-neutral-700 border border-black/10 hover:bg-neutral-50"
                  }`}
                >
                  {subject.icon} {subject.title}
                </button>
              ))}
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => {
                const subject = SUBJECTS.find(s => s.id === topic.subjectId);
                return (
                  <div
                    key={topic.id}
                    className={`${CARD} ${CARD_HOVER} p-6 cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${DIFFICULTY_COLORS[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                      <span className="text-xs text-neutral-500">{topic.duration} min</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span>{subject?.icon}</span>
                      <span>{subject?.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTopics.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500">No topics found for this subject.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
