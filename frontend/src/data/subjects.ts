export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Subject {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  moduleCount: number;
  topicCount: number;
  totalDuration: number; // in minutes
}

export interface Module {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  order: number;
  topics: number[]; // topic IDs
}

export const SUBJECTS: Subject[] = [
  {
    id: 1,
    title: "Cognitive Psychology",
    description: "Study of mental processes including attention, language, memory, perception, problem-solving, creativity, and reasoning.",
    icon: "🧠",
    color: "from-rose-400 to-orange-400",
    moduleCount: 4,
    topicCount: 12,
    totalDuration: 360,
  },
  {
    id: 2,
    title: "Social Psychology",
    description: "Understanding how people's thoughts, feelings, and behaviors are influenced by the actual or imagined presence of others.",
    icon: "👥",
    color: "from-amber-400 to-rose-400",
    moduleCount: 3,
    topicCount: 9,
    totalDuration: 270,
  },
  {
    id: 3,
    title: "Abnormal Psychology",
    description: "Study of abnormal patterns of emotion, thought, and behavior, which may or may not be understood as precipitating a mental disorder.",
    icon: "💜",
    color: "from-fuchsia-500 to-pink-400",
    moduleCount: 3,
    topicCount: 10,
    totalDuration: 300,
  },
  {
    id: 4,
    title: "Developmental Psychology",
    description: "Scientific study of how and why human beings change over the course of their life, from conception to death.",
    icon: "👶",
    color: "from-lime-500 to-emerald-400",
    moduleCount: 4,
    topicCount: 11,
    totalDuration: 330,
  },
  {
    id: 5,
    title: "Biopsychology",
    description: "Application of the principles of biology to the study of physiological, genetic, and developmental mechanisms of behavior in humans.",
    icon: "🧬",
    color: "from-rose-500 to-fuchsia-400",
    moduleCount: 3,
    topicCount: 8,
    totalDuration: 240,
  },
  {
    id: 6,
    title: "Research Methods",
    description: "Scientific methods used to conduct research and gather data in psychology, including experiments, surveys, and observational studies.",
    icon: "🔬",
    color: "from-orange-500 to-amber-400",
    moduleCount: 2,
    topicCount: 6,
    totalDuration: 180,
  },
];
