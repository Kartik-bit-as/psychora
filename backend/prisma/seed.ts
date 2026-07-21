import {
  DifficultyLevel,
  PrismaClient,
  UserRole,
  type User,
} from "@prisma/client";

const prisma = new PrismaClient();

// ============================================================================
// TYPES
// ============================================================================

type OptionSeed = { text: string; isCorrect: boolean };

type QuestionSeed = {
  questionText: string;
  options: OptionSeed[];
};

type QuizSeed = {
  title: string;
  difficulty: DifficultyLevel;
  timeLimit?: number;
  passMark?: number;
  questions: QuestionSeed[];
};

type CaseSeed = {
  scenario: string;
  correctConcept: string;
};

type TopicSeed = {
  title: string;
  content: string;
  easyContent: string;
  bookContent: string;
  quizzes: QuizSeed[];
  cases: CaseSeed[];
};

type ModuleSeed = {
  title: string;
  description: string;
  topics: TopicSeed[];
};

type SubjectSeed = {
  title: string;
  description: string;
  modules: ModuleSeed[];
};

// ============================================================================
// CONTENT DATA
// ============================================================================

const SUBJECTS: SubjectSeed[] = [
  {
    title: "Psychology",
    description:
      "A foundational survey of psychology as a science, covering its history, major perspectives, and research methods.",
    modules: [
      {
        title: "History & Foundations",
        description: "The origins of psychology as a scientific discipline.",
        topics: [
          {
            title: "Origins of Psychology",
            content:
              "Psychology emerged as a distinct discipline in 1879 when Wilhelm Wundt established the first experimental psychology laboratory in Leipzig, Germany. Before this, questions about the mind were addressed primarily by philosophy.",
            easyContent:
              "Psychology became its own science when Wilhelm Wundt opened the first lab to study the mind in 1879. Before that, thinking about the mind was just part of philosophy.",
            bookContent:
              "The formal founding of psychology is conventionally dated to 1879, when Wilhelm Wundt established the Institute for Experimental Psychology at the University of Leipzig. Wundt's structuralism, later carried to the United States by his student Edward Titchener, sought to break down conscious experience into basic elements through introspection. Competing early schools included functionalism (William James), which emphasized the adaptive purpose of mental processes, and later behaviorism (John B. Watson, B.F. Skinner), which rejected introspection in favor of observable behavior.",
            quizzes: [
              {
                title: "Origins of Psychology — Beginner Quiz",
                difficulty: DifficultyLevel.BEGINNER,
                questions: [
                  {
                    questionText: "Who is credited with founding the first experimental psychology laboratory?",
                    options: [
                      { text: "Sigmund Freud", isCorrect: false },
                      { text: "Wilhelm Wundt", isCorrect: true },
                      { text: "William James", isCorrect: false },
                      { text: "John B. Watson", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "In what year was the first psychology laboratory established?",
                    options: [
                      { text: "1859", isCorrect: false },
                      { text: "1879", isCorrect: true },
                      { text: "1901", isCorrect: false },
                      { text: "1920", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Structuralism aimed to break down conscious experience using which method?",
                    options: [
                      { text: "Brain imaging", isCorrect: false },
                      { text: "Introspection", isCorrect: true },
                      { text: "Behavioral observation", isCorrect: false },
                      { text: "Statistical surveys", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A researcher asks trained participants to describe their inner sensations in precise detail while looking at a colored light, breaking the experience into its most basic components.",
                correctConcept: "Structuralism / Introspection",
              },
            ],
          },
          {
            title: "Major Perspectives in Psychology",
            content:
              "Modern psychology is shaped by several major perspectives: biological, psychodynamic, behavioral, cognitive, humanistic, and sociocultural. Each offers a different lens for understanding thought and behavior.",
            easyContent:
              "Psychologists look at the mind in different ways — some focus on the brain and body, some on childhood experiences, some on rewards and punishments, and some on how we think and process information.",
            bookContent:
              "Contemporary psychology is best understood as a collection of complementary perspectives rather than a single unified theory. The biological perspective examines genetics, neurochemistry, and brain structures. The psychodynamic perspective, rooted in Freud's work, emphasizes unconscious drives and early childhood experience. The behavioral perspective, advanced by Watson and Skinner, focuses strictly on observable, learned behavior shaped by reinforcement and punishment. The cognitive perspective, which rose to prominence during the 'cognitive revolution' of the 1950s–60s, studies internal mental processes such as memory, attention, and problem solving. The humanistic perspective (Rogers, Maslow) emphasizes free will, self-actualization, and personal growth. The sociocultural perspective examines how culture and social context shape behavior and cognition.",
            quizzes: [
              {
                title: "Major Perspectives — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "Which perspective focuses on unconscious drives shaped by early childhood?",
                    options: [
                      { text: "Behavioral", isCorrect: false },
                      { text: "Psychodynamic", isCorrect: true },
                      { text: "Cognitive", isCorrect: false },
                      { text: "Biological", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Which perspective rejects introspection and focuses only on observable behavior?",
                    options: [
                      { text: "Humanistic", isCorrect: false },
                      { text: "Behavioral", isCorrect: true },
                      { text: "Sociocultural", isCorrect: false },
                      { text: "Psychodynamic", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Maslow and Rogers are most associated with which perspective?",
                    options: [
                      { text: "Cognitive", isCorrect: false },
                      { text: "Biological", isCorrect: false },
                      { text: "Humanistic", isCorrect: true },
                      { text: "Behavioral", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A therapist helps a client explore childhood memories and unresolved conflicts to explain the client's current relationship patterns.",
                correctConcept: "Psychodynamic Perspective",
              },
            ],
          },
        ],
      },
      {
        title: "Research Methods",
        description: "How psychologists design studies and draw valid conclusions.",
        topics: [
          {
            title: "Experimental vs Correlational Research",
            content:
              "Experimental research manipulates an independent variable to determine causal effects on a dependent variable, using random assignment to control for confounds. Correlational research measures the relationship between variables without manipulation, and cannot establish causation.",
            easyContent:
              "Experiments let scientists change one thing on purpose to see what happens — this shows cause and effect. Correlational studies just look at how two things relate, without proving one causes the other.",
            bookContent:
              "The defining feature of a true experiment is the manipulation of an independent variable combined with random assignment of participants to conditions, which allows researchers to infer causality between the independent and dependent variables while controlling for confounding variables. By contrast, correlational research examines the statistical association between two or more naturally occurring variables. A strong correlation, even a perfect one, never licenses a causal claim — the well-known caveat 'correlation does not imply causation' reflects the possibility of a third variable or reverse causation. Quasi-experimental designs occupy a middle ground, manipulating variables without full random assignment, often due to ethical or practical constraints.",
            quizzes: [
              {
                title: "Research Methods — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "What allows experimental research to establish causation?",
                    options: [
                      { text: "Large sample sizes alone", isCorrect: false },
                      { text: "Manipulation of an independent variable with random assignment", isCorrect: true },
                      { text: "Measuring naturally occurring variables", isCorrect: false },
                      { text: "Using a survey instead of observation", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Why can't correlational research prove causation?",
                    options: [
                      { text: "Correlational studies use too few participants", isCorrect: false },
                      { text: "There is no manipulation, so a third variable or reverse causation may explain the link", isCorrect: true },
                      { text: "Correlational studies only work with animals", isCorrect: false },
                      { text: "Correlations are always too weak to matter", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "A quasi-experimental design differs from a true experiment because it lacks:",
                    options: [
                      { text: "An independent variable", isCorrect: false },
                      { text: "A dependent variable", isCorrect: false },
                      { text: "Full random assignment", isCorrect: true },
                      { text: "Any data collection", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A study finds that ice cream sales and drowning incidents both rise in the summer. A news article claims ice cream causes drowning.",
                correctConcept: "Correlation Does Not Imply Causation (Third Variable)",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Cognitive Psychology",
    description:
      "The scientific study of mental processes including memory, attention, perception, language, and problem solving.",
    modules: [
      {
        title: "Memory",
        description: "How information is encoded, stored, and retrieved.",
        topics: [
          {
            title: "Short-Term and Working Memory",
            content:
              "Short-term memory holds a limited amount of information for a brief period, roughly 7±2 items per Miller's Law. Working memory extends this concept to include active manipulation of information during cognitive tasks.",
            easyContent:
              "Short-term memory is like a sticky note in your brain — it holds a few things for a short time. Working memory is when you're actively using that information, like doing math in your head.",
            bookContent:
              "George Miller's 1956 paper proposed that short-term memory capacity is limited to approximately seven plus or minus two chunks of information, a figure later refined by Cowan (2001) to a more conservative four chunks under certain conditions. Baddeley and Hitch's working memory model (1974) expanded the static STM concept into a dynamic, multi-component system comprising the central executive, phonological loop, visuospatial sketchpad, and later the episodic buffer (Baddeley, 2000), which integrates information across subsystems and with long-term memory.",
            quizzes: [
              {
                title: "Short-Term Memory — Beginner Quiz",
                difficulty: DifficultyLevel.BEGINNER,
                questions: [
                  {
                    questionText: "According to Miller, short-term memory can typically hold how many chunks of information?",
                    options: [
                      { text: "2±1", isCorrect: false },
                      { text: "7±2", isCorrect: true },
                      { text: "15±3", isCorrect: false },
                      { text: "Unlimited", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Working memory differs from short-term memory mainly because it involves:",
                    options: [
                      { text: "Permanent storage", isCorrect: false },
                      { text: "Active manipulation of held information", isCorrect: true },
                      { text: "Only visual information", isCorrect: false },
                      { text: "Unconscious processing only", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Which component of Baddeley and Hitch's model integrates information across subsystems?",
                    options: [
                      { text: "Phonological loop", isCorrect: false },
                      { text: "Visuospatial sketchpad", isCorrect: false },
                      { text: "Episodic buffer", isCorrect: true },
                      { text: "Sensory register", isCorrect: false },
                    ],
                  },
                ],
              },
              {
                title: "Working Memory — Advanced Quiz",
                difficulty: DifficultyLevel.ADVANCED,
                timeLimit: 180,
                passMark: 70,
                questions: [
                  {
                    questionText: "Who proposed the multi-component working memory model in 1974?",
                    options: [
                      { text: "Atkinson and Shiffrin", isCorrect: false },
                      { text: "Baddeley and Hitch", isCorrect: true },
                      { text: "Miller and Cowan", isCorrect: false },
                      { text: "Craik and Lockhart", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Cowan (2001) suggested a more conservative estimate of working memory capacity of approximately:",
                    options: [
                      { text: "2 chunks", isCorrect: false },
                      { text: "4 chunks", isCorrect: true },
                      { text: "9 chunks", isCorrect: false },
                      { text: "12 chunks", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "The phonological loop is primarily responsible for processing:",
                    options: [
                      { text: "Visual imagery", isCorrect: false },
                      { text: "Verbal and acoustic information", isCorrect: true },
                      { text: "Spatial navigation", isCorrect: false },
                      { text: "Emotional regulation", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A participant is asked to silently rehearse a 7-digit phone number while walking to another room. Upon arrival, a sudden distraction causes the number to vanish entirely from memory.",
                correctConcept: "Decay and Displacement in Short-Term Memory",
              },
            ],
          },
          {
            title: "Long-Term Memory",
            content:
              "Long-term memory stores information for extended periods, from hours to a lifetime. It is divided into explicit memory (episodic and semantic) and implicit memory (procedural and priming).",
            easyContent:
              "Long-term memory is where things get stored permanently — like facts you know and memories of things that happened to you, plus skills like riding a bike that you don't even have to think about.",
            bookContent:
              "Tulving's influential taxonomy divides long-term memory into declarative (explicit) memory, accessible to conscious recollection, and non-declarative (implicit) memory, expressed through performance rather than conscious recall. Declarative memory further splits into episodic memory (personally experienced events anchored in time and place) and semantic memory (general factual knowledge independent of context). Non-declarative memory includes procedural memory (motor and cognitive skills), priming, and classical conditioning. The hippocampus plays a central role in the consolidation of declarative memories, while the basal ganglia and cerebellum are implicated in procedural memory.",
            quizzes: [
              {
                title: "Long-Term Memory — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "Which type of long-term memory stores personally experienced events?",
                    options: [
                      { text: "Semantic memory", isCorrect: false },
                      { text: "Episodic memory", isCorrect: true },
                      { text: "Procedural memory", isCorrect: false },
                      { text: "Priming", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Riding a bicycle without conscious thought is an example of which memory type?",
                    options: [
                      { text: "Episodic memory", isCorrect: false },
                      { text: "Semantic memory", isCorrect: false },
                      { text: "Procedural memory", isCorrect: true },
                      { text: "Working memory", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Which brain structure is most associated with consolidating declarative memories?",
                    options: [
                      { text: "Cerebellum", isCorrect: false },
                      { text: "Hippocampus", isCorrect: true },
                      { text: "Basal ganglia", isCorrect: false },
                      { text: "Amygdala", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "An elderly man vividly remembers his wedding day decades ago but cannot recall what he ate for breakfast this morning.",
                correctConcept: "Episodic Memory and Differential Vulnerability to Decline",
              },
            ],
          },
        ],
      },
      {
        title: "Attention",
        description: "Selective, sustained, and divided attention.",
        topics: [
          {
            title: "Selective Attention",
            content:
              "Selective attention is the ability to focus on a specific stimulus while filtering out irrelevant distractions, demonstrated classically by the cocktail party effect.",
            easyContent:
              "Selective attention is like a spotlight — your brain picks one thing to focus on and tunes out the rest, like hearing your name across a noisy room.",
            bookContent:
              "Selective attention research began with Cherry's (1953) dichotic listening studies, which revealed the 'cocktail party effect' — the ability to track one conversation while filtering competing auditory input. Broadbent's early-selection filter model (1958) proposed that unattended information is blocked before semantic analysis based on physical features. Treisman's attenuation model (1964) revised this, suggesting unattended messages are merely weakened rather than fully blocked, which explains why highly salient stimuli, such as one's own name, can break through the filter.",
            quizzes: [
              {
                title: "Selective Attention — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "The 'cocktail party effect' demonstrates our ability to:",
                    options: [
                      { text: "Hear all conversations equally", isCorrect: false },
                      { text: "Filter out one conversation while hearing all others", isCorrect: false },
                      { text: "Focus on one conversation amid background noise", isCorrect: true },
                      { text: "Process language only when silent", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Treisman's attenuation model proposes that unattended information is:",
                    options: [
                      { text: "Completely blocked", isCorrect: false },
                      { text: "Weakened but not fully blocked", isCorrect: true },
                      { text: "Processed identically to attended information", isCorrect: false },
                      { text: "Stored permanently", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Broadbent's filter model proposed that filtering occurs based on:",
                    options: [
                      { text: "The meaning of the message", isCorrect: false },
                      { text: "Physical features, before meaning is processed", isCorrect: true },
                      { text: "Emotional content only", isCorrect: false },
                      { text: "The speaker's identity alone", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "At a crowded party, a guest is deep in conversation but immediately turns when someone across the room says her name.",
                correctConcept: "Treisman's Attenuation Model — Salient Stimuli Breaking Through",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Social Psychology",
    description:
      "The study of how individuals' thoughts, feelings, and behaviors are influenced by the presence of others.",
    modules: [
      {
        title: "Conformity and Obedience",
        description: "How groups and authority shape individual behavior.",
        topics: [
          {
            title: "Conformity",
            content:
              "Conformity is changing one's behavior or beliefs to match a group standard, demonstrated famously by Solomon Asch's line-judgment experiments.",
            easyContent:
              "Conformity is going along with the group, even when you privately disagree. Asch's experiments showed people will give wrong answers just to fit in.",
            bookContent:
              "Asch's line-judgment experiments (1951, 1956) demonstrated that approximately 75% of participants conformed to an obviously incorrect majority on at least one trial. Deutsch and Gerard (1955) distinguished normative social influence — conforming to gain approval or avoid rejection — from informational social influence, conforming because others are believed to possess accurate information, particularly in ambiguous situations. Subsequent research identified key moderators of conformity, including group size, unanimity, and cultural orientation, with meta-analyses showing higher average conformity rates in collectivist cultures.",
            quizzes: [
              {
                title: "Conformity — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "Asch's experiments used which task to measure conformity?",
                    options: [
                      { text: "A memory recall test", isCorrect: false },
                      { text: "A line-length judgment task", isCorrect: true },
                      { text: "A moral dilemma survey", isCorrect: false },
                      { text: "A reaction-time test", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Conforming to gain approval from the group is called:",
                    options: [
                      { text: "Informational social influence", isCorrect: false },
                      { text: "Normative social influence", isCorrect: true },
                      { text: "Obedience", isCorrect: false },
                      { text: "Reactance", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Meta-analyses show higher average conformity rates in which type of culture?",
                    options: [
                      { text: "Individualist cultures", isCorrect: false },
                      { text: "Collectivist cultures", isCorrect: true },
                      { text: "Cultures with no social hierarchy", isCorrect: false },
                      { text: "Cultures with small populations", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A new employee notices the team always overestimates project success in meetings. Despite privately disagreeing, the employee starts giving the same overly optimistic forecasts to fit in.",
                correctConcept: "Normative Social Influence",
              },
            ],
          },
          {
            title: "Obedience to Authority",
            content:
              "Obedience is compliance with the instructions of an authority figure. Stanley Milgram's experiments showed that a majority of ordinary participants would administer what they believed were dangerous electric shocks when instructed by an authority figure.",
            easyContent:
              "Milgram's experiments showed that ordinary people will follow orders from authority figures, even when it means hurting someone, because someone in charge told them to.",
            bookContent:
              "Stanley Milgram's obedience studies (1963, 1974) found that 65% of participants in the baseline condition delivered the maximum 450-volt shock to a confederate learner upon instruction from an experimenter, despite visible signs of distress from the learner. Milgram's agentic state theory proposed that individuals in a hierarchical structure shift responsibility onto the authority figure, perceiving themselves as mere agents carrying out orders. Variations of the study found obedience dropped sharply when the victim was in the same room, when authority legitimacy was reduced, or when peer confederates modeled defiance.",
            quizzes: [
              {
                title: "Obedience — Advanced Quiz",
                difficulty: DifficultyLevel.ADVANCED,
                timeLimit: 180,
                passMark: 70,
                questions: [
                  {
                    questionText: "In Milgram's baseline study, what percentage of participants delivered the maximum shock?",
                    options: [
                      { text: "25%", isCorrect: false },
                      { text: "45%", isCorrect: false },
                      { text: "65%", isCorrect: true },
                      { text: "90%", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Milgram's agentic state theory proposes that obedient individuals:",
                    options: [
                      { text: "Lose all awareness of their actions", isCorrect: false },
                      { text: "Shift moral responsibility onto the authority figure", isCorrect: true },
                      { text: "Become more independent thinkers", isCorrect: false },
                      { text: "Refuse to comply regardless of consequences", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Obedience rates dropped sharply in Milgram's variations when:",
                    options: [
                      { text: "Participants were paid more money", isCorrect: false },
                      { text: "Peer confederates modeled defiance", isCorrect: true },
                      { text: "The study was conducted online", isCorrect: false },
                      { text: "The learner was male instead of female", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A junior nurse is instructed by a senior doctor to administer a medication dose she privately believes exceeds safe limits, and she complies without raising concerns.",
                correctConcept: "Obedience to Authority — Agentic State",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Developmental Psychology",
    description: "The study of how humans grow, change, and adapt across the lifespan.",
    modules: [
      {
        title: "Childhood Development",
        description: "Cognitive and social development from infancy through middle childhood.",
        topics: [
          {
            title: "Piaget's Stages of Cognitive Development",
            content:
              "Jean Piaget proposed four stages of cognitive development: sensorimotor, preoperational, concrete operational, and formal operational, each marked by qualitatively different thinking abilities.",
            easyContent:
              "Piaget said children think differently at different ages. Babies learn through their senses, young kids think in a simple way, older kids understand logic with real objects, and teens can think more abstractly.",
            bookContent:
              "Piaget's stage theory (1936–1972) proposes four universal, invariant stages of cognitive development. The sensorimotor stage (0–2 years) centers on learning through sensory and motor exploration, culminating in object permanence. The preoperational stage (2–7 years) introduces symbolic thought but is marked by egocentrism and a lack of conservation. The concrete operational stage (7–11 years) brings logical reasoning about concrete objects, including conservation and reversibility. The formal operational stage (12+ years) enables abstract and hypothetico-deductive reasoning. Piaget described cognitive growth through the complementary processes of assimilation, accommodation, and equilibration.",
            quizzes: [
              {
                title: "Piaget's Stages — Advanced Quiz",
                difficulty: DifficultyLevel.ADVANCED,
                timeLimit: 180,
                passMark: 70,
                questions: [
                  {
                    questionText: "Object permanence develops during which Piagetian stage?",
                    options: [
                      { text: "Preoperational", isCorrect: false },
                      { text: "Sensorimotor", isCorrect: true },
                      { text: "Concrete operational", isCorrect: false },
                      { text: "Formal operational", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Conservation of quantity is typically mastered in which stage?",
                    options: [
                      { text: "Sensorimotor", isCorrect: false },
                      { text: "Preoperational", isCorrect: false },
                      { text: "Concrete operational", isCorrect: true },
                      { text: "Formal operational", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Modifying an existing schema to fit new information is called:",
                    options: [
                      { text: "Assimilation", isCorrect: false },
                      { text: "Accommodation", isCorrect: true },
                      { text: "Equilibration", isCorrect: false },
                      { text: "Conservation", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A 5-year-old watches water poured from a short, wide glass into a tall, thin glass and insists the tall glass now has more water.",
                correctConcept: "Lack of Conservation in the Preoperational Stage",
              },
            ],
          },
          {
            title: "Attachment Theory",
            content:
              "Attachment theory, developed by John Bowlby and extended by Mary Ainsworth, describes the emotional bond between children and caregivers and its lasting influence on development.",
            easyContent:
              "Attachment theory explains how babies bond with caregivers. A secure bond helps children feel safe to explore the world, while inconsistent care can lead to less secure attachment styles.",
            bookContent:
              "Bowlby's attachment theory (1969) proposed that attachment behaviors are evolutionarily adaptive, ensuring proximity to caregivers for protection. Bowlby introduced the internal working model, a cognitive template of self and relationships formed through early attachment experiences. Mary Ainsworth's Strange Situation procedure (1970) operationalized attachment, identifying secure, anxious-avoidant, and anxious-ambivalent styles, with Main and Solomon (1990) later adding disorganized attachment. Longitudinal studies link early attachment security to later relationship quality, emotional regulation, and mental health outcomes.",
            quizzes: [
              {
                title: "Attachment Theory — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "Who developed the foundational theory of attachment?",
                    options: [
                      { text: "Jean Piaget", isCorrect: false },
                      { text: "John Bowlby", isCorrect: true },
                      { text: "Erik Erikson", isCorrect: false },
                      { text: "Sigmund Freud", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "What procedure did Mary Ainsworth use to classify attachment styles?",
                    options: [
                      { text: "The Strange Situation", isCorrect: true },
                      { text: "The visual cliff", isCorrect: false },
                      { text: "The dichotic listening task", isCorrect: false },
                      { text: "The conservation task", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Disorganized attachment was added to the classification system by:",
                    options: [
                      { text: "Bowlby", isCorrect: false },
                      { text: "Ainsworth alone", isCorrect: false },
                      { text: "Main and Solomon", isCorrect: true },
                      { text: "Erikson", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A toddler cries when her mother leaves the room but is easily comforted and resumes playing once her mother returns.",
                correctConcept: "Secure Attachment",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Clinical Psychology",
    description:
      "The branch of psychology concerned with the assessment, diagnosis, and treatment of mental illness and psychological distress.",
    modules: [
      {
        title: "Mood and Anxiety Disorders",
        description: "Understanding common mental health conditions and their treatment.",
        topics: [
          {
            title: "Major Depressive Disorder",
            content:
              "Major Depressive Disorder is characterized by persistent low mood, loss of interest or pleasure, and a range of cognitive and physical symptoms lasting at least two weeks, significantly impairing daily functioning.",
            easyContent:
              "Depression is more than just feeling sad. It means feeling down or losing interest in things for weeks at a time, along with changes in sleep, energy, or appetite, that make everyday life harder.",
            bookContent:
              "According to the DSM-5 diagnostic criteria, Major Depressive Disorder requires at least five symptoms present during the same two-week period, including depressed mood or loss of interest/pleasure (anhedonia), with the remaining symptoms drawn from significant weight or appetite change, sleep disturbance, psychomotor agitation or retardation, fatigue, feelings of worthlessness or excessive guilt, diminished concentration, and recurrent thoughts of death. Aaron Beck's cognitive theory of depression proposes that a negative cognitive triad — negative views of self, the world, and the future — maintains depressive symptoms. Evidence-based treatments include cognitive behavioral therapy (CBT), interpersonal therapy, and pharmacological interventions such as SSRIs.",
            quizzes: [
              {
                title: "Major Depressive Disorder — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "According to the DSM-5, how many symptoms must be present for a diagnosis of MDD?",
                    options: [
                      { text: "At least 2", isCorrect: false },
                      { text: "At least 5", isCorrect: true },
                      { text: "At least 8", isCorrect: false },
                      { text: "All listed symptoms", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Beck's cognitive triad in depression includes negative views of self, the world, and:",
                    options: [
                      { text: "The past", isCorrect: false },
                      { text: "The future", isCorrect: true },
                      { text: "Other people's opinions", isCorrect: false },
                      { text: "Physical health", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Which class of medication is commonly used to treat MDD?",
                    options: [
                      { text: "Antipsychotics", isCorrect: false },
                      { text: "SSRIs", isCorrect: true },
                      { text: "Stimulants", isCorrect: false },
                      { text: "Beta-blockers", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A 34-year-old reports two weeks of low mood, loss of interest in hobbies, poor sleep, fatigue, and difficulty concentrating, which is affecting work performance.",
                correctConcept: "Major Depressive Disorder",
              },
            ],
          },
          {
            title: "Generalized Anxiety Disorder",
            content:
              "Generalized Anxiety Disorder involves excessive, uncontrollable worry about multiple areas of life, accompanied by physical symptoms such as restlessness, fatigue, and muscle tension, persisting for at least six months.",
            easyContent:
              "GAD means worrying a lot, about many different things, more than feels normal, for a long time. It often comes with feeling tense, tired, or on edge, even when there's no clear reason to worry.",
            bookContent:
              "Generalized Anxiety Disorder, per DSM-5, is characterized by excessive anxiety and worry occurring more days than not for at least six months, about a number of events or activities, which the individual finds difficult to control. Diagnostic criteria require at least three of six associated symptoms: restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbance. Cognitive models, such as Borkovec's avoidance theory, suggest that worry functions as a cognitive avoidance strategy that reduces somatic arousal but prevents emotional processing of feared outcomes. CBT, particularly with a focus on intolerance of uncertainty, is a first-line treatment.",
            quizzes: [
              {
                title: "Generalized Anxiety Disorder — Intermediate Quiz",
                difficulty: DifficultyLevel.INTERMEDIATE,
                questions: [
                  {
                    questionText: "For a GAD diagnosis, excessive worry must persist for at least:",
                    options: [
                      { text: "2 weeks", isCorrect: false },
                      { text: "1 month", isCorrect: false },
                      { text: "6 months", isCorrect: true },
                      { text: "1 year", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "According to Borkovec's theory, worry primarily functions as a form of:",
                    options: [
                      { text: "Cognitive avoidance", isCorrect: true },
                      { text: "Memory consolidation", isCorrect: false },
                      { text: "Sensory adaptation", isCorrect: false },
                      { text: "Social bonding", isCorrect: false },
                    ],
                  },
                  {
                    questionText: "Which of the following is a recognized symptom criterion for GAD?",
                    options: [
                      { text: "Hallucinations", isCorrect: false },
                      { text: "Muscle tension", isCorrect: true },
                      { text: "Memory loss", isCorrect: false },
                      { text: "Delusions of grandeur", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
            cases: [
              {
                scenario:
                  "A 28-year-old reports worrying excessively about work, finances, and family health for the past eight months, alongside muscle tension, fatigue, and trouble sleeping, despite no major life changes.",
                correctConcept: "Generalized Anxiety Disorder",
              },
            ],
          },
        ],
      },
    ],
  },
];

// ============================================================================
// USER DATA
// ============================================================================

const USERS: {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
  provider: string;
  isVerified: boolean;
}[] = [
  { name: "Elena Marsh", email: "elena.marsh@psychora.dev", password: "Elena@Secure2025!", role: UserRole.ADMIN, provider: "local", isVerified: true },
  { name: "James Holbrook", email: "james.holbrook@psychora.dev", password: "James@Secure2025!", role: UserRole.USER, provider: "local", isVerified: true },
  { name: "Priya Nair", email: "priya.nair@psychora.dev", password: "Priya@Secure2025!", role: UserRole.USER, provider: "google", isVerified: true },
  { name: "Carlos Vega", email: "carlos.vega@psychora.dev", password: "Carlos@Secure2025!", role: UserRole.USER, provider: "local", isVerified: true },
  { name: "Amara Okeke", email: "amara.okeke@psychora.dev", password: "Amara@Secure2025!", role: UserRole.USER, provider: "local", isVerified: true },
  { name: "Liam O'Connor", email: "liam.oconnor@psychora.dev", password: "Liam@Secure2025!", role: UserRole.USER, provider: "github", isVerified: false },
  { name: "Sofia Rinaldi", email: "sofia.rinaldi@psychora.dev", password: "Sofia@Secure2025!", role: UserRole.USER, provider: "local", isVerified: true },
  { name: "Ravi Desai", email: "ravi.desai@psychora.dev", password: "Ravi@Secure2025!", role: UserRole.USER, provider: "local", isVerified: true },
  { name: "Hannah Kim", email: "hannah.kim@psychora.dev", password: "Hannah@Secure2025!", role: UserRole.USER, provider: "google", isVerified: true },
  { name: "Daniel Brooks", email: "daniel.brooks@psychora.dev", password: "Daniel@Secure2025!", role: UserRole.USER, provider: "local", isVerified: false },
];

// ============================================================================
// HELPERS
// ============================================================================

function randomInRange(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

// ============================================================================
// SEED: CONTENT TREE (Subject -> Module -> Topic -> Quiz -> Question -> Option, + Case)
// ============================================================================

async function seedContentTree(): Promise<void> {
  console.log("\n📚  Seeding content tree (subjects → modules → topics → quizzes → questions → options, cases)...");

  for (const subjectData of SUBJECTS) {
    const subject = await prisma.subject.upsert({
      where: { title: subjectData.title },
      update: {
        description: subjectData.description,
      },
      create: {
        title: subjectData.title,
        description: subjectData.description,
        modules: {
          create: subjectData.modules.map((moduleData) => ({
            title: moduleData.title,
            description: moduleData.description,
            topics: {
              create: moduleData.topics.map((topicData) => ({
                title: topicData.title,
                content: topicData.content,
                easyContent: topicData.easyContent,
                bookContent: topicData.bookContent,
                quizzes: {
                  create: topicData.quizzes.map((quizData) => ({
                    title: quizData.title,
                    difficulty: quizData.difficulty,
                    questions: {
                      create: quizData.questions.map((qData) => ({
                        questionText: qData.questionText,
                        options: {
                          create: qData.options.map((opt) => ({
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                          })),
                        },
                      })),
                    },
                  })),
                },
                cases: {
                  create: topicData.cases.map((c) => ({
                    scenario: c.scenario,
                    correctConcept: c.correctConcept,
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    console.log(`   ✔  Subject ready: "${subject.title}"`);
  }

  const [subjectCount, moduleCount, topicCount, quizCount, questionCount, optionCount, caseCount] =
    await Promise.all([
      prisma.subject.count(),
      prisma.module.count(),
      prisma.topic.count(),
      prisma.quiz.count(),
      prisma.question.count(),
      prisma.option.count(),
      prisma.case.count(),
    ]);

  console.log(`   📖  Subjects created: ${subjectCount}`);
  console.log(`   📂  Modules created: ${moduleCount}`);
  console.log(`   📄  Topics created: ${topicCount}`);
  console.log(`   🧪  Quizzes created: ${quizCount}`);
  console.log(`   ❓  Questions created: ${questionCount}`);
  console.log(`   🔘  Options created: ${optionCount}`);
  console.log(`   🔬  Cases created: ${caseCount}`);
}

// ============================================================================
// SEED: USERS
// ============================================================================

async function seedUsers(): Promise<User[]> {
  console.log("\n👤  Seeding users...");

  const createdUsers: User[] = [];

  for (const u of USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        provider: u.provider,
      },
      create: {
        name: u.name,
        email: u.email,
        password: u.password,
        avatar: u.avatar,
        role: u.role,
        provider: u.provider,
        failedLoginAttempts: 0,
      },
    });

    createdUsers.push(user);
    console.log(`   ✔  User: ${user.name} (${user.role})`);
  }

  console.log(`   👥  Total users: ${createdUsers.length}`);
  return createdUsers;
}

// ============================================================================
// SEED: TOPIC PROGRESS + BOOKMARKS + QUIZ ATTEMPTS + CASE ATTEMPTS + ASSESSMENTS
// ============================================================================

async function seedUserActivity(users: User[]): Promise<void> {
  console.log("\n📈  Seeding progress, bookmarks, assessments...");

  const topics = await prisma.topic.findMany({
    select: { id: true, title: true },
  });

  if (topics.length === 0) {
    console.warn("   ⚠️  No topics found — skipping activity seed.");
    return;
  }

  for (const user of users) {
    // --- Progress: each user makes progress on a random subset of topics
    const topicsForUser = pickRandom(topics, Math.min(topics.length, 6));

    for (const topic of topicsForUser) {
      const isCompleted = Math.random() > 0.3;

      await prisma.progress.upsert({
        where: { userId_topicId: { userId: user.id, topicId: topic.id } },
        update: {
          completed: isCompleted,
          score: isCompleted ? randomInRange(45, 99) : 0,
        },
        create: {
          userId: user.id,
          topicId: topic.id,
          completed: isCompleted,
          score: isCompleted ? randomInRange(45, 99) : 0,
        },
      });
    }

    // --- Bookmarks: bookmark 2-3 random topics
    const bookmarkTopics = pickRandom(topics, Math.min(topics.length, 3));
    for (const topic of bookmarkTopics) {
      await prisma.bookmark.upsert({
        where: { userId_topicId: { userId: user.id, topicId: topic.id } },
        update: {},
        create: { userId: user.id, topicId: topic.id },
      });
    }

    // --- Assessments: 1-2 formal evaluations per user
    const assessmentDifficulties: DifficultyLevel[] = [
      DifficultyLevel.BEGINNER,
      DifficultyLevel.INTERMEDIATE,
      DifficultyLevel.ADVANCED,
    ];
    const assessmentCount = 1 + Math.floor(Math.random() * 2);

    for (let i = 0; i < assessmentCount; i++) {
      const difficulty =
        assessmentDifficulties[Math.floor(Math.random() * assessmentDifficulties.length)];

      await prisma.assessment.create({
        data: {
          userId: user.id,
          title: `Comprehensive Evaluation #${i + 1}`,
          score: randomInRange(50, 98),
          difficulty,
        },
      });
    }

    console.log(`   ✔  Activity seeded for: ${user.name}`);
  }

  const [progressCount, bookmarkCount, assessmentCount2] =
    await Promise.all([
      prisma.progress.count(),
      prisma.bookmark.count(),
      prisma.assessment.count(),
    ]);

  console.log(`   📈  Progress records: ${progressCount}`);
  console.log(`   🔖  Bookmarks: ${bookmarkCount}`);
  console.log(`   📋  Assessments: ${assessmentCount2}`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🌱  Psychora — Seed Starting");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  await seedContentTree();
  const users = await seedUsers();
  await seedUserActivity(users);

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉  Seed completed successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((err: unknown) => {
    console.error("❌  Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌  Prisma disconnected.");
  });
