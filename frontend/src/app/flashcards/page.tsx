"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  HelpCircle,
  Layers,
  RotateCcw,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import React, { useCallback, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  hint?: string;
}

interface Deck {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  cards: Flashcard[];
  color: string;
  progress: number;
}

interface StudyStats {
  cardsCompleted: number;
  masteryPercentage: number;
  studyStreak: number;
  totalXP: number;
}

// ─── Mock Data (preserve your existing data structure) ─────────────

const MOCK_DECKS: Deck[] = [
  {
    id: "cognitive-biases",
    title: "Cognitive Biases",
    description: "Master the mental shortcuts that shape decision making",
    icon: <Brain className="w-6 h-6" />,
    iconBg: "bg-purple-100 text-purple-600",
    color: "from-purple-500 to-pink-500",
    progress: 72,
    cards: [
      {
        id: "1",
        front: "What is Confirmation Bias?",
        back: "The tendency to search for, interpret, and remember information in a way that confirms one's preexisting beliefs.",
        category: "Decision Making",
        hint: "Think about how social media algorithms work...",
      },
      {
        id: "2",
        front: "What is the Dunning-Kruger Effect?",
        back: "A cognitive bias where people with low ability at a task overestimate their ability, while experts underestimate theirs.",
        category: "Self-Assessment",
        hint: "Beginners vs. experts confidence levels...",
      },
      {
        id: "3",
        front: "What is Anchoring Bias?",
        back: "The tendency to rely too heavily on the first piece of information offered when making decisions.",
        category: "Decision Making",
        hint: "First impressions in negotiations...",
      },
      {
        id: "4",
        front: "What is the Halo Effect?",
        back: "The tendency for positive impressions of a person, company, or product in one area to influence opinions in other areas.",
        category: "Social Perception",
        hint: "Attractive people perceived as smarter...",
      },
    ],
  },
  {
    id: "memory-techniques",
    title: "Memory Techniques",
    description: "Proven methods to enhance recall and retention",
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-orange-100 text-orange-600",
    color: "from-orange-500 to-pink-500",
    progress: 58,
    cards: [
      {
        id: "5",
        front: "What is the Method of Loci?",
        back: "A memory technique that involves visualizing items to be remembered along a familiar spatial route or location.",
        category: "Spatial Memory",
        hint: "Also known as the Memory Palace...",
      },
      {
        id: "6",
        front: "What is Chunking?",
        back: "A technique that involves grouping individual pieces of information into larger, more meaningful units.",
        category: "Organization",
        hint: "Phone numbers are a common example...",
      },
    ],
  },
  {
    id: "learning-theory",
    title: "Learning Theory",
    description: "Understanding how the brain acquires new skills",
    icon: <BookOpen className="w-6 h-6" />,
    iconBg: "bg-blue-100 text-blue-600",
    color: "from-blue-500 to-purple-500",
    progress: 45,
    cards: [
      {
        id: "7",
        front: "What is Spaced Repetition?",
        back: "A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.",
        category: "Retention",
        hint: "Reviewing flashcards at specific intervals...",
      },
      {
        id: "8",
        front: "What is Active Recall?",
        back: "The practice of actively stimulating memory during the learning process, rather than passively reviewing material.",
        category: "Engagement",
        hint: "Testing yourself instead of re-reading...",
      },
    ],
  },
  {
    id: "neuroscience",
    title: "Neuroscience Basics",
    description: "Fundamental concepts about brain structure and function",
    icon: <Layers className="w-6 h-6" />,
    iconBg: "bg-green-100 text-green-600",
    color: "from-green-500 to-teal-500",
    progress: 63,
    cards: [
      {
        id: "9",
        front: "What is Neuroplasticity?",
        back: "The brain's ability to reorganize itself by forming new neural connections throughout life.",
        category: "Brain Adaptation",
        hint: "The brain's ability to change and adapt...",
      },
      {
        id: "10",
        front: "What is the Prefrontal Cortex responsible for?",
        back: "Executive functions including planning, decision making, working memory, and moderating social behavior.",
        category: "Brain Regions",
        hint: "The 'CEO' of the brain...",
      },
    ],
  },
];

const MOCK_STATS: StudyStats = {
  cardsCompleted: 247,
  masteryPercentage: 68,
  studyStreak: 12,
  totalXP: 1840,
};

// ─── Difficulty Rating Type ────────────────────────────────────────

type Difficulty = "again" | "hard" | "good" | "easy";

// ─── Main Component ────────────────────────────────────────────────

export default function FlashcardsPage() {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStats, setStudyStats] = useState<StudyStats>(MOCK_STATS);
  const [cardRatings, setCardRatings] = useState<Record<string, Difficulty>>(
    {}
  );
  const [showDeckGrid, setShowDeckGrid] = useState(true);
  const [direction, setDirection] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // ─── Handlers ────────────────────────────────────────────────────

  const handleDeckSelect = useCallback((deck: Deck) => {
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowDeckGrid(false);
    setDirection(0);
    setShowCelebration(false);
  }, []);

  const handleBackToDecks = useCallback(() => {
    setShowDeckGrid(true);
    setSelectedDeck(null);
    setIsFlipped(false);
    setShowCelebration(false);
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRateCard = useCallback(
    (difficulty: Difficulty) => {
      if (!selectedDeck) return;

      const currentCard = selectedDeck.cards[currentCardIndex];
      setCardRatings((prev) => ({
        ...prev,
        [currentCard.id]: difficulty,
      }));

      // XP calculation based on difficulty
      const xpGains: Record<Difficulty, number> = {
        again: 5,
        hard: 10,
        good: 15,
        easy: 20,
      };

      setStudyStats((prev) => ({
        ...prev,
        cardsCompleted: prev.cardsCompleted + 1,
        totalXP: prev.totalXP + xpGains[difficulty],
      }));

      // Move to next card or show completion
      if (currentCardIndex < selectedDeck.cards.length - 1) {
        setDirection(1);
        setTimeout(() => {
          setCurrentCardIndex((prev) => prev + 1);
          setIsFlipped(false);
          setDirection(0);
        }, 300);
      } else {
        setShowCelebration(true);
        setStudyStats((prev) => ({
          ...prev,
          masteryPercentage: Math.min(prev.masteryPercentage + 5, 100),
        }));
      }
    },
    [selectedDeck, currentCardIndex]
  );

  const handlePreviousCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setDirection(-1);
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev - 1);
        setIsFlipped(false);
        setDirection(0);
      }, 300);
    }
  }, [currentCardIndex]);

  const handleRestartDeck = useCallback(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowCelebration(false);
    setDirection(0);
  }, []);

  const handleContinueLearning = useCallback(() => {
    // In a real app, this would resume the last studied deck
    if (MOCK_DECKS.length > 0) {
      handleDeckSelect(MOCK_DECKS[0]);
    }
  }, [handleDeckSelect]);

  // ─── Swipe handling ──────────────────────────────────────────────

  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number }; velocity: { x: number } }
    ) => {
      const swipeThreshold = 50;
      const velocityThreshold = 500;

      if (
        info.offset.x < -swipeThreshold ||
        info.velocity.x < -velocityThreshold
      ) {
        if (currentCardIndex < (selectedDeck?.cards.length || 0) - 1) {
          handleRateCard("good");
        }
      } else if (
        info.offset.x > swipeThreshold ||
        info.velocity.x > velocityThreshold
      ) {
        handlePreviousCard();
      }
    },
    [currentCardIndex, selectedDeck, handleRateCard, handlePreviousCard]
  );

  // ─── Render ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">
        {/* ─── HERO SECTION ────────────────────────────────────────── */}
        {showDeckGrid && (
          <>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 pointer-events-none" />
              <div className="relative flex flex-col lg:flex-row items-center justify-between p-10 lg:p-14 gap-10">
                {/* Left: Title & CTA */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Flashcard Learning
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-[#1E1B1B] leading-tight">
                    Train Memory{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Smarter
                    </span>
                  </h1>

                  <p className="text-lg text-[#6B7280] max-w-md">
                    Review concepts with active recall and spaced repetition.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinueLearning}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F97316] to-pink-500 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                    >
                      Continue Learning
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        document
                          .getElementById("decks-grid")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="px-8 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1E1B1B] font-semibold hover:bg-gray-50 transition-all duration-300 shadow-sm"
                    >
                      Browse Decks
                    </motion.button>
                  </div>
                </div>

                {/* Right: Progress Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-full lg:w-auto"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E7E5E4] min-w-[280px]">
                    <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-6">
                      Your Progress
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#E9D5FF] flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#1E1B1B]">
                            {studyStats.cardsCompleted}
                          </p>
                          <p className="text-sm text-[#6B7280]">
                            Cards completed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#1E1B1B]">
                            {studyStats.masteryPercentage}%
                          </p>
                          <p className="text-sm text-[#6B7280]">Mastery</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                          <Flame className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#1E1B1B]">
                            {studyStats.studyStreak}
                          </p>
                          <p className="text-sm text-[#6B7280]">Day streak</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* ─── QUICK STATS STRIP (Addition #1) ───────────────────── */}
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  value: "24",
                  label: "Cards Today",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  value: "87%",
                  label: "Retention",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  value: "12",
                  label: "Day Streak",
                  color: "from-orange-500 to-red-500",
                },
                {
                  value: "1840",
                  label: "XP",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm"
                >
                  <div
                    className={`w-12 h-2 rounded-full bg-gradient-to-r ${item.color} mb-4`}
                  />
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─── DECK GRID ───────────────────────────────────────────── */}
        {showDeckGrid && (
          <section id="decks-grid" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1E1B1B]">
                  Study Decks
                </h2>
                <p className="text-[#6B7280] mt-1">
                  Choose a deck to start your session
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E5E4] text-sm text-[#6B7280]">
                <Trophy className="w-4 h-4 text-[#F97316]" />
                <span className="font-medium text-[#1E1B1B]">
                  {studyStats.totalXP} XP
                </span>
              </div>
            </div>

            {/* ─── CATEGORY CHIPS (Addition #2) ──────────────────────── */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                "All",
                "Memory",
                "Cognitive",
                "Neuroscience",
                "Behavior",
                "Research",
              ].map((item, index) => (
                <button
                  key={item}
                  className={`px-5 py-2 rounded-full transition-all whitespace-nowrap ${
                    index === 0
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white border border-neutral-200 text-gray-600 hover:shadow"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {MOCK_DECKS.map((deck, index) => (
                <motion.div
                  key={deck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => handleDeckSelect(deck)}
                >
                  {/* ─── DECK CARD WITH HOVER & PROGRESS (Additions #3, #4) ─ */}
                  <div className="relative h-full bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E7E5E4] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative space-y-6">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl ${deck.iconBg} flex items-center justify-center`}
                      >
                        {deck.icon}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-bold text-[#1E1B1B] mb-2">
                          {deck.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                          {deck.description}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[#E7E5E4]">
                        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium text-[#1E1B1B]">
                            {deck.cards.length}
                          </span>
                          <span>cards</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                          <Clock className="w-4 h-4" />
                          <span>
                            {Math.ceil(deck.cards.length * 0.5)} min
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                          <Star className="w-4 h-4 text-[#F97316]" />
                          <span className="font-medium text-[#1E1B1B]">
                            {deck.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Ring / Bar (Addition #4) */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${deck.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ─── FLASHCARD PLAYER ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {!showDeckGrid && selectedDeck && !showCelebration && (
            <motion.section
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToDecks}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E7E5E4] text-[#6B7280] hover:text-[#1E1B1B] hover:bg-gray-50 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Decks
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6B7280]">
                    {currentCardIndex + 1} / {selectedDeck.cards.length}
                  </span>
                  <div className="flex gap-1">
                    {selectedDeck.cards.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentCardIndex
                            ? "bg-purple-500 w-6"
                            : idx < currentCardIndex
                            ? "bg-purple-300"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Stack */}
              <div className="relative flex justify-center items-center min-h-[480px]">
                {/* Background stacked cards */}
                <div className="absolute w-full max-w-[650px] h-[420px] rounded-[32px] bg-white/50 border border-[#E7E5E4] transform translate-y-4 scale-95" />
                <div className="absolute w-full max-w-[650px] h-[420px] rounded-[32px] bg-white/70 border border-[#E7E5E4] transform translate-y-2 scale-97" />

                {/* Main Card */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x: direction * 300,
                    opacity: direction !== 0 ? 0 : 1,
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    rotateY: { duration: 0.6 },
                  }}
                  onClick={handleFlip}
                  className="relative w-full max-w-[650px] min-h-[420px] cursor-pointer perspective-1000"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`absolute inset-0 rounded-[32px] bg-gradient-to-br from-white to-purple-50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E7E5E4] p-10 flex flex-col items-center justify-center text-center backface-hidden ${
                      isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Category Badge */}
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-8">
                      <Layers className="w-3.5 h-3.5" />
                      {selectedDeck.cards[currentCardIndex].category}
                    </span>

                    {/* Question */}
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1B1B] leading-tight max-w-lg">
                      {selectedDeck.cards[currentCardIndex].front}
                    </h2>

                    {/* Hint */}
                    {selectedDeck.cards[currentCardIndex].hint && (
                      <p className="mt-6 text-sm text-[#6B7280] flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        {selectedDeck.cards[currentCardIndex].hint}
                      </p>
                    )}

                    {/* Tap hint */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <span className="text-xs text-[#6B7280] uppercase tracking-widest flex items-center gap-2">
                        <RotateCcw className="w-3 h-3" />
                        Tap to reveal
                      </span>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-50 to-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E7E5E4] p-10 flex flex-col items-center justify-center text-center ${
                      isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-8">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Answer
                    </span>

                    <p className="text-2xl lg:text-3xl font-medium text-[#1E1B1B] leading-relaxed max-w-lg">
                      {selectedDeck.cards[currentCardIndex].back}
                    </p>

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                      <span className="text-xs text-[#6B7280] uppercase tracking-widest flex items-center gap-2">
                        <RotateCcw className="w-3 h-3" />
                        Tap to flip back
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ─── KEYBOARD HINT (Addition #5) ───────────────────────── */}
              <div className="flex justify-center gap-8 text-sm text-gray-400 mt-6">
                <p>← Previous</p>
                <p>Space → Flip</p>
                <p>→ Next</p>
              </div>

              {/* Rating Buttons */}
              <div className="flex justify-center gap-4 max-w-2xl mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRateCard("again")}
                  className="flex-1 py-4 rounded-2xl bg-red-50 text-red-500 font-semibold hover:bg-red-100 transition-colors duration-200 flex flex-col items-center gap-1"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Again</span>
                  <span className="text-xs opacity-60">&lt; 1m</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRateCard("hard")}
                  className="flex-1 py-4 rounded-2xl bg-orange-50 text-orange-500 font-semibold hover:bg-orange-100 transition-colors duration-200 flex flex-col items-center gap-1"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Hard</span>
                  <span className="text-xs opacity-60">2d</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRateCard("good")}
                  className="flex-1 py-4 rounded-2xl bg-blue-50 text-blue-500 font-semibold hover:bg-blue-100 transition-colors duration-200 flex flex-col items-center gap-1"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Good</span>
                  <span className="text-xs opacity-60">4d</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRateCard("easy")}
                  className="flex-1 py-4 rounded-2xl bg-green-50 text-green-500 font-semibold hover:bg-green-100 transition-colors duration-200 flex flex-col items-center gap-1"
                >
                  <Star className="w-5 h-5" />
                  <span>Easy</span>
                  <span className="text-xs opacity-60">7d</span>
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePreviousCard}
                  disabled={currentCardIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#E7E5E4] text-[#6B7280] hover:text-[#1E1B1B] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => handleRateCard("good")}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  Next Card
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ─── COMPLETION CELEBRATION ────────────────────────────── */}
          {showCelebration && selectedDeck && (
            <motion.section
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[600px] space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/25"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>

              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-[#1E1B1B]">
                  Deck Complete!
                </h2>
                <p className="text-lg text-[#6B7280] max-w-md mx-auto">
                  You&apos;ve mastered all {selectedDeck.cards.length} cards in{" "}
                  {selectedDeck.title}. Great work!
                </p>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-[#E7E5E4] shadow-sm">
                <Zap className="w-5 h-5 text-[#F97316]" />
                <span className="font-semibold text-[#1E1B1B]">
                  +{selectedDeck.cards.length * 15} XP Earned
                </span>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestartDeck}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-[#E7E5E4] text-[#1E1B1B] font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Study Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToDecks}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-200"
                >
                  <Layers className="w-4 h-4" />
                  Browse More Decks
                </motion.button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
