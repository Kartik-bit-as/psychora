export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalFlashcards: number;
  totalQuestions: number;
}

export const psychologyTopics: Topic[] = [
  {
    id: 'cognitive-psychology',
    name: 'Cognitive Psychology',
    description: 'Explore mental processes including perception, memory, thinking, and problem-solving. Understand how the mind processes information and makes decisions.',
    icon: 'Brain',
    color: '#3B82F6',
    totalFlashcards: 5,
    totalQuestions: 4,
  },
  {
    id: 'social-psychology',
    name: 'Social Psychology',
    description: 'Study how individuals think, feel, and behave in social situations. Examine relationships, group dynamics, attitudes, and social influence.',
    icon: 'Users',
    color: '#10B981',
    totalFlashcards: 5,
    totalQuestions: 4,
  },
  {
    id: 'abnormal-psychology',
    name: 'Abnormal Psychology',
    description: 'Investigate psychological disorders, their causes, symptoms, and treatments. Learn about diagnostic criteria and therapeutic approaches.',
    icon: 'HeartPulse',
    color: '#EF4444',
    totalFlashcards: 5,
    totalQuestions: 4,
  },
  {
    id: 'developmental-psychology',
    name: 'Developmental Psychology',
    description: 'Examine human growth and change across the lifespan, from infancy through old age. Study cognitive, emotional, and social development.',
    icon: 'Baby',
    color: '#F59E0B',
    totalFlashcards: 5,
    totalQuestions: 4,
  },
  {
    id: 'biopsychology',
    name: 'Biopsychology',
    description: 'Understand the biological bases of behavior and mental processes. Explore the brain, nervous system, neurotransmitters, and genetics.',
    icon: 'Dna',
    color: '#8B5CF6',
    totalFlashcards: 5,
    totalQuestions: 4,
  },
];
