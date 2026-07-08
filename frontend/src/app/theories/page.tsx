"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const CARD =
  "rounded-2xl bg-gradient-to-br from-white to-[#faf5eb] border border-black/5 shadow-[0_10px_30px_-15px_rgba(60,20,80,0.25)]";

export default function TheoriesPage() {
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-semibold tracking-tight mb-3">Psychological Theories</h1>
              <p className="text-neutral-600 max-w-2xl">
                Explore foundational theories that shaped modern psychology. From cognitive frameworks to behavioral principles, understand the core concepts that explain human behavior and mental processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${CARD} p-6`}>
                <h3 className="text-lg font-semibold mb-2">Cognitive Theories</h3>
                <p className="text-sm text-neutral-600">Memory, attention, and information processing models</p>
              </div>
              <div className={`${CARD} p-6`}>
                <h3 className="text-lg font-semibold mb-2">Behavioral Theories</h3>
                <p className="text-sm text-neutral-600">Classical and operant conditioning principles</p>
              </div>
              <div className={`${CARD} p-6`}>
                <h3 className="text-lg font-semibold mb-2">Social Theories</h3>
                <p className="text-sm text-neutral-600">Social influence, group dynamics, and conformity</p>
              </div>
              <div className={`${CARD} p-6`}>
                <h3 className="text-lg font-semibold mb-2">Developmental Theories</h3>
                <p className="text-sm text-neutral-600">Lifespan development and stage theories</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
