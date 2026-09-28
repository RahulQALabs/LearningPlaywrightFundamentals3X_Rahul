/**
 * Self-heal report types.
 *
 * When a locator fails, a self-heal agent proposes replacement selectors that
 * resolve to exactly one element. The verified candidates are attached to the
 * test as a `self-heal` JSON attachment, which CustomReporter reads to render
 * the Self-Heal tab. Nothing is rewritten automatically - these are suggestions.
 */

export interface HealCandidate {
    /** The proposed replacement selector. */
    selector: string;
    /** How the selector was derived, e.g. 'role' or 'text'. */
    strategy: string;
    /** Number of elements the selector matched against the live page. */
    matchCount: number;
    /** Whether the matched element was visible. */
    visible: boolean;
    /** Why the agent believes this candidate is the right one. */
    reasoning: string;
}

export interface HealRejection {
    /** A candidate that was discarded. */
    selector: string;
    /** Why it was rejected, e.g. 'matched 3 elements'. */
    reason: string;
}

export interface HealReport {
    /** The locator that failed. */
    failedSelector: string;
    /** What the step was trying to do. */
    intent: string;
    /** Candidates that resolved to exactly one element. */
    verified: HealCandidate[];
    /** Candidates that were discarded. */
    rejected: HealRejection[];
    /** Set when the self-heal agent could not run (e.g. no API key). */
    unavailableReason?: string;
}
