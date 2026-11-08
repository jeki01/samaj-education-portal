import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { handleGetCompetitionReport } from "@/services/gov-exam.service";
import { toast } from "react-toastify";

interface ReportData {
    testId: string;
    examName: string;
    scheduleDate: string;
    scheduleTime: string;
    status: string;
    stats: { enrolled: number; attempted: number; notAttempted: number; attemptedPct: number };
    leaderboard: Array<{ rank: number; name: string; email: string; mobile: string; totalScore: number; maximumMark: number; correct: number; wrong: number; skipped: number; percentage: number; timeTaken: number }>;
    notAttemptedList: Array<{ name: string; email: string; mobile: string }>;
}

export default function CompetitionReportPage() {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<ReportData | null>(null);
    const [tab, setTab] = useState<"leaderboard" | "not_attempted">("leaderboard");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!testId) return;
        setLoading(true);
        handleGetCompetitionReport(testId)
            .then(res => setData(res.data?.data))
            .catch(() => toast.error("Report load failed"))
            .finally(() => setLoading(false));
    }, [testId]);

    function downloadCSV() {
        if (!data) return;
        const rows = [
            ["Rank", "Name", "Email", "Mobile", "Score", "Max Marks", "Correct", "Wrong", "Skipped", "Percentage", "Time(s)"],
            ...data.leaderboard.map(r => [r.rank, r.name, r.email, r.mobile, r.totalScore, r.maximumMark, r.correct, r.wrong, r.skipped, r.percentage + "%", r.timeTaken])
        ];
        const csv = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.examName}-report.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#6633CC" }}>Loading report...</div>;
    if (!data) return <div style={{ padding: 40 }}>No data found.</div>;

    const statCards = [
        { label: "कुल Enrolled", value: data.stats.enrolled, color: "#6633CC", bg: "#f3eeff" },
        { label: "Paper दिया", value: data.stats.attempted, color: "#16a34a", bg: "#f0fdf4" },
        { label: "बाकी हैं", value: data.stats.notAttempted, color: "#dc2626", bg: "#fef2f2" },
        { label: "Completion %", value: data.stats.attemptedPct + "%", color: "#d97706", bg: "#fffbeb" },
    ];

    return (
        <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => navigate("/competition-exam")} style={{ background: "#f3eeff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#6633CC", fontWeight: 600 }}>← Back</button>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>{data.examName}</h1>
                    <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                        {data.scheduleDate} | {data.scheduleTime} &nbsp;
                        <span style={{ background: data.status === "upcoming" ? "#fef3c7" : "#dcfce7", color: data.status === "upcoming" ? "#92400e" : "#166534", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                            {data.status === "upcoming" ? "Upcoming" : "Live/Completed"}
                        </span>
                    </p>
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {statCards.map((s, i) => (
                    <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "20px 24px", border: `1px solid ${s.color}22` }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs + Download */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setTab("leaderboard")} style={{ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", background: tab === "leaderboard" ? "#6633CC" : "#f3eeff", color: tab === "leaderboard" ? "#fff" : "#6633CC", fontWeight: 600 }}>
                        🏆 Leaderboard ({data.leaderboard.length})
                    </button>
                    <button onClick={() => setTab("not_attempted")} style={{ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", background: tab === "not_attempted" ? "#6633CC" : "#f3eeff", color: tab === "not_attempted" ? "#fff" : "#6633CC", fontWeight: 600 }}>
                        ⏳ बाकी हैं ({data.notAttemptedList.length})
                    </button>
                </div>
                {tab === "leaderboard" && data.leaderboard.length > 0 && (
                    <button onClick={downloadCSV} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid #6633CC", background: "#fff", color: "#6633CC", cursor: "pointer", fontWeight: 600 }}>
                        ⬇ CSV Download
                    </button>
                )}
            </div>

            {/* Leaderboard Table */}
            {tab === "leaderboard" && (
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                    {data.leaderboard.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
                            {data.status === "upcoming" ? "Exam abhi shuru nahi hua — sirf enrollment data dikha raha hai." : "Abhi kisi ne paper nahi diya."}
                        </div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#6633CC", color: "#fff" }}>
                                    {["Rank", "Naam", "Score", "Max Marks", "Sahi", "Galat", "Skip", "%", "Time"].map(h => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 13 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.leaderboard.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: r.rank <= 3 ? "#fdf9ff" : "#fff" }}>
                                        <td style={{ padding: "12px 16px", fontWeight: 700, color: r.rank === 1 ? "#f59e0b" : r.rank === 2 ? "#9ca3af" : r.rank === 3 ? "#b45309" : "#374151" }}>
                                            {r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : r.rank}
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name || "—"}</div>
                                            <div style={{ fontSize: 12, color: "#9ca3af" }}>{r.email || r.mobile}</div>
                                        </td>
                                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "#6633CC" }}>{r.totalScore}</td>
                                        <td style={{ padding: "12px 16px", color: "#555" }}>{r.maximumMark}</td>
                                        <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: 600 }}>{r.correct}</td>
                                        <td style={{ padding: "12px 16px", color: "#dc2626", fontWeight: 600 }}>{r.wrong}</td>
                                        <td style={{ padding: "12px 16px", color: "#6b7280" }}>{r.skipped}</td>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.percentage}%</td>
                                        <td style={{ padding: "12px 16px", color: "#6b7280", fontSize: 13 }}>{r.timeTaken}s</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Not Attempted Table */}
            {tab === "not_attempted" && (
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                    {data.notAttemptedList.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#999" }}>Sabne paper de diya! 🎉</div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#f3eeff" }}>
                                    {["S.No.", "Naam", "Email / Mobile"].map(h => (
                                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 13, color: "#6633CC" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.notAttemptedList.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                        <td style={{ padding: "12px 16px", color: "#6b7280" }}>{i + 1}</td>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.name || "—"}</td>
                                        <td style={{ padding: "12px 16px", color: "#555" }}>{r.email || r.mobile}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
