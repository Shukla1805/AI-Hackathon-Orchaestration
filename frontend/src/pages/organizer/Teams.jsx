import { useState } from "react";
/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const TEAMS = [
  {
    id: 1,
    name: "Neural Nexus",
    domain: "AI/ML",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      { name: "Aarav Mehta", role: "Lead", skills: ["React", "Python", "ML"] },
      { name: "Meera Iyer", role: "ML Eng", skills: ["NLP", "Transformers"] },
      { name: "Karan Joshi", role: "Backend", skills: ["Go", "Kubernetes"] },
      { name: "Priya Nair", role: "Designer", skills: ["UI/UX", "Figma"] },
    ],
  },
  {
    id: 2,
    name: "ByteForge",
    domain: "Web3",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      { name: "Rahul Gupta", role: "Lead", skills: ["Blockchain", "Solidity"] },
      { name: "Ishaan Roy", role: "Backend", skills: ["Rust", "WebAssembly"] },
      { name: "Tanmay Shah", role: "Backend", skills: ["Go", "Docker"] },
    ],
  },
  {
    id: 3,
    name: "Pixel Pilots",
    domain: "AR/VR",
    submissionStatus: "In Progress",
    teamStatus: "Pending",
    members: [
      {
        name: "Simran Kaur",
        role: "Lead",
        skills: ["UI/UX", "Figma", "Vue.js"],
      },
      { name: "Ananya Kulkarni", role: "Dev", skills: ["React", "GraphQL"] },
      { name: "Diya Sharma", role: "Backend", skills: ["Node.js", "MongoDB"] },
      { name: "Vikram Bose", role: "DevOps", skills: ["C++", "Algorithms"] },
    ],
  },
  {
    id: 4,
    name: "DataStorm",
    domain: "Data Science",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      {
        name: "Sneha Patel",
        role: "Lead",
        skills: ["Data Science", "Pandas", "SQL"],
      },
      {
        name: "Nikhil Desai",
        role: "ML Eng",
        skills: ["Python", "NLP", "FastAPI"],
      },
      {
        name: "Rohan Verma",
        role: "Frontend",
        skills: ["Flutter", "Firebase"],
      },
    ],
  },
  {
    id: 5,
    name: "CloudCraft",
    domain: "DevOps",
    submissionStatus: "Not Started",
    teamStatus: "Pending",
    members: [
      {
        name: "Arjun Singh",
        role: "Lead",
        skills: ["Go", "Kubernetes", "Docker"],
      },
      {
        name: "Kavya Reddy",
        role: "Dev",
        skills: ["React", "GraphQL", "Firebase"],
      },
    ],
  },
  {
    id: 6,
    name: "VisionX",
    domain: "AI/ML",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      {
        name: "Ishaan Roy",
        role: "Lead",
        skills: ["Computer Vision", "OpenCV", "ML"],
      },
      { name: "Aarav Mehta", role: "Backend", skills: ["Python", "FastAPI"] },
      {
        name: "Meera Iyer",
        role: "ML Eng",
        skills: ["NLP", "Transformers", "Python"],
      },
      { name: "Karan Joshi", role: "Infra", skills: ["Rust", "WebAssembly"] },
    ],
  },
  {
    id: 7,
    name: "FinFlow",
    domain: "Fintech",
    submissionStatus: "In Progress",
    teamStatus: "Pending",
    members: [
      { name: "Rahul Gupta", role: "Lead", skills: ["Blockchain", "Solidity"] },
      { name: "Tanmay Shah", role: "Backend", skills: ["Rust", "Algorithms"] },
      { name: "Sneha Patel", role: "Data", skills: ["Data Science", "SQL"] },
    ],
  },
  {
    id: 8,
    name: "EduBot",
    domain: "EdTech",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      { name: "Simran Kaur", role: "Lead", skills: ["UI/UX", "Figma"] },
      {
        name: "Nikhil Desai",
        role: "Backend",
        skills: ["Python", "FastAPI", "NLP"],
      },
      {
        name: "Ananya Kulkarni",
        role: "Frontend",
        skills: ["Vue.js", "GraphQL"],
      },
    ],
  },
  {
    id: 9,
    name: "GreenGrid",
    domain: "CleanTech",
    submissionStatus: "Not Started",
    teamStatus: "Pending",
    members: [
      { name: "Diya Sharma", role: "Lead", skills: ["Node.js", "MongoDB"] },
      { name: "Vikram Bose", role: "Backend", skills: ["C++", "Algorithms"] },
    ],
  },
  {
    id: 10,
    name: "MediSync",
    domain: "HealthTech",
    submissionStatus: "Submitted",
    teamStatus: "Approved",
    members: [
      {
        name: "Kavya Reddy",
        role: "Lead",
        skills: ["React", "GraphQL", "Firebase"],
      },
      { name: "Arjun Singh", role: "Backend", skills: ["Go", "Kubernetes"] },
      {
        name: "Priya Nair",
        role: "Design",
        skills: ["UI/UX", "Figma", "React"],
      },
      { name: "Rohan Verma", role: "Mobile", skills: ["Flutter", "Firebase"] },
    ],
  },
];

const DOMAINS = [
  "All",
  "AI/ML",
  "Web3",
  "AR/VR",
  "Data Science",
  "DevOps",
  "Fintech",
  "EdTech",
  "CleanTech",
  "HealthTech",
];

const SKILL_COLORS = {
  React: "bg-cyan-500/15    text-cyan-400    border-cyan-500/25",
  Python: "bg-yellow-500/15  text-yellow-400  border-yellow-500/25",
  ML: "bg-violet-500/15  text-violet-400  border-violet-500/25",
  "Node.js": "bg-green-500/15   text-green-400   border-green-500/25",
  MongoDB: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Docker: "bg-sky-600/15     text-sky-400     border-sky-600/25",
  Flutter: "bg-blue-500/15    text-blue-400    border-blue-500/25",
  Firebase: "bg-orange-500/15  text-orange-400  border-orange-500/25",
  "UI/UX": "bg-pink-500/15    text-pink-400    border-pink-500/25",
  Figma: "bg-purple-500/15  text-purple-400  border-purple-500/25",
  Rust: "bg-red-500/15     text-red-400     border-red-500/25",
  WebAssembly: "bg-indigo-500/15  text-indigo-400  border-indigo-500/25",
  Go: "bg-teal-500/15    text-teal-400    border-teal-500/25",
  Kubernetes: "bg-blue-600/15    text-blue-300    border-blue-600/25",
  "Data Science": "bg-teal-600/15    text-teal-400    border-teal-600/25",
  Pandas: "bg-amber-500/15   text-amber-400   border-amber-500/25",
  SQL: "bg-lime-500/15    text-lime-400    border-lime-500/25",
  NLP: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25",
  Transformers: "bg-violet-600/15  text-violet-400  border-violet-600/25",
  "C++": "bg-slate-500/20   text-slate-300   border-slate-500/30",
  Algorithms: "bg-zinc-500/20    text-zinc-300    border-zinc-500/30",
  "Vue.js": "bg-green-600/15   text-green-400   border-green-600/25",
  GraphQL: "bg-pink-600/15    text-pink-400    border-pink-600/25",
  Blockchain: "bg-orange-600/15  text-orange-400  border-orange-600/25",
  Solidity: "bg-gray-500/20    text-gray-300    border-gray-500/30",
  "Computer Vision": "bg-rose-500/15    text-rose-400    border-rose-500/25",
  OpenCV: "bg-red-600/15     text-red-400     border-red-600/25",
  FastAPI: "bg-emerald-600/15 text-emerald-400 border-emerald-600/25",
};

const DOMAIN_COLORS = {
  "AI/ML": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Web3: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "AR/VR": "bg-cyan-500/10   text-cyan-400   border-cyan-500/20",
  "Data Science": "bg-teal-500/10   text-teal-400   border-teal-500/20",
  DevOps: "bg-sky-500/10    text-sky-400    border-sky-500/20",
  Fintech: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  EdTech: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  CleanTech: "bg-green-500/10  text-green-400  border-green-500/20",
  HealthTech: "bg-rose-500/10   text-rose-400   border-rose-500/20",
};

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-indigo-600",
  "from-fuchsia-500 to-pink-600",
];

const PAGE_SIZE = 7;

/* ── helpers ── */
function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function avatarGrad(str) {
  let h = 0;
  for (let c of str) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

function SkillBadge({ skill }) {
  const cls =
    SKILL_COLORS[skill] || "bg-slate-700/50 text-slate-300 border-slate-600/30";
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border whitespace-nowrap ${cls}`}
    >
      {skill}
    </span>
  );
}

function DomainBadge({ domain }) {
  const cls =
    DOMAIN_COLORS[domain] ||
    "bg-slate-700/50 text-slate-300 border-slate-600/30";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-lg border whitespace-nowrap ${cls}`}
    >
      {domain}
    </span>
  );
}

function MiniAvatar({ name, size = "sm" }) {
  const sz = size === "md" ? "w-7 h-7 text-[10px]" : "w-6 h-6 text-[9px]";
  return (
    <div
      className={`${sz} rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-gradient-to-br ${avatarGrad(name)} ring-1 ring-slate-950`}
    >
      {initials(name)}
    </div>
  );
}

function FilterSelect({ icon, value, onChange, options }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-7 py-2.5 text-[13px] text-slate-200 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-colors cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

function StatusBadge({ value }) {
  if (value === "Approved")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Approved
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
      </span>
      Pending
    </span>
  );
}

function SubmissionBadge({ value }) {
  const map = {
    Submitted: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "In Progress": "bg-sky-500/10    text-sky-400    border-sky-500/20",
    "Not Started": "bg-slate-700/50  text-slate-400  border-slate-600/40",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg border whitespace-nowrap ${map[value] || map["Not Started"]}`}
    >
      {value}
    </span>
  );
}

/* ── Detail panel ── */
function DetailPanel({ team, onClose }) {
  const allSkills = [...new Set(team.members.flatMap((m) => m.skills))];
  return (
    <div className="col-span-12 bg-slate-800/50 border border-indigo-500/20 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold text-white bg-gradient-to-br ${avatarGrad(team.name)}`}
          >
            {team.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-[14px] font-semibold">{team.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <DomainBadge domain={team.domain} />
              <StatusBadge value={team.teamStatus} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Members */}
        <div className="sm:col-span-1">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
            Members ({team.members.length})
          </p>
          <div className="space-y-2">
            {team.members.map((m, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <MiniAvatar name={m.name} size="md" />
                <div className="min-w-0">
                  <p className="text-slate-200 text-[12px] font-medium truncate">
                    {m.name}
                  </p>
                  <p className="text-slate-500 text-[10.5px]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="sm:col-span-1">
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
            Skills Distribution
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allSkills.map((s) => (
              <SkillBadge key={s} skill={s} />
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="sm:col-span-1 space-y-3">
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
              Domain Interest
            </p>
            <DomainBadge domain={team.domain} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
              Submission Status
            </p>
            <SubmissionBadge value={team.submissionStatus} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
              Review Status
            </p>
            <StatusBadge value={team.teamStatus} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-1">
              Team Size
            </p>
            <p className="text-slate-200 text-[12.5px] font-semibold">
              {team.members.length} members
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-700/50">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[12px] font-semibold transition-colors">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Approve Team
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 text-[12px] font-semibold transition-colors">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
          </svg>
          Edit Team
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-rose-500/10 border border-slate-600/60 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 text-[12px] font-semibold transition-all">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Reject
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   Usage in App.jsx:  {active === "teams" && <Teams />}
═══════════════════════════════════════════════ */
export default function Teams() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [page, setPage] = useState(1);

  const resetPage = () => setPage(1);

  /* Derived counts */
  const total = TEAMS.length;
  const approved = TEAMS.filter((t) => t.teamStatus === "Approved").length;
  const pending = TEAMS.filter((t) => t.teamStatus === "Pending").length;
  const submitted = TEAMS.filter(
    (t) => t.submissionStatus === "Submitted",
  ).length;

  /* Filtered list */
  const filtered = TEAMS.filter((t) => {
    const q = search.toLowerCase();
    return (
      (t.name.toLowerCase().includes(q) ||
        t.domain.toLowerCase().includes(q)) &&
      (statusFilter === "All" || t.teamStatus === statusFilter) &&
      (domainFilter === "All" || t.domain === domainFilter)
    );
  });

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="space-y-3">
        {/* ── Search + filters ── */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Search by team name or domain…"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
            />
          </div>

          {/* Status filter */}
          <FilterSelect
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            }
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              resetPage();
            }}
            options={[
              { value: "All", label: "All Status" },
              { value: "Approved", label: "Approved" },
              { value: "Pending", label: "Pending Review" },
            ]}
          />

          {/* Domain filter */}
          <FilterSelect
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            value={domainFilter}
            onChange={(v) => {
              setDomainFilter(v);
              resetPage();
            }}
            options={DOMAINS.map((d) => ({
              value: d,
              label: d === "All" ? "All Domains" : d,
            }))}
          />

          {/* Clear */}
          {(search || statusFilter !== "All" || domainFilter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setDomainFilter("All");
                setPage(1);
              }}
              className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-[12px] text-slate-400 hover:text-white hover:border-slate-600 transition-colors whitespace-nowrap"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* ── Result count ── */}
        <p className="text-slate-500 text-[11.5px]">
          Showing{" "}
          <span className="text-slate-300 font-semibold">
            {filtered.length}
          </span>{" "}
          of <span className="text-slate-300 font-semibold">{total}</span> teams
        </p>

        {/* ── Overview cards ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              label: "Total Teams",
              value: total,
              sub: "Registered for event",
              iconBg: "bg-indigo-500/15",
              iconColor: "text-indigo-400",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
            {
              label: "Approved Teams",
              value: approved,
              sub: "Cleared for competition",
              iconBg: "bg-emerald-500/15",
              iconColor: "text-emerald-400",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ),
            },
            {
              label: "Pending Approval",
              value: pending,
              sub: "Awaiting organizer review",
              iconBg: "bg-amber-500/15",
              iconColor: "text-amber-400",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
            },
            {
              label: "Team Submissions",
              value: submitted,
              sub: "Projects submitted",
              iconBg: "bg-violet-500/15",
              iconColor: "text-violet-400",
              icon: (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              ),
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.iconBg} ${c.iconColor}`}
                >
                  {c.icon}
                </div>
                <span className="text-[26px] font-bold text-white tabular-nums leading-none">
                  {c.value}
                </span>
              </div>
              <p className="text-slate-200 text-[12.5px] font-medium">
                {c.label}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Teams table ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-3 px-5 py-2.5 border-b border-slate-800">
            <div className="col-span-3 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">
              Team
            </div>
            <div className="col-span-1 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block text-center">
              Size
            </div>
            <div className="col-span-2 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider hidden md:block">
              Domain
            </div>
            <div className="col-span-2 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider hidden md:block">
              Members
            </div>
            <div className="col-span-2 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
              Submission
            </div>
            <div className="col-span-1 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
              Status
            </div>
            <div className="col-span-1 text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider text-right">
              Action
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800/60">
            {pageSlice.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-600 mb-2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="text-slate-400 text-[13px] font-medium">
                  No teams found
                </p>
                <p className="text-slate-500 text-[11.5px] mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              pageSlice.map((t) => (
                <div key={t.id} className="contents">
                  <div
                    className={`grid grid-cols-12 gap-3 px-5 py-3 hover:bg-slate-800/35 transition-colors duration-150 ${openId === t.id ? "bg-indigo-500/5" : ""}`}
                  >
                    {/* Team name */}
                    <div className="col-span-3 flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-white bg-gradient-to-br ${avatarGrad(t.name)}`}
                      >
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-slate-100 text-[13px] font-medium truncate">
                        {t.name}
                      </p>
                    </div>

                    {/* Size */}
                    <div className="col-span-1 hidden sm:flex items-center justify-center">
                      <span className="text-slate-300 text-[13px] font-semibold tabular-nums">
                        {t.members.length}
                      </span>
                    </div>

                    {/* Domain */}
                    <div className="col-span-2 hidden md:flex items-center">
                      <DomainBadge domain={t.domain} />
                    </div>

                    {/* Member avatars */}
                    <div className="col-span-2 hidden md:flex items-center">
                      <div className="flex -space-x-1.5">
                        {t.members.slice(0, 4).map((m, i) => (
                          <MiniAvatar key={i} name={m.name} />
                        ))}
                        {t.members.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[9px] text-slate-300 font-semibold ring-1 ring-slate-950">
                            +{t.members.length - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submission */}
                    <div className="col-span-2 hidden sm:flex items-center">
                      <SubmissionBadge value={t.submissionStatus} />
                    </div>

                    {/* Status */}
                    <div className="col-span-1 hidden sm:flex items-center">
                      <StatusBadge value={t.teamStatus} />
                    </div>

                    {/* Action */}
                    <div className="col-span-1 flex items-center justify-end">
                      <button
                        onClick={() => setOpenId(openId === t.id ? null : t.id)}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap ${
                          openId === t.id
                            ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                            : "bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white hover:border-slate-600"
                        }`}
                      >
                        {openId === t.id ? "Close" : "Details"}
                      </button>
                    </div>
                  </div>

                  {/* Detail panel */}
                  {openId === t.id && (
                    <div className="grid grid-cols-12 gap-3 px-5 pb-3">
                      <DetailPanel team={t} onClose={() => setOpenId(null)} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer + pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800">
              <p className="text-slate-500 text-[11.5px]">
                Page{" "}
                <span className="text-slate-300 font-medium">{safePage}</span>{" "}
                of{" "}
                <span className="text-slate-300 font-medium">{totalPages}</span>
                {" · "}
                <span className="text-slate-300 font-medium">
                  {filtered.length}
                </span>{" "}
                total
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`text-[11px] w-7 h-7 rounded-lg border font-semibold transition-colors ${
                        n === safePage
                          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                          : "bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
