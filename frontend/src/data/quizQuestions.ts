export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Cognitive Psychology
  {
    id: 'q-cog-1',
    question: 'What is the capacity of short-term memory according to Miller\'s Law?',
    options: ['3 ± 2 items', '5 ± 2 items', '7 ± 2 items', '10 ± 2 items'],
    correctAnswer: 2,
    difficulty: 'easy',
    topic: 'Cognitive Psychology',
    explanation: 'George Miller proposed that the average person can hold approximately 7 ± 2 items in short-term memory, often referred to as "the magical number seven."',
  },
  {
    id: 'q-cog-2',
    question: 'Which cognitive bias leads people to rely too heavily on the first piece of information they receive?',
    options: ['Confirmation bias', 'Anchoring bias', 'Hindsight bias', 'Availability heuristic'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Cognitive Psychology',
    explanation: 'Anchoring bias occurs when people use an initial piece of information as a reference point and make subsequent judgments by adjusting away from that anchor, often insufficiently.',
  },
  {
    id: 'q-cog-3',
    question: 'In the dual-process theory of cognition, System 1 thinking is characterized by:',
    options: ['Slow, deliberate, and analytical', 'Fast, automatic, and intuitive', 'Logical and rule-based', 'Conscious and effortful'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Cognitive Psychology',
    explanation: 'System 1 thinking is fast, automatic, and intuitive, while System 2 is slow, deliberate, and analytical. Both systems work together in everyday decision-making.',
  },
  {
    id: 'q-cog-4',
    question: 'Which structure is primarily responsible for transferring information from short-term to long-term memory?',
    options: ['Amygdala', 'Hippocampus', 'Prefrontal cortex', 'Cerebellum'],
    correctAnswer: 1,
    difficulty: 'hard',
    topic: 'Cognitive Psychology',
    explanation: 'The hippocampus plays a crucial role in consolidating information from short-term to long-term memory and in spatial memory that enables navigation.',
  },

  // Social Psychology
  {
    id: 'q-soc-1',
    question: 'What is the primary finding of the Asch conformity experiments?',
    options: ['People obey authority figures even when causing harm', 'People conform to group opinion even when it is obviously wrong', 'People are more likely to help when alone', 'People perform better when being watched'],
    correctAnswer: 1,
    difficulty: 'easy',
    topic: 'Social Psychology',
    explanation: 'Solomon Asch demonstrated that individuals would conform to a group\'s incorrect judgment in line-length tasks, showing the powerful influence of social pressure.',
  },
  {
    id: 'q-soc-2',
    question: 'In the Stanford Prison Experiment, what factor primarily contributed to the guards\' abusive behavior?',
    options: ['Pre-existing personality disorders', 'The assigned social role and power dynamics', 'Direct orders from the experimenters', 'Financial incentives'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Social Psychology',
    explanation: 'Philip Zimbardo\'s experiment showed that the assigned social roles and situational power dynamics were the primary drivers of the guards\' behavior, illustrating the power of the situation.',
  },
  {
    id: 'q-soc-3',
    question: 'What does the "mere exposure effect" describe?',
    options: ['Increased liking of stimuli merely because of repeated exposure', 'The tendency to expose one\'s true self over time', 'The effect of media exposure on behavior', 'Exposure therapy for anxiety reduction'],
    correctAnswer: 0,
    difficulty: 'medium',
    topic: 'Social Psychology',
    explanation: 'The mere exposure effect, demonstrated by Robert Zajonc, shows that people tend to develop a preference for things merely because they are familiar with them.',
  },
  {
    id: 'q-soc-4',
    question: 'Which theory explains why people change their behavior to match group norms?',
    options: ['Social identity theory', 'Cognitive dissonance theory', 'Normative social influence', 'Attribution theory'],
    correctAnswer: 2,
    difficulty: 'hard',
    topic: 'Social Psychology',
    explanation: 'Normative social influence occurs when people conform to be liked or accepted by the group, driven by the desire for social approval rather than a genuine belief in the group\'s position.',
  },

  // Abnormal Psychology
  {
    id: 'q-abn-1',
    question: 'Which of the following is NOT a core symptom of Major Depressive Disorder?',
    options: ['Persistent sadness', 'Loss of interest in activities', 'Hallucinations', 'Fatigue'],
    correctAnswer: 2,
    difficulty: 'easy',
    topic: 'Abnormal Psychology',
    explanation: 'While hallucinations can occur in severe cases with psychotic features, they are not a core symptom of Major Depressive Disorder. The core symptoms include sadness, anhedonia, and fatigue.',
  },
  {
    id: 'q-abn-2',
    question: 'In CBT, what is the primary target of intervention?',
    options: ['Unconscious conflicts', 'Maladaptive thoughts and behaviors', 'Neurotransmitter imbalances', 'Childhood trauma exclusively'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Abnormal Psychology',
    explanation: 'Cognitive Behavioral Therapy focuses on identifying and modifying maladaptive thought patterns and behaviors, rather than exploring unconscious conflicts or biological factors.',
  },
  {
    id: 'q-abn-3',
    question: 'What is the primary distinction between obsessions and compulsions in OCD?',
    options: ['Obsessions are behaviors; compulsions are thoughts', 'Obsessions are intrusive thoughts; compulsions are repetitive behaviors', 'Obsessions are mild; compulsions are severe', 'Obsessions are voluntary; compulsions are involuntary'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Abnormal Psychology',
    explanation: 'In Obsessive-Compulsive Disorder, obsessions are unwanted, intrusive thoughts, while compulsions are repetitive behaviors performed to reduce anxiety caused by obsessions.',
  },
  {
    id: 'q-abn-4',
    question: 'Which neurotransmitter is most commonly associated with the positive symptoms of schizophrenia?',
    options: ['Serotonin', 'Dopamine', 'GABA', 'Acetylcholine'],
    correctAnswer: 1,
    difficulty: 'hard',
    topic: 'Abnormal Psychology',
    explanation: 'The dopamine hypothesis suggests that positive symptoms of schizophrenia (hallucinations, delusions) are linked to hyperactivity in dopaminergic pathways, particularly in the mesolimbic system.',
  },

  // Developmental Psychology
  {
    id: 'q-dev-1',
    question: 'According to Piaget, at what stage do children develop the ability to think logically about concrete events?',
    options: ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'],
    correctAnswer: 2,
    difficulty: 'easy',
    topic: 'Developmental Psychology',
    explanation: 'The concrete operational stage (ages 7-11) is when children begin to think logically about concrete events and understand concepts like conservation, reversibility, and classification.',
  },
  {
    id: 'q-dev-2',
    question: 'What is the primary characteristic of secure attachment in infants?',
    options: ['Avoidance of the caregiver upon reunion', 'Distress when the caregiver leaves and comfort upon return', 'Indifference to the caregiver\'s presence', 'Ambivalence toward the caregiver'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Developmental Psychology',
    explanation: 'Securely attached infants show distress when their caregiver leaves and seek comfort upon their return, using the caregiver as a secure base from which to explore the environment.',
  },
  {
    id: 'q-dev-3',
    question: 'Which of Erikson\'s stages occurs during adolescence?',
    options: ['Trust vs. Mistrust', 'Autonomy vs. Shame', 'Identity vs. Role Confusion', 'Generativity vs. Stagnation'],
    correctAnswer: 2,
    difficulty: 'medium',
    topic: 'Developmental Psychology',
    explanation: 'During adolescence (ages 12-18), individuals face the crisis of Identity vs. Role Confusion, where they explore different roles and ideologies to form a coherent sense of self.',
  },
  {
    id: 'q-dev-4',
    question: 'What does Vygotsky\'s Zone of Proximal Development (ZPD) refer to?',
    options: ['The range of tasks a child can perform independently', 'The gap between a child\'s actual and potential development with guidance', 'The physical environment optimal for learning', 'The age range for critical period language acquisition'],
    correctAnswer: 1,
    difficulty: 'hard',
    topic: 'Developmental Psychology',
    explanation: 'The ZPD is the difference between what a learner can do independently and what they can achieve with guidance from a more knowledgeable other, emphasizing the role of social interaction in learning.',
  },

  // Biopsychology
  {
    id: 'q-bio-1',
    question: 'Which neurotransmitter is primarily associated with the reward and pleasure system?',
    options: ['Serotonin', 'Dopamine', 'GABA', 'Norepinephrine'],
    correctAnswer: 1,
    difficulty: 'easy',
    topic: 'Biopsychology',
    explanation: 'Dopamine is the primary neurotransmitter of the brain\'s reward system, involved in motivation, pleasure, and reinforcement learning.',
  },
  {
    id: 'q-bio-2',
    question: 'What is the function of the myelin sheath?',
    options: ['To transmit electrical signals between neurons', 'To insulate axons and speed up neural transmission', 'To produce neurotransmitters', 'To filter toxins from the blood'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Biopsychology',
    explanation: 'The myelin sheath, composed of glial cells, insulates axons and allows electrical impulses to transmit more rapidly and efficiently through saltatory conduction.',
  },
  {
    id: 'q-bio-3',
    question: 'Which brain structure is part of the limbic system and plays a key role in emotional processing, especially fear?',
    options: ['Cerebellum', 'Amygdala', 'Thalamus', 'Occipital lobe'],
    correctAnswer: 1,
    difficulty: 'medium',
    topic: 'Biopsychology',
    explanation: 'The amygdala is an almond-shaped structure in the limbic system that processes emotional responses, particularly fear and threat detection, and is involved in emotional memory formation.',
  },
  {
    id: 'q-bio-4',
    question: 'What is long-term potentiation (LTP)?',
    options: ['A decrease in synaptic strength following high-frequency stimulation', 'A persistent strengthening of synapses based on recent patterns of activity', 'The process of neurotransmitter reuptake', 'The degeneration of neural connections over time'],
    correctAnswer: 1,
    difficulty: 'hard',
    topic: 'Biopsychology',
    explanation: 'Long-term potentiation is a long-lasting increase in synaptic strength following high-frequency stimulation, widely considered a cellular mechanism underlying learning and memory.',
  },
];
