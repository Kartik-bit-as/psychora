"use client";

import { QUIZZES } from "@/data/quizzes";
import { SUBJECTS } from "@/data/subjects";
import { TOPICS } from "@/data/topics";
import { useLearningStore } from "@/store/learningStore";
import { useXPStore } from "@/store/xpStore";
import { useState } from "react";

const CARD = "rounded-2xl bg-[#faf1ea] border border-black/5 shadow-sm";
const WARM = "bg-gradient-to-r from-[#f78a43] to-[#ef885f]";
const ACTIVE_NAV = "bg-[#9a5b6f]";

export default function QuizPage() {
  const addXP = useXPStore((state) => state.addXP);
  const completeLesson = useLearningStore((state) => state.completeLesson);
  const setProgressPercentage = useLearningStore((state) => state.setProgressPercentage);
  const currentSubjectFromStore = useLearningStore((state) => state.currentSubject);

  const [selectedSubject, setSelectedSubject] = useState<number | null>(
    currentSubjectFromStore ? SUBJECTS.find(s => s.title.toLowerCase().includes(currentSubjectFromStore.toLowerCase()))?.id ?? null : null
  );
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [xpAwarded, setXpAwarded] = useState(false);
  const [justEarnedXP, setJustEarnedXP] = useState(0);

  // Filter quiz questions based on selections
  let filteredQuestions = QUIZZES;

  if (selectedSubject) {
    const subjectTopicIds = TOPICS
      .filter(topic => topic.subjectId === selectedSubject)
      .map(topic => topic.id);
    filteredQuestions = filteredQuestions.filter(q => subjectTopicIds.includes(q.topicId));
  }

  if (selectedTopic) {
    filteredQuestions = filteredQuestions.filter(q => q.topicId === selectedTopic);
  }

  const currentQuestion = filteredQuestions[currentIndex];
  const currentTopic = currentQuestion ? TOPICS.find(t => t.id === currentQuestion.topicId) : null;
  const currentSubject = currentTopic ? SUBJECTS.find(s => s.id === currentTopic.subjectId) : null;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
      // Award XP immediately for correct answer
      const xpEarned = 10;
      addXP(xpEarned);
      setJustEarnedXP(xpEarned);
      setTimeout(() => setJustEarnedXP(0), 2000);
    }

    setAnsweredQuestions(new Set([...answeredQuestions, currentIndex]));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleSubjectChange = (subjectId: number | null) => {
    setSelectedSubject(subjectId);
    setSelectedTopic(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setXpAwarded(false);
  };

  const handleTopicChange = (topicId: number | null) => {
    setSelectedTopic(topicId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setXpAwarded(false);
  };

  const handleRestart = () => {
    // Mark quiz as completed in learning store
    if (!xpAwarded && filteredQuestions.length > 0) {
      const quizId = `quiz-${selectedSubject ?? 'all'}-${selectedTopic ?? 'all'}`;
      completeLesson(quizId);

      // Update progress based on score
      const newProgress = Math.round((score / filteredQuestions.length) * 100);
      setProgressPercentage(newProgress);
      setXpAwarded(true);
    }

    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  const isComplete = currentIndex === filteredQuestions.length - 1 && showResult;

  return (
    <div className="flex min-h-screen text-[#3c2832] bg-[#f8eee4]">
      <main className="flex-1 px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tight mb-3 text-[#3c2832]">Quiz</h1>
            <p className="text-[#8c7882] max-w-2xl">
              Test your knowledge with interactive quizzes. Track your progress and learn from detailed explanations.
            </p>
          </div>

          {/* XP Toast */}
          {justEarnedXP > 0 && (
            <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-[#f78a43] to-[#ef885f] text-white px-4 py-3 rounded-xl shadow-lg animate-bounce">
              <span className="font-semibold">+{justEarnedXP} XP!</span>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => handleSubjectChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedSubject === null
                    ? `${ACTIVE_NAV} text-white shadow-sm`
                    : "bg-[#faf1ea] text-[#3c2832] border border-black/5 hover:bg-[#f5ebe3]"
                }`}
              >
                All Subjects
              </button>
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectChange(subject.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    selectedSubject === subject.id
                      ? `${ACTIVE_NAV} text-white shadow-sm`
                      : "bg-[#faf1ea] text-[#3c2832] border border-black/5 hover:bg-[#f5ebe3]"
                  }`}
                >
                  {subject.icon} {subject.title}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          {selectedSubject && (
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => handleTopicChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedTopic === null
                    ? `${ACTIVE_NAV} text-white shadow-sm`
                    : "bg-[#faf1ea] text-[#3c2832] border border-black/5 hover:bg-[#f5ebe3]"
                }`}
              >
                All Topics
              </button>
              {TOPICS
                .filter(topic => topic.subjectId === selectedSubject)
                .map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicChange(topic.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                      selectedTopic === topic.id
                        ? `${ACTIVE_NAV} text-white shadow-sm`
                        : "bg-[#faf1ea] text-[#3c2832] border border-black/5 hover:bg-[#f5ebe3]"
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
            </div>
          )}

          {/* Quiz Content */}
          {filteredQuestions.length > 0 && currentQuestion && (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm text-[#8c7882]">
                <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#3c2832]">Score: {score}/{answeredQuestions.size}</span>
                  <div className="flex items-center gap-2">
                    {currentSubject && <span>{currentSubject.icon} {currentSubject.title}</span>}
                    {currentTopic && <span>→ {currentTopic.title}</span>}
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className={`${CARD} p-8`}>
                <h3 className="text-xl font-semibold mb-6 text-[#3c2832]">{currentQuestion.question}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    let optionClass = "bg-white border border-black/5 hover:bg-[#f5ebe3] text-[#3c2832]";

                    if (showResult) {
                      if (index === currentQuestion.correctAnswer) {
                        optionClass = "bg-green-50 border-green-400 text-green-700";
                      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                        optionClass = "bg-red-50 border-red-400 text-red-700";
                      }
                    } else if (selectedAnswer === index) {
                      optionClass = "bg-[#f78a43]/10 border-[#f78a43] text-[#f78a43]";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-xl border transition ${optionClass} disabled:cursor-not-allowed`}
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResult && (
                  <div className="mt-6 p-4 bg-[#f5ebe3] rounded-xl">
                    <p className="text-sm font-medium text-[#3c2832] mb-2">Explanation:</p>
                    <p className="text-sm text-[#8c7882]">{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="px-6 py-2.5 rounded-xl bg-white border border-black/5 text-[#3c2832] font-medium hover:bg-[#f5ebe3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {!showResult ? (
                  <button
                    onClick={() => setShowResult(true)}
                    disabled={selectedAnswer === null}
                    className="px-6 py-2.5 rounded-xl bg-white border border-black/5 text-[#3c2832] font-medium hover:bg-[#f5ebe3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : isComplete ? (
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f78a43] to-[#ef885f] text-white font-medium hover:opacity-90 transition"
                  >
                    Restart Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-white border border-black/5 text-[#3c2832] font-medium hover:bg-[#f5ebe3] transition"
                  >
                    Next
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#f0e6de] rounded-full h-2">
                <div
                  className={`${WARM} h-2 rounded-full transition-all`}
                  style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>

              {/* Completion Summary */}
              {isComplete && (
                <div className={`${CARD} p-6 text-center`}>
                  <h3 className="text-2xl font-semibold mb-2 text-[#3c2832]">Quiz Complete!</h3>
                  <p className="text-[#8c7882] mb-4">
                    You scored {score} out of {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[#f78a43] font-semibold">+{score * 10} XP earned!</span>
                  </div>
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f78a43] to-[#ef885f] text-white font-medium hover:opacity-90 transition"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8c7882]">No quiz questions found for this selection.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
