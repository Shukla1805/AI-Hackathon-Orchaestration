import { useState } from "react";

/* ─────────────────────────────────────────────
   APPROVAL CARD DATA
───────────────────────────────────────────── */
const APPROVAL_CARDS = [
  {
    id: "team-formation",
    type: "Team Formation",
    icon: "teams",
    accentColor: "indigo",
    summary:
      "Teams were generated using skill balancing, experience distribution, and institution diversity rules. No major rule violations detected.",
    meta: [
      { label: "Teams Generated", value: "12" },
      { label: "Participants Assigned", value: "46" },
      { label: "Compliance Score", value: "96%" },
    ],
    ai: { recommendation: "Approve", confidence: 94 },
    details: {
      rulesApplied: [
        "Skill Complementarity",
        "Experience Distribution",
        "Institution Diversity",
        "Min Team Size ≥ 3",
      ],
      complianceScore: "96%",
      aiSummary:
        "All 12 teams meet the minimum size requirement of 3. Skill distribution across teams is within ±12% of the ideal balance. No institution has more than 2 members in the same team. One team (Team Nexus) has a slightly higher ML concentration — flagged but within acceptable limits.",
    },
  },
  {
    id: "communication",
    type: "Communication",
    icon: "message",
    accentColor: "violet",
    summary:
      "Team Assignment Notifications ready for delivery to 46 participants across email and SMS channels.",
    meta: [
      { label: "Communication Type", value: "Team Assignment" },
      { label: "Recipients", value: "46" },
      { label: "Draft Status", value: "Ready" },
    ],
    ai: { recommendation: "Approve", confidence: 99 },
    details: {
      subject: "EventFlow — Your Team Assignment is Ready",
      preview:
        "Hi {name},\n\nYou've been assigned to Team {team_name} for EventFlow 2025!\n\nYour teammates: {members}\nDomain focus: {domain}\n\nPlease connect with your team and review the problem statement by 6:00 PM today.\n\nBest,\nEventFlow Organizers",
      recipientCount: 46,
      channels: ["Email", "SMS"],
    },
  },
  {
    id: "score-anomaly",
    type: "Score Anomaly",
    icon: "warning",
    accentColor: "amber",
    summary:
      "Large score variance detected between evaluators for Team DataStorm. Manual review recommended before finalizing.",
    meta: [
      { label: "Team Flagged", value: "DataStorm" },
      { label: "Score Variance", value: "38 pts" },
      { label: "Judges Affected", value: "1 of 3" },
    ],
    ai: { recommendation: "Review", confidence: 87 },
    details: {
      scores: [
        {
          judge: "Judge A — Priya Mehta",
          score: 88,
          breakdown: "Innovation: 90 · Execution: 85 · Impact: 89",
        },
        {
          judge: "Judge B — Arjun Das",
          score: 50,
          breakdown: "Innovation: 48 · Execution: 55 · Impact: 47",
          flagged: true,
        },
        {
          judge: "Judge C — Neha Sharma",
          score: 82,
          breakdown: "Innovation: 84 · Execution: 80 · Impact: 82",
        },
      ],
      avgScore: "73.3",
      aiAnalysis:
        "Judge B's scores are 38 points below the average of the other two judges. The deviation exceeds the accepted ±20 point threshold. Possible causes: rubric misinterpretation, domain unfamiliarity, or evaluator bias. Recommend organizer review before score is finalized.",
    },
  },
  {
    id: "results",
    type: "Results Publication",
    icon: "trophy",
    accentColor: "emerald",
    summary:
      "Leaderboard finalized across all 10 teams. All scores verified and rankings are stable. Ready for publication.",
    meta: [
      { label: "Leaderboard Status", value: "Finalized" },
      { label: "Qualified Teams", value: "10 / 10" },
      { label: "Publication Status", value: "Ready" },
    ],
    ai: { recommendation: "Approve", confidence: 97 },
    details: {
      topTeams: [
        { rank: 1, name: "Neural Nexus", score: "91.2", domain: "AI/ML" },
        { rank: 2, name: "MediSync", score: "88.7", domain: "HealthTech" },
        { rank: 3, name: "VisionX", score: "86.4", domain: "AI/ML" },
        { rank: 4, name: "EduBot", score: "84.1", domain: "EdTech" },
        { rank: 5, name: "DataStorm", score: "73.3", domain: "Data Science" },
      ],
      scoreSummary: { highest: "91.2", lowest: "61.0", average: "79.4" },
      publicationReady: true,
    },
  },
];

/* ─────────────────────────────────────────────
   ACCENT PALETTE
───────────────────────────────────────────── */
const ACCENT = {
  indigo: {
    iconBg: "bg-indigo-500/15",
    iconText: "text-indigo-400",
    border: "border-indigo-500/30",
    activeBg: "bg-indigo-500/8",
    approveBtn:
      "bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-500/30 text-indigo-300",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  violet: {
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-400",
    border: "border-violet-500/30",
    activeBg: "bg-violet-500/8",
    approveBtn:
      "bg-violet-500/15 hover:bg-violet-500/25 border-violet-500/30 text-violet-300",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  amber: {
    iconBg: "bg-amber-500/15",
    iconText: "text-amber-400",
    border: "border-amber-500/30",
    activeBg: "bg-amber-500/8",
    approveBtn:
      "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  emerald: {
    iconBg: "bg-emerald-500/15",
    iconText: "text-emerald-400",
    border: "border-emerald-500/30",
    activeBg: "bg-emerald-500/8",
    approveBtn:
      "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function Icon({ name, size = 18 }) {
  const s = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "teams")
    return (
      <svg {...s}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (name === "message")
    return (
      <svg {...s}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  if (name === "warning")
    return (
      <svg {...s}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  if (name === "trophy")
    return (
      <svg {...s}>
        <polyline points="8 6 2 6 2 12 8 12" />
        <polyline points="16 6 22 6 22 12 16 12" />
        <path d="M12 2v10" />
        <path d="M8 12c0 4 2 6 4 8" />
        <path d="M16 12c0 4-2 6-4 8" />
        <path d="M8 22h8" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...s}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  if (name === "x")
    return (
      <svg {...s}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  if (name === "eye")
    return (
      <svg {...s}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  if (name === "bolt")
    return (
      <svg {...s}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  if (name === "chevron")
    return (
      <svg {...s} strokeWidth="2.5">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  return null;
}

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (status === "Approved")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
        <Icon name="check" size={9} />
        Approved
      </span>
    );
  if (status === "Rejected")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 whitespace-nowrap">
        <Icon name="x" size={9} />
        Rejected
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
      </span>
      Pending
    </span>
  );
}

/* ─────────────────────────────────────────────
   AI BADGE
───────────────────────────────────────────── */
function AiBadge({ recommendation, confidence }) {
  const isApprove = recommendation === "Approve";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border whitespace-nowrap ${isApprove ? "bg-emerald-500/8 text-emerald-400 border-emerald-500/20" : "bg-amber-500/8 text-amber-400 border-amber-500/20"}`}
    >
      <Icon name="bolt" size={9} />
      AI: {recommendation} · {confidence}%
    </span>
  );
}

/* ─────────────────────────────────────────────
   DETAIL PANEL CONTENTS
───────────────────────────────────────────── */
function TeamFormationDetails({ details, accent }) {
  const a = ACCENT[accent];
  return (
    <div className="space-y-3 pt-3 border-t border-slate-700/50">
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
            Rules Applied
          </p>
          <div className="space-y-1.5">
            {details.rulesApplied.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.iconText.replace("text-", "bg-")}`}
                />
                <span className="text-slate-300 text-[12px]">{r}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
            Compliance Score
          </p>
          <div
            className={`inline-flex items-center text-[22px] font-bold ${a.iconText}`}
          >
            {details.complianceScore}
          </div>
          <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden w-full">
            <div
              className={`h-full rounded-full ${a.iconBg.replace("/15", "")} bg-current`}
              style={{ width: details.complianceScore, opacity: 0.7 }}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
          AI Summary
        </p>
        <p className="text-slate-300 text-[12.5px] leading-relaxed bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
          {details.aiSummary}
        </p>
      </div>
    </div>
  );
}

function CommunicationDetails({ details }) {
  return (
    <div className="space-y-3 pt-3 border-t border-slate-700/50">
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
            Message Subject
          </p>
          <p className="text-slate-200 text-[12.5px] font-medium">
            {details.subject}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
            Recipients & Channels
          </p>
          <p className="text-slate-200 text-[12.5px] font-semibold">
            {details.recipientCount} people
          </p>
          <div className="flex gap-1.5 mt-1">
            {details.channels.map((c) => (
              <span
                key={c}
                className="text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
          Message Preview
        </p>
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 text-slate-300 text-[12px] leading-relaxed font-mono whitespace-pre-line">
          {details.preview}
        </div>
      </div>
    </div>
  );
}

function ScoreAnomalyDetails({ details }) {
  return (
    <div className="space-y-3 pt-3 border-t border-slate-700/50">
      <div>
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
          Individual Judge Scores
        </p>
        <div className="space-y-2">
          {details.scores.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 border ${s.flagged ? "bg-rose-500/5 border-rose-500/20" : "bg-slate-800/60 border-slate-700/40"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p
                  className={`text-[12.5px] font-semibold ${s.flagged ? "text-rose-300" : "text-slate-200"}`}
                >
                  {s.judge}
                </p>
                <div className="flex items-center gap-2">
                  {s.flagged && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/25">
                      Flagged
                    </span>
                  )}
                  <span
                    className={`text-[16px] font-bold tabular-nums ${s.flagged ? "text-rose-400" : "text-white"}`}
                  >
                    {s.score}
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-[11px]">{s.breakdown}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-slate-800/60 rounded-xl p-3 flex-1 text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
            Average Score
          </p>
          <p className="text-white text-[18px] font-bold tabular-nums">
            {details.avgScore}
          </p>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-3 flex-1 text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
            Max Deviation
          </p>
          <p className="text-rose-400 text-[18px] font-bold tabular-nums">
            38 pts
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2.5 p-3 bg-amber-500/8 border border-amber-500/20 rounded-xl">
        <Icon name="warning" size={13} />
        <p className="text-amber-300 text-[12px] leading-relaxed">
          {details.aiAnalysis}
        </p>
      </div>
    </div>
  );
}

function ResultsDetails({ details }) {
  const medals = ["🥇", "🥈", "🥉", "4th", "5th"];
  return (
    <div className="space-y-3 pt-3 border-t border-slate-700/50">
      <div>
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
          Top Ranked Teams
        </p>
        <div className="space-y-1.5">
          {details.topTeams.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-slate-800/60 rounded-xl px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[13px] w-6">{medals[i]}</span>
                <div>
                  <p className="text-slate-200 text-[12.5px] font-semibold">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-[10.5px]">{t.domain}</p>
                </div>
              </div>
              <span className="text-white text-[14px] font-bold tabular-nums">
                {t.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          {
            label: "Highest",
            value: details.scoreSummary.highest,
            cls: "text-emerald-400",
          },
          {
            label: "Average",
            value: details.scoreSummary.average,
            cls: "text-slate-200",
          },
          {
            label: "Lowest",
            value: details.scoreSummary.lowest,
            cls: "text-rose-400",
          },
        ].map((s, i) => (
          <div key={i} className="bg-slate-800/60 rounded-xl p-3 text-center">
            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
              {s.label}
            </p>
            <p className={`text-[17px] font-bold tabular-nums ${s.cls}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl">
        <Icon name="check" size={13} />
        <p className="text-emerald-300 text-[12px] font-medium">
          All scores verified. Publication readiness confirmed.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SINGLE APPROVAL CARD
───────────────────────────────────────────── */
function ApprovalCard({ card, status, onApprove, onReject }) {
  const [open, setOpen] = useState(false);
  const a = ACCENT[card.accentColor];
  const isPending = status === "Pending";
  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";

  const detailContent = {
    "team-formation": (
      <TeamFormationDetails details={card.details} accent={card.accentColor} />
    ),
    communication: <CommunicationDetails details={card.details} />,
    "score-anomaly": <ScoreAnomalyDetails details={card.details} />,
    results: <ResultsDetails details={card.details} />,
  }[card.id];

  const approveLabel = {
    "team-formation": "Approve Formation",
    communication: "Approve & Send",
    "score-anomaly": "Approve Resolution",
    results: "Approve Publication",
  }[card.id];

  const rejectLabel =
    {
      "score-anomaly": "Flag for Review",
      results: "Hold Publication",
    }[card.id] || "Reject";

  return (
    <div
      className={`bg-slate-900 border rounded-2xl transition-all duration-200 ${
        isApproved
          ? "border-emerald-500/30"
          : isRejected
            ? "border-rose-500/25"
            : open
              ? `${a.border}`
              : "border-slate-800 hover:border-slate-700"
      }`}
    >
      <div className="p-5">
        {/* Card header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.iconBg} ${a.iconText}`}
            >
              <Icon name={card.icon} size={19} />
            </div>
            <div>
              <p className="text-white font-semibold text-[14px] leading-tight">
                {card.type}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <StatusBadge status={status} />
                <AiBadge
                  recommendation={card.ai.recommendation}
                  confidence={card.ai.confidence}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-slate-400 text-[12.5px] leading-relaxed mb-4">
          {card.summary}
        </p>

        {/* Meta chips */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {card.meta.map((m, i) => (
            <div key={i} className="bg-slate-800/60 rounded-xl p-2.5">
              <p className="text-slate-500 text-[9.5px] uppercase tracking-wider font-semibold mb-1 leading-tight">
                {m.label}
              </p>
              <p className={`text-[13px] font-bold ${a.iconText}`}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* View Details toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-semibold transition-all duration-200 ${
              open
                ? `${a.approveBtn.split(" ")[0]} ${a.approveBtn.split(" ")[1]} border-current ${a.iconText}`
                : "bg-slate-800/70 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600"
            }`}
          >
            <Icon name="eye" size={12} />
            {open ? "Hide" : "View Details"}
            <span
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              <Icon name="chevron" size={10} />
            </span>
          </button>

          {/* Primary action */}
          {isPending && (
            <>
              <button
                onClick={onApprove}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[12px] font-semibold transition-colors"
              >
                <Icon name="check" size={11} />
                {approveLabel}
              </button>
              <button
                onClick={onReject}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/70 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 text-[12px] font-semibold transition-all"
              >
                <Icon name="x" size={11} />
                {rejectLabel}
              </button>
            </>
          )}

          {/* Post-action label */}
          {!isPending && (
            <p
              className={`text-[12px] font-medium ml-1 ${isApproved ? "text-emerald-500/80" : "text-rose-500/80"}`}
            >
              {isApproved ? "Action approved and queued." : "Action rejected."}
            </p>
          )}
        </div>
      </div>

      {/* Expandable details */}
      {open && (
        <div
          className={`mx-5 mb-5 p-4 rounded-xl border ${a.activeBg} ${a.border}`}
        >
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
            Detailed Review
          </p>
          {detailContent}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   Usage: {active === "approvals" && <Approvals />}
═══════════════════════════════════════════════ */
export default function Approvals() {
  const [statuses, setStatuses] = useState({
    "team-formation": "Pending",
    communication: "Pending",
    "score-anomaly": "Pending",
    results: "Pending",
  });

  const approve = (id) => setStatuses((s) => ({ ...s, [id]: "Approved" }));
  const reject = (id) => setStatuses((s) => ({ ...s, [id]: "Rejected" }));

  const counts = {
    pending: Object.values(statuses).filter((s) => s === "Pending").length,
    approved: Object.values(statuses).filter((s) => s === "Approved").length,
    rejected: Object.values(statuses).filter((s) => s === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="space-y-4">
        {/* ── Section header ── */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <h2 className="text-white font-semibold text-[15px]">
                Pending Approvals
              </h2>
              {counts.pending > 0 && (
                <span className="flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                  </span>
                  {counts.pending} pending
                </span>
              )}
            </div>
            <p className="text-slate-500 text-[12px]">
              AI-generated actions awaiting committee review and approval
            </p>
          </div>

          {/* Summary pills */}
          <div className="hidden sm:flex items-center gap-2">
            {counts.approved > 0 && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {counts.approved} approved
              </span>
            )}
            {counts.rejected > 0 && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                {counts.rejected} rejected
              </span>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium">
            <Icon name="bolt" size={11} />
            AI assists · Humans approve
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* ── 4 Approval cards — 2-column responsive grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {APPROVAL_CARDS.map((card) => (
            <ApprovalCard
              key={card.id}
              card={card}
              status={statuses[card.id]}
              onApprove={() => approve(card.id)}
              onReject={() => reject(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
