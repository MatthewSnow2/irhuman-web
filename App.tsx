import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Intersection Observer Hook ---
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// --- Animated Section Wrapper ---
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, visible } = useInView();
  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
}

// --- Navigation ---
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-md border-b border-gray-800/50' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-sm tracking-wider text-gray-400 hover:text-white transition-colors">
          ST METRO
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#framing" className="hover:text-white transition-colors">Framing</a>
          <a href="#story" className="hover:text-white transition-colors">Story</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#results" className="hover:text-white transition-colors">Results</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

// --- Hero ---
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0e1a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-[#0a0e1a]/80" />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-8">
          ST Metro
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
          The Autonomous
          <br />
          Software Factory
        </h1>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
          A system that watches the market, identifies opportunities, writes the code, tests it, and ships it to GitHub.
        </p>
        <p className="text-base text-gray-500 italic mb-12">
          The human sets strategy. The machine writes the code.
        </p>
        <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
          <span>April 2026</span>
          <span>&middot;</span>
          <span>Matthew Snow</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border-2 border-gray-700 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-gray-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// --- Framing Rules ---
function Framing() {
  return (
    <Section id="framing" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-12">Framing</h2>

      <div className="space-y-16">
        {/* Koan form */}
        <div>
          <p className="text-sm text-gray-600 font-mono mb-3">In principle</p>
          <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed italic border-l-2 border-teal-500/40 pl-6">
            "If the factory needs a human to write code, the factory is not yet a factory."
          </blockquote>
        </div>

        {/* Rule form */}
        <div>
          <p className="text-sm text-gray-600 font-mono mb-3">In practice</p>
          <div className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              Code <strong className="text-white">must not be</strong> written by humans. Code <strong className="text-white">must not be</strong> reviewed by humans. The human's role is to define what <em>good</em> looks like — scoring criteria, quality gates, guardrails — and then step back.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              The system finds opportunities. The system builds solutions. The system judges quality. The human sets the compass heading.
            </p>
          </div>
        </div>

        {/* Practical form */}
        <div>
          <p className="text-sm text-gray-600 font-mono mb-3">In numbers</p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Ten research agents scanning markets daily. A six-dimension scoring engine triaging every idea. An autonomous build engine that commits code to feature branches. A quality ratchet that only tightens, never loosens. A self-improvement loop that patches its own agents and configuration. A watchdog that monitors health every fifteen minutes and dispatches diagnostics autonomously.
          </p>
          <p className="text-base text-gray-500 mt-4">
            Total human engineering time per build: zero.
          </p>
        </div>
      </div>
    </Section>
  );
}

// --- Divider ---
function Divider() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="border-t border-gray-800/60" />
    </div>
  );
}

// --- The Story ---
function Story() {
  return (
    <Section id="story" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-12">The Story</h2>

      <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
        <p>
          Snow-Town started with a disaster.
        </p>
        <p>
          In February 2026, an AWS EC2 instance — the single server hosting an entire development ecosystem — went down. Not gracefully. Not with warning. The kind of failure that reminds you that "the cloud" is just someone else's computer, and sometimes that computer stops being yours.
        </p>
        <p>
          The recovery happened on a HP ProBook — a laptop, not a server — running Ubuntu on a home network. No cloud. No redundancy budget. Just a machine on a desk and the question every engineer eventually asks: <em className="text-white">what if I rebuilt this properly?</em>
        </p>
        <p>
          "Properly" meant something specific. Not "more carefully." Not "with better backups." It meant: <strong className="text-white">what if the system could build software without me?</strong>
        </p>
        <p>
          That question became ST Metro.
        </p>

        <div className="my-12 p-6 rounded-xl bg-[#111827] border border-gray-800">
          <p className="text-sm text-gray-500 font-mono mb-2">The inflection point</p>
          <p className="text-base text-gray-400">
            The shift wasn't about replacing humans with AI. It was about noticing that the bottleneck in software production had moved. Writing code was no longer the hard part — the models could do that. What remained hard was <em>deciding what to build</em>, <em>judging whether it was good</em>, and <em>improving the process itself</em>. Those three problems defined the architecture.
          </p>
        </div>

        <p>
          The system that emerged has a name — ST Metro — and it answers those three questions with three corresponding subsystems: a signal pipeline that decides what to build, a quality framework that judges the output, and a self-improvement loop that gets better at both.
        </p>
        <p>
          It runs on that same ProBook. It ships code to GitHub while its operator sleeps. No cloud required.
        </p>
      </div>
    </Section>
  );
}

// --- Architecture ---
function Architecture() {
  const components = [
    { name: 'Research Agents', role: 'Signal Intelligence', description: '10+ agents scanning ArXiv, GitHub, HN, YouTube, Reddit, Product Hunt, and custom domains daily. Multi-LLM for anti-monoculture signal diversity. 2,500+ signals ingested.', color: 'text-blue-400' },
    { name: 'IdeaForge', role: 'Opportunity Scoring', description: '6-dimension scoring engine with buildability filter and reality check enrichment. Twice-daily evaluation via cron. 197 ideas scored and classified.', color: 'text-purple-400' },
    { name: 'Metroplex', role: 'Autonomy Coordinator', description: '4 gates (triage, build, publish, patch), priority queue, automatic retry, budget hard-stop enforcement, circuit breakers. 57,000+ cycles run autonomously.', color: 'text-teal-400' },
    { name: 'YCE Harness', role: 'Build Engine', description: 'Multi-agent autonomous builder. Orchestrator dispatches to specialist agents. Parallel execution via git worktrees. 38 projects published to GitHub.', color: 'text-orange-400' },
    { name: 'Sky-Lynx', role: 'Self-Improvement', description: 'Semi-weekly analysis with auto-apply. Correlates quality scores, recommends patches, tunes configuration. Writes improvement tasks back into the pipeline.', color: 'text-green-400' },
    { name: 'Galvatron', role: 'Proactive Monitoring', description: 'Watchdog checks system health every 15 minutes. On warning or critical status, autonomously dispatches diagnostic missions and alerts via Telegram.', color: 'text-red-400' },
    { name: 'ST Records', role: 'Institutional Memory', description: 'Persona metrics, 32,000+ outcome records, contract store, patch management. Every pipeline run writes a structured result. Nothing is forgotten.', color: 'text-yellow-400' },
  ];

  return (
    <Section id="architecture" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-4">Architecture</h2>
      <p className="text-gray-500 mb-12">Three input streams. One priority queue. Autonomous execution.</p>

      {/* Visual: pipeline convergence */}
      <div className="relative rounded-2xl overflow-hidden mb-12">
        <img src="/images/architecture-bg.jpg" alt="Data pipeline visualization — multiple input streams converging through a central processing node to output endpoints" className="w-full h-48 md:h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
      </div>

      {/* Flow diagram */}
      <div className="my-12 p-6 rounded-xl bg-[#111827] border border-gray-800 font-mono text-sm">
        <div className="space-y-2 text-gray-400">
          <p className="text-gray-600"># Three streams feed the priority queue</p>
          <p><span className="text-blue-400">Signal Agents</span>  {"──┐"}</p>
          <p><span className="text-green-400">Sky-Lynx</span>      {"───┼──>"} <span className="text-white">Metroplex Priority Queue</span></p>
          <p><span className="text-yellow-400">Human Backlog</span>  {"─┘"}</p>
          <p className="text-gray-700">{"                    │"}</p>
          <p className="text-gray-600"># Ranked by market score, improvement ROI, human priority</p>
          <p className="text-gray-700">{"                    ▼"}</p>
          <p>{"            "}<span className="text-teal-400">Metroplex</span> {"→"} <span className="text-orange-400">YCE Build</span> {"→"} <span className="text-purple-400">Quality Gate</span> {"→"} <span className="text-white">GitHub</span></p>
          <p className="text-gray-700">{"                    │"}</p>
          <p>{"            "}<span className="text-yellow-400">ST Records</span> {"←── outcome record"}</p>
          <p className="text-gray-700">{"                    │"}</p>
          <p>{"            "}<span className="text-green-400">Sky-Lynx</span> {"←── observes, improves, repeats"}</p>
          <p className="text-gray-700">{""}</p>
          <p className="text-gray-600"># Proactive health monitoring</p>
          <p>{"            "}<span className="text-red-400">Galvatron</span> {"──── watchdog every 15m ────→ auto-diagnose + alert"}</p>
        </div>
      </div>

      {/* Component cards */}
      <div className="space-y-4 mt-12">
        {components.map((c, i) => (
          <div key={i} className="p-5 rounded-xl bg-[#111827]/60 border border-gray-800/60 hover:border-gray-700 transition-colors">
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className={`font-mono font-semibold ${c.color}`}>{c.name}</h3>
              <span className="text-xs text-gray-600 font-mono">{c.role}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Results ---
function Results() {
  const stats = [
    { value: '57K+', label: 'Autonomous Cycles', sublabel: 'Metroplex orchestration' },
    { value: '10+', label: 'Research Agents', sublabel: 'Daily signal scanning' },
    { value: '38', label: 'Projects Published', sublabel: 'To GitHub, no human touch' },
    { value: '4.0', label: 'L5 Score', sublabel: 'Out of 5.0 (up from 3.2)' },
    { value: '32K+', label: 'Outcome Records', sublabel: 'Continuous pipeline telemetry' },
    { value: '0', label: 'Human Lines of Code', sublabel: 'Per autonomous build' },
  ];

  return (
    <Section id="results" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-4">Results</h2>
      <p className="text-gray-500 mb-12">Real numbers from a system running in production.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center p-4">
            <div className="text-3xl md:text-4xl font-bold text-white font-mono mb-1">{s.value}</div>
            <div className="text-sm text-gray-300 font-medium">{s.label}</div>
            <div className="text-xs text-gray-600 mt-1">{s.sublabel}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Human Role ---
function HumanRole() {
  const rows = [
    { old: 'Write code', new: 'Set strategy and constraints' },
    { old: 'Review pull requests', new: 'Define evaluation criteria' },
    { old: 'Assign tasks', new: 'Curate signal sources' },
    { old: 'Schedule work', new: 'Set guardrails and budgets' },
    { old: 'Debug failures', new: 'Review outcomes (optional)' },
    { old: 'Coordinate agents', new: 'Handled by Metroplex' },
  ];

  return (
    <Section className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-4">The Human Role in L5</h2>
      <p className="text-gray-500 mb-12">What changes when the factory runs itself.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 pr-6 font-mono text-xs text-gray-600 uppercase tracking-wider">Before (L3-L4)</th>
              <th className="text-left py-3 font-mono text-xs text-gray-600 uppercase tracking-wider">After (L5)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-800/40">
                <td className="py-3 pr-6 text-gray-500 line-through decoration-gray-700">{r.old}</td>
                <td className="py-3 text-gray-300">{r.new}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

// --- Guardrails ---
function Guardrails() {
  const rails = [
    { title: 'Branch Protection', description: 'Agents commit to feature branches. Never main. Never directly.' },
    { title: 'Budget Caps', description: 'Per-agent, per-day spend limits with automatic hard-stop enforcement.' },
    { title: 'Repo Scope', description: 'Each agent can only touch repositories explicitly granted to it.' },
    { title: 'Kill Switch', description: 'All autonomous operations halt with a single command.' },
    { title: 'Audit Trail', description: 'Every action logged — git commits, API calls, state transitions.' },
    { title: 'Quality Ratchet', description: 'Thresholds only tighten. Quality never goes backwards without human approval.' },
  ];

  return (
    <Section className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-teal-400 mb-4">Guardrails</h2>
      <p className="text-gray-500 mb-12">Autonomy without guardrails is negligence. These are non-negotiable.</p>

      <div className="grid md:grid-cols-2 gap-4">
        {rails.map((g, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-800/40">
            <h3 className="text-sm font-semibold text-white mb-1">{g.title}</h3>
            <p className="text-sm text-gray-500">{g.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Contact / CTA ---
function Contact() {
  return (
    <Section id="contact" className="max-w-3xl mx-auto px-6 py-24">
      <div className="p-8 md:p-12 rounded-2xl bg-[#111827] border border-gray-800 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Interested in what autonomous software production can do for your business?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Whether you're exploring agentic AI for your engineering team, evaluating autonomous build systems, or looking for a partner who's already done it — let's talk.
        </p>
        <a
          href="mailto:matthew@memyselfplusai.com?subject=ST Metro Inquiry"
          className="inline-block px-8 py-3.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-400 transition-all"
        >
          Get In Touch
        </a>
      </div>
    </Section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="border-t border-gray-800/40 py-8 px-6 mt-12">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <span className="font-mono tracking-wider">ST METRO</span>
        <span>&copy; {new Date().getFullYear()} ST Metro. All rights reserved.</span>
      </div>
    </footer>
  );
}

// --- Main App ---
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Nav />
      <Hero />
      <Framing />
      <Divider />
      <Story />
      <Divider />
      <Architecture />
      <Divider />
      <Results />
      <Divider />
      <HumanRole />
      <Divider />
      <Guardrails />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
