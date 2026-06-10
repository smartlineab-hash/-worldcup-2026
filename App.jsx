import { useState, useEffect } from "react";

// ─── Shared Data ─────────────────────────────────────────────────────────────

const MATCHES_DATA = [
  { id: 1, date: "11 يونيو", time: "21:00", team1: { name: "الأرجنتين", flag: "🇦🇷" }, team2: { name: "المغرب",   flag: "🇲🇦" }, score1: 3,    score2: 1,    status: "انتهت", venue: "MetLife - نيوجيرسي" },
  { id: 2, date: "11 يونيو", time: "00:00", team1: { name: "إنجلترا",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, team2: { name: "فرنسا",    flag: "🇫🇷" }, score1: 1,    score2: 1,    status: "انتهت", venue: "SoFi - لوس أنجلوس" },
  { id: 3, date: "12 يونيو", time: "21:00", team1: { name: "البرازيل",  flag: "🇧🇷" }, team2: { name: "المكسيك",  flag: "🇲🇽" }, score1: null, score2: null, status: "اليوم", venue: "AT&T - دالاس" },
  { id: 4, date: "12 يونيو", time: "00:00", team1: { name: "ألمانيا",   flag: "🇩🇪" }, team2: { name: "اليابان",  flag: "🇯🇵" }, score1: null, score2: null, status: "اليوم", venue: "MetLife - نيوجيرسي" },
  { id: 5, date: "13 يونيو", time: "21:00", team1: { name: "إسبانيا",  flag: "🇪🇸" }, team2: { name: "البرتغال", flag: "🇵🇹" }, score1: null, score2: null, status: "قادمة", venue: "Azteca - مكسيكو سيتي" },
  { id: 6, date: "14 يونيو", time: "21:00", team1: { name: "أمريكا",   flag: "🇺🇸" }, team2: { name: "هولندا",   flag: "🇳🇱" }, score1: null, score2: null, status: "قادمة", venue: "Levi's - سان خوسيه" },
];

const GROUPS = [
  { name: "A", teams: [
    { name: "المكسيك",   flag: "🇲🇽", p:3, w:2, d:1, l:0, gf:5, ga:2, pts:7 },
    { name: "البرازيل",  flag: "🇧🇷", p:3, w:2, d:0, l:1, gf:4, ga:3, pts:6 },
    { name: "بولندا",    flag: "🇵🇱", p:3, w:1, d:0, l:2, gf:2, ga:4, pts:3 },
    { name: "الكاميرون", flag: "🇨🇲", p:3, w:0, d:1, l:2, gf:1, ga:3, pts:1 },
  ]},
  { name: "B", teams: [
    { name: "إنجلترا",  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", p:3, w:2, d:1, l:0, gf:6, ga:2, pts:7 },
    { name: "فرنسا",   flag: "🇫🇷", p:3, w:2, d:0, l:1, gf:5, ga:2, pts:6 },
    { name: "الدنمارك", flag: "🇩🇰", p:3, w:1, d:0, l:2, gf:2, ga:5, pts:3 },
    { name: "تونس",    flag: "🇹🇳", p:3, w:0, d:1, l:2, gf:1, ga:5, pts:1 },
  ]},
  { name: "C", teams: [
    { name: "الأرجنتين", flag: "🇦🇷", p:3, w:3, d:0, l:0, gf:7, ga:1, pts:9 },
    { name: "هولندا",   flag: "🇳🇱", p:3, w:1, d:1, l:1, gf:4, ga:4, pts:4 },
    { name: "المغرب",   flag: "🇲🇦", p:3, w:1, d:1, l:1, gf:3, ga:3, pts:4 },
    { name: "السعودية", flag: "🇸🇦", p:3, w:0, d:0, l:3, gf:1, ga:7, pts:0 },
  ]},
  { name: "D", teams: [
    { name: "ألمانيا",  flag: "🇩🇪", p:3, w:2, d:1, l:0, gf:8, ga:2, pts:7 },
    { name: "اليابان",  flag: "🇯🇵", p:3, w:2, d:0, l:1, gf:4, ga:4, pts:6 },
    { name: "كرواتيا",  flag: "🇭🇷", p:3, w:1, d:1, l:1, gf:4, ga:4, pts:4 },
    { name: "كندا",     flag: "🇨🇦", p:3, w:0, d:0, l:3, gf:1, ga:7, pts:0 },
  ]},
];

const SCORERS = [
  { name: "ليونيل ميسي",     flag: "🇦🇷", goals: 5, assists: 3 },
  { name: "كيليان مبابي",    flag: "🇫🇷", goals: 4, assists: 2 },
  { name: "فينيسيوس جونيور", flag: "🇧🇷", goals: 3, assists: 4 },
  { name: "هاري كين",        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals: 3, assists: 1 },
  { name: "يامال",           flag: "🇪🇸", goals: 2, assists: 5 },
];

const LEADERBOARD = [
  { name: "أحمد 🇸🇦", pts: 47, correct: 8, exact: 3 },
  { name: "سارة 🇯🇴",  pts: 41, correct: 7, exact: 2 },
  { name: "خالد 🇦🇪",  pts: 38, correct: 6, exact: 3 },
  { name: "نور 🇱🇧",   pts: 32, correct: 5, exact: 2 },
  { name: "ياسر 🇪🇬",  pts: 28, correct: 5, exact: 1 },
];

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("dashboard"); // "dashboard" | "predict"
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <div style={c.shell}>
      {toast && <div style={c.toast}>{toast}</div>}

      <div style={c.body}>
        {screen === "dashboard"
          ? <Dashboard />
          : <PredictGame showToast={showToast} />}
      </div>

      {/* Bottom Nav */}
      <nav style={c.bottomNav}>
        <button style={screen === "dashboard" ? c.navBtnOn : c.navBtn} onClick={() => setScreen("dashboard")}>
          <span style={c.navIcon}>📊</span>
          <span style={c.navLabel}>الداشبورد</span>
        </button>
        <button style={screen === "predict" ? c.navBtnOn : c.navBtn} onClick={() => setScreen("predict")}>
          <span style={c.navIcon}>🎮</span>
          <span style={c.navLabel}>التوقعات</span>
        </button>
      </nav>
    </div>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────

function Dashboard() {
  const [tab, setTab] = useState("home");
  const [group, setGroup] = useState("A");
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker(t => (t + 1) % MATCHES_DATA.length), 3500);
    return () => clearInterval(id);
  }, []);

  const m = MATCHES_DATA[ticker];

  return (
    <div style={d.root}>
      {/* Header */}
      <header style={d.header}>
        <div style={d.hRow}>
          <div style={d.logo}>
            <span style={d.ball}>⚽</span>
            <div>
              <div style={d.title}>FIFA WORLD CUP</div>
              <div style={d.sub}>USA · CANADA · MEXICO 2026</div>
            </div>
          </div>
          <div style={d.liveChip}><span style={d.liveDot} />LIVE</div>
        </div>
      </header>

      {/* Ticker */}
      <div style={d.ticker}>
        <span style={d.tickerTag}>⚡ لايف</span>
        <span style={d.tickerTxt}>
          {m.team1.flag} {m.team1.name} {m.score1 != null ? `${m.score1}-${m.score2}` : "vs"} {m.team2.name} {m.team2.flag} · {m.venue}
        </span>
      </div>

      {/* Stats */}
      <div style={d.statsRow}>
        {[["⚽","22","مباراة"],["🥅","71","هدف"],["🌍","48","منتخب"],["🏟️","16","ملعب"]].map(([icon,val,lbl]) => (
          <div key={lbl} style={d.stat}>
            <span style={d.statIcon}>{icon}</span>
            <span style={d.statVal}>{val}</span>
            <span style={d.statLbl}>{lbl}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={d.tabs}>
        {[["home","🏠","الرئيسية"],["matches","📅","المباريات"],["groups","📊","المجموعات"],["scorers","🥇","الهدافون"]].map(([k,icon,lbl]) => (
          <button key={k} style={tab===k ? d.tabOn : d.tabOff} onClick={() => setTab(k)}>
            <span>{icon}</span><span>{lbl}</span>
          </button>
        ))}
      </div>

      <main style={d.main}>

        {/* HOME */}
        {tab === "home" && (
          <div style={d.col}>
            <div style={d.featured}>
              <div style={d.featLabel}>🔥 أبرز مباراة اليوم</div>
              <div style={d.featRow}>
                <div style={d.featTeam}><span style={d.bigFlag}>🇧🇷</span><span style={d.featName}>البرازيل</span></div>
                <div style={d.vsBlock}><div style={d.vsTime}>21:00</div><div style={d.vsText}>VS</div><div style={d.vsVenue}>AT&T</div></div>
                <div style={d.featTeam}><span style={d.bigFlag}>🇲🇽</span><span style={d.featName}>المكسيك</span></div>
              </div>
            </div>

            <div style={d.card}>
              <div style={d.cardTitle}>🥇 الهداف الأول</div>
              <div style={d.topRow}>
                <span style={{ fontSize: 40 }}>{SCORERS[0].flag}</span>
                <div>
                  <div style={d.scorerName}>{SCORERS[0].name}</div>
                  <div style={d.badgeRow}>
                    <span style={d.badgeO}>{SCORERS[0].goals} أهداف</span>
                    <span style={d.badgeB}>{SCORERS[0].assists} تمريرات</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={d.card}>
              <div style={d.cardTitle}>🏆 صدارة المجموعات</div>
              {GROUPS.map(g => (
                <div key={g.name} style={d.leaderRow}>
                  <span style={d.groupTag}>المجموعة {g.name}</span>
                  <span style={{ fontSize: 18 }}>{g.teams[0].flag}</span>
                  <span style={d.leaderName}>{g.teams[0].name}</span>
                  <span style={d.leaderPts}>{g.teams[0].pts} ن</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATCHES */}
        {tab === "matches" && (
          <div>
            {MATCHES_DATA.map(m => (
              <div key={m.id} style={{ ...d.matchCard, borderRight: `4px solid ${m.status==="انتهت"?"#4ade80":m.status==="اليوم"?"#f97316":"#60a5fa"}` }}>
                <span style={{ fontSize:11, fontWeight:700, color: m.status==="انتهت"?"#4ade80":m.status==="اليوم"?"#f97316":"#60a5fa", marginBottom:6, display:"block" }}>{m.status}</span>
                <div style={d.matchTeamsRow}>
                  <span style={d.matchTeam}>{m.team1.flag} {m.team1.name}</span>
                  <span style={d.matchScore}>{m.score1!=null?`${m.score1}-${m.score2}`:m.time}</span>
                  <span style={{...d.matchTeam, textAlign:"left"}}>{m.team2.name} {m.team2.flag}</span>
                </div>
                <div style={d.matchVenue}>🏟 {m.venue}</div>
              </div>
            ))}
          </div>
        )}

        {/* GROUPS */}
        {tab === "groups" && (
          <div>
            <div style={d.groupBtns}>
              {GROUPS.map(g => (
                <button key={g.name} style={group===g.name ? d.gBtnOn : d.gBtn} onClick={() => setGroup(g.name)}>
                  المجموعة {g.name}
                </button>
              ))}
            </div>
            {GROUPS.filter(g => g.name === group).map(gr => (
              <div key={gr.name} style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr>{["المنتخب","ل","ف","ت","خ","له","عليه","ن"].map(h => (
                      <th key={h} style={d.th}>{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {gr.teams.map((t,i) => (
                      <tr key={t.name} style={{ borderBottom:"1px solid #1f2937", background: i<2?"#0d1b2a":"transparent" }}>
                        <td style={{ padding:"10px 8px", display:"flex", alignItems:"center", gap:6, fontSize:13 }}>
                          {t.flag} {t.name} {i<2 && <span style={d.qualBadge}>✓</span>}
                        </td>
                        {[t.p,t.w,t.d,t.l,t.gf,t.ga].map((v,j) => (
                          <td key={j} style={d.td}>{v}</td>
                        ))}
                        <td style={{ ...d.td, fontWeight:800, color:"#f97316" }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* SCORERS */}
        {tab === "scorers" && (
          <div>
            {SCORERS.map((p,i) => (
              <div key={p.name} style={d.scorerRow}>
                <div style={{ width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13,
                  background: i===0?"#f59e0b":i===1?"#94a3b8":i===2?"#b45309":"#1f2937", color: i<3?"#fff":"#64748b", flexShrink:0 }}>{i+1}</div>
                <span style={{ fontSize:28 }}>{p.flag}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:5 }}>{p.name}</div>
                  <div style={{ height:4, background:"#1f2937", borderRadius:4 }}>
                    <div style={{ height:"100%", width:`${(p.goals/5)*100}%`, background:"#f97316", borderRadius:4 }} />
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <span style={d.badgeO}>{p.goals} ⚽</span>
                  <span style={d.badgeB}>{p.assists} 🎯</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Predict Screen ───────────────────────────────────────────────────────────

function PredictGame({ showToast }) {
  const [tab, setTab] = useState("predict");
  const [scores, setScores] = useState({});
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState({});

  const setScore = (id, side, val) => {
    const n = Math.max(0, Math.min(9, parseInt(val) || 0));
    setScores(s => ({ ...s, [`${id}-${side}`]: n }));
  };

  const submit = (id) => {
    const g1 = scores[`${id}-1`];
    const g2 = scores[`${id}-2`];
    const pick = picks[id];
    const match = MATCHES_DATA.find(m => m.id === id);
    if (g1 == null || g2 == null || !pick) { showToast("⚠️ اختر النتيجة والفائز أولاً"); return; }
    setSubmitted(s => ({ ...s, [id]: { g1, g2, pick } }));
    showToast(`✅ محفوظ! ${match.team1.flag} ${g1} - ${g2} ${match.team2.flag}`);
  };

  const count = Object.keys(submitted).length;
  const pts = count * 5;

  return (
    <div style={p.root}>
      <header style={p.header}>
        <div style={p.hRow}>
          <div style={p.logoBlock}>
            <span style={{ fontSize:32 }}>🎮</span>
            <div>
              <div style={p.title}>لعبة التوقعات</div>
              <div style={p.sub}>WORLD CUP 2026 · PREDICTOR</div>
            </div>
          </div>
          <div style={p.ptsChip}>
            <div style={p.ptsNum}>{pts}</div>
            <div style={p.ptsLbl}>نقطة</div>
          </div>
        </div>
        <div style={p.progRow}>
          <span style={p.progLbl}>{count}/{MATCHES_DATA.length} توقعات</span>
          <div style={p.progBar}><div style={{ ...p.progFill, width:`${(count/MATCHES_DATA.length)*100}%` }} /></div>
        </div>
      </header>

      <div style={p.tabs}>
        {[["predict","🎮 توقعاتي"],["leaderboard","🏆 المتصدرين"],["rules","📋 القواعد"]].map(([k,lbl]) => (
          <button key={k} style={tab===k ? p.tabOn : p.tabOff} onClick={() => setTab(k)}>{lbl}</button>
        ))}
      </div>

      <main style={p.main}>

        {/* PREDICT */}
        {tab === "predict" && MATCHES_DATA.map(match => {
          const done = !!submitted[match.id];
          const sub = submitted[match.id];
          const g1 = scores[`${match.id}-1`] ?? "";
          const g2 = scores[`${match.id}-2`] ?? "";
          const pick = picks[match.id];
          return (
            <div key={match.id} style={{ ...p.card, ...(done ? p.cardDone : {}) }}>
              <div style={p.cardTop}>
                <span style={p.cardDate}>📅 {match.date} · {match.time}</span>
                <span style={p.cardVenue}>🏟 {match.venue}</span>
              </div>
              <div style={p.teamsRow}>
                <div style={p.teamCol}><span style={{ fontSize:34 }}>{match.team1.flag}</span><span style={p.teamName}>{match.team1.name}</span></div>
                <div style={p.inputRow}>
                  {done
                    ? <><span style={p.doneNum}>{sub.g1}</span><span style={p.dash}>-</span><span style={p.doneNum}>{sub.g2}</span></>
                    : <><input type="number" min="0" max="9" value={g1} onChange={e => setScore(match.id,1,e.target.value)} style={p.input} placeholder="0" />
                        <span style={p.dash}>-</span>
                        <input type="number" min="0" max="9" value={g2} onChange={e => setScore(match.id,2,e.target.value)} style={p.input} placeholder="0" /></>
                  }
                </div>
                <div style={{ ...p.teamCol, alignItems:"flex-start" }}><span style={{ fontSize:34 }}>{match.team2.flag}</span><span style={p.teamName}>{match.team2.name}</span></div>
              </div>

              {!done ? (
                <>
                  <div style={p.pickLbl}>من سيفوز؟</div>
                  <div style={p.pickRow}>
                    {[["team1", `${match.team1.flag} ${match.team1.name}`],["draw","🤝 تعادل"],["team2",`${match.team2.flag} ${match.team2.name}`]].map(([k,lbl]) => (
                      <button key={k} style={pick===k ? p.pickOn : p.pickOff} onClick={() => setPicks(s => ({...s,[match.id]:k}))}>{lbl}</button>
                    ))}
                  </div>
                  <button style={p.submitBtn} onClick={() => submit(match.id)}>حفظ التوقع ⚡</button>
                </>
              ) : (
                <div style={p.doneRow}>
                  <span style={p.doneBadge}>✅ محفوظ</span>
                  <span style={p.doneWinner}>
                    {sub.pick==="draw" ? "🤝 تعادل" : sub.pick==="team1" ? `${match.team1.flag} ${match.team1.name}` : `${match.team2.flag} ${match.team2.name}`}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* LEADERBOARD */}
        {tab === "leaderboard" && (
          <div>
            <div style={p.secTitle}>🏆 لوحة المتصدرين</div>
            <div style={p.myCard}>
              <span style={{ fontSize:22, fontWeight:900, color:"#6366f1", minWidth:36 }}>#6</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff" }}>أنت 👤</div>
                <div style={{ fontSize:11, color:"#94a3b8" }}>{count} توقعات مسجلة</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:900, color:"#6366f1" }}>{pts}</div>
                <div style={{ fontSize:10, color:"#6366f1" }}>نقطة</div>
              </div>
            </div>
            <div style={{ height:1, background:"#1f2937", margin:"10px 0" }} />
            {LEADERBOARD.map((lp,i) => (
              <div key={lp.name} style={p.lRow}>
                <span style={{ fontSize: i<3?22:14, fontWeight:800, color: i<3?"#fff":"#64748b", minWidth:36, textAlign:"center" }}>
                  {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                </span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{lp.name}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>{lp.correct} صح · {lp.exact} دقيقة</div>
                </div>
                <div style={{ fontSize:20, fontWeight:900, color:"#f97316" }}>{lp.pts}<span style={{ fontSize:12 }}> ن</span></div>
              </div>
            ))}
          </div>
        )}

        {/* RULES */}
        {tab === "rules" && (
          <div style={p.rulesCard}>
            <p style={{ fontSize:14, color:"#94a3b8", marginTop:0, marginBottom:16 }}>توقع نتائج المباريات واجمع أكبر عدد من النقاط!</p>
            {[["توقعت الفائز ✅","+5 نقاط"],["توقعت النتيجة بالضبط 🎯","+10 نقاط"],["توقعت التعادل ✅","+5 نقاط"]].map(([lbl,pts]) => (
              <div key={lbl} style={p.ruleRow}>
                <span style={{ fontSize:13 }}>{lbl}</span>
                <span style={{ fontSize:13, fontWeight:800, color:"#f97316" }}>{pts}</span>
              </div>
            ))}
            <div style={p.tip}>💡 <strong>نصيحة:</strong> توقع النتيجة بالضبط لتحصل على أعلى نقاط!</div>
            <div style={p.deadline}>⏰ يجب تسجيل التوقع قبل المباراة بـ 15 دقيقة</div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const c = {
  shell: { minHeight:"100vh", background:"#080c18", display:"flex", flexDirection:"column", maxWidth:900, margin:"0 auto", fontFamily:"'Segoe UI',Tahoma,sans-serif", direction:"rtl" },
  body: { flex:1, overflowY:"auto", paddingBottom:64 },
  toast: { position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"#1e293b", border:"1px solid #f97316", color:"#fff", padding:"12px 20px", borderRadius:12, fontSize:14, fontWeight:600, zIndex:999, boxShadow:"0 4px 24px #0008", whiteSpace:"nowrap" },
  bottomNav: { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:900, display:"flex", background:"#0f172a", borderTop:"2px solid #1f2937", zIndex:100 },
  navBtn: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"10px 4px", background:"none", border:"none", borderTop:"3px solid transparent", color:"#475569", cursor:"pointer", fontSize:12 },
  navBtnOn: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"10px 4px", background:"none", border:"none", borderTop:"3px solid #f97316", color:"#f97316", cursor:"pointer", fontSize:12, fontWeight:700 },
  navIcon: { fontSize:20 },
  navLabel: {},
};

const d = {
  root: { background:"#0a0e1a", color:"#e2e8f0", minHeight:"100vh" },
  header: { background:"linear-gradient(135deg,#1a1f35,#0f172a)", borderBottom:"2px solid #f97316", padding:"16px 20px" },
  hRow: { display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo: { display:"flex", alignItems:"center", gap:12 },
  ball: { fontSize:34 },
  title: { fontSize:19, fontWeight:900, color:"#fff", letterSpacing:2 },
  sub: { fontSize:10, color:"#f97316", letterSpacing:1, marginTop:2 },
  liveChip: { display:"flex", alignItems:"center", gap:6, background:"#dc2626", color:"#fff", padding:"4px 12px", borderRadius:20, fontSize:13, fontWeight:700 },
  liveDot: { width:7, height:7, borderRadius:"50%", background:"#fff" },
  ticker: { background:"#111827", borderBottom:"1px solid #1f2937", padding:"8px 14px", display:"flex", gap:10, alignItems:"center", fontSize:12, overflow:"hidden", whiteSpace:"nowrap" },
  tickerTag: { background:"#f97316", color:"#fff", padding:"2px 7px", borderRadius:4, fontSize:10, fontWeight:700, flexShrink:0 },
  tickerTxt: { color:"#94a3b8" },
  statsRow: { display:"flex", justifyContent:"space-around", padding:"12px 16px", background:"#111827", borderBottom:"1px solid #1f2937" },
  stat: { display:"flex", flexDirection:"column", alignItems:"center", gap:1 },
  statIcon: { fontSize:18 },
  statVal: { fontSize:20, fontWeight:900, color:"#f97316" },
  statLbl: { fontSize:10, color:"#64748b" },
  tabs: { display:"flex", background:"#0f172a", borderBottom:"1px solid #1f2937" },
  tabOn: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"10px 4px", background:"none", border:"none", borderBottom:"3px solid #f97316", color:"#f97316", cursor:"pointer", fontSize:11, fontWeight:700 },
  tabOff: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"10px 4px", background:"none", border:"none", borderBottom:"3px solid transparent", color:"#64748b", cursor:"pointer", fontSize:11 },
  main: { padding:14 },
  col: { display:"flex", flexDirection:"column", gap:12 },
  featured: { background:"linear-gradient(135deg,#1e293b,#0f172a)", border:"1px solid #1f2937", borderTop:"3px solid #f97316", borderRadius:12, padding:18 },
  featLabel: { fontSize:12, color:"#f97316", marginBottom:14, fontWeight:700 },
  featRow: { display:"flex", justifyContent:"space-between", alignItems:"center" },
  featTeam: { display:"flex", flexDirection:"column", alignItems:"center", gap:5 },
  bigFlag: { fontSize:44 },
  featName: { fontSize:14, fontWeight:700, color:"#fff" },
  vsBlock: { textAlign:"center" },
  vsTime: { fontSize:12, color:"#94a3b8" },
  vsText: { fontSize:26, fontWeight:900, color:"#f97316" },
  vsVenue: { fontSize:10, color:"#64748b" },
  card: { background:"#111827", border:"1px solid #1f2937", borderRadius:12, padding:14 },
  cardTitle: { fontSize:13, fontWeight:700, color:"#f97316", marginBottom:11 },
  topRow: { display:"flex", alignItems:"center", gap:12 },
  scorerName: { fontSize:15, fontWeight:700, color:"#fff", marginBottom:5 },
  badgeRow: { display:"flex", gap:7 },
  badgeO: { background:"#f9731622", color:"#f97316", padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, border:"1px solid #f9731444" },
  badgeB: { background:"#60a5fa22", color:"#60a5fa", padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, border:"1px solid #60a5fa44" },
  leaderRow: { display:"flex", alignItems:"center", gap:9, padding:"8px 0", borderBottom:"1px solid #1f2937" },
  groupTag: { background:"#1f2937", padding:"2px 7px", borderRadius:6, fontSize:10, color:"#94a3b8", minWidth:85 },
  leaderName: { flex:1, fontSize:13 },
  leaderPts: { fontSize:13, fontWeight:800, color:"#f97316" },
  matchCard: { background:"#111827", borderRadius:10, padding:"13px 14px", marginBottom:9 },
  matchTeamsRow: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:6 },
  matchTeam: { fontSize:13, fontWeight:600, flex:1 },
  matchScore: { fontSize:18, fontWeight:900, color:"#fff", background:"#1f2937", padding:"4px 12px", borderRadius:8 },
  matchVenue: { fontSize:10, color:"#64748b", marginTop:6 },
  groupBtns: { display:"flex", gap:7, marginBottom:12, flexWrap:"wrap" },
  gBtn: { padding:"7px 14px", borderRadius:8, border:"1px solid #1f2937", background:"#111827", color:"#64748b", cursor:"pointer", fontSize:12 },
  gBtnOn: { padding:"7px 14px", borderRadius:8, border:"1px solid #f97316", background:"#f9731622", color:"#f97316", cursor:"pointer", fontSize:12, fontWeight:700 },
  th: { padding:"9px 7px", textAlign:"center", fontSize:11, color:"#64748b", background:"#111827", borderBottom:"1px solid #1f2937" },
  td: { padding:"9px 7px", textAlign:"center", fontSize:12 },
  qualBadge: { background:"#4ade8022", color:"#4ade80", padding:"1px 5px", borderRadius:10, fontSize:9 },
  scorerRow: { display:"flex", alignItems:"center", gap:11, background:"#111827", borderRadius:10, padding:13, marginBottom:9 },
};

const p = {
  root: { background:"#080c18", color:"#e2e8f0", minHeight:"100vh" },
  header: { background:"linear-gradient(160deg,#0f1e3d,#0a0c18)", borderBottom:"2px solid #f97316", padding:"16px 18px 13px" },
  hRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 },
  logoBlock: { display:"flex", alignItems:"center", gap:11 },
  title: { fontSize:18, fontWeight:900, color:"#fff", letterSpacing:1 },
  sub: { fontSize:9, color:"#f97316", letterSpacing:2, marginTop:2 },
  ptsChip: { background:"#f9731622", border:"2px solid #f97316", borderRadius:11, padding:"7px 16px", textAlign:"center" },
  ptsNum: { fontSize:24, fontWeight:900, color:"#f97316", lineHeight:1 },
  ptsLbl: { fontSize:9, color:"#f97316", marginTop:2 },
  progRow: { display:"flex", alignItems:"center", gap:9 },
  progLbl: { fontSize:11, color:"#64748b", minWidth:88 },
  progBar: { flex:1, height:5, background:"#1f2937", borderRadius:3, overflow:"hidden" },
  progFill: { height:"100%", background:"linear-gradient(90deg,#f97316,#fbbf24)", borderRadius:3, transition:"width 0.5s" },
  tabs: { display:"flex", background:"#0f172a", borderBottom:"1px solid #1f2937" },
  tabOn: { flex:1, padding:"11px 4px", background:"none", border:"none", borderBottom:"3px solid #f97316", color:"#f97316", cursor:"pointer", fontSize:12, fontWeight:700 },
  tabOff: { flex:1, padding:"11px 4px", background:"none", border:"none", borderBottom:"3px solid transparent", color:"#64748b", cursor:"pointer", fontSize:12 },
  main: { padding:"14px 13px" },
  card: { background:"#111827", border:"1px solid #1f2937", borderRadius:13, padding:15, marginBottom:13, borderTop:"3px solid #1f2937" },
  cardDone: { borderTop:"3px solid #4ade80" },
  cardTop: { display:"flex", justifyContent:"space-between", marginBottom:11 },
  cardDate: { fontSize:10, color:"#60a5fa" },
  cardVenue: { fontSize:10, color:"#64748b" },
  teamsRow: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:13, gap:6 },
  teamCol: { display:"flex", flexDirection:"column", alignItems:"center", gap:4, flex:1 },
  teamName: { fontSize:12, fontWeight:700, color:"#fff", textAlign:"center" },
  inputRow: { display:"flex", alignItems:"center", gap:7 },
  input: { width:50, height:50, textAlign:"center", fontSize:22, fontWeight:900, background:"#1e293b", border:"2px solid #334155", borderRadius:9, color:"#f97316", outline:"none" },
  dash: { fontSize:20, fontWeight:900, color:"#475569" },
  doneNum: { width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"#4ade80", background:"#14532d22", border:"2px solid #4ade8044", borderRadius:9 },
  pickLbl: { fontSize:11, color:"#64748b", marginBottom:7 },
  pickRow: { display:"flex", gap:7, marginBottom:11 },
  pickOff: { flex:1, padding:"8px 3px", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", cursor:"pointer", fontSize:11, fontWeight:600 },
  pickOn: { flex:1, padding:"8px 3px", background:"#f9731622", border:"1px solid #f97316", borderRadius:8, color:"#f97316", cursor:"pointer", fontSize:11, fontWeight:700 },
  submitBtn: { width:"100%", padding:"11px", background:"linear-gradient(90deg,#f97316,#ea580c)", border:"none", borderRadius:9, color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer" },
  doneRow: { display:"flex", justifyContent:"space-between", alignItems:"center" },
  doneBadge: { background:"#14532d33", color:"#4ade80", padding:"5px 11px", borderRadius:20, fontSize:11, fontWeight:700 },
  doneWinner: { fontSize:11, color:"#94a3b8" },
  secTitle: { fontSize:15, fontWeight:800, color:"#fff", marginBottom:13 },
  myCard: { background:"linear-gradient(135deg,#1e1b4b,#0f172a)", border:"2px solid #6366f1", borderRadius:11, padding:"13px 15px", display:"flex", alignItems:"center", gap:11, marginBottom:8 },
  lRow: { display:"flex", alignItems:"center", gap:11, padding:11, background:"#111827", borderRadius:9, marginBottom:8 },
  rulesCard: { background:"#111827", border:"1px solid #1f2937", borderRadius:11, padding:16 },
  ruleRow: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 13px", background:"#1e293b", borderRadius:7, marginBottom:8 },
  tip: { background:"#f9731611", border:"1px solid #f9731633", borderRadius:7, padding:"9px 13px", fontSize:12, color:"#fbd38d", marginBottom:8 },
  deadline: { background:"#60a5fa11", border:"1px solid #60a5fa33", borderRadius:7, padding:"9px 13px", fontSize:12, color:"#93c5fd" },
};
