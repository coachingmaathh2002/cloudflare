export const EXAM_CATEGORIES = [
  { id: 'slst', name: 'SLST Mathematics', description: 'Master WB SLST Class IX-X & XI-XII with chapter-wise and full-length CBT mock tests.' },
  { id: 'tgtpgt', name: 'TGT PGT Math Mock Test', description: 'Comprehensive CBT Mock Series for UP TGT/PGT, KVS, NVS, EMRS, DSSSB & State TGT/PGT Mathematics exams.' },
  { id: 'jee', name: 'JEE Advanced', description: 'Tough level multi-correct & numerical mock tests curated for IIT JEE Advanced aspirants.' },
  { id: 'jeemains', name: 'JEE Mains', description: 'Topic-wise mock tests perfectly aligned with the latest NTA computer based exam pattern.' },
  { id: 'wbjee', name: 'WBJEE Mathematics', description: 'High-yield Category 1, 2 & 3 mock tests tailored for WBJEE engineering aspirants.' },
  { id: 'btech', name: 'B.Tech Mathematics', description: 'Engineering university level mathematics covering Differential Equations, Matrices & Calculus.' },
  { id: 'upperprimary', name: 'Upper Primary TET', description: 'Mathematics & Pedagogy mock tests strictly formatted for WB Upper Primary TET exam.' }
];

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

export const TGT_PGT_TOPICS = [
  "TGT PGT Full Syllabus Mock",
  "Real Analysis & Calculus",
  "Classical Algebra & Polynomials",
  "Abstract Algebra & Group Theory",
  "Linear Algebra & Matrices",
  "Analytical Geometry (2D & 3D Conics)",
  "Vector Algebra & 3D Geometry",
  "Differential Equations & Mechanics",
  "Trigonometry & Complex Numbers",
  "Statics, Dynamics & Hydrostatics",
  "Probability & Statistics",
  "Linear Programming & Numerical Analysis"
];

export const TOPICS_BY_CATEGORY: Record<string, string[]> = {
  slst: SLST_TOPICS,
  tgtpgt: TGT_PGT_TOPICS,
  jee: ["Complex Numbers", "Conic Sections", "Definite Integration", "Probability", "Vectors & 3D Geometry"],
  jeemains: ["Binomial Theorem", "Sequence & Series", "Matrices & Determinants", "Limits", "Application of Derivatives"],
  wbjee: [
    "A.P. G.P. H.P.",
    "Logarithms",
    "Complex Numbers",
    "Quadratic Equations",
    "Permutations and Combinations",
    "Principle of Mathematical Induction",
    "Binomial Theorem",
    "Matrices and Determinants",
    "Sets, Relations and Functions",
    "Statistics and Probability",
    "Trigonometric Functions",
    "Solution of Triangles",
    "Inverse Trigonometric Functions",
    "Straight Lines",
    "Circles",
    "Conic Sections",
    "Limits and Continuity",
    "Derivatives",
    "Application of Derivatives",
    "Indefinite Integrals",
    "Definite Integrals",
    "Application of Integrals",
    "Differential Equations",
    "Three Dimensional Geometry",
    "Vector Algebra"
  ],
  btech: ["Engineering Calculus", "Linear Algebra", "Differential Equations", "Numerical Methods", "Complex Analysis"],
  upperprimary: ["Number System & Arithmetic", "Geometry & Mensuration", "Algebra Basics", "Pedagogy of Mathematics", "Data Handling"]
};

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


const REAL_ANALYSIS_POOL_2: Question[] = [
 { question: "The limit inferior of the sequence $a_n = (-1)^n \\frac{n+1}{n}$ is:", options: ["$1$", "$-1$", "$0$", "Does not exist"], correctAnswer: 1, explanation: "The subsequences converge to $1$ and $-1$. The limit inferior is the smallest limit point, which is $-1$." },
{ question: "The limit superior of the sequence $a_n = \\sin\\left(\\frac{n\\pi}{2}\\right)$ is:", options: ["$0$", "$1$", "$-1$", "Does not exist"], correctAnswer: 1, explanation: "The sequence takes values $1, 0, -1, 0, 1, \\dots$ repeatedly. The largest limit point is $1$." },
{ question: "Which of the following sequences is Cauchy but the space in which it lies may not be complete for it to converge?", options: ["$a_n = \\frac{1}{n}$ in $\\mathbb{Q}$", "$a_n = (1+1/n)^n$ in $\\mathbb{Q}$", "Both A and B", "Neither A nor B"], correctAnswer: 2, explanation: "Both sequences are Cauchy in $\\mathbb{Q}$; $1/n \\to 0 \\in \\mathbb{Q}$ but $(1+1/n)^n \\to e \\notin \\mathbb{Q}$, showing $\\mathbb{Q}$ is not complete." },
{ question: "If $a_n \\to L$, then every subsequence of $(a_n)$:", options: ["Converges to $L$", "May diverge", "Converges to a different limit", "Is bounded but not convergent"], correctAnswer: 0, explanation: "A fundamental property of convergent sequences: all subsequences converge to the same limit as the original sequence." },
{ question: "The sequence $a_n = n^{1/n}$ converges to:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 1, explanation: "Taking $\\ln a_n = \\frac{\\ln n}{n} \\to 0$ as $n \\to \\infty$, so $a_n \\to e^0 = 1$." },
{ question: "Every bounded sequence of real numbers has:", options: ["A convergent subsequence", "A unique limit point", "No limit points", "A monotone limit"], correctAnswer: 0, explanation: "This is the Bolzano-Weierstrass theorem: every bounded sequence in $\\mathbb{R}$ has a convergent subsequence." },
{ question: "The sequence $a_n = (-1)^n$ has limit points:", options: ["Only $1$", "Only $-1$", "$1$ and $-1$", "No limit points"], correctAnswer: 2, explanation: "The odd terms are $-1$ and even terms are $1$, giving two distinct limit points." },
{ question: "If $\\liminf a_n = \\limsup a_n = L$, then:", options: ["$a_n$ diverges", "$a_n \\to L$", "$a_n$ is unbounded", "$L$ must be $0$"], correctAnswer: 1, explanation: "A sequence converges to $L$ if and only if its liminf and limsup both equal $L$." },
{ question: "The sequence $a_n = \\left(1 + \\frac{1}{n}\\right)^n$ is:", options: ["Decreasing and converges to $e$", "Increasing and converges to $e$", "Increasing and diverges", "Constant"], correctAnswer: 1, explanation: "This classical sequence is monotonically increasing and bounded above, converging to Euler's number $e$." },
{ question: "A sequence $(a_n)$ in $\\mathbb{R}$ is Cauchy if and only if it is:", options: ["Bounded", "Convergent", "Monotone", "Divergent"], correctAnswer: 1, explanation: "Since $\\mathbb{R}$ is complete, a sequence is Cauchy if and only if it converges." },
{ question: "The sequence $a_n = \\frac{(-1)^n}{n}$ is:", options: ["Divergent", "Convergent to $0$", "Convergent to $1$", "Oscillating without limit"], correctAnswer: 1, explanation: "Since $|a_n| = 1/n \\to 0$, the sequence converges to $0$ by the squeeze theorem." },
{ question: "If $(a_n)$ is monotonically increasing and bounded above, then $(a_n)$:", options: ["Diverges to infinity", "Converges to its supremum", "Converges to its infimum", "Need not converge"], correctAnswer: 1, explanation: "The Monotone Convergence Theorem states that a bounded monotone sequence converges to its least upper bound (if increasing)." },
{ question: "The limit $\\lim_{n\\to\\infty} \\frac{n!}{n^n}$ is:", options: ["$1$", "$e$", "$0$", "$\\infty$"], correctAnswer: 2, explanation: "Using ratio test style argument: $\\frac{a_{n+1}}{a_n} = \\left(\\frac{n}{n+1}\\right)^n \\to \\frac{1}{e} < 1$, so $a_n \\to 0$." },
{ question: "Let $a_n = \\sqrt{n+1} - \\sqrt{n}$. Then $\\lim_{n\\to\\infty} a_n$ is:", options: ["$1$", "$\\infty$", "$0$", "Does not exist"], correctAnswer: 2, explanation: "Rationalizing: $a_n = \\frac{1}{\\sqrt{n+1}+\\sqrt{n}} \\to 0$ as $n \\to \\infty$." },
{ question: "The set of subsequential limits of a bounded sequence is always:", options: ["Empty", "A single point", "Closed and bounded", "Open"], correctAnswer: 2, explanation: "The set of subsequential limits (limit points) of any bounded sequence is always a nonempty closed and bounded subset of $\\mathbb{R}$." },
{ question: "If $a_n \\leq b_n \\leq c_n$ for all $n$, and $a_n \\to L$, $c_n \\to L$, then:", options: ["$b_n \\to L$", "$b_n$ diverges", "$b_n \\to 0$", "No conclusion about $b_n$"], correctAnswer: 0, explanation: "This is the Squeeze (Sandwich) Theorem for sequences." },
{ question: "The sequence defined by $a_1 = 1$, $a_{n+1} = \\sqrt{2 + a_n}$ converges to:", options: ["$1$", "$2$", "$\\sqrt{2}$", "$3$"], correctAnswer: 1, explanation: "The sequence is increasing and bounded above by $2$; solving $L = \\sqrt{2+L}$ gives $L=2$." },
{ question: "The sequence $a_n = \\frac{\\cos n}{n}$ converges to:", options: ["$0$", "$1$", "$-1$", "Does not exist"], correctAnswer: 0, explanation: "Since $|\\cos n| \\leq 1$, we have $|a_n| \\leq 1/n \\to 0$." },
{ question: "If every subsequence of $(a_n)$ has a further subsequence converging to $L$, then:", options: ["$a_n \\to L$", "$a_n$ diverges", "$a_n$ is unbounded", "No conclusion possible"], correctAnswer: 0, explanation: "This is a standard characterization: if every subsequence has a sub-subsequence converging to $L$, the whole sequence converges to $L$." },
{ question: "The sequence $a_n = n(-1)^n$ is:", options: ["Bounded and convergent", "Bounded but divergent", "Unbounded", "Convergent to $0$"], correctAnswer: 2, explanation: "The sequence takes arbitrarily large positive and negative values, so it is unbounded." },
{ question: "The Cauchy criterion for sequences requires that for every $\\epsilon>0$, there exists $N$ such that for all $m,n>N$:", options: ["$|a_n - a_m| < \\epsilon$", "$|a_n| < \\epsilon$", "$a_n = a_m$", "$|a_n - L| < \\epsilon$"], correctAnswer: 0, explanation: "This is the definition of a Cauchy sequence — terms become arbitrarily close to each other, not necessarily to a fixed limit." },
{ question: "Let $a_n = \\frac{2n^2+3}{n^2+1}$. Then $\\lim_{n\\to\\infty} a_n$ equals:", options: ["$1$", "$2$", "$3$", "$0$"], correctAnswer: 1, explanation: "Dividing numerator and denominator by $n^2$: $\\frac{2 + 3/n^2}{1+1/n^2} \\to 2$." },
{ question: "A sequence that is Cauchy in a metric space $X$ must:", options: ["Always converge in $X$", "Be bounded", "Be monotone", "Have infinitely many limit points"], correctAnswer: 1, explanation: "Every Cauchy sequence is bounded, though it need not converge unless $X$ is complete." },
{ question: "For the sequence $a_n = \\frac{n}{2^n}$, $\\lim_{n \\to \\infty} a_n$ is:", options: ["$0$", "$1$", "$\\infty$", "$1/2$"], correctAnswer: 0, explanation: "Exponential growth dominates polynomial growth, so $n/2^n \\to 0$." },
{ question: "If $(a_n)$ is a sequence such that $|a_{n+1} - a_n| \\leq r^n$ for $0<r<1$, then $(a_n)$ is:", options: ["Divergent", "Cauchy, hence convergent", "Unbounded", "Oscillatory"], correctAnswer: 1, explanation: "Using the geometric series bound, one can show $(a_n)$ satisfies the Cauchy criterion, hence converges since $\\mathbb{R}$ is complete." },
{ question: "The sequence $a_n = \\left(\\frac{n-1}{n+1}\\right)^n$ converges to:", options: ["$1$", "$e^{-2}$", "$0$", "$e^2$"], correctAnswer: 1, explanation: "Writing $a_n = \\left(1 - \\frac{2}{n+1}\\right)^n$ and taking logs gives limit $e^{-2}$." },
{ question: "If $\\limsup a_n = +\\infty$, then the sequence $(a_n)$:", options: ["Is bounded above", "Has a subsequence tending to $+\\infty$", "Converges", "Is Cauchy"], correctAnswer: 1, explanation: "$\\limsup a_n = +\\infty$ means the sequence is unbounded above, so there is a subsequence diverging to $+\\infty$." },
{ question: "The sequence $a_n = 1 + \\frac{1}{2} + \\cdots + \\frac{1}{n} - \\ln n$ converges to:", options: ["$0$", "Euler-Mascheroni constant $\\gamma$", "$1$", "$\\infty$"], correctAnswer: 1, explanation: "This is the classical definition of the Euler-Mascheroni constant $\\gamma \\approx 0.577$." },
{ question: "The sequence $a_n = \\frac{1}{n^2}\\sum_{k=1}^n k$ converges to:", options: ["$0$", "$\\frac{1}{2}$", "$1$", "$\\infty$"], correctAnswer: 1, explanation: "$\\sum_{k=1}^n k = \\frac{n(n+1)}{2}$, so $a_n = \\frac{n+1}{2n} \\to \\frac{1}{2}$." },
{ question: "If $a_n \\to a$ and $b_n \\to b$ with $a_n \\leq b_n$ for all $n$, then:", options: ["$a < b$", "$a \\leq b$", "$a = b$", "No relation can be concluded"], correctAnswer: 1, explanation: "Order is preserved in the limit but strict inequality may become equality; hence only $a \\leq b$ can be concluded." },
{ question: "The sequence $a_n = \\left(1 + \\frac{2}{n}\\right)^n$ converges to:", options: ["$e$", "$e^2$", "$2e$", "$1$"], correctAnswer: 1, explanation: "By the standard limit $\\left(1+\\frac{x}{n}\\right)^n \\to e^x$, here $x=2$ gives $e^2$." },
];


const REAL_ANALYSIS_POOL_3: Question[] = [
  { question: "A function $f: [a,b] \\to \\mathbb{R}$ of bounded variation must be:", options: ["Continuous", "Differentiable", "Riemann Integrable", "Monotonic"], correctAnswer: 2, explanation: "Functions of bounded variation are Riemann Integrable." },
  { question: "The union of two countable sets is:", options: ["Finite", "Uncountable", "Countable", "Empty"], correctAnswer: 2, explanation: "The union of two countable sets is countable." },
  { question: "Any open interval $(a,b)$ in $\\mathbb{R}$ is homeomorphic to:", options: ["$[a,b]$", "$\\mathbb{R}$", "$(0, \\infty)$ only", "None of these"], correctAnswer: 1, explanation: "$(a,b)$ and $\\mathbb{R}$ are homeomorphic." },
  { question: "A metric space is complete if:", options: ["Every sequence converges", "Every Cauchy sequence converges", "It is closed", "It is open"], correctAnswer: 1, explanation: "Definition of a complete metric space." },
  { question: "The Riemann-Stieltjes integral $\\int_a^b f d\\alpha$ exists if $f$ is continuous and $\\alpha$ is:", options: ["Monotonic", "Continuous", "Bounded", "None of these"], correctAnswer: 0, explanation: "It exists if $f$ is continuous and $\\alpha$ is monotonically increasing." },
  { question: "Which is a property of the Cantor set?", options: ["It has positive measure", "It is uncountable", "It is open", "It contains intervals"], correctAnswer: 1, explanation: "The Cantor set is a classic example of an uncountable set with measure zero." },
  { question: "Let $f$ be continuous on $[0,1]$ and $f(x) \\in \\mathbb{Q}$ for all $x$. Then $f$ is:", options: ["A polynomial", "Constant", "Identity function", "Unbounded"], correctAnswer: 1, explanation: "Since the image of a connected set under a continuous function is connected, $f([0,1])$ must be a single rational point." },
  { question: "The power series $\\sum n! x^n$ has radius of convergence:", options: ["$1$", "$\\infty$", "$0$", "$e$"], correctAnswer: 2, explanation: "By ratio test, limit is $\\infty$, so radius is 0." },
  { question: "A subset of $\\mathbb{R}$ is compact if and only if it is:", options: ["Closed", "Bounded", "Closed and bounded", "Open"], correctAnswer: 2, explanation: "Heine-Borel Theorem." },
  { question: "The limit inferior of the sequence $a_n = (-1)^n \\frac{n+1}{n}$ is:", options: ["$1$", "$-1$", "$0$", "Does not exist"], correctAnswer: 1, explanation: "The subsequences converge to $1$ and $-1$. The limit inferior is the smallest limit point, which is $-1$." }
];

const REAL_ANALYSIS_POOL_4: Question[] = [
{ question: "A decreasing sequence bounded below converges to its:", options: ["Supremum", "Infimum", "Limit superior only", "Does not necessarily converge"], correctAnswer: 1, explanation: "By the Monotone Convergence Theorem, a bounded decreasing sequence converges to its greatest lower bound (infimum)." },
{ question: "The sequence $a_n = (-1)^n \\left(2 + \\frac{1}{n}\\right)$ has $\\liminf a_n$ equal to:", options: ["$2$", "$-2$", "$0$", "Does not exist"], correctAnswer: 1, explanation: "The subsequence of odd terms tends to $-2$, and even terms tend to $2$; liminf is the smaller value $-2$." },
{ question: "If $a_n \\to 0$ and $(b_n)$ is bounded, then $a_n b_n$:", options: ["Diverges", "Converges to $0$", "Converges to $1$", "Is unbounded"], correctAnswer: 1, explanation: "A null sequence times a bounded sequence is always a null sequence." },
{ question: "The sequence $a_n = \\frac{3^n}{n!}$ converges to:", options: ["$0$", "$1$", "$e^3$", "$\\infty$"], correctAnswer: 0, explanation: "Factorial growth eventually dominates exponential growth, so $a_n \\to 0$." },
{ question: "Let $S = \\{a_n : n \\in \\mathbb{N}\\}$ where $a_n = 1/n$. The set of limit points of $S$ (in $\\mathbb{R}$) is:", options: ["$\\{0\\}$", "$\\{0, 1\\}$", "Empty set", "$\\mathbb{N}$"], correctAnswer: 0, explanation: "The only accumulation point of the set $\\{1, 1/2, 1/3, \\dots\\}$ is $0$." },
{ question: "The sequence $a_n = n \\sin(1/n)$ converges to:", options: ["$0$", "$1$", "$\\infty$", "Does not exist"], correctAnswer: 1, explanation: "Using $\\sin(1/n) \\approx 1/n$ for large $n$, or L'Hopital-type reasoning, $n\\sin(1/n) \\to 1$." },
{ question: "A sequence $(a_n)$ diverges to $+\\infty$ means for every $M>0$ there exists $N$ such that for $n>N$:", options: ["$a_n > M$", "$a_n < M$", "$|a_n| < M$", "$a_n = M$"], correctAnswer: 0, explanation: "This is the precise definition of a sequence diverging to positive infinity." },
{ question: "If $(a_n)$ and $(b_n)$ are both Cauchy sequences in $\\mathbb{R}$, then $(a_n + b_n)$ is:", options: ["Not necessarily Cauchy", "Always Cauchy", "Always divergent", "Bounded but not Cauchy"], correctAnswer: 1, explanation: "The sum of two Cauchy sequences is always Cauchy, following directly from the triangle inequality." },
{ question: "The sequence $a_n = \\frac{\\ln n}{n}$ converges to:", options: ["$0$", "$1$", "$\\infty$", "$e$"], correctAnswer: 0, explanation: "Logarithmic growth is slower than linear growth, so $\\frac{\\ln n}{n} \\to 0$ as $n \\to \\infty$." },
{ question: "If $a_n = (-1)^n + \\frac{1}{n}$, then:", options: ["$\\liminf a_n = -1, \\limsup a_n = 1$", "$\\liminf a_n = 0, \\limsup a_n = 1$", "The sequence converges", "$\\liminf a_n = 1$"], correctAnswer: 0, explanation: "Even terms approach $1$ and odd terms approach $-1$; hence limsup is $1$ and liminf is $-1$." },
];

const REAL_ANALYSIS_POOL_5: Question[] = [
  { 
    question: "The Least Upper Bound (Supremum) axiom distinguishes $\\mathbb{R}$ from $\\mathbb{Q}$ because:", 
    options: ["Every bounded subset of $\\mathbb{Q}$ has a supremum in $\\mathbb{Q}$", "Every bounded above subset of $\\mathbb{R}$ has a supremum in $\\mathbb{R}$, but this fails in $\\mathbb{Q}$", "$\\mathbb{Q}$ is uncountable while $\\mathbb{R}$ is countable", "Both sets satisfy the same completeness property"], 
    correctAnswer: 1, 
    explanation: "The set $\\{x \\in \\mathbb{Q} : x^2 < 2\\}$ is bounded above in $\\mathbb{Q}$ but has no supremum in $\\mathbb{Q}$, showing $\\mathbb{Q}$ is not order-complete, while $\\mathbb{R}$ satisfies the LUB property." 
  },
  { 
    question: "The supremum of the set $S = \\{1 - \\frac{1}{n} : n \\in \\mathbb{N}\\}$ is:", 
    options: ["$0$", "$1$", "Does not exist", "$\\frac{1}{2}$"], 
    correctAnswer: 1, 
    explanation: "As $n \\to \\infty$, $1 - 1/n \\to 1$, and $1$ is an upper bound not attained by any element, hence $\\sup S = 1$." 
  },
  { 
    question: "The infimum of the set $S = \\{\\frac{(-1)^n}{n} : n \\in \\mathbb{N}\\}$ is:", 
    options: ["$-1$", "$0$", "$-\\frac{1}{2}$", "$1$"], 
    correctAnswer: 0, 
    explanation: "For $n=1$, the term is $-1$, which is the smallest value the sequence attains, and it's an actual member of the set." 
  },
  { 
    question: "According to the Archimedean property, for any real number $x > 0$, there exists a natural number $n$ such that:", 
    options: ["$n < x$", "$n > x$", "$nx = 1$", "$n = x$"], 
    correctAnswer: 1, 
    explanation: "The Archimedean property states that for any real $x$, there exists $n \\in \\mathbb{N}$ with $n > x$, meaning $\\mathbb{N}$ is not bounded above in $\\mathbb{R}$." 
  },
  { 
    question: "The Archimedean property is used to prove that:", 
    options: ["$\\mathbb{Q}$ is uncountable", "For any $\\epsilon > 0$, there exists $n \\in \\mathbb{N}$ such that $\\frac{1}{n} < \\epsilon$", "$\\mathbb{R}$ is countable", "Every sequence converges"], 
    correctAnswer: 1, 
    explanation: "This is a direct and fundamental consequence of the Archimedean property, essential in many convergence proofs." 
  },
  { 
    question: "Dedekind's cut is a partition of $\\mathbb{Q}$ into two nonempty sets $A$ and $B$ such that:", 
    options: ["Every element of $A$ is greater than every element of $B$", "Every element of $A$ is less than every element of $B$, and $A$ has no greatest element", "$A$ and $B$ are both finite", "$A \\cup B = \\emptyset$"], 
    correctAnswer: 1, 
    explanation: "A Dedekind cut $(A,B)$ satisfies $A \\cup B = \\mathbb{Q}$, every element of $A$ is less than every element of $B$, and this partition represents a unique real number." 
  },
  { 
    question: "The Dedekind cut corresponding to the real number $\\sqrt{2}$ is defined by:", 
    options: ["$A = \\{x \\in \\mathbb{Q} : x \\leq 0 \\text{ or } x^2 < 2\\}$", "$A = \\{x \\in \\mathbb{Q} : x^2 = 2\\}$", "$A = \\mathbb{Q}$", "$A = \\{x \\in \\mathbb{Q} : x > 2\\}$"], 
    correctAnswer: 0, 
    explanation: "This defines the lower class of the cut representing $\\sqrt{2}$, which has no rational maximum, confirming $\\sqrt{2}$ is irrational." 
  },
  { 
    question: "Cantor's Nested Interval Theorem states that if $I_n = [a_n, b_n]$ are closed, bounded, nested intervals with $b_n - a_n \\to 0$, then:", 
    options: ["$\\bigcap_n I_n$ is empty", "$\\bigcap_n I_n$ contains exactly one point", "$\\bigcap_n I_n$ contains infinitely many points", "The intervals do not intersect"], 
    correctAnswer: 1, 
    explanation: "This is the precise statement of Cantor's Nested Interval Theorem, a form of the completeness axiom for $\\mathbb{R}$." 
  },
  { 
    question: "The Nested Interval Theorem fails if the intervals are:", 
    options: ["Closed and bounded", "Open, e.g., $I_n = (0, 1/n)$", "Both closed and nested", "Bounded and decreasing in length"], 
    correctAnswer: 1, 
    explanation: "For $I_n = (0, 1/n)$, $\\bigcap_n I_n = \\emptyset$ because openness excludes the boundary point $0$." 
  },
  { 
    question: "A set $S \\subseteq \\mathbb{R}$ is said to be bounded if:", 
    options: ["It is bounded above only", "It is bounded below only", "It is bounded both above and below", "It contains only rational numbers"], 
    correctAnswer: 2, 
    explanation: "A set is called bounded if it has both an upper bound and a lower bound." 
  },
  { 
    question: "If $S$ is a nonempty subset of $\\mathbb{R}$ bounded above, then $\\sup S$:", 
    options: ["May not exist", "Always exists and is unique", "Is always an element of $S$", "Equals $\\max S$ always"], 
    correctAnswer: 1, 
    explanation: "By the completeness (LUB) axiom of $\\mathbb{R}$, every nonempty set bounded above has a unique supremum in $\\mathbb{R}$." 
  },
  { 
    question: "For the set $S = (0, 1)$, which statement is true?", 
    options: ["$\\sup S = 1 \\in S$", "$\\sup S = 1 \\notin S$", "$S$ has no supremum", "$\\inf S = 0 \\in S$"], 
    correctAnswer: 1, 
    explanation: "The supremum of an open interval need not belong to the set; here $\\sup S = 1$ but $1 \\notin (0,1)$." 
  },
  { 
    question: "The set of natural numbers $\\mathbb{N}$ as a subset of $\\mathbb{R}$ is:", 
    options: ["Bounded above", "Bounded below but not above", "Bounded both above and below", "Neither bounded above nor below"], 
    correctAnswer: 1, 
    explanation: "$\\mathbb{N}$ has $1$ as a lower bound but is unbounded above, per the Archimedean property." 
  },
  { 
    question: "Every nonempty subset of $\\mathbb{R}$ that is bounded below has:", 
    options: ["A maximum element", "An infimum", "No infimum necessarily", "A supremum equal to $0$"], 
    correctAnswer: 1, 
    explanation: "By completeness of $\\mathbb{R}$, every nonempty set bounded below has an infimum (greatest lower bound)." 
  },
  { 
    question: "The decimal representation of a rational number is always:", 
    options: ["Non-terminating and non-repeating", "Either terminating or eventually periodic (repeating)", "Always terminating", "Always irrational"], 
    correctAnswer: 1, 
    explanation: "Rational numbers have decimal expansions that either terminate or become periodic after some point." 
  },
  { 
    question: "The decimal expansion of an irrational number is:", 
    options: ["Always terminating", "Eventually periodic", "Non-terminating and non-repeating", "Always finite"], 
    correctAnswer: 2, 
    explanation: "Irrational numbers are precisely those real numbers whose decimal expansions never terminate and never become periodic." 
  },
  { 
    question: "The number $0.999\\ldots$ (recurring) is equal to:", 
    options: ["$0.9$", "Slightly less than $1$", "$1$", "Undefined"], 
    correctAnswer: 2, 
    explanation: "By the geometric series or limit argument, $0.999\\ldots = \\sum_{k=1}^{\\infty} 9/10^k = 1$ exactly." 
  },
  { 
    question: "Which of the following best describes the geometric representation of real numbers?", 
    options: ["A one-to-one correspondence between $\\mathbb{R}$ and points on a number line", "A many-to-one mapping onto the number line", "Only rational numbers can be represented on the line", "Real numbers cannot be visualized geometrically"], 
    correctAnswer: 0, 
    explanation: "The real number system is set up to have a bijective correspondence with points on an infinite straight line (the number line)." 
  },
  { 
    question: "Cantor's construction of real numbers uses:", 
    options: ["Dedekind cuts", "Equivalence classes of Cauchy sequences of rationals", "Only natural numbers", "Peano axioms directly"], 
    correctAnswer: 1, 
    explanation: "Cantor's approach constructs $\\mathbb{R}$ as equivalence classes of Cauchy sequences of rational numbers, an alternative to Dedekind's cuts." 
  },
  { 
    question: "The completeness axiom of $\\mathbb{R}$ is NOT equivalent to which of the following?", 
    options: ["Least Upper Bound Property", "Cauchy's General Principle of Convergence", "Nested Interval Theorem", "Archimedean Property alone"], 
    correctAnswer: 3, 
    explanation: "The Archimedean property alone does not imply completeness; $\\mathbb{Q}$ satisfies the Archimedean property but is not complete." 
  },
  { 
    question: "If $a$ is an upper bound of set $S$ and $a \\in S$, then $a$ is called:", 
    options: ["The infimum of $S$", "The maximum of $S$", "A lower bound of $S$", "An accumulation point"], 
    correctAnswer: 1, 
    explanation: "When an upper bound belongs to the set itself, it is called the maximum element of the set." 
  },
  { 
    question: "For the set $S = \\{x \\in \\mathbb{Q} : x^2 < 2\\}$, in $\\mathbb{Q}$:", 
    options: ["$\\sup S$ exists in $\\mathbb{Q}$", "$\\sup S$ does not exist in $\\mathbb{Q}$", "$S$ is unbounded", "$S$ is empty"], 
    correctAnswer: 1, 
    explanation: "This classical example shows $\\mathbb{Q}$ fails the LUB property since $\\sqrt{2} \\notin \\mathbb{Q}$ is the 'missing' supremum." 
  },
  { 
    question: "Between any two distinct real numbers, there exists:", 
    options: ["No rational number", "Exactly one rational number", "Infinitely many rational numbers", "Only irrational numbers"], 
    correctAnswer: 2, 
    explanation: "The density property of $\\mathbb{Q}$ in $\\mathbb{R}$ guarantees infinitely many rationals between any two distinct reals." 
  },
  { 
    question: "Between any two distinct real numbers, there exists:", 
    options: ["No irrational number", "Exactly one irrational number", "Infinitely many irrational numbers", "Only rational numbers"], 
    correctAnswer: 2, 
    explanation: "Similarly, irrational numbers are also dense in $\\mathbb{R}$; infinitely many exist between any two distinct reals." 
  },
  { 
    question: "If $\\sup S = s$, then which property must hold?", 
    options: ["For every $\\epsilon > 0$, there exists $x \\in S$ such that $x > s - \\epsilon$", "$s \\in S$ always", "$s$ is the largest element of $S$", "No element of $S$ can equal $s$"], 
    correctAnswer: 0, 
    explanation: "This is the defining approximation property of supremum: it can be approached arbitrarily closely by elements of $S$." 
  },
  { 
    question: "If $\\inf S = m$, then which property must hold?", 
    options: ["For every $\\epsilon>0$, there exists $x \\in S$ such that $x < m + \\epsilon$", "$m \\in S$ always", "$m$ is negative", "$S$ must be finite"], 
    correctAnswer: 0, 
    explanation: "This is the defining approximation property of infimum, analogous to the supremum property." 
  },
  { 
    question: "The set $\\mathbb{Z}$ (integers) as a subset of $\\mathbb{R}$ is:", 
    options: ["Bounded", "Unbounded both above and below", "Bounded above only", "Bounded below only"], 
    correctAnswer: 1, 
    explanation: "Integers extend infinitely in both positive and negative directions, so $\\mathbb{Z}$ is unbounded above and below." 
  },
  { 
    question: "Which axiom guarantees the existence of $\\sqrt{2}$ as a real number?", 
    options: ["Archimedean property", "Least Upper Bound axiom", "Peano's axioms", "Trichotomy law"], 
    correctAnswer: 1, 
    explanation: "The set $\\{x \\in \\mathbb{Q} : x^2 < 2\\}$ is bounded above; the LUB axiom guarantees its supremum exists in $\\mathbb{R}$, and this supremum is $\\sqrt{2}$." 
  },
  { 
    question: "A number $c$ is called an accumulation point (limit point) of a set $S$ if:", 
    options: ["$c \\in S$ necessarily", "Every neighborhood of $c$ contains a point of $S$ other than $c$", "$c$ is an isolated point of $S$", "$S$ is finite"], 
    correctAnswer: 1, 
    explanation: "This is the standard definition of an accumulation/limit point, and importantly $c$ need not belong to $S$." 
  },
  { 
    question: "The set $S = \\{1, 2, 3\\}$ (a finite set) has how many limit points?", 
    options: ["Infinitely many", "Exactly $3$", "Exactly $0$", "Exactly $1$"], 
    correctAnswer: 2, 
    explanation: "Finite sets have no limit points because we can always find a small enough neighborhood around each point that excludes other points of $S$." 
  }
];

const REAL_ANALYSIS_POOL_6: Question[] = [

{ question: "A sequence $(a_n)$ is said to be bounded if:", options: ["There exists $M>0$ such that $|a_n| \\leq M$ for all $n$", "$a_n \\to 0$", "$(a_n)$ is monotone", "$(a_n)$ has a limit point"], correctAnswer: 0, explanation: "Boundedness of a sequence means all terms lie within some fixed interval $[-M, M]$." },

{ question: "Every convergent sequence of real numbers is:", options: ["Unbounded", "Bounded", "Monotone", "Divergent"], correctAnswer: 1, explanation: "A fundamental theorem states that convergence implies boundedness; the converse is not true in general." },

{ question: "Cauchy's First Limit Theorem states that if $a_n \\to L$, then the sequence of arithmetic means $\\frac{a_1+a_2+\\cdots+a_n}{n}$:", options: ["Diverges", "Converges to $L$", "Converges to $0$", "Converges to $2L$"], correctAnswer: 1, explanation: "This is Cauchy's First Limit Theorem (Cesàro mean theorem): the Cesàro means of a convergent sequence converge to the same limit." },

{ question: "Cauchy's Second Limit Theorem states that if $a_n > 0$ and $a_n \\to L$, then $(a_1 a_2 \\cdots a_n)^{1/n}$:", options: ["Converges to $L$", "Diverges", "Converges to $L^2$", "Converges to $0$"], correctAnswer: 0, explanation: "This is Cauchy's Second Limit Theorem: the geometric mean of a positive convergent sequence converges to the same limit." },

{ question: "Using Cauchy's Second Limit Theorem, $\\lim_{n\\to\\infty} (n!)^{1/n}/n$ equals:", options: ["$0$", "$1/e$", "$1$", "$e$"], correctAnswer: 1, explanation: "Applying the theorem to $a_n = n$ transformed suitably (via $b_n = n/n$ ratios), one derives $(n!)^{1/n}/n \\to 1/e$, a classical result." },

{ question: "The sequence $a_n = \\left(1 + \\frac{1}{n}\\right)^n$ is used to define:", options: ["$\\pi$", "$e$", "$\\ln 2$", "$\\gamma$"], correctAnswer: 1, explanation: "Euler's number $e$ is classically defined as the limit of this specific increasing bounded sequence." },

{ question: "A monotone sequence of real numbers converges if and only if it is:", options: ["Cauchy", "Unbounded", "Bounded", "Constant"], correctAnswer: 2, explanation: "For monotone sequences, boundedness is both necessary and sufficient for convergence (Monotone Convergence Theorem)." },

{ question: "The Nested Interval Theorem requires the lengths of intervals $I_n = [a_n,b_n]$ to satisfy:", options: ["$b_n - a_n \\to \\infty$", "$b_n - a_n \\to 0$", "$b_n - a_n$ is constant", "$a_n \\to \\infty$"], correctAnswer: 1, explanation: "For the intersection to reduce to a single point, the lengths must shrink to zero as $n \\to \\infty$." },

{ question: "Cauchy's General Principle of Convergence states that a sequence $(a_n)$ converges if and only if:", options: ["It is monotone", "It is Cauchy: for every $\\epsilon>0$, there exists $N$ such that $|a_n - a_m|<\\epsilon$ for $m,n>N$", "It is bounded only", "It has a unique limit point"], correctAnswer: 1, explanation: "This is the defining Cauchy criterion, equivalent to convergence in the complete space $\\mathbb{R}$." },

{ question: "If $(a_n)$ is Cauchy, then which of the following is guaranteed?", options: ["$(a_n)$ is bounded", "$(a_n)$ is monotone", "$(a_n)$ diverges", "$(a_n)$ has two distinct limit points"], correctAnswer: 0, explanation: "Every Cauchy sequence is necessarily bounded, a key lemma en route to proving completeness of $\\mathbb{R}$." },

{ question: "A subsequence of a sequence $(a_n)$ is obtained by:", options: ["Reordering all terms", "Selecting terms $a_{n_1}, a_{n_2}, \\ldots$ with $n_1 < n_2 < \\cdots$", "Taking only even-indexed terms always", "Adding new terms to the sequence"], correctAnswer: 1, explanation: "A subsequence retains the original order but selects only some terms indexed by an increasing sequence of natural numbers." },

{ question: "If a sequence $(a_n)$ has two subsequences converging to different limits, then $(a_n)$:", options: ["Converges", "Diverges", "Is Cauchy", "Is bounded and monotone"], correctAnswer: 1, explanation: "If a sequence converged, all its subsequences would converge to the same limit; distinct subsequential limits imply divergence." },

{ question: "The sequence $a_n = \\left(1 - \\frac{1}{n}\\right)^n$ converges to:", options: ["$1$", "$e$", "$e^{-1}$", "$0$"], correctAnswer: 2, explanation: "Using the standard limit form $\\left(1+\\frac{x}{n}\\right)^n \\to e^x$ with $x=-1$, we obtain $e^{-1}$." },

{ question: "By the Sandwich (Squeeze) rule, if $a_n \\leq c_n \\leq b_n$ eventually, and $a_n, b_n \\to L$, then:", options: ["$c_n$ may diverge", "$c_n \\to L$", "$c_n \\to 0$ always", "No conclusion possible"], correctAnswer: 1, explanation: "This is the fundamental Sandwich/Squeeze theorem for sequences." },

{ question: "The sequence $a_n = \\frac{n!}{n^n}$ satisfies which limit?", options: ["$\\lim a_n = 1$", "$\\lim a_n = 0$", "$\\lim a_n = e$", "$\\lim a_n = \\infty$"], correctAnswer: 1, explanation: "Since $\\frac{a_{n+1}}{a_n} \\to 1/e < 1$, the sequence tends to $0$." },

{ question: "Which of the following is an equivalent formulation of completeness using nested intervals?", options: ["Every sequence of nested open intervals has nonempty intersection", "Every sequence of nested closed bounded intervals with lengths tending to zero has exactly one common point", "Every interval is bounded", "Nested intervals never intersect"], correctAnswer: 1, explanation: "This precise formulation is the Nested Interval Property, equivalent to the completeness of $\\mathbb{R}$." },

{ question: "If $(a_n)$ is a sequence in $\\mathbb{R}$ such that $a_{n+1} \\leq a_n$ for all $n$ and $a_n \\geq 0$, the sequence:", options: ["Diverges to $-\\infty$", "Converges (to its infimum)", "Is unbounded", "Oscillates"], correctAnswer: 1, explanation: "A decreasing sequence bounded below (here by $0$) converges by the Monotone Convergence Theorem." },

{ question: "The limit $\\lim_{n\\to\\infty} \\left(\\frac{1}{n^2} + \\frac{2}{n^2} + \\cdots + \\frac{n}{n^2}\\right)$ equals:", options: ["$0$", "$\\frac{1}{2}$", "$1$", "$\\infty$"], correctAnswer: 1, explanation: "The sum equals $\\frac{n(n+1)}{2n^2} \\to \\frac{1}{2}$ as $n \\to \\infty$." },

{ question: "The operations on limits state that if $a_n \\to L_1$ and $b_n \\to L_2$, then $a_n \\cdot b_n \\to$:", options: ["$L_1 + L_2$", "$L_1 \\cdot L_2$", "$L_1 / L_2$", "$\\max(L_1, L_2)$"], correctAnswer: 1, explanation: "This is the standard algebraic limit theorem for products of convergent sequences." },

{ question: "If $a_n \\to L \\neq 0$, then $\\frac{1}{a_n}$ converges to:", options: ["$0$", "$1/L$", "$L$", "Does not converge"], correctAnswer: 1, explanation: "Provided the limit is nonzero, the reciprocal sequence converges to the reciprocal of the limit." },

{ question: "The sequence $a_n = \\sum_{k=1}^n \\frac{1}{k^2}$ is:", options: ["Divergent", "Convergent by Monotone Convergence Theorem (bounded increasing)", "Oscillating", "Convergent to $0$"], correctAnswer: 1, explanation: "The partial sums are increasing and bounded above by $2$ (comparing with a telescoping series), so by MCT they converge (to $\\pi^2/6$)." },

{ question: "Every Cauchy sequence in $\\mathbb{R}$ has which property regarding subsequences?", options: ["No convergent subsequence", "Every subsequence converges to the same limit as the sequence", "Subsequences may diverge", "Exactly two convergent subsequences"], correctAnswer: 1, explanation: "Since Cauchy sequences converge in $\\mathbb{R}$, all their subsequences converge to that same limit." },

{ question: "If $(a_n)$ satisfies $|a_{n+1}-L| \\leq k|a_n - L|$ for some $0<k<1$, then $(a_n)$:", options: ["Diverges", "Converges to $L$ linearly", "Is unbounded", "Is Cauchy but not convergent"], correctAnswer: 1, explanation: "This condition implies linear (geometric) convergence of $(a_n)$ to $L$." },

{ question: "The limit $\\lim_{n \\to \\infty} \\sqrt[n]{n}$ equals:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 1, explanation: "Taking logarithms, $\\frac{\\ln n}{n} \\to 0$, hence $n^{1/n} \\to e^0 = 1$." },

{ question: "The limit $\\lim_{n\\to\\infty} \\sqrt[n]{a}$ for $a>0$ equals:", options: ["$0$", "$1$", "$a$", "$\\infty$"], correctAnswer: 1, explanation: "For any fixed $a>0$, $a^{1/n} \\to 1$ as $n \\to \\infty$, using continuity of exponential/logarithm functions." },

{ question: "If $(a_n)$ is a sequence with $a_n \\to L$ and $f$ is continuous at $L$, then $f(a_n)$:", options: ["Diverges", "Converges to $f(L)$", "Converges to $L$", "Is unbounded"], correctAnswer: 1, explanation: "This is the sequential characterization of continuity: continuous functions preserve limits of sequences." },

{ question: "The recursively defined sequence $a_1 = 2$, $a_{n+1} = \\frac{1}{2}\\left(a_n + \\frac{2}{a_n}\\right)$ converges to:", options: ["$1$", "$\\sqrt{2}$", "$2$", "$e$"], correctAnswer: 1, explanation: "This is the classical Newton's method iteration for $\\sqrt{2}$; the sequence is decreasing and bounded below, converging to $\\sqrt{2}$." },

{ question: "For a bounded sequence $(a_n)$, which statement is always TRUE?", options: ["$\\liminf a_n \\leq \\limsup a_n$", "$\\liminf a_n > \\limsup a_n$", "$\\liminf a_n$ does not exist", "$\\limsup a_n = \\infty$ always"], correctAnswer: 0, explanation: "For any bounded sequence, the liminf is always less than or equal to the limsup by definition." },

{ question: "The sequence $a_n = \\left(1 + \\frac{x}{n}\\right)^n$ for fixed $x \\in \\mathbb{R}$ converges to:", options: ["$1$", "$e^x$", "$x$", "$e$"], correctAnswer: 1, explanation: "This generalizes the definition of $e$; the limit equals $e^x$ for any real $x$." },

{ question: "A sequence $(a_n)$ satisfying the Cauchy criterion in $\\mathbb{R}$ is equivalent to saying $(a_n)$:", options: ["Has a limit point at infinity", "Converges to some real number", "Is unbounded", "Is strictly monotone"], correctAnswer: 1, explanation: "By completeness of $\\mathbb{R}$, Cauchy sequences are precisely the convergent ones." },
];

const REAL_ANALYSIS_POOL_7: Question[] = [
{ question: "If $(a_n)$ is a sequence such that $a_n \\to L$ and $a_n \\geq 0$ for all $n$, then $\\sqrt{a_n}$ converges to:", options: ["$\\sqrt{L}$", "$L$", "$0$", "Does not converge"], correctAnswer: 0, explanation: "The square root function is continuous on $[0,\\infty)$, so by the sequential continuity property, $\\sqrt{a_n} \\to \\sqrt{L}$." },

{ question: "The sequence $a_n = \\frac{1}{n} \\sin(n)$ satisfies:", options: ["$\\liminf a_n = -1, \\limsup a_n = 1$", "$a_n \\to 0$", "$a_n$ diverges", "$a_n \\to 1$"], correctAnswer: 1, explanation: "Since $|\\sin n| \\leq 1$, we have $|a_n| \\leq 1/n \\to 0$, so by the squeeze theorem $a_n \\to 0$." },

{ question: "If $(a_n)$ is unbounded, then $(a_n)$:", options: ["Must be Cauchy", "Cannot be Cauchy", "Always converges", "Is monotone"], correctAnswer: 1, explanation: "Since every Cauchy sequence is bounded, an unbounded sequence cannot satisfy the Cauchy criterion." },

{ question: "The sequence $a_n = (-1)^n n$ has which property?", options: ["Convergent", "Cauchy", "Unbounded and divergent", "Bounded but divergent"], correctAnswer: 2, explanation: "The terms alternate in sign and grow without bound in magnitude, making the sequence unbounded and divergent." },

{ question: "For the recursively defined sequence $a_1=1$, $a_{n+1} = \\frac{a_n}{2} + 1$, the limit is:", options: ["$1$", "$2$", "$0$", "$\\infty$"], correctAnswer: 1, explanation: "Setting $L = L/2 + 1$ gives $L = 2$. The sequence is increasing and bounded above by $2$, confirming convergence to $2$." },

{ question: "By Cauchy's First Limit Theorem, if $a_n \\to 0$, then $\\frac{a_1+a_2+\\cdots+a_n}{n}$:", options: ["Diverges", "Converges to $0$", "Converges to $1$", "Oscillates"], correctAnswer: 1, explanation: "Since the Cesàro mean of a sequence converging to $L$ also converges to $L$, here $L=0$ gives Cesàro mean $\\to 0$." },

{ question: "The sequence $a_n = \\left(\\frac{n+2}{n+1}\\right)^n$ converges to:", options: ["$1$", "$e$", "$e^2$", "$0$"], correctAnswer: 1, explanation: "Rewriting as $\\left(1 + \\frac{1}{n+1}\\right)^n$, the limit evaluates to $e$ using standard exponential limit techniques." },

{ question: "A sequence $(a_n)$ is called eventually monotone if:", options: ["It is monotone for all $n$", "It becomes monotone after some finite index $N$", "It is bounded", "It converges to $0$"], correctAnswer: 1, explanation: "Eventual monotonicity means the monotone behavior holds only after some point, not necessarily from the start." },

{ question: "If a sequence $(a_n)$ is eventually monotone and bounded, then it:", options: ["Diverges", "Converges", "Is not Cauchy", "Has multiple limit points"], correctAnswer: 1, explanation: "Since convergence depends only on the tail behavior, eventual monotonicity combined with boundedness still guarantees convergence." },

{ question: "The sequence $a_n = \\sum_{k=1}^{n} \\frac{1}{k}$ (harmonic series partial sums) is:", options: ["Convergent", "Divergent to $+\\infty$", "Bounded", "Convergent to $1$"], correctAnswer: 1, explanation: "The harmonic series partial sums increase without bound, diverging to infinity despite $1/n \\to 0$." },

{ question: "The sequence $a_n = n - \\sqrt{n^2-1}$ converges to:", options: ["$0$", "$1$", "$\\infty$", "$-1$"], correctAnswer: 0, explanation: "Rationalizing: $a_n = \\frac{1}{n+\\sqrt{n^2-1}} \\to 0$ as $n \\to \\infty$." },

{ question: "If $(a_n)$ and $(b_n)$ are Cauchy sequences, then $(a_n b_n)$ is:", options: ["Not necessarily Cauchy", "Always Cauchy", "Divergent", "Unbounded"], correctAnswer: 1, explanation: "Since Cauchy sequences are bounded and convergent in $\\mathbb{R}$, their product is also Cauchy (and converges to the product of the limits)." },

{ question: "The sequence $a_n = \\frac{2^n}{n!}$ satisfies:", options: ["$a_n \\to \\infty$", "$a_n \\to 0$", "$a_n \\to 1$", "$a_n \\to e^2$"], correctAnswer: 1, explanation: "Since factorial growth dominates exponential growth eventually, $a_n \\to 0$." },

{ question: "For the sequence $a_n = \\left(1+\\frac{1}{2n}\\right)^{2n}$, the limit is:", options: ["$e$", "$e^{1/2}$", "$1$", "$e^2$"], correctAnswer: 0, explanation: "By the definition of $e$ using $\\left(1+\\frac{1}{m}\\right)^m \\to e$ with $m=2n \\to \\infty$, the limit is $e$." },

{ question: "If a sequence has $\\liminf a_n = \\limsup a_n = +\\infty$, then the sequence:", options: ["Converges to a finite limit", "Diverges to $+\\infty$", "Oscillates", "Is Cauchy"], correctAnswer: 1, explanation: "When both liminf and limsup are $+\\infty$, the sequence itself diverges to positive infinity." },

{ question: "The set of subsequential limits of the sequence $a_n = \\sin(n)$ is:", options: ["$\\{-1, 1\\}$", "$\\{0\\}$", "The interval $[-1,1]$", "Empty set"], correctAnswer: 2, explanation: "Since $n$ mod $2\\pi$ is equidistributed (irrational rotation), $\\sin(n)$ has subsequential limits densely filling $[-1,1]$." },

{ question: "The sequence $a_n = \\frac{n^2+1}{2n^2-3}$ converges to:", options: ["$0$", "$\\frac{1}{2}$", "$1$", "$2$"], correctAnswer: 1, explanation: "Dividing numerator and denominator by $n^2$: $\\frac{1+1/n^2}{2-3/n^2} \\to \\frac{1}{2}$." },

{ question: "If $a_n \\to L$ and $c$ is a constant, then $ca_n$ converges to:", options: ["$cL$", "$c+L$", "$L/c$", "$c$"], correctAnswer: 0, explanation: "This is the scalar multiplication rule for limits of sequences, a basic algebraic limit theorem." },

{ question: "The Bolzano-Weierstrass theorem, applied to sequences, guarantees that every bounded sequence:", options: ["Converges", "Has a convergent subsequence", "Is Cauchy", "Is monotone"], correctAnswer: 1, explanation: "The theorem guarantees a convergent subsequence exists, though the original sequence itself need not converge." },

{ question: "The sequence $a_n = \\frac{5n^3+2n}{n^3-n^2+1}$ converges to:", options: ["$0$", "$1$", "$5$", "$\\infty$"], correctAnswer: 2, explanation: "Dividing by $n^3$: $\\frac{5+2/n^2}{1-1/n+1/n^3} \\to 5$ as $n \\to \\infty$." },

{ question: "If $(a_n)$ is Cauchy and has a subsequence converging to $L$, then:", options: ["The entire sequence converges to $L$", "The sequence diverges", "$L$ is not unique", "No conclusion can be drawn"], correctAnswer: 0, explanation: "A key property: if a Cauchy sequence has a convergent subsequence, the whole sequence converges to the same limit." },

{ question: "The sequence $a_n = \\left(1+\\frac{1}{n}\\right)^{n^2}$ satisfies:", options: ["$a_n \\to e$", "$a_n \\to \\infty$", "$a_n \\to 1$", "$a_n \\to 0$"], correctAnswer: 1, explanation: "Since $\\left(1+\\frac1n\\right)^n \\to e > 1$, raising further to the $n$-th power causes divergence to infinity." },

{ question: "For $a_n = \\frac{n}{\\ln n}$ (for $n\\geq 2$), the sequence:", options: ["Converges to $1$", "Diverges to $\\infty$", "Converges to $0$", "Oscillates"], correctAnswer: 1, explanation: "Since linear growth dominates logarithmic growth, $n/\\ln n \\to \\infty$." },

{ question: "The sequence defined by $a_n = \\frac{1}{n+1}+\\frac{1}{n+2}+\\cdots+\\frac{1}{2n}$ converges to:", options: ["$0$", "$\\ln 2$", "$1$", "$\\infty$"], correctAnswer: 1, explanation: "This is a Riemann sum for $\\int_0^1 \\frac{1}{1+x}dx = \\ln 2$." },

{ question: "If $(a_n)$ converges to $L>0$, then eventually (for large $n$):", options: ["$a_n < 0$", "$a_n > 0$", "$a_n = 0$", "No sign can be determined"], correctAnswer: 1, explanation: "By the preservation of sign property of limits, if $L>0$, then $a_n$ must be positive for all sufficiently large $n$." },

{ question: "The sequence $a_n = \\left(\\frac{1}{2}\\right)^n + \\left(\\frac{1}{3}\\right)^n$ converges to:", options: ["$0$", "$1$", "$\\frac{5}{6}$", "$\\infty$"], correctAnswer: 0, explanation: "Both geometric terms tend to $0$ since their ratios have magnitude less than $1$, so the sum also tends to $0$." },

{ question: "A necessary condition for a sequence $(a_n)$ to converge is that:", options: ["$(a_n)$ must be monotone", "$(a_n)$ must be bounded", "$(a_n)$ must be Cauchy in a general metric space", "$(a_n)$ must diverge to infinity"], correctAnswer: 1, explanation: "Boundedness is necessary (though not sufficient) for convergence of any sequence." },

{ question: "The sequence $a_n = \\frac{n \\cos(n\\pi)}{n+1}$ has $\\liminf$ and $\\limsup$ equal to:", options: ["$\\liminf = -1, \\limsup = 1$", "$\\liminf = 0, \\limsup = 1$", "Both equal to $0$", "Both equal to $1$"], correctAnswer: 0, explanation: "Since $\\cos(n\\pi) = (-1)^n$, the sequence behaves like $(-1)^n \\cdot \\frac{n}{n+1}$, whose subsequential limits are $-1$ and $1$." },

{ question: "If $\\lim_{n\\to\\infty} |a_{n+1}/a_n| = r < 1$, then by the ratio test for sequences, $a_n$:", options: ["Diverges", "Converges to $0$", "Converges to $1$", "Is unbounded"], correctAnswer: 1, explanation: "This ratio condition ensures the sequence eventually decreases geometrically to $0$." },

{ question: "The sequence $a_n = \\frac{(2n)!}{(n!)^2 4^n}$ converges to:", options: ["$0$", "$\\infty$", "A finite nonzero limit related to $1/\\sqrt{\\pi n}$ behavior, so $a_n \\to 0$", "$1$"], correctAnswer: 2, explanation: "Using Stirling's approximation, $a_n \\sim \\frac{1}{\\sqrt{\\pi n}} \\to 0$ as $n \\to \\infty$, this is the central binomial coefficient ratio." },
];

const REAL_ANALYSIS_POOL_8: Question[] = [
{ question: "The sequence $a_n = \\left(1 + \\frac{1}{n}\\right)^{-n}$ converges to:", options: ["$e$", "$e^{-1}$", "$1$", "$0$"], correctAnswer: 1, explanation: "This is the reciprocal of $\\left(1+\\frac{1}{n}\\right)^n \\to e$, so the limit is $e^{-1}$." },
{ question: "If $I_n = [0, 1/n]$ for $n \\in \\mathbb{N}$, then $\\bigcap_{n=1}^{\\infty} I_n$ equals:", options: ["$\\emptyset$", "$\\{0\\}$", "$[0,1]$", "$(0,1)$"], correctAnswer: 1, explanation: "By the Nested Interval Theorem, since lengths $1/n \\to 0$, the intersection reduces to the single common point $\\{0\\}$." },
{ question: "The sequence $a_n = \\frac{1}{1\\cdot 2} + \\frac{1}{2 \\cdot 3} + \\cdots + \\frac{1}{n(n+1)}$ converges to:", options: ["$0$", "$\\frac{1}{2}$", "$1$", "$\\infty$"], correctAnswer: 2, explanation: "Using partial fractions, this telescopes to $1 - \\frac{1}{n+1} \\to 1$." },
{ question: "A sequence $(a_n)$ satisfies $a_{n+2} = \\frac{a_n + a_{n+1}}{2}$ with $a_1=0, a_2=1$. This sequence:", options: ["Diverges", "Converges to $2/3$", "Converges to $1$", "Oscillates without limit"], correctAnswer: 1, explanation: "This is a classic averaging recursion; solving the recurrence shows convergence to $2/3$ using the characteristic equation method." },
{ question: "The Cauchy sequence criterion is particularly important because it allows us to establish convergence:", options: ["Without knowing the actual limit in advance", "Only for monotone sequences", "Only for bounded sequences", "Only in $\\mathbb{Q}$"], correctAnswer: 0, explanation: "The power of the Cauchy criterion is that convergence can be verified intrinsically, without needing to identify the limit beforehand." },
{ question: "For the sequence $a_n = \\frac{\\sin(n^2)}{n}$, we have:", options: ["$a_n \\to 1$", "$a_n \\to 0$", "$a_n$ diverges", "$a_n \\to -1$"], correctAnswer: 1, explanation: "Since $|\\sin(n^2)| \\leq 1$, by the squeeze theorem $|a_n| \\leq 1/n \\to 0$." },
{ question: "If $a_n \\to L_1$ and a subsequence $a_{n_k} \\to L_2$ with $L_1 \\neq L_2$, this situation:", options: ["Is possible for convergent sequences", "Is impossible; contradicts uniqueness of limits", "Only occurs in $\\mathbb{Q}$", "Implies $(a_n)$ is Cauchy"], correctAnswer: 1, explanation: "If $a_n \\to L_1$, every subsequence must also converge to $L_1$; this scenario is a contradiction." },
{ question: "The sequence $a_n = \\frac{1}{n^p}$ for $p>0$ converges to:", options: ["$1$", "$0$", "$\\infty$", "Depends on $p$ being an integer"], correctAnswer: 1, explanation: "For any fixed $p>0$, $1/n^p \\to 0$ as $n \\to \\infty$, regardless of whether $p$ is an integer." },
{ question: "If a sequence $(a_n)$ is bounded and monotone increasing but NOT convergent, this scenario:", options: ["Can happen in $\\mathbb{R}$", "Cannot happen in $\\mathbb{R}$ (violates MCT)", "Only happens for negative sequences", "Happens only in $\\mathbb{Q}$"], correctAnswer: 1, explanation: "The Monotone Convergence Theorem guarantees convergence for bounded monotone sequences in the complete space $\\mathbb{R}$; this cannot fail." },
{ question: "The limit $\\lim_{n\\to\\infty}\\left(\\sqrt{n+1}-\\sqrt{n}\\right)\\sqrt{n}$ equals:", options: ["$0$", "$\\frac{1}{2}$", "$1$", "$\\infty$"], correctAnswer: 1, explanation: "Rationalizing: $\\frac{\\sqrt{n}}{\\sqrt{n+1}+\\sqrt{n}} \\to \\frac{1}{2}$ as $n \\to \\infty$." },
{ question: "The definition of $e$ via the sequence $\\left(1+\\frac1n\\right)^n$ relies crucially on proving the sequence is:", options: ["Decreasing and bounded below", "Increasing and bounded above", "Constant", "Divergent"], correctAnswer: 1, explanation: "The Monotone Convergence Theorem is applied after showing this sequence is increasing and bounded above by $3$ (or similar bound)." },
{ question: "For sequences, the statement 'every convergent sequence is Cauchy' holds in:", options: ["Only $\\mathbb{R}$", "Any metric space", "Only complete metric spaces", "Only $\\mathbb{Q}$"], correctAnswer: 1, explanation: "This direction always holds in any metric space; it's the converse (Cauchy implies convergent) that requires completeness." },
{ question: "The sequence $a_n = n^2 e^{-n}$ satisfies:", options: ["$a_n \\to \\infty$", "$a_n \\to 0$", "$a_n \\to 1$", "$a_n \\to e$"], correctAnswer: 1, explanation: "Exponential decay dominates polynomial growth, so $n^2 e^{-n} \\to 0$ as $n \\to \\infty$." },
{ question: "If $(a_n)$ is a sequence of positive terms with $a_n \\to L > 0$, then $\\ln(a_n)$ converges to:", options: ["$\\ln L$", "$L$", "$0$", "Does not converge"], correctAnswer: 0, explanation: "Since $\\ln$ is continuous at $L>0$, the sequential continuity property gives $\\ln(a_n) \\to \\ln L$." },
{ question: "The sequence $a_n = \\frac{n^n}{n!}$ compared to $e^n$ satisfies $a_n/e^n$:", options: ["Diverges to $\\infty$", "Converges to $0$", "Converges to $\\frac{1}{\\sqrt{2\\pi n}}$ behavior implying it tends to $0$", "Converges to $1$"], correctAnswer: 1, explanation: "By Stirling's formula $n! \\sim \\sqrt{2\\pi n}(n/e)^n$, so $a_n \\sim \\sqrt{2\\pi n} \\cdot e^n$, meaning $a_n/e^n \\to \\infty$ actually; but as a standalone check $n^n/n!$ itself grows like $e^n\\sqrt{2\\pi n}$, diverging." },
{ question: "The sequence $a_n = \\tan^{-1}(n)$ converges to:", options: ["$0$", "$\\pi/4$", "$\\pi/2$", "$\\infty$"], correctAnswer: 2, explanation: "As $n \\to \\infty$, $\\tan^{-1}(n) \\to \\pi/2$, its horizontal asymptote." },
{ question: "For nested intervals $I_n = [a_n, b_n]$ with $I_{n+1} \\subset I_n$, if lengths do NOT tend to $0$, the intersection $\\bigcap I_n$:", options: ["Is always empty", "May contain more than one point", "Must be a single point", "Cannot exist"], correctAnswer: 1, explanation: "Without the shrinking length condition, the intersection can be a nondegenerate interval rather than a single point." },
{ question: "The sequence $a_n = \\frac{1}{n}\\left(1 + \\frac{1}{2} + \\cdots + \\frac{1}{n}\\right)$ converges to:", options: ["$0$", "$1$", "$\\ln 2$", "$\\infty$"], correctAnswer: 0, explanation: "Since $H_n \\sim \\ln n$, we get $a_n \\sim \\frac{\\ln n}{n} \\to 0$ by Cauchy's first limit theorem type reasoning." },
{ question: "If $(a_n)$ is a sequence with $a_n \\to L$, then the sequence $b_n = a_{n+k}$ (shifted by fixed $k$) satisfies:", options: ["$b_n \\to L$", "$b_n \\to L+k$", "$b_n$ diverges", "$b_n \\to 0$"], correctAnswer: 0, explanation: "Shifting indices by a finite amount does not affect the limit; $b_n$ is essentially a subsequence and converges to the same $L$." },
{ question: "The sequence $a_n = \\left(\\frac{n}{n+1}\\right)^{n^2}$ converges to:", options: ["$1$", "$0$", "$e^{-1}$", "$e$"], correctAnswer: 1, explanation: "Writing $\\left(1-\\frac{1}{n+1}\\right)^{n^2}$, the exponent grows much faster than the base's decay rate accounts for, forcing convergence to $0$." },
{ question: "Which of the following sequences does NOT converge?", options: ["$a_n = \\frac{1}{n}$", "$a_n = (-1)^n$", "$a_n = \\frac{n}{n+1}$", "$a_n = \\left(1+\\frac1n\\right)^n$"], correctAnswer: 1, explanation: "$(-1)^n$ oscillates between $-1$ and $1$ without settling to any single limit, hence it diverges." },
{ question: "The theorem stating every real sequence has a monotone subsequence is used to prove:", options: ["The Squeeze theorem", "Bolzano-Weierstrass theorem", "The Archimedean Property", "Cauchy's criterion directly"], correctAnswer: 1, explanation: "This monotone subsequence lemma is a standard tool in one proof of the Bolzano-Weierstrass theorem." },
{ question: "The sequence $a_n = \\left(\\cos\\frac1n\\right)^n$ converges to:", options: ["$1$", "$0$", "$e^{-1/2}$", "$e$"], correctAnswer: 0, explanation: "Using $\\cos(1/n) \\approx 1 - \\frac{1}{2n^2}$, we get $\\left(1-\\frac{1}{2n^2}\\right)^n \\to 1$ since exponent grows slower than $n^2$ decay rate." },
{ question: "If $(a_n)$ is Cauchy in $\\mathbb{R}$ and $f: \\mathbb{R} \\to \\mathbb{R}$ is uniformly continuous, then $(f(a_n))$ is:", options: ["Not necessarily Cauchy", "Always Cauchy", "Divergent", "Unbounded"], correctAnswer: 1, explanation: "Uniform continuity preserves the Cauchy property of sequences, a key application in analysis." },
{ question: "The limit $\\lim_{n \\to \\infty} n\\left(a^{1/n} - 1\\right)$ for $a>0$ equals:", options: ["$0$", "$\\ln a$", "$a$", "$\\infty$"], correctAnswer: 1, explanation: "Using the substitution $a^{1/n} = e^{(\\ln a)/n}$ and the expansion $e^x \\approx 1+x$ for small $x$, the limit evaluates to $\\ln a$." },
{ question: "A sequence that is both bounded and has a unique limit point must be:", options: ["Divergent", "Convergent to that limit point", "Cauchy but not convergent", "Monotone"], correctAnswer: 1, explanation: "For bounded sequences, having a unique limit point is equivalent to convergence to that point." },
{ question: "The sequence $a_n = \\frac{3^n + 2^n}{3^n - 2^n}$ converges to:", options: ["$0$", "$1$", "$\\infty$", "$-1$"], correctAnswer: 1, explanation: "Dividing numerator and denominator by $3^n$: $\\frac{1+(2/3)^n}{1-(2/3)^n} \\to 1$ as $n\\to\\infty$." },
{ question: "If $a_n \\to 0$ and $b_n$ is any sequence such that $|b_n| \\leq C$ for constant $C$, then $\\lim (a_n + b_n)$:", options: ["Always equals $0$", "Equals $\\lim b_n$ if it exists, otherwise may not exist", "Always exists and equals $C$", "Is always divergent"], correctAnswer: 1, explanation: "Since $a_n \\to 0$ doesn't affect the limiting behavior of $b_n$, the sum's limit depends entirely on whether $b_n$ itself converges." },
{ question: "The sequence $a_n = n\\left(\\sqrt[n]{e} - 1\\right)$ converges to:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 1, explanation: "Using $e^{1/n} \\approx 1 + \\frac1n$ for large $n$, we get $n(e^{1/n}-1) \\to 1$." },
{ question: "For a sequence $(a_n)$, if $\\limsup |a_n|^{1/n} = L < 1$, this condition is analogous to which convergence test (for series) applied to sequence behavior?", options: ["Ratio test", "Root test", "Comparison test", "Integral test"], correctAnswer: 1, explanation: "This limsup condition mirrors the Cauchy Root Test criterion, foundational in series convergence but also describing decay rates of sequences." },
];

const REAL_ANALYSIS_POOL_9: Question[] = [
{ question: "A series $\\sum a_n$ is said to converge if:", options: ["$a_n \\to 0$", "The sequence of partial sums $S_n = \\sum_{k=1}^n a_k$ converges", "$a_n$ is bounded", "$a_n$ is monotone"], correctAnswer: 1, explanation: "By definition, a series converges if and only if its sequence of partial sums converges to a finite limit." },
{ question: "A necessary (but not sufficient) condition for $\\sum a_n$ to converge is:", options: ["$a_n \\to 0$", "$a_n \\to \\infty$", "$a_n$ is monotone", "$a_n$ is constant"], correctAnswer: 0, explanation: "If $\\sum a_n$ converges, then $a_n \\to 0$; however, the converse is false (e.g., harmonic series)." },
{ question: "The harmonic series $\\sum \\frac{1}{n}$ is a classic example showing that:", options: ["$a_n \\to 0$ implies convergence", "$a_n \\to 0$ does not imply convergence of $\\sum a_n$", "All series with positive terms converge", "The series converges to $\\ln 2$"], correctAnswer: 1, explanation: "Although $1/n \\to 0$, the harmonic series diverges, demonstrating that $a_n \\to 0$ is necessary but not sufficient." },
{ question: "Cauchy's Criterion for series convergence states that $\\sum a_n$ converges iff for every $\\epsilon>0$, there exists $N$ such that for all $n>m>N$:", options: ["$|a_{m+1}+a_{m+2}+\\cdots+a_n| < \\epsilon$", "$|a_n| < \\epsilon$", "$a_n = a_m$", "$S_n = S_m$"], correctAnswer: 0, explanation: "This is the Cauchy criterion applied to the partial sums, requiring the 'tail sums' to become arbitrarily small." },
{ question: "The Abel-Pringsheim test states that if $\\sum a_n$ converges and $(a_n)$ is monotone decreasing, then:", options: ["$n a_n \\to \\infty$", "$n a_n \\to 0$", "$a_n \\to 1$", "$\\sum n a_n$ converges"], correctAnswer: 1, explanation: "This is the precise statement of the Abel-Pringsheim theorem, a necessary condition for convergence of monotone decreasing series." },
{ question: "By the Comparison Test, if $0 \\leq a_n \\leq b_n$ for all $n$ and $\\sum b_n$ converges, then:", options: ["$\\sum a_n$ diverges", "$\\sum a_n$ converges", "No conclusion about $\\sum a_n$", "$a_n \\to \\infty$"], correctAnswer: 1, explanation: "This is the basic Comparison Test: if the larger series converges, the smaller nonnegative series must also converge." },
{ question: "By the Comparison Test, if $0 \\leq b_n \\leq a_n$ for all $n$ and $\\sum b_n$ diverges, then:", options: ["$\\sum a_n$ converges", "$\\sum a_n$ diverges", "No conclusion possible", "$a_n \\to 0$"], correctAnswer: 1, explanation: "If the smaller series diverges, the larger nonnegative series must also diverge." },
{ question: "The series $\\sum \\frac{1}{n^p}$ (p-series) converges if and only if:", options: ["$p > 0$", "$p > 1$", "$p \\geq 0$", "$p < 1$"], correctAnswer: 1, explanation: "The p-series test states convergence occurs precisely when $p>1$; for $p \\leq 1$ it diverges." },
{ question: "The Root Test states that for $\\sum a_n$ with $a_n \\geq 0$, if $\\lim_{n\\to\\infty} (a_n)^{1/n} = L$, then the series converges if:", options: ["$L > 1$", "$L < 1$", "$L = 1$", "$L = 0$ only"], correctAnswer: 1, explanation: "The Root Test (Cauchy's Root Test) guarantees convergence when $L<1$, divergence when $L>1$, and is inconclusive when $L=1$." },
{ question: "For the series $\\sum \\left(\\frac{n}{2n+1}\\right)^n$, the Root Test gives:", options: ["Convergent since $L = 1/2 < 1$", "Divergent since $L=1$", "Inconclusive", "Convergent since $L=0$"], correctAnswer: 0, explanation: "$(a_n)^{1/n} = \\frac{n}{2n+1} \\to \\frac{1}{2} < 1$, so by the Root Test the series converges." },
{ question: "The Ratio Test states that for $\\sum a_n$ with $a_n > 0$, if $\\lim \\frac{a_{n+1}}{a_n} = L$, the series diverges if:", options: ["$L < 1$", "$L > 1$", "$L = 0$", "$L$ is undefined"], correctAnswer: 1, explanation: "The Ratio Test indicates divergence when the limit of consecutive term ratios exceeds $1$." },
{ question: "For the series $\\sum \\frac{n!}{n^n}$, applying the Ratio Test gives:", options: ["Convergent since limit is $1/e < 1$", "Divergent since limit exceeds $1$", "Inconclusive since limit equals $1$", "Cannot apply Ratio Test"], correctAnswer: 0, explanation: "Computing $\\frac{a_{n+1}}{a_n} = \\left(\\frac{n}{n+1}\\right)^n \\to \\frac{1}{e} < 1$, confirming convergence." },
{ question: "A series $\\sum a_n$ is absolutely convergent if:", options: ["$\\sum a_n$ converges", "$\\sum |a_n|$ converges", "$a_n \\to 0$", "$\\sum a_n$ is a p-series"], correctAnswer: 1, explanation: "Absolute convergence is defined by convergence of the series of absolute values, a stronger condition than mere convergence." },
{ question: "Every absolutely convergent series is:", options: ["Divergent", "Convergent", "Conditionally convergent only", "Unbounded"], correctAnswer: 1, explanation: "Absolute convergence always implies ordinary convergence, a fundamental theorem in series theory." },
{ question: "A series that converges but not absolutely is called:", options: ["Divergent", "Conditionally convergent", "Uniformly convergent", "Telescoping"], correctAnswer: 1, explanation: "This is the definition of conditional convergence: the series converges, but the series of absolute values diverges." },
{ question: "The alternating harmonic series $\\sum \\frac{(-1)^{n+1}}{n}$ is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Not a valid series"], correctAnswer: 1, explanation: "It converges by the Leibnitz test but $\\sum 1/n$ diverges, making it conditionally convergent (converges to $\\ln 2$)." },
{ question: "Leibnitz's Test for alternating series $\\sum (-1)^n a_n$ (with $a_n > 0$) guarantees convergence if:", options: ["$a_n$ is increasing and $a_n \\to \\infty$", "$a_n$ is decreasing and $a_n \\to 0$", "$a_n$ is constant", "$a_n$ is bounded only"], correctAnswer: 1, explanation: "Leibnitz's alternating series test requires the terms to be monotonically decreasing and tend to zero." },
{ question: "For the alternating series $\\sum (-1)^{n} \\frac{1}{\\ln n}$ (for $n \\geq 2$), by Leibnitz's test:", options: ["Diverges since $1/\\ln n$ doesn't tend to $0$", "Converges since $1/\\ln n$ decreases to $0$", "Converges absolutely", "Inconclusive"], correctAnswer: 1, explanation: "Since $1/\\ln n$ is decreasing and tends to $0$ as $n \\to \\infty$, Leibnitz's test confirms convergence (conditionally)." },
{ question: "If $\\sum a_n$ converges absolutely, then any rearrangement of the series:", options: ["May converge to a different sum", "Converges to the same sum", "Diverges", "Becomes conditionally convergent"], correctAnswer: 1, explanation: "This is a key theorem: absolutely convergent series can be rearranged without changing their sum, unlike conditionally convergent series." },
{ question: "Riemann's Rearrangement theorem applies to which type of series?", options: ["Absolutely convergent series", "Conditionally convergent series", "Divergent series only", "Geometric series only"], correctAnswer: 1, explanation: "Riemann proved that terms of a conditionally convergent series can be rearranged to converge to ANY real number, or even diverge." },
{ question: "Dirichlet's Test for convergence of $\\sum a_n b_n$ requires:", options: ["$a_n$ monotonically decreasing to $0$, and partial sums of $b_n$ bounded", "Both $a_n, b_n \\to 0$", "$a_n$ increasing to $\\infty$", "$b_n$ must be monotone"], correctAnswer: 0, explanation: "Dirichlet's test conditions: $(a_n)$ is monotone decreasing to $0$, and the partial sums of $(b_n)$ form a bounded sequence." },
{ question: "Abel's Test for convergence of $\\sum a_n b_n$ requires:", options: ["$\\sum b_n$ converges and $(a_n)$ is monotone and bounded", "Both series diverge", "$a_n \\to \\infty$", "$b_n$ is unbounded"], correctAnswer: 0, explanation: "Abel's test conditions: $\\sum b_n$ converges, and $(a_n)$ is a monotone, bounded sequence." },
{ question: "The series $\\sum \\frac{\\sin(n)}{n}$ converges by which test?", options: ["Ratio Test", "Dirichlet's Test", "Root Test", "Comparison Test"], correctAnswer: 1, explanation: "Since partial sums of $\\sin(n)$ are bounded and $1/n$ decreases to $0$, Dirichlet's test confirms convergence." },
{ question: "The series $\\sum \\frac{(-1)^n}{n} \\cos\\left(\\frac{1}{n}\\right)$ converges by which reasoning?", options: ["Abel's Test, since $\\cos(1/n)$ is bounded and monotone (eventually) and $\\sum(-1)^n/n$ converges", "Comparison Test", "Root Test only", "It diverges"], correctAnswer: 0, explanation: "Since $\\sum (-1)^n/n$ converges and $\\cos(1/n)$ is bounded and monotonic for large $n$, Abel's test applies." },
{ question: "For $\\sum a_n$ with $a_n \\geq 0$, if $\\lim n a_n = L \\neq 0$ (finite), then by limit comparison with $\\sum 1/n$:", options: ["The series converges", "The series diverges", "Inconclusive", "The series converges absolutely"], correctAnswer: 1, explanation: "Since $\\sum 1/n$ diverges and $a_n \\sim L/n$, by limit comparison test the series $\\sum a_n$ also diverges." },
{ question: "The series $\\sum \\frac{1}{n(\\ln n)^p}$ converges if and only if:", options: ["$p > 1$", "$p < 1$", "$p = 0$", "Never converges"], correctAnswer: 0, explanation: "By the Cauchy Condensation Test or Integral Test, this series converges exactly when $p>1$." },
{ question: "The Cauchy Condensation Test applies to series with:", options: ["Any terms", "Monotonically decreasing, nonnegative terms", "Only alternating terms", "Only positive increasing terms"], correctAnswer: 1, explanation: "The Cauchy Condensation test states $\\sum a_n$ (with $a_n$ decreasing, nonnegative) converges iff $\\sum 2^n a_{2^n}$ converges." },
{ question: "Using Cauchy Condensation on $\\sum \\frac{1}{n \\ln n}$ leads to comparing with:", options: ["$\\sum \\frac{1}{n}$", "$\\sum \\frac{1}{\\ln 2 \\cdot n}$, i.e., a constant multiple of harmonic series, hence divergent", "A convergent geometric series", "$\\sum n$"], correctAnswer: 1, explanation: "Condensation gives $2^n \\cdot \\frac{1}{2^n \\ln(2^n)} = \\frac{1}{n \\ln 2}$, whose sum behaves like the divergent harmonic series." },
{ question: "The series $\\sum (-1)^n \\frac{n}{n+1}$ diverges because:", options: ["The terms do not tend to $0$", "It fails the ratio test", "It is a p-series with $p<1$", "It converges conditionally"], correctAnswer: 0, explanation: "Since $\\frac{n}{n+1} \\to 1 \\neq 0$, the necessary condition for convergence ($a_n \\to 0$) fails, so the series diverges." },
{ question: "If $\\sum a_n$ and $\\sum b_n$ both converge absolutely, then $\\sum (a_n + b_n)$:", options: ["Diverges", "Converges absolutely", "Converges conditionally only", "Cannot be determined"], correctAnswer: 1, explanation: "The sum of two absolutely convergent series is itself absolutely convergent, following from the triangle inequality." },
];

const REAL_ANALYSIS_POOL_10: Question[] = [
{ question: "The series $\\sum \\frac{n^2}{2^n}$ converges by the Ratio Test since the limit of $\\frac{a_{n+1}}{a_n}$ equals:", options: ["$1$", "$\\frac{1}{2}$", "$2$", "$0$"], correctAnswer: 1, explanation: "Computing the ratio: $\\frac{(n+1)^2}{2^{n+1}} \\cdot \\frac{2^n}{n^2} = \\frac{1}{2}\\left(\\frac{n+1}{n}\\right)^2 \\to \\frac{1}{2} < 1$, confirming convergence." },
{ question: "The series $\\sum \\frac{3^n}{n^3}$ diverges because the Ratio Test gives a limit of:", options: ["$0$", "$1$", "$3$", "$\\frac{1}{3}$"], correctAnswer: 2, explanation: "The ratio $\\frac{a_{n+1}}{a_n} = 3\\left(\\frac{n}{n+1}\\right)^3 \\to 3 > 1$, confirming divergence." },
{ question: "When the Ratio Test gives limit $L=1$, the test is:", options: ["Conclusive: series converges", "Conclusive: series diverges", "Inconclusive; another test is needed", "Only valid for alternating series"], correctAnswer: 2, explanation: "The Ratio Test fails to give information when $L=1$; other tests like comparison or Raabe's test must be used." },
{ question: "The series $\\sum \\frac{1}{n^2+1}$ converges by comparison with:", options: ["$\\sum \\frac{1}{n}$", "$\\sum \\frac{1}{n^2}$", "$\\sum n$", "$\\sum \\frac{1}{\\sqrt{n}}$"], correctAnswer: 1, explanation: "Since $\\frac{1}{n^2+1} < \\frac{1}{n^2}$ and $\\sum 1/n^2$ converges (p-series, $p=2$), by comparison the given series converges." },
{ question: "The series $\\sum \\frac{1}{\\sqrt{n}}$ diverges by comparison since it behaves like the p-series with:", options: ["$p = 1/2 < 1$", "$p = 2 > 1$", "$p = 1$", "$p = 0$"], correctAnswer: 0, explanation: "Here $p=1/2 < 1$, so by the p-series test the series diverges." },
{ question: "The Limit Comparison Test states that if $a_n, b_n > 0$ and $\\lim \\frac{a_n}{b_n} = L$ where $0 < L < \\infty$, then:", options: ["$\\sum a_n$ and $\\sum b_n$ both converge or both diverge", "$\\sum a_n$ always converges", "No relation can be established", "$\\sum b_n$ diverges always"], correctAnswer: 0, explanation: "This is the precise statement of the Limit Comparison Test: both series share the same convergence behavior when $L$ is finite and positive." },
{ question: "Using Limit Comparison, the series $\\sum \\frac{2n+1}{n^3+3}$ behaves like:", options: ["$\\sum \\frac{1}{n^2}$ (convergent)", "$\\sum \\frac{1}{n}$ (divergent)", "$\\sum n$ (divergent)", "$\\sum \\frac{1}{n^3}$"], correctAnswer: 0, explanation: "For large $n$, $\\frac{2n+1}{n^3+3} \\sim \\frac{2n}{n^3} = \\frac{2}{n^2}$, comparable to convergent p-series with $p=2$." },
{ question: "The series $\\sum \\frac{(-1)^n}{\\sqrt{n}}$ is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Not a valid alternating series"], correctAnswer: 1, explanation: "By Leibnitz test it converges (terms decrease to $0$), but $\\sum 1/\\sqrt{n}$ diverges, so it is conditionally convergent." },
{ question: "The series $\\sum \\frac{(-1)^n}{n^2}$ is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Oscillating without convergence"], correctAnswer: 0, explanation: "Since $\\sum 1/n^2$ converges (p-series, $p=2>1$), the original series converges absolutely." },
{ question: "For the series $\\sum \\frac{(-1)^n n}{n+1}$, we can conclude:", options: ["Converges absolutely", "Converges conditionally", "Diverges since terms don't tend to $0$", "Converges by root test"], correctAnswer: 2, explanation: "Since $\\frac{n}{n+1} \\to 1 \\neq 0$, the necessary condition for convergence fails; the series diverges." },
{ question: "The Root Test applied to $\\sum \\left(\\frac{1}{\\ln n}\\right)^n$ (for $n \\geq 2$) gives:", options: ["Convergent since limit is $0$", "Divergent since limit is $\\infty$", "Inconclusive", "Convergent since limit is $1$"], correctAnswer: 0, explanation: "$(a_n)^{1/n} = \\frac{1}{\\ln n} \\to 0$ as $n \\to \\infty$, confirming convergence by the Root Test." },
{ question: "Raabe's Test is typically used when:", options: ["The Ratio Test gives $L=1$ (inconclusive)", "The series has negative terms only", "The Comparison Test fails", "The series is alternating"], correctAnswer: 0, explanation: "Raabe's Test serves as a refinement when the basic Ratio Test is inconclusive due to limit equal to $1$." },
{ question: "Raabe's Test states that for $a_n>0$, if $\\lim n\\left(\\frac{a_n}{a_{n+1}}-1\\right) = L$, the series converges if:", options: ["$L>1$", "$L<1$", "$L=1$", "$L=0$"], correctAnswer: 0, explanation: "Raabe's test confirms convergence when $L>1$ and divergence when $L<1$; inconclusive at $L=1$." },
{ question: "The series $\\sum \\frac{1}{n!}$ converges by the Ratio Test with limit:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 0, explanation: "$\\frac{a_{n+1}}{a_n} = \\frac{1}{n+1} \\to 0 < 1$, confirming rapid convergence (this series sums to $e-1$ from $n=1$)." },
{ question: "If $\\sum a_n$ converges and $c$ is a nonzero constant, then $\\sum c \\cdot a_n$:", options: ["Diverges", "Converges to $c$ times the original sum", "Converges to $0$", "May diverge depending on $c$"], correctAnswer: 1, explanation: "Scalar multiplication of a convergent series preserves convergence, scaling the sum by the constant." },
{ question: "If $\\sum a_n$ diverges and $\\sum b_n$ converges, then $\\sum(a_n+b_n)$:", options: ["Converges", "Diverges", "May converge or diverge", "Always equals $0$"], correctAnswer: 1, explanation: "If the sum converged, then $\\sum a_n = \\sum(a_n+b_n) - \\sum b_n$ would converge (contradiction), so it must diverge." },
{ question: "If both $\\sum a_n$ and $\\sum b_n$ diverge, then $\\sum(a_n+b_n)$:", options: ["Always converges", "Always diverges", "May converge or diverge", "Equals $\\sum a_n \\cdot \\sum b_n$"], correctAnswer: 2, explanation: "Counter-examples exist both ways: e.g., $a_n=1, b_n=-1$ gives convergent sum $0$, but $a_n=b_n=1/n$ gives divergent sum." },
{ question: "The geometric series $\\sum_{n=0}^{\\infty} r^n$ converges if and only if:", options: ["$|r|<1$", "$|r|>1$", "$r=1$", "$r$ is any real number"], correctAnswer: 0, explanation: "The classical geometric series test: convergence occurs precisely when $|r|<1$, summing to $\\frac{1}{1-r}$." },
{ question: "For $\\sum \\frac{n^n}{(n!)^2}$, applying the Ratio Test yields convergence because the limit equals:", options: ["$0$", "$1$", "$e$", "$\\infty$"], correctAnswer: 0, explanation: "Using Stirling-type analysis or direct ratio computation, this ratio tends to $0$, confirming convergence." },
{ question: "The series $\\sum \\left(1 - \\cos\\frac{1}{n}\\right)$ converges by comparison with:", options: ["$\\sum \\frac{1}{n}$", "$\\sum \\frac{1}{n^2}$", "$\\sum \\frac{1}{n^3}$", "$\\sum n$"], correctAnswer: 1, explanation: "Since $1-\\cos x \\approx x^2/2$ for small $x$, the terms behave like $\\frac{1}{2n^2}$, comparable to convergent p-series." },
{ question: "The series $\\sum \\ln\\left(1+\\frac{1}{n}\\right)$ diverges because it behaves like:", options: ["$\\sum \\frac{1}{n}$ (divergent, by comparison since $\\ln(1+x)\\sim x$)", "$\\sum \\frac{1}{n^2}$", "A convergent telescoping series", "It actually converges"], correctAnswer: 0, explanation: "Since $\\ln(1+1/n) \\sim 1/n$ for large $n$, and $\\sum 1/n$ diverges, this series also diverges by limit comparison." },
{ question: "For the alternating series $\\sum (-1)^n \\left(\\sqrt{n+1}-\\sqrt{n}\\right)$, Leibnitz's test confirms convergence since:", options: ["The terms $\\sqrt{n+1}-\\sqrt{n}$ decrease monotonically to $0$", "The terms increase to infinity", "The series is a p-series", "It fails the necessary condition"], correctAnswer: 0, explanation: "Since $\\sqrt{n+1}-\\sqrt{n} = \\frac{1}{\\sqrt{n+1}+\\sqrt{n}} \\to 0$ and is decreasing, Leibnitz's test applies." },
{ question: "If a series $\\sum a_n$ has all positive terms and converges, then it must converge:", options: ["Conditionally", "Absolutely", "Neither, since positive-term series can't converge", "Only if it's a p-series"], correctAnswer: 1, explanation: "For series with all nonnegative (or all positive) terms, convergence is automatically absolute convergence since $|a_n|=a_n$." },
{ question: "The series $\\sum \\frac{\\cos(n\\pi)}{n^2}$ is:", options: ["Divergent", "Absolutely convergent", "Conditionally convergent only", "Not well-defined"], correctAnswer: 1, explanation: "Since $|\\cos(n\\pi)|=1$, this reduces to $\\sum \\frac{(-1)^n}{n^2}$ in absolute value comparison to $\\sum 1/n^2$, which converges, so absolute convergence holds." },
{ question: "The p-series test is essentially a special case derived from which more general test?", options: ["The Integral Test", "The Ratio Test", "Abel's Test", "Dirichlet's Test"], correctAnswer: 0, explanation: "The p-series convergence criterion follows directly by applying the Integral Test to $f(x)=1/x^p$." },
{ question: "The Integral Test states that for a positive, decreasing, continuous function $f$ with $f(n)=a_n$, $\\sum a_n$ converges if and only if:", options: ["$\\int_1^{\\infty} f(x)\\,dx$ converges", "$f(x) \\to \\infty$", "$f$ is bounded", "$f$ is increasing"], correctAnswer: 0, explanation: "This is the precise statement of the Integral Test, connecting series convergence to improper integral convergence." },
{ question: "Using the Integral Test on $\\sum \\frac{1}{n \\ln n}$ (for $n\\geq 2$), we find the series:", options: ["Converges since the integral converges", "Diverges since $\\int_2^\\infty \\frac{dx}{x\\ln x} = \\infty$", "Cannot be tested this way", "Converges absolutely"], correctAnswer: 1, explanation: "The substitution $u=\\ln x$ gives $\\int \\frac{du}{u} = \\ln(\\ln x)$, which diverges as $x\\to\\infty$, so the series diverges." },
{ question: "If $\\sum a_n^2$ and $\\sum b_n^2$ both converge, then by Cauchy-Schwarz, $\\sum a_n b_n$:", options: ["Diverges", "Converges absolutely", "Converges conditionally only", "Cannot be determined"], correctAnswer: 1, explanation: "By the Cauchy-Schwarz inequality, $\\sum |a_n b_n| \\leq \\sqrt{\\sum a_n^2}\\sqrt{\\sum b_n^2} < \\infty$, so the series converges absolutely." },
{ question: "The series $\\sum \\frac{(-1)^n}{n \\ln n}$ (for $n \\geq 2$) is:", options: ["Absolutely convergent", "Conditionally convergent", "Divergent", "Not defined"], correctAnswer: 1, explanation: "By Leibnitz test it converges since $1/(n\\ln n)$ decreases to $0$, but $\\sum 1/(n\\ln n)$ diverges (shown via integral test), giving conditional convergence." },
{ question: "For $\\sum a_n$ with $a_n = \\frac{(-1)^n}{n^p}$, the series converges absolutely when:", options: ["$p>1$", "$0<p\\leq 1$", "$p\\leq 0$", "Never absolutely convergent"], correctAnswer: 0, explanation: "Absolute convergence requires $\\sum 1/n^p$ to converge, which happens precisely when $p>1$." },
];

const REAL_ANALYSIS_POOL_11: Question[] = [
{ question: "Dirichlet's test is particularly useful for series of the form $\\sum a_n \\sin(n\\theta)$ or $\\sum a_n \\cos(n\\theta)$ because:", options: ["Partial sums of $\\sin(n\\theta)$ and $\\cos(n\\theta)$ are bounded (for $\\theta \\neq 2k\\pi$)", "These functions are always monotone", "$\\sin(n\\theta)$ always converges to $0$", "These series are always absolutely convergent"], correctAnswer: 0, explanation: "The partial sums $\\sum_{k=1}^n \\sin(k\\theta)$ can be bounded using trigonometric identities, making Dirichlet's test applicable when combined with monotone decreasing $a_n \\to 0$." },
{ question: "The series $\\sum \\frac{\\cos(n\\theta)}{n}$ (for $\\theta \\neq 2k\\pi$) converges by:", options: ["Root Test", "Dirichlet's Test", "Ratio Test", "Comparison Test"], correctAnswer: 1, explanation: "Since partial sums of $\\cos(n\\theta)$ are bounded and $1/n \\to 0$ monotonically, Dirichlet's test guarantees convergence." },
{ question: "Abel's test differs from Dirichlet's test primarily in that Abel's test requires:", options: ["$\\sum b_n$ to converge (rather than just having bounded partial sums)", "$a_n$ to be unbounded", "No monotonicity condition at all", "Both sequences to diverge"], correctAnswer: 0, explanation: "Abel's test requires the series $\\sum b_n$ itself to converge, while $(a_n)$ need only be monotone and bounded (not necessarily tending to $0$)." },
{ question: "If $\\sum b_n$ converges and $a_n = \\frac{1}{n}$ (monotone decreasing, bounded), then by Abel's test, $\\sum a_n b_n$:", options: ["Diverges", "Converges", "Is undefined", "Only converges conditionally"], correctAnswer: 1, explanation: "This is a direct application of Abel's test since all its hypotheses are satisfied." },
{ question: "The series $\\sum \\frac{(-1)^n}{n} \\left(1+\\frac{1}{n}\\right)^n$ converges by Abel's test since:", options: ["$\\left(1+\\frac1n\\right)^n$ is bounded and monotone increasing to $e$, while $\\sum \\frac{(-1)^n}{n}$ converges", "Both factors diverge", "It's a p-series", "Ratio test applies directly"], correctAnswer: 0, explanation: "Since $(1+1/n)^n$ is increasing and bounded (converging to $e$), and $\\sum(-1)^n/n$ converges, Abel's test confirms convergence of the product series." },
{ question: "The series $\\sum \\frac{n}{2^n}$ can be shown convergent using the Ratio test, with limiting ratio equal to:", options: ["$\\frac{1}{2}$", "$1$", "$2$", "$0$"], correctAnswer: 0, explanation: "$\\frac{a_{n+1}}{a_n} = \\frac{n+1}{2n} \\to \\frac{1}{2} < 1$, confirming convergence." },
{ question: "A telescoping series $\\sum (b_n - b_{n+1})$ converges if and only if:", options: ["$b_n$ diverges", "$\\lim b_n$ exists (finite)", "$b_n$ is unbounded", "$b_n = 0$ for all $n$"], correctAnswer: 1, explanation: "For a telescoping series, partial sums equal $b_1 - b_{n+1}$, so convergence depends entirely on whether $\\lim b_n$ exists." },
{ question: "The series $\\sum \\left(\\frac{1}{n}-\\frac{1}{n+2}\\right)$ (telescoping with skip) converges to:", options: ["$0$", "$1$", "$\\frac{3}{2}$", "$\\infty$"], correctAnswer: 2, explanation: "This telescopes to $1 + \\frac{1}{2} = \\frac{3}{2}$ after accounting for the two 'leftover' initial terms in the skip-telescoping pattern." },
{ question: "If $a_n \\sim b_n$ (asymptotically equivalent, i.e. $\\lim a_n/b_n=1$) and $\\sum b_n$ converges absolutely, then $\\sum a_n$:", options: ["Diverges", "Converges absolutely", "May converge conditionally", "Cannot be determined"], correctAnswer: 1, explanation: "Asymptotic equivalence with a positive convergent (or absolutely convergent) series implies the same convergence behavior via limit comparison." },
{ question: "For the series $\\sum \\frac{1}{n^{1+1/n}}$, as $n \\to \\infty$, the exponent tends to $1$, but the series:", options: ["Converges since exponent exceeds $1$ eventually", "Diverges, comparable to harmonic series behavior", "Converges absolutely trivially", "Is a geometric series"], correctAnswer: 1, explanation: "Since $n^{1/n} \\to 1$, the terms behave asymptotically like $1/n$, and careful analysis (or comparison) shows this series diverges like the harmonic series." },
{ question: "The series $\\sum \\frac{n!}{n^n} x^n$ converges absolutely for:", options: ["All $x$", "$|x| < e$", "$|x| > e$", "Only $x=0$"], correctAnswer: 1, explanation: "By the Ratio Test, $\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{|x|}{(1+1/n)^n} \\to \\frac{|x|}{e}$, giving convergence for $|x|<e$." },
{ question: "The interval of convergence concept relates infinite series to which broader topic?", options: ["Power series", "Fourier series only", "Only alternating series", "Telescoping series only"], correctAnswer: 0, explanation: "Testing convergence of series with a parameter $x$ (like $\\sum a_n x^n$) is foundational to the theory of power series." },
{ question: "The series $\\sum \\frac{x^n}{n!}$ converges for:", options: ["Only $|x|<1$", "All real $x$", "Only $x=0$", "Only $x>0$"], correctAnswer: 1, explanation: "By the Ratio Test, $\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{|x|}{n+1} \\to 0$ for any fixed $x$, so this series (defining $e^x$) converges for all real $x$." },
{ question: "If $\\sum a_n$ converges conditionally, then $\\sum a_n^+$ (sum of positive parts) and $\\sum a_n^-$ (sum of negative parts) individually:", options: ["Both converge", "Both diverge to $\\pm\\infty$", "One converges, one diverges", "Cannot be determined"], correctAnswer: 1, explanation: "For conditionally convergent series, both the positive and negative part series diverge (to $+\\infty$ and $-\\infty$ respectively); this is essential to Riemann's rearrangement theorem." },
{ question: "The series $\\sum \\frac{1}{2^n} + \\frac{1}{3^n}$ converges since it is the sum of two:", options: ["Divergent series", "Convergent geometric series", "p-series with $p<1$", "Alternating series"], correctAnswer: 1, explanation: "Both $\\sum (1/2)^n$ and $\\sum (1/3)^n$ are convergent geometric series (ratios $<1$), so their sum converges." },
{ question: "For the series $\\sum \\left(\\sqrt[n]{n}-1\\right)$, using the fact that $\\sqrt[n]{n}-1 \\sim \\frac{\\ln n}{n}$, the series:", options: ["Converges by comparison with p-series", "Diverges by comparison with $\\sum \\frac{\\ln n}{n}$ (which diverges)", "Converges absolutely trivially", "Is a geometric series"], correctAnswer: 1, explanation: "Since $\\sum \\frac{\\ln n}{n}$ diverges (comparison with harmonic-type series), and terms are asymptotically similar, the given series also diverges." },
{ question: "Which of the following series is an example where the Ratio Test is inconclusive but the Root Test works?", options: ["$\\sum a_n$ where $a_n$ alternates between $\\frac{1}{2^n}$ and $\\frac{1}{3^n}$ in a way making ratios oscillate but roots converge nicely", "$\\sum \\frac{1}{n^2}$", "$\\sum r^n$", "$\\sum \\frac{1}{n!}$"], correctAnswer: 0, explanation: "There exist constructed series where term-by-term ratios oscillate unpredictably (Ratio Test fails/inconclusive), but the Root Test, using limsup, still succeeds." },
{ question: "The generalized Root Test uses $\\limsup_{n\\to\\infty} |a_n|^{1/n}$ rather than just the limit because:", options: ["The limit may not exist, but limsup always exists (in extended reals)", "Limsup gives a larger value always", "It simplifies calculations only", "Ratio test requires limsup instead"], correctAnswer: 0, explanation: "Using limsup makes the Root Test universally applicable even when the ordinary limit fails to exist, unlike the basic Ratio Test." },
{ question: "If $\\limsup |a_n|^{1/n} = 1$, the Root Test is:", options: ["Conclusive: converges", "Conclusive: diverges", "Inconclusive", "Only valid for real terms"], correctAnswer: 2, explanation: "Just like the Ratio Test, when the Root Test limit (or limsup) equals exactly $1$, no conclusion can be drawn without further analysis." },
{ question: "The series $\\sum \\frac{(2n)!}{4^n (n!)^2}$ relates to central binomial coefficients and behaves like $\\sum \\frac{1}{\\sqrt{n}}$, hence it:", options: ["Converges", "Diverges", "Converges conditionally", "Equals $0$"], correctAnswer: 1, explanation: "Using Stirling's approximation, the terms behave like $\\frac{1}{\\sqrt{\\pi n}}$, which is comparable to the divergent p-series with $p=1/2$." },
{ question: "For an alternating series satisfying Leibnitz's conditions, the error in approximating the sum by the $n$-th partial sum is bounded by:", options: ["The next term's absolute value $|a_{n+1}|$", "The sum of all remaining terms without bound", "Twice the first term", "Cannot be bounded"], correctAnswer: 0, explanation: "This is the alternating series estimation theorem: truncation error is bounded by the magnitude of the first omitted term." },
{ question: "If $\\sum a_n$ converges absolutely and $(b_n)$ is any bounded sequence, then $\\sum a_n b_n$:", options: ["Diverges", "Converges absolutely", "May diverge", "Converges only conditionally"], correctAnswer: 1, explanation: "Since $|a_n b_n| \\leq M|a_n|$ for bounded $|b_n|\\leq M$, and $\\sum|a_n|$ converges, by comparison $\\sum|a_nb_n|$ also converges." },
{ question: "The Cauchy product of two absolutely convergent series $\\sum a_n$ and $\\sum b_n$:", options: ["Diverges always", "Converges absolutely to the product of the sums", "Only converges conditionally", "Is undefined"], correctAnswer: 1, explanation: "Mertens' theorem (or the stronger case for absolute convergence) guarantees the Cauchy product converges absolutely to $(\\sum a_n)(\\sum b_n)$." },
{ question: "If only one of $\\sum a_n$, $\\sum b_n$ is absolutely convergent and the other merely convergent, the Cauchy product:", options: ["Always diverges", "Still converges to the product of sums (Mertens' theorem)", "Is undefined", "Converges only conditionally with a different sum"], correctAnswer: 1, explanation: "Mertens' theorem guarantees convergence of the Cauchy product even if only one series is absolutely convergent (the other just convergent)." },
{ question: "The series $\\sum \\left(-1\\right)^n \\left(\\frac{1}{n}-\\frac{1}{n+1}\\right)$ is:", options: ["Absolutely convergent since it's a difference of two convergent series with a small bound", "Divergent", "Only conditionally convergent", "Undefined"], correctAnswer: 0, explanation: "Since $\\frac{1}{n}-\\frac{1}{n+1} = \\frac{1}{n(n+1)} \\sim \\frac{1}{n^2}$, comparison shows absolute convergence." },
{ question: "For $\\sum \\frac{(-1)^{n(n+1)/2}}{n}$ (sign pattern based on triangular numbers), determining convergence primarily relies on:", options: ["Recognizing bounded partial sums of the sign sequence and applying Dirichlet's test", "Direct computation of an explicit formula only", "The Ratio Test straightforwardly", "It trivially diverges"], correctAnswer: 0, explanation: "Complex sign patterns often require verifying bounded partial sums of the oscillating factor to apply Dirichlet's test alongside the decreasing $1/n$ term." },
{ question: "The series $\\sum \\frac{1}{n} - \\ln\\left(1+\\frac1n\\right)$ converges because:", options: ["Terms behave like $O(1/n^2)$ via Taylor expansion, making it comparable to a convergent p-series", "It's a telescoping series equal to $0$", "Both individual series converge alone", "It's geometric"], correctAnswer: 0, explanation: "Using $\\ln(1+1/n) = 1/n - 1/(2n^2) + O(1/n^3)$, the difference behaves like $\\frac{1}{2n^2}$, giving convergence by comparison." },
{ question: "Which statement correctly distinguishes absolute and conditional convergence in terms of rearrangement?", options: ["Both types allow rearrangement without changing the sum", "Absolute convergence allows rearrangement freely; conditional convergence does not (Riemann's theorem)", "Neither type allows any rearrangement", "Only conditional convergence allows rearrangement"], correctAnswer: 1, explanation: "This is the key distinguishing theorem: absolute convergence is rearrangement-invariant, while conditionally convergent series can be rearranged to yield any sum (Riemann Rearrangement Theorem)." },
{ question: "The series $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{2n-1}$ (related to $\\pi/4$ via Leibnitz's formula) is:", options: ["Absolutely convergent", "Conditionally convergent, converging to $\\pi/4$", "Divergent", "Convergent to $\\pi/2$"], correctAnswer: 1, explanation: "This is the famous Leibnitz series for $\\pi/4$; it converges conditionally since $\\sum \\frac{1}{2n-1}$ diverges but the alternating version converges by Leibnitz's test." },
];

const REAL_ANALYSIS_POOL_12: Question[] = [
  { question: "If $f:[0,1] \\to \\mathbb{R}$ is continuous and $\\int_0^1 f(x) x^n dx = 0$ for all $n \\ge 0$, then $f(x)$ is:", options: ["0 for all $x \\in [0,1]$", "1 for all $x$", "$x^2$", "Any polynomial"], correctAnswer: 0, explanation: "By Weierstrass Approximation Theorem, $\\int_0^1 f(x)^2 dx = 0$, implying $f(x) = 0$ identically." }
];

const REAL_ANALYSIS_POOL_13: Question[] = [
  { question: "The radius of convergence of the power series $\\sum_{n=1}^{\\infty} \\frac{x^n}{n^2 2^n}$ is:", options: ["2", "1/2", "1", "$\\infty$"], correctAnswer: 0, explanation: "$1/R = \\lim |a_{n+1}/a_n| = \\lim \\frac{n^2 2^n}{(n+1)^2 2^{n+1}} = 1/2 \\implies R = 2$." }
];

const REAL_ANALYSIS_POOL_14: Question[] = [
  { question: "Which of the following is an example of an open set in standard metric topology of $\\mathbb{R}^2$?", options: ["$\\{(x,y) \\in \\mathbb{R}^2 : x^2 + y^2 < 1\\}$", "$\\{(x,y) \\in \\mathbb{R}^2 : x^2 + y^2 \\le 1\\}$", "$\\{(x,y) \\in \\mathbb{R}^2 : x=0\\}$", "A finite point set"], correctAnswer: 0, explanation: "The open unit disc $x^2 + y^2 < 1$ is an open set in $\\mathbb{R}^2$." }
];

const REAL_ANALYSIS_POOL_15: Question[] = [
  { question: "If $f:[0,1] \\to [0,1]$ is continuous, then by Brouwer's Fixed Point Theorem, $f$ has:", options: ["At least one fixed point $c \\in [0,1]$ such that $f(c) = c$", "No fixed point", "Infinitely many fixed points", "A fixed point only if $f$ is monotonic"], correctAnswer: 0, explanation: "Continuous mapping of a compact convex set into itself has at least one fixed point." }
];

const REAL_ANALYSIS_POOL_16: Question[] = [
  { question: "The derivative of $f(x) = \\int_0^{x^2} \\cos(t) dt$ with respect to $x$ is:", options: ["$2x \\cos(x^2)$", "$\\cos(x^2)$", "$-2x \\sin(x^2)$", "$x \\cos(x^2)$"], correctAnswer: 0, explanation: "By Leibniz Rule of differentiation under integral sign: $\\frac{d}{dx} \\int_0^{g(x)} h(t) dt = h(g(x)) g'(x) = \\cos(x^2) \\cdot 2x$." }
];

const REAL_ANALYSIS_POOL_17: Question[] = [
  { question: "The function $f(x) = x^3$ on $\\mathbb{R}$ is:", options: ["Continuous everywhere but not uniformly continuous on $\\mathbb{R}$", "Uniformly continuous on $\\mathbb{R}$", "Discontinuous at origin", "Bounded on $\\mathbb{R}$"], correctAnswer: 0, explanation: "Derivative $f'(x) = 3x^2$ is unbounded on $\\mathbb{R}$, so $x^3$ is not uniformly continuous on $\\mathbb{R}$." }
];

const REAL_ANALYSIS_POOL_18: Question[] = [
  { question: "The total length (measure) of the rational numbers $\\mathbb{Q} \\cap [0,1]$ is:", options: ["0", "1", "1/2", "$\\infty$"], correctAnswer: 0, explanation: "Any countable set of real numbers has Lebesgue measure zero." }
];

const REAL_ANALYSIS_POOL_19: Question[] = [
  { question: "Let $a_n > 0$. If $\\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = L$, then $\\lim_{n \\to \\infty} (a_n)^{1/n}$ equals:", options: ["$L$", "$L^2$", "$\\sqrt{L}$", "$\\ln L$"], correctAnswer: 0, explanation: "Cauchy's second theorem on limits states that if $a_n > 0$ and $\\lim a_{n+1}/a_n = L$, then $\\lim a_n^{1/n} = L$." }
];

const REAL_ANALYSIS_POOL_20: Question[] = [
  { question: "Which of the following functions is nowhere differentiable on $\\mathbb{R}$?", options: ["Weierstrass function", "Dirichlet function", "Thomae's function", "Signum function"], correctAnswer: 0, explanation: "The Weierstrass function is continuous everywhere but differentiable nowhere." }
];

const REAL_ANALYSIS_POOLS: Question[][] = [
  REAL_ANALYSIS_POOL,
  REAL_ANALYSIS_POOL_2,
  REAL_ANALYSIS_POOL_3,
  REAL_ANALYSIS_POOL_4,
  REAL_ANALYSIS_POOL_5,
  REAL_ANALYSIS_POOL_6,
  REAL_ANALYSIS_POOL_7,
  REAL_ANALYSIS_POOL_8,
  REAL_ANALYSIS_POOL_9,
  REAL_ANALYSIS_POOL_10,
  REAL_ANALYSIS_POOL_11,
  REAL_ANALYSIS_POOL_12,
  REAL_ANALYSIS_POOL_13,
  REAL_ANALYSIS_POOL_14,
  REAL_ANALYSIS_POOL_15,
  REAL_ANALYSIS_POOL_16,
  REAL_ANALYSIS_POOL_17,
  REAL_ANALYSIS_POOL_18,
  REAL_ANALYSIS_POOL_19,
  REAL_ANALYSIS_POOL_20
];


const CLASSICAL_ALGEBRA_MOCK_1: Question[] = [
  {
    question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 + px^2 + qx + r = 0$, what is the value of $\\alpha^2 + \\beta^2 + \\gamma^2$?",
    options: ["$p^2 - 2q$", "$q^2 - 2pr$", "$p^2 + 2q$", "$p^2 - 2r$"],
    correctAnswer: 0,
    explanation: "Using symmetric relations: $\\sum \\alpha = -p$ and $\\sum \\alpha\\beta = q$. Thus, $\\sum \\alpha^2 = (\\sum \\alpha)^2 - 2\\sum \\alpha\\beta = (-p)^2 - 2q = p^2 - 2q$."
  },
  {
    question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - qx + r = 0$, then the value of $\\sum \\frac{1}{\\alpha}$ is:",
    options: ["$\\frac{q}{r}$", "$-\\frac{q}{r}$", "$\\frac{r}{q}$", "$-\\frac{r}{q}$"],
    correctAnswer: 0,
    explanation: "$\\sum \\frac{1}{\\alpha} = \\frac{\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha}{\\alpha\\beta\\gamma} = \\frac{-q}{-r} = \\frac{q}{r}$."
  },
  {
    question: "If $\\omega$ is an imaginary cube root of unity, then the value of $(1 - \\omega + \\omega^2)^5 + (1 + \\omega - \\omega^2)^5$ is:",
    options: ["$32$", "$-32$", "$64$", "$-64$"],
    correctAnswer: 0,
    explanation: "Since $1+\\omega+\\omega^2=0$, we have $1+\\omega^2=-\\omega$ and $1+\\omega=-\\omega^2$. Substituting yields $(-2\\omega)^5 + (-2\\omega^2)^5 = -32\\omega^2 - 32\\omega^4 = -32(\\omega^2+\\omega) = -32(-1) = 32$."
  },
  {
    question: "By Descartes' Rule of Signs, the maximum number of positive real roots of $x^5 - 3x^4 + 2x^3 - 5x^2 + 4x - 1 = 0$ is:",
    options: ["5", "3", "4", "2"],
    correctAnswer: 0,
    explanation: "The signs of the coefficients are $+ - + - + -$. There are 5 sign changes, so by Descartes' Rule of Signs, the equation has at most 5 positive real roots."
  },
  {
    question: "If $a, b, c$ are positive real numbers such that $a+b+c=1$, then the minimum value of $\\left(\\frac{1}{a}-1\\right)\\left(\\frac{1}{b}-1\\right)\\left(\\frac{1}{c}-1\\right)$ is:",
    options: ["$8$", "$4$", "$16$", "$27$"],
    correctAnswer: 0,
    explanation: "Note that $\\frac{1}{a}-1 = \\frac{b+c}{a} \\ge \\frac{2\\sqrt{bc}}{a}$ by AM-GM. Multiplying for $a,b,c$ gives $\\ge 8\\frac{\\sqrt{a^2b^2c^2}}{abc} = 8$."
  },
  {
    question: "The value of $\\left(\\frac{1+\\sin\\theta+i\\cos\\theta}{1+\\sin\\theta-i\\cos\\theta}\\right)^n$ is equal to:",
    options: [
      "$\\cos\\left(n\\left(\\frac{\\pi}{2}-\\theta\\right)\\right) + i\\sin\\left(n\\left(\\frac{\\pi}{2}-\\theta\\right)\\right)$",
      "$\\sin(n\\theta) + i\\cos(n\\theta)$",
      "$\\cos(n\\theta) - i\\sin(n\\theta)$",
      "$\\sin\\left(n\\left(\\frac{\\pi}{2}-\\theta\\right)\\right) + i\\cos\\left(n\\left(\\frac{\\pi}{2}-\\theta\\right)\\right)$"
    ],
    correctAnswer: 0,
    explanation: "Let $z = \\sin\\theta + i\\cos\\theta = \\cos(\\frac{\\pi}{2}-\\theta) + i\\sin(\\frac{\\pi}{2}-\\theta)$. The fraction simplifies to $z^n$, which by De Moivre's Theorem equals $\\cos(n(\\frac{\\pi}{2}-\\theta)) + i\\sin(n(\\frac{\\pi}{2}-\\theta))$."
  },
  {
    question: "If $x^3 - 3x + k = 0$ has three real and distinct roots, then $k$ lies in the open interval:",
    options: ["$(-2, 2)$", "$(-\\infty, -2)$", "$(2, \\infty)$", "$[-2, 2]$"],
    correctAnswer: 0,
    explanation: "Let $f(x) = x^3 - 3x + k$. Turning points are at $x = \\pm 1$. For 3 distinct real roots, $f(1)f(-1) < 0 \\implies (k-2)(k+2) < 0 \\implies k \\in (-2, 2)$."
  },
  {
    question: "If $\\alpha, \\beta$ are the roots of $x^2 - 2x + 4 = 0$, then $\\alpha^n + \\beta^n$ is equal to:",
    options: ["$2^{n+1} \\cos\\left(\\frac{n\\pi}{3}\\right)$", "$2^n \\cos\\left(\\frac{n\\pi}{3}\\right)$", "$2^{n+1} \\sin\\left(\\frac{n\\pi}{3}\\right)$", "$2^n \\sin\\left(\\frac{n\\pi}{3}\\right)$"],
    correctAnswer: 0,
    explanation: "The roots are $1 \\pm i\\sqrt{3} = 2 e^{\\pm i\\pi/3}$. Thus $\\alpha^n + \\beta^n = 2^n (e^{in\\pi/3} + e^{-in\\pi/3}) = 2^{n+1} \\cos\\left(\\frac{n\\pi}{3}\\right)$."
  },
  {
    question: "The product of all roots of the polynomial equation $x^4 - 5x^3 + 6x^2 - 4x + 12 = 0$ is:",
    options: ["12", "-12", "5", "-4"],
    correctAnswer: 0,
    explanation: "For a monic quartic polynomial $x^4 + a_1 x^3 + a_2 x^2 + a_3 x + a_4 = 0$, the product of all roots is $a_4 = 12$."
  },
  {
    question: "If $A$ is an idempotent square matrix of order $n$ (i.e. $A^2 = A$), then $\\det(A)$ can be:",
    options: ["0 or 1", "1 only", "0 only", "-1 or 1"],
    correctAnswer: 0,
    explanation: "Taking determinants on both sides: $\\det(A^2) = (\\det A)^2 = \\det A \\implies \\det A(\\det A - 1) = 0 \\implies \\det A = 0 \\text{ or } 1$."
  },
  {
    question: "If $a, b, c$ are in Harmonic Progression (H.P.), then which of the following relations holds true?",
    options: ["$\\frac{a-b}{b-c} = \\frac{a}{c}$", "$\\frac{a}{a-b} = \\frac{a+c}{a-c}$", "$\\frac{b}{a-b} = \\frac{a+c}{a-c}$", "$\\frac{a-b}{b-c} = \\frac{c}{a}$"],
    correctAnswer: 0,
    explanation: "By definition of H.P., $b = \\frac{2ac}{a+c}$. Re-arranging gives $a-b = a - \\frac{2ac}{a+c} = \\frac{a(a-c)}{a+c}$ and $b-c = \\frac{c(a-c)}{a+c}$. Taking the ratio yields $\\frac{a-b}{b-c} = \\frac{a}{c}$."
  },
  {
    question: "The number of real roots of the equation $x^4 + 15x^2 + 7x - 11 = 0$ is:",
    options: ["2", "4", "0", "3"],
    correctAnswer: 0,
    explanation: "Sign sequence of $f(x)$ is $+ + + -$, giving 1 positive real root. Sign sequence of $f(-x)$ is $+ + - -$, giving 1 negative real root. Thus, exactly 2 real roots and 2 imaginary roots."
  },
  {
    question: "The value of the infinite sum $1 - \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} + \\dots$ is:",
    options: ["$\\log_e(2)$", "$\\log_e(3)$", "$1$", "$e$"],
    correctAnswer: 0,
    explanation: "Using the Maclaurin expansion $\\log_e(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$ at $x=1$ yields $\\log_e(2)$."
  },
  {
    question: "In Cardan's method, the reduced cubic equation $x^3 + 3px + q = 0$ has three real and distinct roots if:",
    options: ["$4p^3 + q^2 < 0$", "$4p^3 + q^2 > 0$", "$4p^3 + q^2 = 0$", "$p^3 + q^2 < 0$"],
    correctAnswer: 0,
    explanation: "The discriminant of $x^3 + 3px + q = 0$ is $G^2 + 4H^3 = q^2 + 4p^3$. For 3 real and distinct roots, $4p^3 + q^2 < 0$."
  },
  {
    question: "If $A$ is a non-singular matrix of order $3$, then $\\det(\\text{adj } A)$ is equal to:",
    options: ["$(\\det A)^2$", "$\\det A$", "$(\\det A)^3$", "1"],
    correctAnswer: 0,
    explanation: "For any non-singular $n \\times n$ matrix $A$, $\\det(\\text{adj } A) = (\\det A)^{n-1}$. For $n=3$, it equals $(\\det A)^2$."
  },
  {
    question: "If the sum of two roots of $x^3 - 5x^2 - 16x + 80 = 0$ is zero, then the roots are:",
    options: ["$4, -4, 5$", "$3, -3, 5$", "$2, -2, 5$", "$1, -1, 5$"],
    correctAnswer: 0,
    explanation: "Let roots be $\\alpha, -\\alpha, \\gamma$. Sum of roots = $\\gamma = 5$. Product of roots = $(-\\alpha^2)(5) = -80 \\implies \\alpha^2 = 16 \\implies \\alpha = 4$. Roots are $4, -4, 5$."
  },
  {
    question: "The expansion of $\\cos(5\\theta)$ in powers of $\\cos\\theta$ is given by:",
    options: ["$16\\cos^5\\theta - 20\\cos^3\\theta + 5\\cos\\theta$", "$16\\cos^5\\theta - 12\\cos^3\\theta + 3\\cos\\theta$", "$32\\cos^5\\theta - 20\\cos^3\\theta + 5\\cos\\theta$", "$16\\cos^5\\theta + 20\\cos^3\\theta - 5\\cos\\theta$"],
    correctAnswer: 0,
    explanation: "Using De Moivre's Theorem $(\\cos\\theta + i\\sin\\theta)^5 = \\cos 5\\theta + i\\sin 5\\theta$ and expanding the real part gives $16\\cos^5\\theta - 20\\cos^3\\theta + 5\\cos\\theta$."
  },
  {
    question: "If $x, y, z > 0$, then $(x+y)(y+z)(z+x)$ is always greater than or equal to:",
    options: ["$8xyz$", "$4xyz$", "$6xyz$", "$2xyz$"],
    correctAnswer: 0,
    explanation: "By AM-GM inequality, $x+y \\ge 2\\sqrt{xy}$, $y+z \\ge 2\\sqrt{yz}$, $z+x \\ge 2\\sqrt{zx}$. Multiplying these together gives $(x+y)(y+z)(z+x) \\ge 8xyz$."
  },
  {
    question: "The real part of $\\sin(x + iy)$ is equal to:",
    options: ["$\\sin x \\cosh y$", "$\\cos x \\sinh y$", "$\\sin x \\sinh y$", "$\\cos x \\cosh y$"],
    correctAnswer: 0,
    explanation: "$\\sin(x+iy) = \\sin x \\cos(iy) + \\cos x \\sin(iy) = \\sin x \\cosh y + i \\cos x \\sinh y$. Real part is $\\sin x \\cosh y$."
  },
  {
    question: "If $a, b, c$ are positive real numbers in A.P., then $a^2 + c^2$ satisfies:",
    options: ["$\\ge 2b^2$", "$> 2b^2$", "$< 2b^2$", "$= 2b^2$"],
    correctAnswer: 0,
    explanation: "Since $a+c = 2b$, we have $4b^2 = (a+c)^2 = a^2 + c^2 + 2ac \\le a^2 + c^2 + (a^2 + c^2) = 2(a^2 + c^2)$. Hence $a^2 + c^2 \\ge 2b^2$."
  },
  {
    question: "The condition that the roots of $x^3 + px^2 + qx + r = 0$ are in Geometric Progression (G.P.) is:",
    options: ["$p^3 r = q^3$", "$p^3 = q^3 r$", "$p^2 r = q^2$", "$p r^3 = q^3$"],
    correctAnswer: 0,
    explanation: "Let roots be $a/k, a, ak$. Product of roots $a^3 = -r$. Substituting root $a$ into equation gives $a^3 + pa^2 + qa + r = 0 \\implies pa^2 + qa = 0 \\implies a = -q/p$. Thus $(-q/p)^3 = -r \\implies q^3 = p^3 r$."
  },
  {
    question: "If $\\alpha$ is a complex root of $x^7 - 1 = 0$ with $\\alpha \\neq 1$, then $1 + \\alpha + \\alpha^2 + \\dots + \\alpha^6$ equals:",
    options: ["0", "1", "7", "-1"],
    correctAnswer: 0,
    explanation: "$(1-\\alpha)(1+\\alpha+\\alpha^2+\\dots+\\alpha^6) = 1-\\alpha^7 = 0$. Since $\\alpha \\neq 1$, $1+\\alpha+\\dots+\\alpha^6 = 0$."
  },
  {
    question: "The modulus of the complex number $\\frac{1 + 2i}{1 - 3i}$ is:",
    options: ["$\\frac{1}{\\sqrt{2}}$", "$\\sqrt{2}$", "$\\frac{1}{2}$", "2"],
    correctAnswer: 0,
    explanation: "$\\left|\\frac{1+2i}{1-3i}\\right| = \\frac{|1+2i|}{|1-3i|} = \\frac{\\sqrt{1^2+2^2}}{\\sqrt{1^2+(-3)^2}} = \\frac{\\sqrt{5}}{\\sqrt{10}} = \\frac{1}{\\sqrt{2}}$."
  },
  {
    question: "If the roots of $x^2 - bx + c = 0$ are two consecutive integers, then $b^2 - 4c$ equals:",
    options: ["1", "2", "0", "4"],
    correctAnswer: 0,
    explanation: "Let roots be $\\alpha, \\alpha+1$. Difference of roots is $1$. So $(\\alpha+1-\\alpha)^2 = 1 \\implies (\\alpha+\\beta)^2 - 4\\alpha\\beta = b^2 - 4c = 1$."
  },
  {
    question: "The rank of a non-zero $3 \\times 3$ skew-symmetric real matrix is:",
    options: ["2", "3", "1", "0"],
    correctAnswer: 0,
    explanation: "The rank of a non-zero real skew-symmetric matrix is always even. For a $3 \\times 3$ matrix, the determinant is 0, so rank cannot be 3. Since it is non-zero, rank must be 2."
  }
];

const CLASSICAL_ALGEBRA_MOCK_2: Question[] = [
  {
    question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 + px + q = 0$, then the value of $\\alpha^3 + \\beta^3 + \\gamma^3$ is:",
    options: ["$-3q$", "$3q$", "$-3p$", "$3pq$"],
    correctAnswer: 0,
    explanation: "Since $\\alpha+\\beta+\\gamma = 0$, using the identity $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab-bc-ca) = 0$, we get $\\alpha^3+\\beta^3+\\gamma^3 = 3\\alpha\\beta\\gamma = 3(-q) = -3q$."
  },
  {
    question: "The condition that one root of $ax^2 + bx + c = 0$ is $n$ times the other is:",
    options: ["$n b^2 = (n+1)^2 ac$", "$b^2 = 4nac$", "$n^2 b = (n+1) ac$", "$n b = (n+1) ac$"],
    correctAnswer: 0,
    explanation: "Let roots be $\\alpha, n\\alpha$. $\\alpha(1+n) = -b/a$ and $n\\alpha^2 = c/a$. Squaring the sum gives $\\alpha^2(1+n)^2 = b^2/a^2$. Substituting $\\alpha^2 = c/(an)$ yields $n b^2 = (n+1)^2 ac$."
  },
  {
    question: "If $\\alpha_1, \\alpha_2, \\dots, \\alpha_n$ are the roots of $x^n - 1 = 0$, then $(1-\\alpha_1)(1-\\alpha_2)\\dots(1-\\alpha_n)$ is equal to:",
    options: ["0", "$n$", "$1$", "$-1$"],
    correctAnswer: 0,
    explanation: "One of the roots of $x^n - 1 = 0$ is 1 (say $\\alpha_1 = 1$). Therefore, $(1-\\alpha_1) = 0$, making the entire product 0."
  },
  {
    question: "If $\\alpha, \\beta$ are roots of $x^2 - p(x+1) - c = 0$, then $(\\alpha+1)(\\beta+1)$ equals:",
    options: ["$1-c$", "$1+c$", "$p-c$", "$p+c$"],
    correctAnswer: 0,
    explanation: "Rewrite as $x^2 - px - (p+c) = 0$. Then $\\alpha+\\beta = p$ and $\\alpha\\beta = -(p+c)$. Now $(\\alpha+1)(\\beta+1) = \\alpha\\beta + (\\alpha+\\beta) + 1 = -(p+c) + p + 1 = 1-c$."
  },
  {
    question: "If $z = \\cos\\theta + i\\sin\\theta$, then $\\frac{z^2 - 1}{z^2 + 1}$ is equal to:",
    options: ["$i \\tan\\theta$", "$-i \\tan\\theta$", "$\\tan\\theta$", "$i \\cot\\theta$"],
    correctAnswer: 0,
    explanation: "By De Moivre's theorem $z^2 = \\cos 2\\theta + i\\sin 2\\theta$. $\\frac{z^2-1}{z^2+1} = \\frac{-2\\sin^2\\theta + 2i\\sin\\theta\\cos\\theta}{2\\cos^2\\theta + 2i\\sin\\theta\\cos\\theta} = \\frac{2i\\sin\\theta(\\cos\\theta+i\\sin\\theta)}{2\\cos\\theta(\\cos\\theta+i\\sin\\theta)} = i\\tan\\theta$."
  },
  {
    question: "The number of real roots of the equation $x^6 - x^5 + x^4 - x^3 + x^2 - x + 1 = 0$ is:",
    options: ["0", "2", "4", "6"],
    correctAnswer: 0,
    explanation: "For $x \\neq -1$, $x^6 - x^5 + x^4 - x^3 + x^2 - x + 1 = \\frac{x^7 + 1}{x + 1}$. The only real root of $x^7 + 1 = 0$ is $x = -1$, but $x \\neq -1$. Hence there are 0 real roots."
  },
  {
    question: "If $a, b, c$ are distinct positive real numbers, then $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right)$ is strictly:",
    options: ["$> 9$", "$= 9$", "$< 9$", "$\\le 9$"],
    correctAnswer: 0,
    explanation: "By AM-HM inequality for 3 distinct positive numbers, $\\frac{a+b+c}{3} > \\frac{3}{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}} \\implies (a+b+c)(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}) > 9$."
  },
  {
    question: "Cauchy's theorem on bounds of roots states that all complex roots of $a_0 x^n + a_1 x^{n-1} + \\dots + a_n = 0$ ($a_0 \\neq 0$) lie within $|z| < 1 + \\frac{M}{|a_0|}$, where $M$ is:",
    options: ["$\\max(|a_1|, |a_2|, \\dots, |a_n|)$", "$\\sum |a_i|$", "$\\min(|a_1|, \\dots, |a_n|)$", "$|a_n|$"],
    correctAnswer: 0,
    explanation: "Cauchy's bound theorem defines $M = \\max_{1 \\le k \\le n} |a_k|$."
  },
  {
    question: "If $A$ is an orthogonal real matrix, then $\\det(A)$ is equal to:",
    options: ["$\\pm 1$", "0", "1 only", "Any non-zero real number"],
    correctAnswer: 0,
    explanation: "Since $A A^T = I$, taking determinants gives $\\det(A)\\det(A^T) = (\\det A)^2 = \\det I = 1 \\implies \\det A = \\pm 1$."
  },
  {
    question: "The sum of the infinite series $1 + \\frac{1}{2!} + \\frac{1}{4!} + \\frac{1}{6!} + \\dots$ is:",
    options: ["$\\cosh(1) = \\frac{e + e^{-1}}{2}$", "$\\sinh(1) = \\frac{e - e^{-1}}{2}$", "$e$", "$\\frac{e}{2}$"],
    correctAnswer: 0,
    explanation: "Using $e^x = \\sum \\frac{x^n}{n!}$, we get $\\frac{e^1 + e^{-1}}{2} = 1 + \\frac{1}{2!} + \\frac{1}{4!} + \\dots = \\cosh(1)$."
  },
  {
    question: "If the roots of $x^3 - 3px^2 + 3qx - r = 0$ are in Arithmetic Progression (A.P.), then:",
    options: ["$2p^3 - 3pq + r = 0$", "$p^3 - 3pq + r = 0$", "$2p^3 + 3pq - r = 0$", "$p^3 + 3pq - r = 0$"],
    correctAnswer: 0,
    explanation: "Let roots be $a-d, a, a+d$. Sum of roots $3a = 3p \\implies a = p$. Since $p$ is a root, $p^3 - 3p(p^2) + 3q(p) - r = 0 \\implies -2p^3 + 3pq - r = 0 \\implies 2p^3 - 3pq + r = 0$."
  },
  {
    question: "In Ferrari's method for solving a general biquadratic equation $x^4 + ax^3 + bx^2 + cx + d = 0$, the resolvent equation is of degree:",
    options: ["3 (cubic)", "2 (quadratic)", "4 (quartic)", "6 (sextic)"],
    correctAnswer: 0,
    explanation: "Ferrari's method introduces an auxiliary parameter $\\lambda$ which satisfies a cubic resolvent equation."
  },
  {
    question: "For any three positive real numbers $a, b, c$, the expression $(a+b+c)^3$ is always:",
    options: ["$\\ge 27abc$", "$\\le 27abc$", "$\\ge 9abc$", "$\\le 9abc$"],
    correctAnswer: 0,
    explanation: "By AM-GM inequality, $\\frac{a+b+c}{3} \\ge \\sqrt[3]{abc}$. Cubing both sides gives $(a+b+c)^3 \\ge 27abc$."
  },
  {
    question: "If $x + \\frac{1}{x} = 2\\cos\\theta$, then $x^n + \\frac{1}{x^n}$ is equal to:",
    options: ["$2\\cos(n\\theta)$", "$2i\\sin(n\\theta)$", "$\\cos(n\\theta)$", "$2\\sin(n\\theta)$"],
    correctAnswer: 0,
    explanation: "Since $x = \\cos\\theta + i\\sin\\theta$, $x^n = \\cos n\\theta + i\\sin n\\theta$ and $x^{-n} = \\cos n\\theta - i\\sin n\\theta$. Adding gives $x^n + x^{-n} = 2\\cos(n\\theta)$."
  },
  {
    question: "Sturm's theorem provides a algorithm to determine:",
    options: [
      "The exact number of distinct real roots of a polynomial in a given interval",
      "The exact number of complex roots of a polynomial",
      "The upper bound for real roots",
      "The convergence radius of a power series"
    ],
    correctAnswer: 0,
    explanation: "Sturm's Theorem counts the exact number of real roots of a polynomial with real coefficients in an open interval $(a, b)$ by evaluating sign changes in Sturm's sequence."
  },
  {
    question: "If $A$ is a square matrix of order $n$ and $\\text{rank}(A) = r$, then the homogeneous system $AX = 0$ has how many linearly independent solutions?",
    options: ["$n - r$", "$r$", "$n$", "$n + r$"],
    correctAnswer: 0,
    explanation: "By the Rank-Nullity Theorem, $\\text{nullity}(A) = n - \\text{rank}(A) = n - r$, which is the dimension of the solution space."
  },
  {
    question: "If $\\log_e(1+x+x^2) = a_1 x + a_2 x^2 + a_3 x^3 + \\dots$, then $a_3$ equals:",
    options: ["$-\\frac{2}{3}$", "$\\frac{1}{3}$", "$-\\frac{1}{3}$", "$\\frac{2}{3}$"],
    correctAnswer: 0,
    explanation: "$\\log(1+x+x^2) = \\log(1-x^3) - \\log(1-x) = (-x^3 - \\dots) - (-x - \\frac{x^2}{2} - \\frac{x^3}{3} - \\dots) = x + \\frac{x^2}{2} - \\frac{2x^3}{3} + \\dots$ Thus $a_3 = -2/3$."
  },
  {
    question: "The system of homogeneous linear equations $x+y+z=0, 2x+3y+4z=0, 3x+4y+5z=0$ has:",
    options: ["Infinitely many solutions", "Unique zero solution", "No solution", "Exactly two solutions"],
    correctAnswer: 0,
    explanation: "The coefficient determinant $\\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 4 \\\\ 3 & 4 & 5 \\end{vmatrix} = 1(15-16) - 1(10-12) + 1(8-9) = -1 + 2 - 1 = 0$. Since $\\det = 0$, it has infinitely many non-trivial solutions."
  },
  {
    question: "What is the sum of the $n$-th roots of unity for any integer $n > 1$?",
    options: ["0", "1", "$n$", "$-1$"],
    correctAnswer: 0,
    explanation: "The roots are $1, \\omega, \\omega^2, \\dots, \\omega^{n-1}$ where $\\omega = e^{i 2\\pi/n}$. The sum is $\\frac{1-\\omega^n}{1-\\omega} = \\frac{1-1}{1-\\omega} = 0$."
  },
  {
    question: "If $\\alpha, \\beta$ are the roots of $x^2 - x + 1 = 0$, then $\\alpha^{2024} + \\beta^{2024}$ is equal to:",
    options: ["$-1$", "1", "2", "-2"],
    correctAnswer: 0,
    explanation: "The roots are $-\\omega, -\\omega^2$. Then $(-\\omega)^{2024} + (-\\omega^2)^{2024} = \\omega^{2024} + \\omega^{4048} = \\omega^2 + \\omega = -1$."
  },
  {
    question: "For $a, b > 0$ and $a \\neq b$, the power mean inequality $\\frac{a^n + b^n}{2} > \\left(\\frac{a+b}{2}\\right)^n$ holds if:",
    options: ["$n > 1$ or $n < 0$", "$0 < n < 1$", "$n = 1$", "No real $n$"],
    correctAnswer: 0,
    explanation: "The power mean $M_p(a,b)$ is strictly increasing with respect to $p$. Hence $\\frac{a^n+b^n}{2} > (\\frac{a+b}{2})^n$ holds for $n > 1$ or $n < 0$."
  },
  {
    question: "If $A$ is a real skew-symmetric matrix of order $3$, then $\\det(A)$ is:",
    options: ["0", "1", "-1", "3"],
    correctAnswer: 0,
    explanation: "$\\det(A) = \\det(A^T) = \\det(-A) = (-1)^3 \\det(A) = -\\det(A) \\implies 2\\det(A) = 0 \\implies \\det(A) = 0$."
  },
  {
    question: "If the roots of $x^3 + px^2 + qx + r = 0$ are $\\alpha, \\beta, \\gamma$, then the polynomial equation whose roots are $\\beta\\gamma, \\gamma\\alpha, \\alpha\\beta$ is:",
    options: [
      "$y^3 - qy^2 + pry - r^2 = 0$",
      "$y^3 + qy^2 + pry + r^2 = 0$",
      "$y^3 - py^2 + qry - r^2 = 0$",
      "$y^3 + py^2 - qry + r^2 = 0$"
    ],
    correctAnswer: 0,
    explanation: "Since $\\alpha\\beta\\gamma = -r$, we have $\\beta\\gamma = -r/\\alpha$. Let $y = -r/x \\implies x = -r/y$. Substituting into $x^3 + px^2 + qx + r = 0$ gives $(-r/y)^3 + p(-r/y)^2 + q(-r/y) + r = 0 \\implies y^3 - qy^2 + pry - r^2 = 0$."
  },
  {
    question: "If $a, b, c$ are real numbers such that $a+b+c = 0$, then $a^3 + b^3 + c^3$ is equal to:",
    options: ["$3abc$", "$-3abc$", "$abc$", "$6abc$"],
    correctAnswer: 0,
    explanation: "Using the algebraic identity $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab-bc-ca)$, when $a+b+c=0$, $a^3+b^3+c^3 = 3abc$."
  },
  {
    question: "The modulus of $e^{z}$ where $z = x + iy$ is equal to:",
    options: ["$e^x$", "$e^y$", "$e^{\\sqrt{x^2+y^2}}$", "$e^{x+y}$"],
    correctAnswer: 0,
    explanation: "$|e^{z}| = |e^{x+iy}| = |e^x e^{iy}| = e^x |\\cos y + i\\sin y| = e^x \\cdot 1 = e^x$."
  }
];

const CLASSICAL_ALGEBRA_POOLS: Question[][] = [
  CLASSICAL_ALGEBRA_MOCK_1,
  CLASSICAL_ALGEBRA_MOCK_2
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

const TGT_PGT_MOCK_POOL: Question[] = [
  {
    question: "The order of the element $3$ in the multiplicative group $(\\mathbb{Z}_{11}^*, \\cdot)$ is:",
    options: ["$5$", "$10$", "$4$", "$2$"],
    correctAnswer: 0,
    explanation: "$3^1 = 3, 3^2 = 9, 3^3 = 27 \\equiv 5, 3^4 \\equiv 4, 3^5 \\equiv 12 \\equiv 1 \\pmod{11}$. Thus, $\\text{order}(3) = 5$."
  },
  {
    question: "The general solution of the differential equation $\\frac{d^2y}{dx^2} + y = 0$ is:",
    options: ["$y = C_1 \\cos x + C_2 \\sin x$", "$y = C_1 e^x + C_2 e^{-x}$", "$y = C_1 x + C_2$", "$y = C_1 \\tan x + C_2$"],
    correctAnswer: 0,
    explanation: "Auxiliary equation $m^2 + 1 = 0 \\implies m = \\pm i$. Solution is $y = C_1 \\cos x + C_2 \\sin x$."
  },
  {
    question: "If $\\vec{a} = 2\\hat{i} + \hat{j} - \hat{k}$ and $\\vec{b} = \\hat{i} - \hat{j} + 2\\hat{k}$, the vector projection of $\\vec{a}$ on $\\vec{b}$ is:",
    options: ["$\\frac{-1}{\\sqrt{6}}(\\hat{i} - \\hat{j} + 2\\hat{k})$", "$\\frac{1}{6}(\\hat{i} - \\hat{j} + 2\\hat{k})$", "$\\frac{-1}{6}(\\hat{i} - \\hat{j} + 2\\hat{k})$", "$\\sqrt{6}(\\hat{i} - \\hat{j} + 2\\hat{k})$"],
    correctAnswer: 2,
    explanation: "$\\text{Proj}_{\\vec{b}}\\vec{a} = \\left(\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}$. $\\vec{a} \\cdot \\vec{b} = 2(1) + 1(-1) + (-1)(2) = -1$. $|\\vec{b}|^2 = 6$. So $-\\frac{1}{6}(\\hat{i} - \\hat{j} + 2\\hat{k})$."
  },
  {
    question: "The radius of curvature of the curve $r = a(1 + \\cos\\theta)$ at $\\theta = 0$ is:",
    options: ["$\\frac{4}{3}a$", "$\\frac{2}{3}a$", "$a$", "$2a$"],
    correctAnswer: 0,
    explanation: "For cardioid $r = a(1+\\cos\\theta)$, $\\rho = \\frac{4}{3}a \\cos(\\theta/2)$. At $\\theta = 0$, $\\rho = \\frac{4}{3}a$."
  },
  {
    question: "If the matrix $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ satisfies $A^2 - 5A - kI = 0$, then $k$ equals:",
    options: ["$2$", "$-2$", "$5$", "$-5$"],
    correctAnswer: 0,
    explanation: "Characteristic equation: $|A - \\lambda I| = (1-\\lambda)(4-\\lambda) - 6 = \\lambda^2 - 5\\lambda - 2 = 0$. By Cayley-Hamilton, $A^2 - 5A - 2I = 0 \\implies k = 2$."
  },
  {
    question: "The eccentricity of the hyperbola $9x^2 - 16y^2 = 144$ is:",
    options: ["$\\frac{5}{4}$", "$\\frac{5}{3}$", "$\\frac{4}{3}$", "$\\frac{3}{5}$"],
    correctAnswer: 0,
    explanation: "$\cfrac{x^2}{16} - \cfrac{y^2}{9} = 1 \\implies a^2=16, b^2=9$. Eccentricity $e = \\sqrt{1 + b^2/a^2} = \\sqrt{1 + 9/16} = \\frac{5}{4}$."
  },
  {
    question: "The degree of the differential equation $\\left[1 + \\left(\\frac{dy}{dx}\\right)^2\\right]^{3/2} = k \\frac{d^2y}{dx^2}$ is:",
    options: ["$2$", "$3$", "$1$", "$6$"],
    correctAnswer: 0,
    explanation: "Squaring both sides gives $\\left[1 + \\left(\\frac{dy}{dx}\\right)^2\\right]^3 = k^2 \\left(\\frac{d^2y}{dx^2}\\right)^2$. The highest order derivative is $\\frac{d^2y}{dx^2}$ with exponent $2$."
  },
  {
    question: "The value of $\\int_0^{\\pi/2} \\log(\\sin x) dx$ is equal to:",
    options: ["$-\\frac{\\pi}{2} \\log 2$", "$\\frac{\\pi}{2} \\log 2$", "$-\\pi \\log 2$", "0"],
    correctAnswer: 0,
    explanation: "Euler's standard integral: $\\int_0^{\\pi/2} \\log(\\sin x) dx = -\\frac{\\pi}{2} \\log 2$."
  },
  {
    question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - 6x^2 + 11x - 6 = 0$, then $\\alpha^2 + \\beta^2 + \\gamma^2$ is:",
    options: ["$14$", "$36$", "$22$", "$12$"],
    correctAnswer: 0,
    explanation: "$\\sum \\alpha = 6, \\sum \\alpha\\beta = 11$. $\\sum \\alpha^2 = (\\sum \\alpha)^2 - 2\\sum \\alpha\\beta = 36 - 22 = 14$."
  },
  {
    question: "Which of the following groups is non-abelian?",
    options: ["Quaternion group $Q_8$", "Cyclic group $Z_6$", "Klein 4-group $V_4$", "$(\\mathbb{R}, +)$"],
    correctAnswer: 0,
    explanation: "Quaternion group $Q_8 = \\{\\pm 1, \\pm i, \\pm j, \\pm k\\}$ is non-abelian because $ij = k \\neq ji = -k$."
  },
  {
    question: "The condition for two vectors $\\vec{a}$ and $\\vec{b}$ to be perpendicular is:",
    options: ["$\\vec{a} \\cdot \\vec{b} = 0$", "$\\vec{a} \\times \\vec{b} = 0$", "$\\vec{a} + \\vec{b} = 0$", "$|\\vec{a}| = |\\vec{b}|$"],
    correctAnswer: 0,
    explanation: "Two non-zero vectors are perpendicular if and only if their dot product is zero."
  },
  {
    question: "The total number of subgroups of the cyclic group $\\mathbb{Z}_{30}$ is:",
    options: ["$8$", "$6$", "$10$", "$4$"],
    correctAnswer: 0,
    explanation: "The number of subgroups of $\\mathbb{Z}_n$ is equal to the number of positive divisors $\\tau(n)$. $\\tau(30) = \\tau(2^1 \\cdot 3^1 \\cdot 5^1) = 2 \\times 2 \\times 2 = 8$."
  },
  {
    question: "If $f(z) = u + iv$ is an analytic function in a domain $D$, then $u$ and $v$ satisfy:",
    options: ["Laplace Equation $\\nabla^2 u = 0, \\nabla^2 v = 0$", "Wave Equation", "Heat Equation", "Poisson Equation"], correctAnswer: 0,
    explanation: "Real and imaginary parts of an analytic function are harmonic, satisfying $\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$."
  },
  {
    question: "The asymptote of the curve $y^3 - x^2 y + 2x = 0$ parallel to the y-axis is:",
    options: ["$x = 0$", "$y = 0$", "$x = 1$", "No vertical asymptote"],
    correctAnswer: 3,
    explanation: "Highest power of $y$ is $y^3$ whose coefficient is $1$ (constant), so there is no asymptote parallel to the y-axis."
  },
  {
    question: "The probability of getting a total of 7 in a single throw of two dice is:",
    options: ["$\\frac{1}{6}$", "$\\frac{1}{12}$", "$\\frac{5}{36}$", "$\\frac{1}{36}$"],
    correctAnswer: 0,
    explanation: "Favorable outcomes: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \\implies 6$. Total = $36$. Probability = $6/36 = 1/6$."
  }
];

export function generateQuestionSet(topic: string, count: number = 30, mockIndex: number = 0) {
  // Return empty array for TGT PGT section so real Google Sheets data is used or "Question is coming" is shown
  if (
    topic.toLowerCase().includes("tgt") || 
    topic.toLowerCase().includes("pgt") ||
    TGT_PGT_TOPICS.some(t => t.toLowerCase() === topic.toLowerCase())
  ) {
    return [];
  }

  let pool = DEFAULT_POOL;
  if (topic === "Real Analysis") {
    const poolForMock = REAL_ANALYSIS_POOLS[mockIndex] || REAL_ANALYSIS_POOLS[mockIndex % REAL_ANALYSIS_POOLS.length];
    pool = poolForMock && poolForMock.length > 0 ? poolForMock : DEFAULT_POOL;
  } else if (topic === "Classical Algebra") {
    if (mockIndex === 0) pool = CLASSICAL_ALGEBRA_MOCK_1;
    else if (mockIndex === 1) pool = CLASSICAL_ALGEBRA_MOCK_2;
    else {
      const specificQuestions = CLASSICAL_ALGEBRA_POOLS[mockIndex % CLASSICAL_ALGEBRA_POOLS.length] || [];
      pool = specificQuestions.length > 0 ? specificQuestions : DEFAULT_POOL;
    }
  }

  const targetCount = (topic === "Real Analysis" && mockIndex >= 3) ? pool.length : count;
  
  const questions = [];
  for (let i = 0; i < targetCount; i++) {
    // Pick unique questions by rotating through the pool
    const q = pool[i % pool.length];
    
    // Shuffle options for uniqueness
    const optionsOrder = [0, 1, 2, 3].sort(() => 0.5 - Math.random());
    const newOptions = optionsOrder.map(idx => q.options[idx]);
    const newCorrect = optionsOrder.indexOf(q.correctAnswer);
    
    questions.push({
      id: `${topic}-${mockIndex + 1}-${i + 1}`,
      question: q.question,
      options: newOptions,
      correctAnswer: newCorrect,
      explanation: q.explanation
    });
  }
  return questions;
}

export const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkh00sQ791MsKpDFFZFtWsyrOQwpwovut_aTzEp9KcbdVQa_xuIi7nkG-cm5jydhXd-w/exec";

let liveMockQuestionsCache: { data: any; timestamp: number } | null = null;
let activeFetchPromise: Promise<any> | null = null;

export async function fetchLiveMockTestQuestions(url: string = GOOGLE_SHEETS_SCRIPT_URL, forceRefresh = false) {
  const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes cache
  const now = Date.now();

  if (!forceRefresh && liveMockQuestionsCache && (now - liveMockQuestionsCache.timestamp < CACHE_DURATION)) {
    return liveMockQuestionsCache.data;
  }

  if (!forceRefresh) {
    try {
      const stored = sessionStorage.getItem('cached_live_mock_test');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (now - parsed.timestamp < CACHE_DURATION) {
          liveMockQuestionsCache = parsed;
          return parsed.data;
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
  }

  if (activeFetchPromise && !forceRefresh) {
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      
      let result = null;
      if (data && Array.isArray(data.questions)) {
        result = {
          testId: data.testId || 'google-sheet-test',
          title: data.title || 'Live Google Sheets Mock Test',
          questions: data.questions,
          duration: (data.durationMinutes || 60) * 60,
          isLiveGoogleSheet: true
        };
      } else if (Array.isArray(data)) {
        result = {
          testId: 'google-sheet-test',
          title: 'Live Google Sheets Mock Test',
          questions: data,
          duration: 3600,
          isLiveGoogleSheet: true
        };
      }

      if (result) {
        liveMockQuestionsCache = { data: result, timestamp: Date.now() };
        try {
          sessionStorage.setItem('cached_live_mock_test', JSON.stringify(liveMockQuestionsCache));
        } catch (e) {
          // Ignore
        }
      }
      return result;
    } catch (err) {
      console.error("Error fetching live Google Sheets questions:", err);
      return null;
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}

const generatedTopicMocksCache = new Map<string, any[]>();

export function generateMocksForTopic(topic: string, count: number = 20) {
  const cacheKey = `${topic}-${count}`;
  if (generatedTopicMocksCache.has(cacheKey)) {
    return generatedTopicMocksCache.get(cacheKey)!;
  }

  const mocks = Array.from({ length: count }, (_, i) => {
    const qList = generateQuestionSet(topic, 30, i);
    return {
      id: `${topic.replace(/\s+/g, '-').toLowerCase()}-mock-${i + 1}`,
      topic,
      title: `Mock Test ${i + 1}: ${topic}`,
      duration: 3600,
      totalQuestions: qList.length,
      questions: qList
    };
  });

  generatedTopicMocksCache.set(cacheKey, mocks);
  return mocks;
}

