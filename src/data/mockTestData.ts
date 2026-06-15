export const SLST_TOPICS = [
  "Classical Algebra",
  "Abstract Algebra",
  "Linear Algebra",
  "Real Analysis",
  "Calculus",
  "Analytical Geometry (2D & 3D)",
  "Differential Equations",
  "Vector Analysis",
  "Mechanics",
  "Probability & Statistics",
  "Linear Programming",
];

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const REAL_ANALYSIS_POOL: Question[] = [
  { question: "Which of the following functions is uniformly continuous on (0, 1)?", options: ["$f(x) = 1/x$", "$f(x) = \\sin(1/x)$", "$f(x) = x \\sin(1/x)$", "$f(x) = e^{1/x}$"], correctAnswer: 2, explanation: "A function is uniformly continuous on (0,1) iff it can be extended to a continuous function on [0,1]. $x \\sin(1/x) \\to 0$ as $x \\to 0$." },
  { question: "If $\\sum a_n$ converges absolutely, then $\\sum a_n^2$ must:", options: ["Converge", "Diverge", "Oscillate", "Converge only if $a_n > 0$"], correctAnswer: 0, explanation: "If $\\sum |a_n|$ converges, then $|a_n| \\to 0$, so for large n, $|a_n| < 1$, implying $|a_n^2| \\le |a_n|$, thus $\\sum |a_n^2|$ converges." },
  { question: "The sequence $f_n(x) = x^n$ on $[0,1]$ converges point-wise to:", options: ["A continuous function", "A discontinuous function", "The constant function 1", "The zero function"], correctAnswer: 1, explanation: "It converges to $0$ if $x \\in [0,1)$ and to $1$ if $x=1$." },
  { question: "Every bounded sequence in $\\mathbb{R}$ has a...", options: ["Convergent subsequence", "Cauchy subsequence", "Limit", "Upper bound"], correctAnswer: 0, explanation: "Bolzano-Weierstrass Theorem states every bounded sequence in $\\mathbb{R}^n$ has a convergent subsequence." },
  { question: "The set of rational numbers $\\mathbb{Q}$ is...", options: ["Compact", "Complete", "Dense in $\\mathbb{R}$", "Uncountable"], correctAnswer: 2, explanation: "Between any two real numbers, there exists a rational number." },
  { question: "A compact subset of $\\mathbb{R}$ is...", options: ["Finite", "Closed and bounded", "Open and bounded", "Unbounded"], correctAnswer: 1, explanation: "Heine-Borel Theorem." },
  { question: "If a function is continuous on a closed interval $[a, b]$, it must...", options: ["Be differentiable", "Achieve its maximum and minimum", "Be monotonic", "Be convex"], correctAnswer: 1, explanation: "Extreme Value Theorem." },
  { question: "The series $\\sum \\frac{1}{n^p}$ converges if and only if:", options: ["$p > 0$", "$p \\ge 1$", "$p > 1$", "$p > 1/2$"], correctAnswer: 2, explanation: "p-series test." },
  { question: "Which of the following statements about continuous functions on compact sets is FALSE?", options: ["They are uniformly continuous", "They are bounded", "They must be monotonic", "They achieve their bounds"], correctAnswer: 2, explanation: "Continuous functions on compact sets need not be monotonic (e.g., $f(x)=x^2$ on [-1,1])." },
  { question: "The limit of a Cauchy sequence in $\\mathbb{R}$...", options: ["Does not exist", "Is always rational", "Exists in $\\mathbb{R}$", "Is always irrational"], correctAnswer: 2, explanation: "$\\mathbb{R}$ is a complete metric space." },
  { question: "The derivative of the Dirichlet function is...", options: ["0 everywhere", "1 everywhere", "Undefined everywhere", "Calculable only at rationals"], correctAnswer: 2, explanation: "The Dirichlet function is not continuous anywhere, hence not differentiable." },
  { question: "If $f'(x) > 0$ for all $x \\in (a, b)$, then $f$ is...", options: ["Strictly increasing", "Strictly decreasing", "Constant", "Unbounded"], correctAnswer: 0, explanation: "Mean Value Theorem implies $f(y) > f(x)$ for $y > x$." },
  { question: "The sum of a uniformly convergent sequence of continuous functions is...", options: ["Continuous", "Discontinuous", "Always bounded", "Not necessarily continuous"], correctAnswer: 0, explanation: "Uniform convergence preserves continuity." },
  { question: "The Lebesgue measure of the Cantor middle-third set is...", options: ["1", "0", "1/3", "2/3"], correctAnswer: 1, explanation: "The total length removed is $1/3 + 2/9 + 4/27 + \\dots = 1$, so the remaining set has measure 0." },
  { question: "Any monotonic bounded sequence in $\\mathbb{R}$...", options: ["Diverges", "Oscillates", "Converges", "Has no limit"], correctAnswer: 2, explanation: "Monotone Convergence Theorem." }
];

const DEFAULT_POOL = [
  {
    question: "If $f(x) = \\int_0^x e^{-t^2} dt$, find $f'(x)$.",
    options: ["$e^{-x^2}$", "$2x e^{-x^2}$", "$-e^{-x^2}$", "$e^{x^2}$"],
    correctAnswer: 0,
    explanation: "By the Fundamental Theorem of Calculus."
  },
  {
    question: "Find the limit: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
    options: ["$0$", "$1$", "$\\infty$", "Undefined"],
    correctAnswer: 1,
    explanation: "Standard trigonometric limit."
  }
];

export function generateQuestionSet(topic: string, count: number = 30) {
  let pool = topic === "Real Analysis" ? REAL_ANALYSIS_POOL : DEFAULT_POOL;
  
  const questions = [];
  for (let i = 0; i < count; i++) {
    // Pick unique questions by rotating through the pool
    const q = pool[i % pool.length];
    
    // Shuffle options for uniqueness
    const optionsOrder = [0, 1, 2, 3].sort(() => 0.5 - Math.random());
    const newOptions = optionsOrder.map(idx => q.options[idx]);
    const newCorrect = optionsOrder.indexOf(q.correctAnswer);
    
    questions.push({
      id: `${topic}-${i + 1}`,
      question: q.question,
      options: newOptions,
      correctAnswer: newCorrect,
      explanation: q.explanation
    });
  }
  return questions;
}

export function generateMocksForTopic(topic: string, count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${topic.replace(/\s+/g, '-').toLowerCase()}-mock-${i + 1}`,
    topic,
    title: `Mock Test ${i + 1}: ${topic}`,
    duration: 3600,
    totalQuestions: 30,
    questions: (topic === "Real Analysis" && i > 0) ? [] : generateQuestionSet(topic, 30)
  }));
}
