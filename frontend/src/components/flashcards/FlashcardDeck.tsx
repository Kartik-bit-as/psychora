"use client";

import { FLASHCARDS } from "@/data/flashcards";
import { useLearningStore } from "@/store/learningStore";
import { useXPStore } from "@/store/xpStore";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import FlashcardCard from "./FlashcardCard";
import FlashcardControls from "./FlashcardControls";
import FlashcardProgress from "./FlashcardProgress";

interface FlashcardDeckProps {
  topicFilter?: string;
}

type Rating = "again" | "hard" | "good" | "easy";

const XP_MAP: Record<Rating, number> = {
  again: 0,
  hard: 5,
  good: 10,
  easy: 15,
};

const SCORE_MAP: Record<Rating, number> = {
  again: 25,
  hard: 50,
  good: 75,
  easy: 95,
};

const TOPIC_COLORS: Record<string, string> = {
  "Cognitive Psychology": "#8B5CF6",
  "Social Psychology": "#10B981",
  "Abnormal Psychology": "#EF4444",
  "Developmental Psychology": "#F59E0B",
  "Biopsychology": "#3B82F6",
};

export default function FlashcardDeck({ topicFilter }: FlashcardDeckProps) {
  const deck = topicFilter
 ? FLASHCARDS.filter((c: any) => c.topic === topicFilter)
 : [...FLASHCARDS];

  const [activeIndex, setActiveIndex] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  const [lastXP, setLastXP] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

  const addXP = useXPStore((s) => s.addXP);
  const incrementStreak = useXPStore((s) => s.incrementStreak);
  const saveProgress = useLearningStore((s) => s.saveProgress);

  const currentCard = deck[activeIndex];
  const color = currentCard ? TOPIC_COLORS[currentCard.topic] || "#8B5CF6" : "#8B5CF6";

  const handleRate = useCallback(
    (rating: Rating) => {
      if (activeIndex >= deck.length) return;

      const card = deck[activeIndex];
      const xpGain = XP_MAP[rating];

      if (xpGain > 0) {
        addXP(xpGain);
        setLastXP(xpGain);
        setShowXPGain(true);
        setTimeout(() => setShowXPGain(false), 1400);
      }

      if (rating === "good" || rating === "easy") {
        setLearnedCount((c) => c + 1);
      }

      saveProgress(card.topic, SCORE_MAP[rating]);
      incrementStreak();

      setCompletedCards((prev) => new Set(prev).add(card.id));

      setTimeout(() => {
        setActiveIndex((i) => Math.min(i + 1, deck.length - 1));
      }, 300);
    },
    [activeIndex, deck, addXP, incrementStreak, saveProgress]
  );

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const isComplete = activeIndex >= deck.length - 1 && completedCards.has(deck[deck.length - 1]?.id);
  const progress = deck.length > 0 ? completedCards.size / deck.length : 0;
  const visibleCards = deck.slice(activeIndex, activeIndex + 3);
  const remainingCards = deck.length - activeIndex;

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <FlashcardProgress
        current={activeIndex + 1}
        total={deck.length}
        learned={learnedCount}
        progress={progress}
        lastXP={lastXP}
        showXPGain={showXPGain}
        color={color}
      />

      <div className="relative w-full flex items-center justify-center min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {visibleCards.length > 0 && !isComplete ? (
            <div className="relative flex items-center justify-center">
              {visibleCards.slice(1).reverse().map((card, idx) => (
                <div
                  key={card.id}
                  className="absolute"
                  style={{
                    transform: `translateX(${(idx + 1) * 30}px) translateY(${(idx + 1) * 10}px) rotate(${(idx + 1) * 3}deg) scale(${1 - (idx + 1) * 0.05})`,
                    zIndex: 5 - idx,
                    opacity: 0.6 - idx * 0.15,
                  }}
                >
                  <div
                    className="w-64 h-80 rounded-2xl shadow-md"
                    style={{
                      backgroundColor: "#FFFBF5",
                      border: `2px solid ${TOPIC_COLORS[card.topic] || color}20`,
                    }}
                  />
                </div>
              ))}

              <motion.div
                key={currentCard?.id}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: -100, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative z-10"
              >
                <FlashcardCard
                  card={currentCard}
                  index={0}
                  isActive={true}
                  onClick={() => {}}
                  color={color}
                />
              </motion.div>
            </div>
          ) : (
            <motion.div
              key="complete"
              className="flex flex-col items-center justify-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-6xl mb-5"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">Deck Complete!</h3>
              <p className="text-stone-500 text-sm">
                {learnedCount} of {deck.length} cards mastered
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setActiveIndex(0);
                    setLearnedCount(0);
                    setCompletedCards(new Set());
                  }}
                  className="px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
                >
                  Study Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isComplete && (
        <div className="flex items-center gap-2">
          {deck.map((card: any, idx: number) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: idx === activeIndex ? color : idx < activeIndex ? color + "40" : "#E7E5E4",
                transform: idx === activeIndex ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}

      {!isComplete && currentCard && (
        <FlashcardControls onRate={handleRate} disabled={isComplete} color={color} />
      )}

      {!isComplete && (
        <div className="text-xs text-stone-400 uppercase tracking-wider">
          {remainingCards} cards remaining
        </div>
      )}
    </div>
  );
}
