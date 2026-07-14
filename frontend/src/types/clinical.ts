/**
 * =============================================================================
 * Psychora Clinical Engine
 * -----------------------------------------------------------------------------
 * File: src/types/clinical.ts
 *
 * Description:
 * Core clinical type system shared across the entire Psychora platform.
 *
 * This file is intentionally framework-independent and can be shared between:
 *
 * - Frontend
 * - Backend
 * - API Layer
 * - Prisma Services
 * - AI Services
 * - Analytics
 * - Multiplayer
 * - Professor Dashboard
 *
 * Design Goals
 * -----------------------------------------------------------------------------
 * ✓ Production Ready
 * ✓ Strongly Typed
 * ✓ Future Proof
 * ✓ Scalable
 * ✓ React Independent
 * ✓ Backend Friendly
 * ✓ PostgreSQL Friendly
 * ✓ Prisma Friendly
 * =============================================================================
 */

export { };



/* =============================================================================
 * Utility Types
 * ========================================================================== */

/**
 * Creates branded primitive types.
 * Prevents accidentally mixing IDs.
 */
export type Brand<T, B extends string> = T & {
  readonly __brand: B;
};

/**
 * ISO-8601 UTC Timestamp
 * Example:
 * 2026-08-19T14:32:18.291Z
 */
export type ISODateString = Brand<string, "ISODateString">;

/**
 * UUID string
 */
export type UUID = Brand<string, "UUID">;

/**
 * Generic metadata container.
 */
export type Metadata = Readonly<Record<string, unknown>>;

/**
 * Dictionary of string values.
 */
export type StringMap = Readonly<Record<string, string>>;

/**
 * Immutable list helper.
 */
export type ImmutableArray<T> = ReadonlyArray<T>;



/* =============================================================================
 * Branded IDs
 * ========================================================================== */

export type CaseId = Brand<string, "CaseId">;

export type UserId = Brand<string, "UserId">;

export type SessionId = Brand<string, "SessionId">;

export type AttemptId = Brand<string, "AttemptId">;

export type HintId = Brand<string, "HintId">;

export type SymptomId = Brand<string, "SymptomId">;

export type DiagnosisId = Brand<string, "DiagnosisId">;

export type TreatmentId = Brand<string, "TreatmentId">;

export type RewardId = Brand<string, "RewardId">;

export type TimelineEventId = Brand<string, "TimelineEventId">;

export type ProfessorId = Brand<string, "ProfessorId">;

export type AnalyticsId = Brand<string, "AnalyticsId">;



/* =============================================================================
 * Base Interfaces
 * ========================================================================== */

/**
 * Every persisted entity should have an ID.
 */
export interface BaseEntity {
  readonly id: UUID;
}

/**
 * Timestamp fields shared across entities.
 */
export interface Timestamped {
  readonly createdAt: ISODateString;
  readonly updatedAt: ISODateString;
}

/**
 * Optional versioning for future migrations.
 */
export interface Versioned {
  readonly version: number;
}

/**
 * Base object for future extensibility.
 */
export interface Extensible<TMetadata = Metadata> {
  readonly metadata: TMetadata;
}

export interface Entity<TMetadata = Metadata>
  extends BaseEntity,
    Timestamped,
    Versioned,
    Extensible<TMetadata> {}



/* =============================================================================
 * Enums
 * ========================================================================== */

/**
 * Clinical difficulty.
 */
export enum DifficultyLevel {
  Beginner = "BEGINNER",
  Easy = "EASY",
  Intermediate = "INTERMEDIATE",
  Advanced = "ADVANCED",
  Expert = "EXPERT",
  Master = "MASTER",
}

/**
 * Learning mode.
 */
export enum CaseMode {
  Learn = "LEARN",
  Detective = "DETECTIVE",
  Story = "STORY",
  Quiz = "QUIZ",
  Practice = "PRACTICE",
  Exam = "EXAM",
  Assessment = "ASSESSMENT",
}

/**
 * Publishing status.
 */
export enum CaseStatus {
  Draft = "DRAFT",
  Review = "REVIEW",
  Published = "PUBLISHED",
  Archived = "ARCHIVED",
  Deprecated = "DEPRECATED",
}

/**
 * Hint categories.
 */
export enum HintType {
  General = "GENERAL",
  Clinical = "CLINICAL",
  Symptom = "SYMPTOM",
  Timeline = "TIMELINE",
  Behavioral = "BEHAVIORAL",
  DSM = "DSM",
  Differential = "DIFFERENTIAL",
  Treatment = "TREATMENT",
}

/**
 * Diagnosis evaluation.
 */
export enum DiagnosisResult {
  Correct = "CORRECT",
  PartiallyCorrect = "PARTIALLY_CORRECT",
  Incorrect = "INCORRECT",
  Inconclusive = "INCONCLUSIVE",
}

/**
 * Biological sex / gender representation.
 */
export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  NonBinary = "NON_BINARY",
  Other = "OTHER",
  Unknown = "UNKNOWN",
}

/**
 * Clinical case category.
 */
export enum CaseCategory {
  Anxiety = "ANXIETY",
  Mood = "MOOD",
  Personality = "PERSONALITY",
  Trauma = "TRAUMA",
  Psychotic = "PSYCHOTIC",
  Neurodevelopmental = "NEURODEVELOPMENTAL",
  Neurocognitive = "NEUROCOGNITIVE",
  ObsessiveCompulsive = "OBSESSIVE_COMPULSIVE",
  FeedingEating = "FEEDING_EATING",
  Dissociative = "DISSOCIATIVE",
  Somatic = "SOMATIC",
  SleepWake = "SLEEP_WAKE",
  SubstanceRelated = "SUBSTANCE_RELATED",
  Sexual = "SEXUAL",
  GenderRelated = "GENDER_RELATED",
  Disruptive = "DISRUPTIVE",
  ClinicalAssessment = "CLINICAL_ASSESSMENT",
  General = "GENERAL",
}

/**
 * Clinical severity.
 */
export enum SeverityLevel {
  None = "NONE",
  Mild = "MILD",
  Moderate = "MODERATE",
  Severe = "SEVERE",
  Extreme = "EXTREME",
}

/**
 * Treatment modality.
 */
export enum TreatmentType {
  Psychoeducation = "PSYCHOEDUCATION",
  CBT = "CBT",
  DBT = "DBT",
  ACT = "ACT",
  Psychodynamic = "PSYCHODYNAMIC",
  Humanistic = "HUMANISTIC",
  FamilyTherapy = "FAMILY_THERAPY",
  GroupTherapy = "GROUP_THERAPY",
  ExposureTherapy = "EXPOSURE_THERAPY",
  Medication = "MEDICATION",
  Lifestyle = "LIFESTYLE",
  Referral = "REFERRAL",
  CrisisIntervention = "CRISIS_INTERVENTION",
  Combined = "COMBINED",
}

/**
 * User learning progress.
 */
export enum ProgressStatus {
  Locked = "LOCKED",
  Available = "AVAILABLE",
  Started = "STARTED",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Mastered = "MASTERED",
}

/**
 * Symptom duration.
 */
export enum SymptomDuration {
  Acute = "ACUTE",
  Subacute = "SUBACUTE",
  Chronic = "CHRONIC",
  Episodic = "EPISODIC",
  Persistent = "PERSISTENT",
  Unknown = "UNKNOWN",
}

/**
 * Timeline event type.
 */
export enum TimelineEventType {
  SymptomOnset = "SYMPTOM_ONSET",
  Diagnosis = "DIAGNOSIS",
  Treatment = "TREATMENT",
  Hospitalization = "HOSPITALIZATION",
  Trauma = "TRAUMA",
  Relapse = "RELAPSE",
  Recovery = "RECOVERY",
  FollowUp = "FOLLOW_UP",
  Other = "OTHER",
}

/**
 * Evidence importance.
 */
export enum EvidencePriority {
  Critical = "CRITICAL",
  High = "HIGH",
  Medium = "MEDIUM",
  Low = "LOW",
}

/**
 * AI interaction readiness.
 */
export enum AIReadiness {
  Disabled = "DISABLED",
  Assisted = "ASSISTED",
  Interactive = "INTERACTIVE",
  Autonomous = "AUTONOMOUS",
}

/**
 * Voice interview support.
 */
export enum VoiceSupport {
  None = "NONE",
  Optional = "OPTIONAL",
  Required = "REQUIRED",
}

/**
 * Multiplayer availability.
 */
export enum MultiplayerMode {
  Disabled = "DISABLED",
  Cooperative = "COOPERATIVE",
  Competitive = "COMPETITIVE",
}

/**
 * Clinical confidence.
 */
export enum ConfidenceLevel {
  VeryLow = "VERY_LOW",
  Low = "LOW",
  Moderate = "MODERATE",
  High = "HIGH",
  VeryHigh = "VERY_HIGH",
}

/* =============================================================================
 * 2. SHARED VALUE OBJECTS
 * ============================================================================= */

/**
 * Reusable tag attached to clinical cases, symptoms, diagnoses, etc.
 */
export interface ClinicalTag {
  readonly id: UUID;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
}

/**
 * Educational learning objective associated with a case.
 */
export interface LearningObjective {
  readonly id: UUID;
  readonly title: string;
  readonly description: string;
}

/**
 * Risk factor that may contribute to a disorder.
 */
export interface RiskFactor {
  readonly id: UUID;
  readonly title: string;
  readonly description: string;
  readonly severity: SeverityLevel;
}

/**
 * Protective factor reducing risk or improving prognosis.
 */
export interface ProtectiveFactor {
  readonly id: UUID;
  readonly title: string;
  readonly description: string;
}

/**
 * Medication reference.
 *
 * This is intentionally lightweight.
 * It is NOT intended to replace a pharmacology database.
 */
export interface Medication {
  readonly id: UUID;
  readonly name: string;
  readonly dosage: string;
  readonly frequency: string;
  readonly notes: string;
}

/**
 * Timeline event used throughout Story Mode and Clinical Cases.
 */
export interface ClinicalReference {
  readonly title: string;
  readonly source: string;
  readonly url: string;
}

/* =============================================================================
 * DOMAIN MODELS
 * ============================================================================= */

/**
 * Static metadata describing a clinical case.
 *
 * This metadata never changes based on the learner.
 */
export interface CaseMetadata {
  readonly id: CaseId;

  readonly slug: string;

  readonly title: string;

  readonly description: string;

  readonly difficulty: DifficultyLevel;

  /**
   * Numeric difficulty score (1-100)
   * Useful for adaptive learning.
   */
  readonly difficultyScore: number;

  readonly mode: CaseMode;

  readonly category: CaseCategory;

  readonly estimatedMinutes: number;

  readonly tags: ImmutableArray<ClinicalTag>;

  readonly learningObjectives: ImmutableArray<LearningObjective>;

  readonly references: ImmutableArray<ClinicalReference>;

  readonly status: CaseStatus;

  readonly createdAt: ISODateString;

  readonly updatedAt: ISODateString;

  readonly version: number;
}

/**
 * Patient demographic information.
 *
 * This intentionally excludes diagnostic information.
 */
export interface PatientProfile {

  readonly patientId: UUID;

  readonly firstName: string;

  readonly lastName: string;

  readonly age: number;

  readonly gender: Gender;

  readonly occupation: string | null;

  readonly education: string | null;

  readonly maritalStatus: string | null;

  readonly livingSituation: string | null;

  readonly chiefComplaint: string;

  /**
   * Optional cultural information
   * useful for future international cases.
   */
  readonly culturalBackground: string | null;

  /**
   * Primary spoken language.
   */
  readonly primaryLanguage: string | null;
}

/**
 * Comprehensive background history.
 *
 * ClinicalHistory contains contextual information
 * available to the learner.
 */
export interface ClinicalHistory {

  /**
   * History of presenting illness.
   */
  readonly presentIllness: string;

  /**
   * Previous psychiatric diagnoses,
   * hospitalizations and treatments.
   */
  readonly pastPsychiatricHistory: string;

  /**
   * Relevant medical conditions.
   */
  readonly medicalHistory: string;

  /**
   * Psychiatric illnesses within family.
   */
  readonly familyHistory: string;

  /**
   * Alcohol, nicotine, recreational drugs etc.
   */
  readonly substanceUseHistory: string;

  /**
   * Trauma exposure.
   */
  readonly traumaHistory: string;

  /**
   * Current prescribed medications.
   */
  readonly currentMedications: ImmutableArray<Medication>;

  /**
   * Clinical risk factors.
   */
  readonly riskFactors: ImmutableArray<RiskFactor>;

  /**
   * Clinical protective factors.
   */
  readonly protectiveFactors: ImmutableArray<ProtectiveFactor>;

  /**
   * Additional clinician notes.
   */
  readonly additionalNotes: string;
}

/* =============================================================================
 * Supporting Value Objects
 * ============================================================================= */

/**
 * Represents a measurable symptom duration.
 */
export interface SymptomDurationInfo {
  /**
   * Duration classification.
   */
  readonly type: SymptomDuration;

  /**
   * Human-readable duration.
   * Example:
   * "3 weeks"
   * "6 months"
   */
  readonly value: string;
}

/**
 * Evidence attached to a symptom.
 */
export interface ClinicalEvidence {
  readonly id: UUID;

  readonly title: string;

  readonly description: string;

  readonly priority: EvidencePriority;
}

/**
 * Optional media reference for future learning modes.
 *
 * Can later support:
 * - Images
 * - Audio interviews
 * - MRI scans
 * - EEG reports
 * - Video observations
 */
export interface MediaReference {
  readonly id: UUID;

  readonly title: string;

  readonly type: string;

  readonly url: string;
}

/* =============================================================================
 * Domain Models
 * ============================================================================= */

/**
 * Individual symptom.
 *
 * Symptoms are reusable and intentionally
 * independent from ClinicalCase.
 */
export interface Symptom {

  readonly id: SymptomId;

  readonly title: string;

  readonly description: string;

  readonly severity: SeverityLevel;

  readonly duration: SymptomDurationInfo;

  /**
   * Whether this symptom is considered
   * diagnostically essential.
   */
  readonly isCoreSymptom: boolean;

  /**
   * Indicates whether symptom
   * is currently active.
   */
  readonly isPresent: boolean;

  /**
   * Supporting evidence.
   */
  readonly evidence: ImmutableArray<ClinicalEvidence>;

  /**
   * Educational tags.
   */
  readonly tags: ImmutableArray<ClinicalTag>;

  /**
   * Optional learning resources.
   */
  readonly media: ImmutableArray<MediaReference>;
}

/**
 * Story timeline event.
 *
 * Used by:
 *
 * - DSM Detective
 * - Story Mode
 * - AI Patient
 * - Practical Exams
 */
export interface TimelineEvent {

  readonly id: TimelineEventId;

  readonly type: TimelineEventType;

  /**
   * Relative timestamp.
   *
   * Examples:
   *
   * "3 weeks ago"
   * "Age 12"
   * "Yesterday"
   */
  readonly time: string;

  readonly title: string;

  readonly description: string;

  /**
   * Whether learner initially knows
   * this event.
   */
  readonly initiallyVisible: boolean;

  /**
   * Future Story Mode support.
   */
  readonly unlockOrder: number;
}

/**
 * Progressive hint.
 *
 * Hints should reveal information
 * gradually without immediately
 * exposing the diagnosis.
 */
export interface ClinicalHint {

  readonly id: HintId;

  /**
   * Unlock sequence.
   */
  readonly order: number;

  readonly type: HintType;

  readonly title: string;

  readonly content: string;

  /**
   * XP deducted when hint
   * is used.
   */
  readonly xpPenalty: number;

  /**
   * Whether this hint
   * is mandatory.
   */
  readonly required: boolean;

  /**
   * Future adaptive learning.
   */
  readonly minimumDifficulty: DifficultyLevel;
}

/**
 * Optional voice interview metadata.
 *
 * Future AI Patient feature.
 */
export interface VoiceInterviewSupport {

  readonly enabled: boolean;

  readonly mode: VoiceSupport;

  readonly estimatedMinutes: number;
}

/**
 * Future AI interaction configuration.
 */
export interface AIConfiguration {

  readonly readiness: AIReadiness;

  readonly supportsConversation: boolean;

  readonly supportsAdaptiveHints: boolean;

  readonly supportsVoiceInterview: boolean;
}

/**
 * Story Mode configuration.
 */
export interface StoryConfiguration {

  readonly enabled: boolean;

  readonly chapterCount: number;

  readonly branchingNarrative: boolean;
}

/**
 * Multiplayer configuration.
 */
export interface MultiplayerConfiguration {

  readonly mode: MultiplayerMode;

  readonly maxPlayers: number;

  readonly leaderboardEligible: boolean;
}

/* =============================================================================
 * Supporting Value Objects
 * ============================================================================= */

/**
 * Individual DSM criterion.
 *
 * Designed to support future DSM revisions
 * without changing the surrounding models.
 */
export interface DSMCriterion {

  readonly id: UUID;

  /**
   * Criterion label.
   *
   * Example:
   * A
   * B
   * C
   */
  readonly code: string;

  /**
   * Official criterion text.
   */
  readonly description: string;

  /**
   * Whether this criterion
   * is mandatory.
   */
  readonly required: boolean;

}

/**
 * Educational memory aid.
 */
export interface MemoryAid {

  readonly title: string;

  readonly description: string;

}

/**
 * Common diagnostic pitfall.
 */
export interface ClinicalMistake {

  readonly title: string;

  readonly explanation: string;

}

/**
 * Helpful examination pearl.
 */
export interface ExamPearl {

  readonly title: string;

  readonly description: string;

}

/* =============================================================================
 * Domain Models
 * ============================================================================= */

/**
 * Diagnosis selectable by the learner.
 */
export interface DiagnosisOption {

  readonly id: DiagnosisId;

  /**
   * Diagnosis name.
   *
   * Example:
   * Major Depressive Disorder
   */
  readonly name: string;

  /**
   * Short educational summary.
   */
  readonly shortDescription: string;

  /**
   * Indicates whether this is
   * the primary correct diagnosis.
   */
  readonly isCorrect: boolean;

  /**
   * Used by adaptive scoring.
   *
   * Higher value means the learner
   * is closer to the correct answer.
   */
  readonly confidenceWeight: number;

}

/**
 * Differential diagnosis.
 *
 * Explains why another diagnosis
 * is less appropriate.
 */
export interface DifferentialDiagnosis {

  readonly diagnosis: DiagnosisOption;

  /**
   * Why this diagnosis is incorrect.
   */
  readonly exclusionReason: string;

  /**
   * Key distinguishing feature.
   */
  readonly distinguishingFeature: string;

}

/**
 * DSM educational explanation.
 *
 * Pure educational content.
 *
 * No runtime information belongs here.
 */
export interface DSMExplanation {

  /**
   * Overall summary.
   */
  readonly summary: string;

  /**
   * Official DSM criteria.
   */
  readonly criteria: ImmutableArray<DSMCriterion>;

  /**
   * Step-by-step clinical reasoning.
   */
  readonly clinicalReasoning: string;

  /**
   * Frequent learner mistakes.
   */
  readonly commonMistakes: ImmutableArray<ClinicalMistake>;

  /**
   * Memory tricks.
   */
  readonly memoryAids: ImmutableArray<MemoryAid>;

  /**
   * High-yield examination pearls.
   */
  readonly examPearls: ImmutableArray<ExamPearl>;

}

/* =============================================================================
 * Supporting Value Objects
 * ============================================================================= */

/**
 * Individual treatment recommendation.
 *
 * Designed to be reusable across:
 * - Learn Mode
 * - Story Cases
 * - AI Patient
 * - Practical Exams
 */
export interface TreatmentRecommendation {

  readonly id: TreatmentId;

  /**
   * Treatment modality.
   */
  readonly type: TreatmentType;

  /**
   * Recommendation title.
   */
  readonly title: string;

  /**
   * Educational explanation.
   */
  readonly description: string;

  /**
   * Whether this treatment is considered
   * first-line according to current guidelines.
   */
  readonly firstLine: boolean;

}

/**
 * Achievement unlocked after completing
 * a clinical case.
 */
export interface AchievementReward {

  readonly id: UUID;

  readonly title: string;

  readonly description: string;

}

/**
 * Unlockable educational content.
 */
export interface ContentUnlock {

  readonly id: UUID;

  readonly title: string;

  /**
   * Slug or identifier of unlocked content.
   */
  readonly target: string;

}

/* =============================================================================
 * Domain Models
 * ============================================================================= */

/**
 * Educational treatment plan.
 *
 * This is NOT a medical prescription.
 * It exists purely for learning purposes.
 */
export interface TreatmentPlan {

  /**
   * Recommended psychotherapies.
   */
  readonly psychotherapy:
    ImmutableArray<TreatmentRecommendation>;

  /**
   * Recommended medications.
   */
  readonly medications:
    ImmutableArray<TreatmentRecommendation>;

  /**
   * Lifestyle interventions.
   */
  readonly lifestyle:
    ImmutableArray<TreatmentRecommendation>;

  /**
   * Overall first-line management.
   */
  readonly firstLineManagement: string;

  /**
   * Expected prognosis.
   */
  readonly prognosis: string;

}

/**
 * Rewards granted after successfully
 * completing a case.
 */
export interface Reward {

  /**
   * Experience points.
   */
  readonly xp: number;

  /**
   * Virtual currency.
   */
  readonly coins: number;

  /**
   * Achievement unlocks.
   */
  readonly achievements:
    ImmutableArray<AchievementReward>;

  /**
   * Newly unlocked learning content.
   */
  readonly unlockedContent:
    ImmutableArray<ContentUnlock>;

}

/**
 * Aggregate analytics for a clinical case.
 *
 * Generated by the platform.
 *
 * Never directly edited by users.
 */
export interface ClinicalAnalytics {

  /**
   * Total number of plays.
   */
  readonly totalAttempts: number;

  /**
   * Completion percentage.
   *
   * Range:
   * 0–100
   */
  readonly completionRate: number;

  /**
   * Average hint usage.
   */
  readonly averageHintsUsed: number;

  /**
   * Average completion time
   * in seconds.
   */
  readonly averageCompletionTime: number;

  /**
   * Percentage of learners
   * selecting the correct diagnosis.
   *
   * Range:
   * 0–100
   */
  readonly correctDiagnosisRate: number;

  /**
   * Average learner score.
   *
   * Range:
   * 0–100
   */
  readonly averageScore: number;

}

/* =============================================================================
 * Clinical Aggregate Root
 * ============================================================================= */

/**
 * ClinicalCase
 * -----------------------------------------------------------------------------
 * The root aggregate of the Psychora Clinical Engine.
 *
 * Every clinical learning experience is built upon this model:
 *
 * • DSM Detective
 * • Story Cases
 * • Clinical Quiz
 * • Practical Exams
 * • AI Patient
 * • Daily Clinical Case
 * • Future Multiplayer
 * *
 * This model is intentionally immutable and framework-independent.
 *
 * User-specific runtime data (progress, attempts, sessions, etc.)
 * MUST NOT be stored here.
 */
export interface ClinicalCase extends Entity<CaseMetadata> {

  /* --------------------------------------------------------------------------
   * Case Metadata
   * ------------------------------------------------------------------------ */

  /**
   * Static descriptive metadata.
   */
  readonly metadata: CaseMetadata;

  /* --------------------------------------------------------------------------
   * Patient Information
   * ------------------------------------------------------------------------ */

  /**
   * Patient demographics.
   */
  readonly patient: PatientProfile;

  /**
   * Clinical background.
   */
  readonly history: ClinicalHistory;

  /* --------------------------------------------------------------------------
   * Clinical Presentation
   * ------------------------------------------------------------------------ */

  /**
   * Observable symptoms.
   */
  readonly symptoms: ImmutableArray<Symptom>;

  /**
   * Clinical timeline.
   */
  readonly timeline: ImmutableArray<TimelineEvent>;

  /**
   * Progressive hint system.
   */
  readonly hints: ImmutableArray<ClinicalHint>;

  /* --------------------------------------------------------------------------
   * Diagnosis
   * ------------------------------------------------------------------------ */

  /**
   * Available diagnoses presented
   * to the learner.
   */
  readonly diagnosisOptions:
    ImmutableArray<DiagnosisOption>;

  /**
   * Primary diagnosis.
   *
   * This references one of the
   * diagnosis options.
   */
  readonly correctDiagnosis: DiagnosisId;

  /**
   * Alternative diagnoses.
   */
  readonly differentialDiagnoses:
    ImmutableArray<DifferentialDiagnosis>;

  /**
   * Educational DSM explanation.
   */
  readonly dsmExplanation: DSMExplanation;

  /* --------------------------------------------------------------------------
   * Educational Treatment
   * ------------------------------------------------------------------------ */

  /**
   * Educational treatment guidance.
   */
  readonly treatmentPlan: TreatmentPlan;

  /* --------------------------------------------------------------------------
   * Rewards
   * ------------------------------------------------------------------------ */

  /**
   * Rewards earned after
   * successful completion.
   */
  readonly reward: Reward;

  /* --------------------------------------------------------------------------
   * Analytics
   * ------------------------------------------------------------------------ */

  /**
   * Aggregate platform analytics.
   *
   * Read-only.
   */
  readonly analytics: ClinicalAnalytics;

  /* --------------------------------------------------------------------------
   * Feature Configuration
   * ------------------------------------------------------------------------ */

  /**
   * AI Patient compatibility.
   */
  readonly ai: AIConfiguration;

  /**
   * Voice interview support.
   */
  readonly voice: VoiceInterviewSupport;

  /**
   * Story Mode configuration.
   */
  readonly story: StoryConfiguration;

  /**
   * Multiplayer configuration.
   */
  readonly multiplayer: MultiplayerConfiguration;

}

/* =============================================================================
 * APPLICATION TYPES
 * ============================================================================= */

/**
 * Individual attempt made by a learner.
 */
export interface CaseAttempt {

  readonly id: AttemptId;

  readonly caseId: CaseId;

  readonly selectedDiagnosisId: DiagnosisId;

  readonly result: DiagnosisResult;

  /**
   * Score (0–100)
   */
  readonly score: number;

  /**
   * Time taken (seconds)
   */
  readonly timeTaken: number;

  /**
   * Hints consumed.
   */
  readonly hintsUsed: number;

  /**
   * XP earned from this attempt.
   */
  readonly earnedXP: number;

  readonly completedAt: ISODateString;

}

/**
 * User-specific progress.
 *
 * Never embedded inside ClinicalCase.
 */
export interface UserCaseProgress {

  readonly userId: UserId;

  readonly caseId: CaseId;

  readonly status: ProgressStatus;

  readonly completed: boolean;

  readonly mastered: boolean;

  readonly totalAttempts: number;

  readonly bestScore: number;

  readonly totalXP: number;

  readonly totalHintsUsed: number;

  /**
   * Seconds
   */
  readonly bestTime: number;

  readonly lastAttempt: CaseAttempt | null;

  readonly lastPlayedAt: ISODateString | null;

}

/**
 * Runtime session.
 *
 * Exists only while the learner
 * is solving a case.
 */
export interface GameSession {

  readonly id: SessionId;

  readonly caseId: CaseId;

  readonly currentHintIndex: number;

  readonly selectedDiagnosisId: DiagnosisId | null;

  readonly earnedXP: number;

  readonly remainingAttempts: number;

  readonly startedAt: ISODateString;

  readonly endedAt: ISODateString | null;

}

/* =============================================================================
 * API CONTRACTS
 * ============================================================================= */

/**
 * Submit diagnosis request.
 */
export interface SubmitDiagnosisPayload {

  readonly apiVersion: number;

  readonly caseId: CaseId;

  readonly diagnosisId: DiagnosisId;

  /**
   * Seconds
   */
  readonly timeTaken: number;

  readonly usedHints: number;

}

/**
 * Diagnosis submission response.
 */
export interface SubmitDiagnosisResponse {

  readonly correct: boolean;

  readonly earnedXP: number;

  readonly streak: number;

  readonly explanation: DSMExplanation;

  readonly updatedProgress: UserCaseProgress;

  readonly nextHint: ClinicalHint | null;

}

/**
 * Unlock hint request.
 */
export interface UnlockHintPayload {

  readonly apiVersion: number;

  readonly caseId: CaseId;

  readonly hintId: HintId;

}

/**
 * Unlock hint response.
 */
export interface UnlockHintResponse {

  readonly unlockedHint: ClinicalHint;

  readonly xpPenalty: number;

  readonly remainingXP: number;

}

/* =============================================================================
 * ENGINE STATE
 * ============================================================================= */

/**
 * Runtime engine status.
 */
export enum ClinicalEngineStatus {

  Idle = "IDLE",

  Loading = "LOADING",

  Ready = "READY",

  Playing = "PLAYING",

  Completed = "COMPLETED",

  Error = "ERROR",

}

/**
 * Shared runtime state.
 *
 * Framework independent.
 */
export interface ClinicalEngineState<TError = string> {

  readonly currentCase: ClinicalCase | null;

  readonly progress: UserCaseProgress | null;

  readonly session: GameSession | null;

  readonly status: ClinicalEngineStatus;

  readonly loading: boolean;

  readonly error: TError | null;

}
