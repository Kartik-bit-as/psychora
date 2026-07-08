export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  topic: string;
}

export const FLASHCARDS: Flashcard[] = [
  // Cognitive Psychology
  {
    id: 'cog-1',
    term: 'Working Memory',
    definition: 'A limited-capacity system for temporarily holding and manipulating information needed for complex cognitive tasks like reasoning and learning.',
    topic: 'Cognitive Psychology',
  },
  {
    id: 'cog-2',
    term: 'Schema',
    definition: 'A mental framework or cognitive structure that helps organize and interpret information about the world based on prior knowledge and experience.',
    topic: 'Cognitive Psychology',
  },
  {
    id: 'cog-3',
    term: 'Confirmation Bias',
    definition: 'The tendency to search for, interpret, and remember information in a way that confirms one\'s preexisting beliefs while ignoring contradictory evidence.',
    topic: 'Cognitive Psychology',
  },
  {
    id: 'cog-4',
    term: 'Heuristic',
    definition: 'A mental shortcut or rule of thumb that allows people to solve problems and make judgments quickly and efficiently, though not always accurately.',
    topic: 'Cognitive Psychology',
  },
  {
    id: 'cog-5',
    term: 'Cognitive Dissonance',
    definition: 'The mental discomfort experienced when holding two or more contradictory beliefs, values, or attitudes, leading to a drive to reduce the inconsistency.',
    topic: 'Cognitive Psychology',
  },

  // Social Psychology
  {
    id: 'soc-1',
    term: 'Fundamental Attribution Error',
    definition: 'The tendency to attribute others\' behavior to their character or personality while underestimating situational factors, while attributing our own behavior to situational factors.',
    topic: 'Social Psychology',
  },
  {
    id: 'soc-2',
    term: 'Bystander Effect',
    definition: 'The phenomenon where individuals are less likely to offer help to a victim when other people are present, due to diffusion of responsibility.',
    topic: 'Social Psychology',
  },
  {
    id: 'soc-3',
    term: 'Social Facilitation',
    definition: 'The tendency for people to perform better on simple or well-learned tasks when in the presence of others, but worse on complex or new tasks.',
    topic: 'Social Psychology',
  },
  {
    id: 'soc-4',
    term: 'In-group Bias',
    definition: 'The tendency to favor members of one\'s own group over those in other groups, often leading to prejudice and discrimination against out-groups.',
    topic: 'Social Psychology',
  },
  {
    id: 'soc-5',
    term: 'Milgram Experiment',
    definition: 'A famous study demonstrating obedience to authority, where participants administered what they believed were painful electric shocks to a learner under an authority figure\'s direction.',
    topic: 'Social Psychology',
  },

  // Abnormal Psychology
  {
    id: 'abn-1',
    term: 'Major Depressive Disorder',
    definition: 'A mood disorder characterized by persistent feelings of sadness, hopelessness, loss of interest in activities, and physical symptoms like fatigue and sleep disturbances.',
    topic: 'Abnormal Psychology',
  },
  {
    id: 'abn-2',
    term: 'Generalized Anxiety Disorder',
    definition: 'A condition marked by excessive and uncontrollable worry about everyday events, often accompanied by physical symptoms such as restlessness and muscle tension.',
    topic: 'Abnormal Psychology',
  },
  {
    id: 'abn-3',
    term: 'Cognitive Behavioral Therapy (CBT)',
    definition: 'A structured, goal-oriented psychotherapy that addresses dysfunctional thoughts, beliefs, and behaviors to improve emotional regulation and develop coping strategies.',
    topic: 'Abnormal Psychology',
  },
  {
    id: 'abn-4',
    term: 'Schizophrenia',
    definition: 'A severe mental disorder characterized by distortions in thinking, perception, emotions, language, sense of self, and behavior, including hallucinations and delusions.',
    topic: 'Abnormal Psychology',
  },
  {
    id: 'abn-5',
    term: 'DSM-5',
    definition: 'The Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, the standard classification of mental disorders used by mental health professionals in the United States.',
    topic: 'Abnormal Psychology',
  },

  // Developmental Psychology
  {
    id: 'dev-1',
    term: 'Attachment Theory',
    definition: 'A psychological framework describing the emotional bonds between individuals, particularly the long-term relationships between humans, first studied in infant-caregiver relationships.',
    topic: 'Developmental Psychology',
  },
  {
    id: 'dev-2',
    term: 'Critical Period',
    definition: 'A specific time window during development when an organism is particularly sensitive to certain environmental stimuli and optimal for acquiring particular skills or abilities.',
    topic: 'Developmental Psychology',
  },
  {
    id: 'dev-3',
    term: 'Object Permanence',
    definition: 'The understanding that objects continue to exist even when they cannot be perceived, a key milestone in Piaget\'s sensorimotor stage of cognitive development.',
    topic: 'Developmental Psychology',
  },
  {
    id: 'dev-4',
    term: 'Erikson\'s Stages of Psychosocial Development',
    definition: 'A theory proposing eight stages through which a healthily developing human should pass from infancy to late adulthood, each presenting a psychosocial crisis.',
    topic: 'Developmental Psychology',
  },
  {
    id: 'dev-5',
    term: 'Theory of Mind',
    definition: 'The ability to attribute mental states—beliefs, intents, desires, emotions, knowledge—to oneself and others, and to understand that others have perspectives different from one\'s own.',
    topic: 'Developmental Psychology',
  },

  // Biopsychology
  {
    id: 'bio-1',
    term: 'Neurotransmitter',
    definition: 'Chemical messengers that transmit signals across a synapse from one neuron to another, including dopamine, serotonin, and acetylcholine.',
    topic: 'Biopsychology',
  },
  {
    id: 'bio-2',
    term: 'Synaptic Plasticity',
    definition: 'The ability of synapses to strengthen or weaken over time in response to increases or decreases in their activity, believed to be the cellular basis of learning and memory.',
    topic: 'Biopsychology',
  },
  {
    id: 'bio-3',
    term: 'Hippocampus',
    definition: 'A seahorse-shaped structure in the medial temporal lobe critical for the formation of new memories, spatial navigation, and emotional regulation.',
    topic: 'Biopsychology',
  },
  {
    id: 'bio-4',
    term: 'Fight or Flight Response',
    definition: 'A physiological reaction triggered by the sympathetic nervous system in response to perceived danger, preparing the body to either confront or flee from a threat.',
    topic: 'Biopsychology',
  },
  {
    id: 'bio-5',
    term: 'Neuroplasticity',
    definition: 'The brain\'s ability to reorganize itself by forming new neural connections throughout life, allowing neurons to compensate for injury and disease and adjust to new experiences.',
    topic: 'Biopsychology',
  },
];
