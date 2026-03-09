import { useState, useEffect } from "react";

const c = {
  bg: "#0C0C0C", surface: "#161616", border: "#2A2A2A", accent: "#FF6333",
  accentLight: "#FFAA88", text: "#F5F5F5", textMuted: "#C0C0C0", textDim: "#949494",
  success: "#4ADE80", warning: "#FBBF24", danger: "#F87171", white: "#FFFFFF",
};
const ft = {
  display: "'DM Serif Display', Georgia, serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

const Badge = ({ children, color = c.accent }) => (
  <span style={{ display:"inline-block",padding:"4px 11px",borderRadius:"4px",fontSize:"12px",fontFamily:ft.mono,fontWeight:500,letterSpacing:"0.05em",textTransform:"uppercase",color,background:color+"18",border:"1px solid "+color+"33" }}>{children}</span>
);
const Cd = ({ children, glow }) => (
  <div style={{ background: glow ? "linear-gradient(135deg,"+c.accent+"10,transparent)" : c.surface, border:"1px solid "+(glow ? c.accent+"33" : c.border),borderRadius:"10px",padding:"24px 26px",marginBottom:"16px" }}>{children}</div>
);
const CT = ({ children, color: cl = c.accent }) => (
  <div style={{ fontFamily:ft.display,fontSize:"22px",color:cl,marginBottom:"10px" }}>{children}</div>
);
const P = ({ children, dim, style: s }) => (
  <p style={{ fontFamily:ft.body,fontSize:dim?"14px":"16px",color:dim?c.textDim:c.textMuted,lineHeight:1.7,margin:"0 0 12px 0",...s }}>{children}</p>
);
const Divider = () => (
  <div style={{ height:"1px",background:"linear-gradient(90deg,transparent,"+c.border+",transparent)",margin:"40px 0" }} />
);
const SectionLabel = ({ children }) => (
  <div style={{ fontFamily:ft.mono,fontSize:"12px",color:c.accent,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:"8px" }}>{children}</div>
);

/* ====== MOCK DEMO ====== */
function MockDemo() {
  const [mode, setMode] = useState("current");
  const [cardsVis, setCardsVis] = useState(false);
  const [tapped, setTapped] = useState(null);
  const [curVis, setCurVis] = useState(true);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    if (mode === "current") { const iv = setInterval(() => setCurVis(v => !v), 530); return () => clearInterval(iv); }
  }, [mode]);

  useEffect(() => {
    if (mode !== "current") return;
    setTxt(""); const all = []; let stop = false;
    const run = off => {
      if (stop) return;
      [{t:"",d:0},{t:"Wh",d:800},{t:"What menu",d:1600},{t:"What menu item is...",d:2500},{t:"What menu item is",d:3400},{t:"Que plato",d:4200},{t:"Que plato no se ven",d:5200},{t:"",d:6200}]
        .forEach(a => all.push(setTimeout(() => { if (!stop) setTxt(a.t) }, off + a.d)));
      all.push(setTimeout(() => run(off + 7200), off + 7200));
    };
    run(0); return () => { stop = true; all.forEach(clearTimeout) };
  }, [mode]);

  useEffect(() => {
    if (mode === "proposed") { setCardsVis(false); setTapped(null); setTimeout(() => setCardsVis(true), 300); }
  }, [mode]);

  const cds = [
    { id:"slow",icon:"\u{1F4C9}",met:"$12",mc:c.danger,lab:"Peor plato esta semana",it:"Garden Veggie Wrap",sp:[8,6,4,3,2,2,1],act:"86 este plato" },
    { id:"labor",icon:"\u23F1\uFE0F",met:"+18%",mc:c.warning,lab:"Costo laboral domingo",it:"vs. objetivo",sp:[40,42,38,44,41,39,52],act:"Ajustar turnos" },
    { id:"best",icon:"\u{1F525}",met:"142",mc:c.success,lab:"Plato mas vendido",it:"Chicken Torta",sp:[18,22,19,25,28,30,32],act:"Promover" },
  ];

  const spark = (data, col) => {
    const mx = Math.max(...data), mn = Math.min(...data), r = mx - mn || 1, w = 56, h = 18;
    const pts = data.map((v, i) => ((i/(data.length-1))*w)+","+(h-((v-mn)/r)*h)).join(" ");
    return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  };

  return (
    <div>
      <div style={{ display:"flex",marginBottom:"14px",background:c.surface,borderRadius:"8px",padding:"3px",border:"1px solid "+c.border,width:"fit-content" }}>
        {[{id:"current",l:"Current Toast IQ"},{id:"proposed",l:"Proposed: Guided Mode"}].map(o => (
          <button key={o.id} onClick={() => setMode(o.id)} style={{ background:mode===o.id?c.accent:"transparent",color:mode===o.id?c.white:c.textMuted,border:"none",borderRadius:"6px",padding:"8px 16px",fontFamily:ft.body,fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.25s" }}>{o.l}</button>
        ))}
      </div>
      <div style={{ display:"flex",justifyContent:"center" }}>
        <div style={{ width:"300px",background:"#111",borderRadius:"24px",border:"2px solid "+c.border,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 20px 6px",fontFamily:ft.mono,fontSize:"10px",color:c.textDim }}><span>9:41 AM</span><span>{"\u25CF\u25CF\u25CF\u25CF\u25CB"}</span></div>
          <div style={{ padding:"8px 16px 10px",borderBottom:"1px solid "+c.border,display:"flex",alignItems:"center",gap:"8px" }}>
            <div style={{ width:"24px",height:"24px",borderRadius:"6px",background:c.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,color:c.white }}>T</div>
            <span style={{ fontFamily:ft.body,fontSize:"14px",fontWeight:600,color:c.text }}>Toast IQ</span>
            {mode === "proposed" && <span style={{ fontFamily:ft.mono,fontSize:"9px",color:c.success,marginLeft:"auto",padding:"2px 6px",background:c.success+"18",borderRadius:"3px" }}>GUIDED</span>}
          </div>
          <div style={{ minHeight:"330px",padding:"12px" }}>
            {mode === "current" ? (
              <div>
                <div style={{ padding:"12px",textAlign:"center",marginBottom:"12px" }}>
                  <div style={{ fontSize:"28px",marginBottom:"6px" }}>{"\u{1F44B}"}</div>
                  <div style={{ fontFamily:ft.body,fontSize:"13px",color:c.text,fontWeight:600 }}>Hi, Maria!</div>
                  <div style={{ fontFamily:ft.body,fontSize:"11px",color:c.textMuted,marginTop:"4px",lineHeight:1.4 }}>Ask me anything about your restaurant's performance, menu, or team.</div>
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"16px",padding:"0 4px" }}>
                  {["What's my best seller?","Compare this week vs last","Who worked overtime?"].map((s,i) => (
                    <div key={i} style={{ padding:"5px 10px",borderRadius:"12px",border:"1px solid "+c.border,fontFamily:ft.body,fontSize:"10px",color:c.textMuted,background:c.surface }}>{s}</div>
                  ))}
                </div>
                <div style={{ height:"80px" }} />
                <div style={{ background:c.surface,border:"1px solid "+c.border,borderRadius:"12px",padding:"10px 14px",display:"flex",alignItems:"center",gap:"8px" }}>
                  <div style={{ flex:1,fontFamily:ft.body,fontSize:"12px",color:txt?c.textMuted:c.textDim,minHeight:"16px" }}>
                    {txt || "Ask Toast IQ..."}
                    <span style={{ display:"inline-block",width:"1px",height:"14px",background:curVis?c.accent:"transparent",marginLeft:"1px",verticalAlign:"text-bottom" }} />
                  </div>
                  <div style={{ width:"24px",height:"24px",borderRadius:"50%",background:c.accent+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px" }}>{"\u2191"}</div>
                </div>
                <div style={{ textAlign:"center",marginTop:"10px",fontFamily:ft.mono,fontSize:"9px",color:c.danger+"88" }}>{"\u26A0 operator switches between languages, drops off"}</div>
              </div>
            ) : (
              <div>
                <div style={{ padding:"6px 4px 12px",fontFamily:ft.body,fontSize:"12px",color:c.textMuted }}>
                  <span style={{ fontSize:"14px" }}>{"\u{1F525}"}</span>{" "}
                  <span style={{ color:c.text,fontWeight:600 }}>Hola Maria</span>
                  {" — 3 cosas para hoy"}
                </div>
                {cds.map((cd, i) => {
                  const tap = tapped === cd.id;
                  return (
                    <div key={cd.id} onClick={() => setTapped(tap ? null : cd.id)}
                      style={{ background:tap?c.accent+"12":c.surface,border:"1px solid "+(tap?c.accent+"44":c.border),borderRadius:"12px",padding:"12px",marginBottom:"8px",cursor:"pointer",opacity:cardsVis?1:0,transform:cardsVis?"translateY(0)":"translateY(16px)",transition:"all 0.4s cubic-bezier(0.16,1,0.3,1) "+(i*0.12)+"s" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                        <div style={{ fontSize:"20px",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",background:cd.mc+"15",borderRadius:"8px",flexShrink:0 }}>{cd.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"6px" }}>
                            <div style={{ fontFamily:ft.mono,fontSize:"18px",fontWeight:700,color:cd.mc,lineHeight:1 }}>{cd.met}</div>
                            {spark(cd.sp, cd.mc)}
                          </div>
                          <div style={{ fontFamily:ft.body,fontSize:"11px",color:c.text,fontWeight:500,marginTop:"2px" }}>{cd.lab}</div>
                          <div style={{ fontFamily:ft.mono,fontSize:"9px",color:c.textDim,marginTop:"1px" }}>{cd.it}</div>
                        </div>
                      </div>
                      <div style={{ overflow:"hidden",maxHeight:tap?"40px":"0",opacity:tap?1:0,transition:"all 0.3s ease",marginTop:tap?"10px":"0" }}>
                        <button style={{ width:"100%",padding:"7px 0",background:cd.mc+"22",border:"1px solid "+cd.mc+"44",borderRadius:"8px",color:cd.mc,fontFamily:ft.body,fontSize:"11px",fontWeight:600,cursor:"pointer" }}>{cd.act + " →"}</button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ textAlign:"center",marginTop:"8px",fontFamily:ft.mono,fontSize:"9px",color:c.success+"88" }}>{"\u2713 visual data + native language + one-tap action"}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ textAlign:"center",marginTop:"14px",fontFamily:ft.mono,fontSize:"10px",color:c.textDim,lineHeight:1.5 }}>
        {mode === "current"
          ? <>Maria, a Spanish-speaking taqueria owner in Houston, opens Toast IQ.<br/>She starts to type a question, switches languages, moves on.</>
          : <>Same Maria. Same data. Different interaction paradigm.<br/>Tap any card to see the one-tap action.</>}
      </div>
    </div>
  );
}

/* ====== MAIN ====== */
export default function ToastWorkSample() {
  return (
    <div style={{ minHeight:"100vh",background:c.bg,color:c.text,fontFamily:ft.body }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* ===== HEADER ===== */}
      <div style={{ borderBottom:"1px solid "+c.border,padding:"24px 24px 20px" }}>
        <div style={{ maxWidth:"720px",margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px" }}>
            <Badge>Work Sample</Badge><Badge color={c.textMuted}>March 2026</Badge>
          </div>
          <h1 style={{ fontFamily:ft.display,fontSize:"34px",fontWeight:400,margin:"6px 0 0",color:c.text,lineHeight:1.15 }}>
            Toast IQ's Next 100K Users Won't Type a Question
          </h1>
          <p style={{ fontFamily:ft.body,fontSize:"16px",color:c.textMuted,margin:"8px 0 0",lineHeight:1.5 }}>
            25K restaurants love Toast IQ. The next wave of operators will need a different interaction path. Here's what that looks like.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:"720px",margin:"0 auto",padding:"28px 24px 60px" }}>

        {/* ===== SECTION 1: THE PROBLEM ===== */}
        <SectionLabel>The Opportunity</SectionLabel>
        <h2 style={{ fontFamily:ft.display,fontSize:"26px",color:c.text,fontWeight:400,margin:"0 0 16px",lineHeight:1.2 }}>
          Toast IQ works. The interaction model has a ceiling.
        </h2>

        <div style={{ display:"flex",flexWrap:"wrap",gap:"10px",marginBottom:"18px" }}>
          <div style={{ background:c.surface,border:"1px solid "+c.border,borderRadius:"8px",padding:"14px 18px",flex:"1 1 140px" }}>
            <div style={{ fontFamily:ft.mono,fontSize:"22px",fontWeight:700,color:c.accent }}>25K</div>
            <div style={{ fontFamily:ft.body,fontSize:"13px",color:c.textMuted,marginTop:"3px" }}>restaurants on Toast IQ</div>
          </div>
          <div style={{ background:c.surface,border:"1px solid "+c.border,borderRadius:"8px",padding:"14px 18px",flex:"1 1 140px" }}>
            <div style={{ fontFamily:ft.mono,fontSize:"22px",fontWeight:700,color:c.warning }}>139K</div>
            <div style={{ fontFamily:ft.body,fontSize:"13px",color:c.textMuted,marginTop:"3px" }}>locations not yet on Toast IQ</div>
          </div>
          <div style={{ background:c.surface,border:"1px solid "+c.border,borderRadius:"8px",padding:"14px 18px",flex:"1 1 140px" }}>
            <div style={{ fontFamily:ft.mono,fontSize:"22px",fontWeight:700,color:c.accent }}>~15%</div>
            <div style={{ fontFamily:ft.body,fontSize:"13px",color:c.textMuted,marginTop:"3px" }}>adoption at launch window*</div>
          </div>
        </div>
        <P dim style={{ marginBottom:"18px" }}>*25K/164K at launch window (Oct 2025 vs. Feb 2026 base). The real number today is likely higher — but the structural question holds at any adoption rate: what does the path look like for the operators who won't engage through conversation?</P>

        {/* 5 Whys */}
        <Cd>
          <CT>5 Whys: What limits the next wave?</CT>
          <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
            {[
              {q:"The interface requires English prompt composition",depth:false},
              {q:"Because Toast IQ is built on a conversational AI paradigm",depth:false},
              {q:"Because the default AI interaction model in 2024–25 is the chatbot. Everyone built chatbots",depth:false},
              {q:"Because a restaurant operator mid-shift isn't in exploration mode. Their JTBD is 'act on one thing now,' not 'explore my data'",depth:false},
              {q:"Because early adopters who gave the strongest engagement signal are naturally data-curious and English-fluent — creating a feedback loop that optimizes the product for a segment that doesn't represent the next wave of growth",depth:true},
            ].map((item, i) => (
              <div key={i} style={{ display:"flex",gap:"10px",paddingLeft:(i*6)+"px" }}>
                <span style={{ fontFamily:ft.mono,fontSize:"13px",color:item.depth?c.accent:c.textDim,minWidth:"18px",paddingTop:"1px",fontWeight:item.depth?700:400 }}>{"#"+(i+1)}</span>
                <span style={{ fontFamily:ft.body,fontSize:"15px",color:item.depth?c.accent:c.textMuted,lineHeight:1.7,fontWeight:item.depth?600:400 }}>{item.q}</span>
              </div>
            ))}
          </div>
        </Cd>

        <P>The 25K restaurants driving Toast IQ's early traction are data-curious, English-fluent, and analytically minded — exactly the profile that loves a conversational AI tool. The question is whether that profile represents the next 100K: the growth segments (international, enterprise, F&B retail, non-English US operators) that Toast's $5B+ ARR ambition depends on.</P>

        <P>Three signals point in this direction: CEO Aman Narang flagged non-English operator support as a 2026 priority on the Q4 earnings call. New TAMs (international, enterprise, retail) are growing fast but dragging SaaS ARPU. And GPV per location fell 3% YoY in Q1 2025 as newer, smaller locations join — operators who are less likely to sit down with a conversational AI tool after hours.</P>

        <P>Through the B=MAT lens: <strong style={{ color:c.text }}>motivation</strong> to use a margin-improving tool is universal (40% of operators cite profitability as their #1 goal). But <strong style={{ color:c.danger }}>ability</strong> is the bottleneck {"—"} composing a business question mid-shift requires cognitive bandwidth operators don't have, English fluency many lack, and uninterrupted time that doesn't exist during service. And <strong style={{ color:c.warning }}>triggers don't connect</strong>: the "For You" feed surfaces a relevant insight, but it leads to a text input — which during a dinner rush is a dead end for most operators.</P>

        {/* Multi-actor + value chain compressed */}
        <Cd>
          <CT>The opportunity looks different to each actor</CT>
          <div style={{ display:"flex",flexDirection:"column",gap:"14px" }}>
            {[
              {actor:"Operator",p:"Composing English business questions mid-shift isn't realistic. After one unsuccessful attempt, Toast IQ drops out of the workflow.",color:c.accent},
              {actor:"Sales team",p:"Toast IQ is a differentiator in demos — but if the prospect can't experience it firsthand, the pitch loses its strongest proof point.",color:c.warning},
              {actor:"CS / Onboarding",p:"If operators aren't introduced to Toast IQ during setup, a better UI alone won't drive discovery. There's a human touchpoint opportunity here.",color:c.danger},
              {actor:"Staff",p:"The shift lead running the POS daily may have different language fluency than the owner who signed the contract. Who is the actual user?",color:c.success},
            ].map((item, i) => (
              <div key={i}>
                <div style={{ marginBottom:"5px" }}><Badge color={item.color}>{item.actor}</Badge></div>
                <span style={{ fontFamily:ft.body,fontSize:"15px",color:c.textMuted,lineHeight:1.7 }}>{item.p}</span>
              </div>
            ))}
          </div>
        </Cd>

        <P dim>A value chain lens: Toast's sales channel in Houston, Miami, and LA has already solved the language challenge for <em>acquisition</em> (Spanish-speaking reps close deals). The next step is closing the same gap for <em>activation</em> — making sure what sales promises, the product delivers on day one.</P>

        {/* Compressed JTBD */}
        <Cd>
          <CT>Four operators, four different jobs to be done</CT>
          {[
            {who:"First-gen taqueria owner",job:"Survival assurance",line:"'Tell me if I'm losing money.' Visual cards with red/green signals = perfect fit.",color:c.danger},
            {who:"Multi-unit franchise operator",job:"Portfolio management",line:"'Which location is underperforming?' Needs cross-location comparison. Cards are insufficient.",color:c.warning},
            {who:"Chef-owner, single concept",job:"Creative curation",line:"'Which dishes should stay on the menu?' Might actually prefer conversational exploration.",color:c.accent},
            {who:"Enterprise regional manager",job:"Upward reporting",line:"'Give me a report for corporate.' Needs exportable dashboards. Completely different product.",color:c.success},
          ].map((item, i) => (
            <div key={i} style={{ display:"flex",gap:"10px",marginBottom:i<3?"10px":"0",alignItems:"baseline" }}>
              <Badge color={item.color}>{item.job}</Badge>
              <span style={{ fontFamily:ft.body,fontSize:"15px",color:c.textMuted,lineHeight:1.7 }}><strong style={{ color:c.text }}>{item.who}:</strong> {item.line}</span>
            </div>
          ))}
          <P dim style={{ marginTop:"10px",marginBottom:0 }}>Implication: the MVP should target the survival assurance JTBD specifically — where the problem and the solution match — not all growth segments at once.</P>
        </Cd>

        <Divider />

        {/* ===== SECTION 2: THE SOLUTION ===== */}
        <SectionLabel>The Solution</SectionLabel>
        <h2 style={{ fontFamily:ft.display,fontSize:"26px",color:c.text,fontWeight:400,margin:"0 0 16px",lineHeight:1.2 }}>
          Three options considered. One recommended.
        </h2>

        <Cd>
          {[
            {name:"A: Human-mediated onboarding",v:"Reject as primary — keep as diagnostic",desc:"Bilingual CS rep walks operators through Toast IQ in first 30 days. High signal on whether barrier is language or deeper (distrust, time, preference). But doesn't scale for low-ARPU SMB.",vc:c.danger},
            {name:"B: Voice-first interface",v:"Promising but too brittle mid-shift",desc:"Operators speak in native language instead of typing. Bypasses composition barrier. But voice AI in noisy restaurant environments is unreliable — Square tried voice AI for phone ordering (easier use case) and it's still early.",vc:c.warning},
            {name:"C: Visual insight cards (Guided Mode)",v:"Recommended — testable in 8 weeks",desc:"Pre-built cards with sparklines, color-coding, one-tap actions. Language follows OS. No composition required. Matches the survival assurance JTBD. Scoped, buildable on existing data endpoints.",vc:c.success},
          ].map((item, i) => (
            <div key={i} style={{ marginBottom:i<2?"14px":"0",paddingBottom:i<2?"14px":"0",borderBottom:i<2?"1px solid "+c.border:"none" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px",flexWrap:"wrap" }}>
                <Badge color={item.vc}>{item.name}</Badge>
                <span style={{ fontFamily:ft.mono,fontSize:"12px",color:item.vc }}>{item.v}</span>
              </div>
              <P dim>{item.desc}</P>
            </div>
          ))}
        </Cd>

        <MockDemo />

        <div style={{ height:"20px" }} />

        {/* Competitive landscape compressed */}
        <Cd>
          <CT>The competitive window</CT>
          <P>Toast IQ and Square AI both chose chat-based paradigms. But SpotOn is taking a different path — what their CPO calls "quiet AI": embedded insights that surface inside existing workflows (cost anomaly flagging, automated marketing, menu recommendations) without requiring operators to ask questions at all. SpotOn's approach is closer to the Guided Mode concept proposed here than Toast IQ's current design. Clover and Lightspeed don't have operator-facing AI yet, but that's likely temporary. The question isn't whether someone will build a visual-first intelligence layer — it's whether Toast builds it on top of their unmatched data, or a competitor gets there with less data but better UX.</P>
        </Cd>

        {/* Sprint */}
        <Cd>
          <CT>8-week test</CT>
          {[
            {w:"Wk 1–2",a:"Recruit 200 operators from locations where OS language ≠ English + locations that never opened Toast IQ."},
            {w:"Wk 3–4",a:"Build 5 insight card types on existing data endpoints. Visual-first, template actions in top 3 languages. A/B variant in Toast Now."},
            {w:"Wk 5–7",a:"Measure card view, tap, action completion, and 7-day return rate vs. matched cohort on standard Toast IQ."},
            {w:"Wk 8",a:"7-day return ≥2x standard → expand. <1.5x → barrier is deeper than interaction model. Run Solution A (human onboarding) as diagnostic."},
          ].map((item, i) => (
            <div key={i} style={{ display:"flex",gap:"12px",marginBottom:i<3?"10px":"0" }}>
              <span style={{ fontFamily:ft.mono,fontSize:"13px",color:c.accent,minWidth:"52px",paddingTop:"2px" }}>{item.w}</span>
              <span style={{ fontFamily:ft.body,fontSize:"15px",color:c.textMuted,lineHeight:1.7 }}>{item.a}</span>
            </div>
          ))}
        </Cd>

        <Divider />

        {/* ===== SECTION 3: RISKS + WHY SID ===== */}
        <SectionLabel>Risks + Why Sid</SectionLabel>
        <h2 style={{ fontFamily:ft.display,fontSize:"26px",color:c.text,fontWeight:400,margin:"0 0 16px",lineHeight:1.2 }}>
          Four ways this could be wrong
        </h2>

        {[
          {risk:"Most operators don't want AI features at all",sev:"high",sc:c.danger,
           mit:"Toast's survey says 86% are comfortable with AI. But survey intent ≠ behavior. The MVP test addresses this: if even visual cards don't move the needle, the barrier is motivational, not interface-related. We'd pivot to Solution A."},
          {risk:"Visual cards feel like 'Toast IQ Lite' to power users",sev:"high",sc:c.danger,
           mit:"Don't build two modes. Ship Guided Mode as the default entry point for operators who've never opened Toast IQ — a progressive disclosure pattern. Current power users keep the conversational interface they already love, untouched. Guided Mode is an onramp, not a replacement. If it works, some users will graduate to conversational; if it doesn't, you've only built one lightweight surface, not a parallel product."},
          {risk:"Square ships a visual-first intelligence layer first",sev:"medium",sc:c.warning,
           mit:"Toast's data moat (148K+ locations of closed-loop data) takes years to replicate. But data depth doesn't matter if the interface limits who can access it. This is time-sensitive."},
          {risk:"This overlaps with Toast's existing i18n roadmap",sev:"medium",sc:c.warning,
           mit:"i18n translates the existing conversational interface into other languages. Guided Mode changes the interaction paradigm itself. Both are valuable — they solve different layers of the same problem."},
        ].map((item, i) => (
          <Cd key={i}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px",flexWrap:"wrap" }}>
              <Badge color={item.sc}>{item.sev}</Badge>
              <span style={{ fontFamily:ft.body,fontSize:"16px",color:c.text,fontWeight:600 }}>{item.risk}</span>
            </div>
            <P dim>{item.mit}</P>
          </Cd>
        ))}

        <Divider />

        {/* Why Sid */}
        <Cd glow>
          <SectionLabel>Work authorization — upfront</SectionLabel>
          <P>I'm on CPT (Curricular Practical Training) through Purdue's MS in Engineering Management. No sponsorship cost, no lottery, no uncertainty. Standard employer cooperation letter. I lead with this because transparency matters.</P>
        </Cd>

        <P>I don't have restaurant experience. What I do have is four years building B2B products where the buyer ≠ the user, activation funnels are long, and your customer abandons anything that doesn't prove value in 30 seconds.</P>

        <Cd>
          {[
            {tag:"Strategy",ev:"This work sample. Three earnings calls, Toast's i18n blog, Square's competing releases, analyst coverage → a thesis about interaction model fit across growth segments, grounded in 5 Whys, multi-actor framing, and JTBD segmentation."},
            {tag:"Data-informed",ev:"Diagnosed an AI course conversion bottleneck at Interview Kickstart by auditing sales calls. Found a sales articulation problem, not a product problem. A/B tested instructor-led video → 14% conversion lift."},
            {tag:"Cross-functional",ev:"Launched a B2B corporate training vertical 0→1 with CEO, ops, and FAANG+ SMEs. Managed 5+ instructors for a Growth PM course MVP rated 4.8+/5."},
            {tag:"Adoption frameworks",ev:"B=MAT, activation funnels, JTBD, habit metrics, competitive exclusion — from the Growth PM curriculum I helped design and am actively studying. Not just theory: I built a course teaching these, then applied them here."},
          ].map((item, i) => (
            <div key={i} style={{ marginBottom:i<3?"12px":"0",paddingBottom:i<3?"12px":"0",borderBottom:i<3?"1px solid "+c.border:"none" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px" }}>
                <Badge>{item.tag}</Badge>
              </div>
              <P dim>{item.ev}</P>
            </div>
          ))}
        </Cd>

        <Cd style={{ background:"linear-gradient(135deg,"+c.warning+"10,transparent)",border:"1px solid "+c.warning+"33" }}>
          <CT color={c.warning}>What I don't have (yet)</CT>
          <P>Restaurant/hospitality domain expertise. I've sold to universities and corporates, not restaurant chains. Operators make faster decisions under more pressure with less process. I'd need to shadow them {"—"} the JD mentions working directly with restaurant owners {"—"} to build the intuition research can't give me.</P>
        </Cd>

        <div style={{ display:"flex",gap:"14px",flexWrap:"wrap",marginTop:"16px" }}>
          <a href="https://www.linkedin.com/in/sidharthsundaram/" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block",padding:"10px 20px",background:c.accent,color:c.white,borderRadius:"6px",fontFamily:ft.body,fontSize:"14px",fontWeight:600,textDecoration:"none" }}>{"LinkedIn →"}</a>
          <a href="https://sidharthsundaram.com" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block",padding:"10px 20px",background:"transparent",color:c.accent,borderRadius:"6px",fontFamily:ft.body,fontSize:"14px",fontWeight:600,textDecoration:"none",border:"1px solid "+c.accent+"44" }}>{"Portfolio →"}</a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid "+c.border,padding:"16px 24px",textAlign:"center" }}>
        <span style={{ fontFamily:ft.mono,fontSize:"12px",color:c.textDim }}>{"Built by Sidharth Sundaram · sidharthsundaram.com · Not affiliated with Toast, Inc."}</span>
      </div>
    </div>
  );
}
