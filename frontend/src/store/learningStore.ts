import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LearningState {
  currentSubject: string | null;
  currentLesson: string | null;
  completedLessons: string[];
  progressPercentage: number;
  selectedTopic: string | null;
  completedQuizzes: string[];
}

interface LearningActions {
  setCurrentSubject: (subject: string | null) => void;
  setCurrentLesson: (lesson: string | null) => void;
  completeLesson: (lessonId: string) => void;
  uncompleteLesson: (lessonId: string) => void;
  setProgressPercentage: (percentage: number) => void;
  setSelectedTopic: (topic: string | null) => void;
  completeQuiz: (quizId: string) => void;
  resetLearning: () => void;
  saveProgress: (lessonId: string, progress: number) => void;
}

const learningInitialState: LearningState = {
  currentSubject: 'cognitive',
  currentLesson: 'The Human Memory — Lesson 6 of 10',
  completedLessons: ['cognitive-1', 'cognitive-2', 'cognitive-3', 'cognitive-4', 'cognitive-5', 'social-1', 'social-2'],
  progressPercentage: 63,
  selectedTopic: null,
  completedQuizzes: [],
};

export const useLearningStore = create<LearningState & LearningActions>()(
  devtools(
    persist(
      (set) => ({
        ...learningInitialState,

        setCurrentSubject: (subject) =>
          set({ currentSubject: subject }, false, 'learning/setCurrentSubject'),

        setCurrentLesson: (lesson) =>
          set({ currentLesson: lesson }, false, 'learning/setCurrentLesson'),

        completeLesson: (lessonId) =>
          set(
            (state) => ({
              completedLessons: state.completedLessons.includes(lessonId)
                ? state.completedLessons
                : [...state.completedLessons, lessonId],
            }),
            false,
            'learning/completeLesson'
          ),

        uncompleteLesson: (lessonId) =>
          set(
            (state) => ({
              completedLessons: state.completedLessons.filter((id) => id !== lessonId),
            }),
            false,
            'learning/uncompleteLesson'
          ),

        setProgressPercentage: (percentage) =>
          set(
            { progressPercentage: Math.min(100, Math.max(0, percentage)) },
            false,
            'learning/setProgressPercentage'
          ),

        setSelectedTopic: (topic) =>
          set({ selectedTopic: topic }, false, 'learning/setSelectedTopic'),

        completeQuiz: (quizId) =>
          set(
            (state) => ({
              completedQuizzes: state.completedQuizzes.includes(quizId)
                ? state.completedQuizzes
                : [...state.completedQuizzes, quizId],
            }),
            false,
            'learning/completeQuiz'
          ),

          saveProgress: (lessonId, progress) =>
  set(
    (state) => {
      const completedLessons =
        progress >= 100 && !state.completedLessons.includes(lessonId)
          ? [...state.completedLessons, lessonId]
          : state.completedLessons;

      return {
        progressPercentage: Math.min(100, Math.max(0, progress)),
        completedLessons,
      };
    },
    false,
    "learning/saveProgress"
  ),

        resetLearning: () => set(learningInitialState, false, 'learning/resetLearning'),
      }),
      {
        name: 'psychora-learning',
        partialize: (state) => ({
          currentSubject: state.currentSubject,
          currentLesson: state.currentLesson,
          completedLessons: state.completedLessons,
          progressPercentage: state.progressPercentage,
          selectedTopic: state.selectedTopic,
          completedQuizzes: state.completedQuizzes,
        }),
      }
    ),
    { name: 'LearningStore' }
  )
);
