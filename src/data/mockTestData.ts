export const EXAM_CATEGORIES = [
  { id: 'slst', name: 'SLST Mathematics', description: 'Master SLST with chapter-wise and full-length mocks.' },
  { id: 'jee', name: 'JEE Advanced', description: 'Tough level mock tests curated for JEE Advanced aspirants.' },
  { id: 'jeemains', name: 'JEE Mains', description: 'Topic-wise mock tests perfectly aligned with the latest NTA pattern.' },
  { id: 'btech', name: 'B.Tech Mathematics', description: 'Engineering mathematics tests covering Matrices, Calculus & more.' }
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

export const TOPICS_BY_CATEGORY: Record<string, string[]> = {
  slst: SLST_TOPICS,
  jee: ["Complex Numbers", "Conic Sections", "Definite Integration", "Probability", "Vectors & 3D Geometry"],
  jeemains: ["Binomial Theorem", "Sequence & Series", "Matrices & Determinants", "Limits", "Application of Derivatives"],
  btech: ["Engineering Calculus", "Linear Algebra", "Differential Equations", "Numerical Methods", "Complex Analysis"]
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
  { question: "Let $f,g:[a,b] \to \mathbb{R}$ be continuous. If $\int_a^b f(x)dx = \int_a^b g(x)dx$, then:", options: ["$f(x) = g(x)$ for some $x$", "$f(x) = g(x)$ for all $x$", "$f(x) \neq g(x)$ everywhere", "None of these"], correctAnswer: 0, explanation: "By Mean Value Theorem for Integrals." },
  { question: "Which sets are not countable?", options: ["$\mathbb{Q}$", "$\mathbb{Z} \times \mathbb{Z}$", "The set of algebraic numbers", "The Cantor set"], correctAnswer: 3, explanation: "The Cantor set is uncountable." },
  { question: "Every infinite bounded subset of $\mathbb{R}$ has:", options: ["A limit point in $\mathbb{R}$", "A maximum", "A minimum", "Both min and max"], correctAnswer: 0, explanation: "Bolzano-Weierstrass theorem." },
  { question: "For $A \subset \mathbb{R}$, $A$ is open if and only if:", options: ["$A$ contains all its limit points", "Every point of $A$ is an interior point", "$A$ is finite", "$A$ is bounded"], correctAnswer: 1, explanation: "Definition of an open set in standard metric topology." },
  { question: "A convergent sequence in a metric space is:", options: ["Always Cauchy", "Sometimes Cauchy", "Never Cauchy", "Bounded but not Cauchy"], correctAnswer: 0, explanation: "Every convergent sequence is Cauchy." },
  { question: "The improper integral $\int_1^\infty \frac{1}{x^p} dx$ converges for:", options: ["$p > 1$", "$p \ge 1$", "$p < 1$", "$p \le 1$"], correctAnswer: 0, explanation: "p-test for integrals." },
  { question: "If $\lim_{n \to \infty} a_n = L$, then every subsequence of $a_n$ converges to:", options: ["$L$", "0", "$\infty$", "Does not necessarily converge"], correctAnswer: 0, explanation: "Subsequences of a convergent sequence have the same limit." },
  { question: "A continuous image of a connected set is:", options: ["Connected", "Compact", "Closed", "Open"], correctAnswer: 0, explanation: "Continuity preserves connectedness." },
  { question: "The intersection of an arbitrary family of closed sets is:", options: ["Open", "Closed", "Neither", "Both"], correctAnswer: 1, explanation: "Arbitrary intersection of closed sets is closed." },
  { question: "A sequence of functions $\{f_n\}$ converges uniformly on $E$ if:", options: ["$\sup_{x \in E} |f_n(x) - f(x)| \to 0$", "$\inf_{x \in E} |f_n(x) - f(x)| \to 0$", "$f_n(x) \to f(x)$ for each $x$", "It converges pointwise"], correctAnswer: 0, explanation: "By definition of uniform convergence." }
];


const REAL_ANALYSIS_POOL_3: Question[] = [
  { question: "A function $f: [a,b] \to \mathbb{R}$ of bounded variation must be:", options: ["Continuous", "Differentiable", "Riemann Integrable", "Monotonic"], correctAnswer: 2, explanation: "Functions of bounded variation are Riemann Integrable." },
  { question: "The union of two countable sets is:", options: ["Finite", "Uncountable", "Countable", "Empty"], correctAnswer: 2, explanation: "The union of two countable sets is countable." },
  { question: "Any open interval $(a,b)$ in $\mathbb{R}$ is homeomorphic to:", options: ["$[a,b]$", "$\mathbb{R}$", "$(0, \infty)$ only", "None of these"], correctAnswer: 1, explanation: "$(a,b)$ and $\mathbb{R}$ are homeomorphic." },
  { question: "A metric space is complete if:", options: ["Every sequence converges", "Every Cauchy sequence converges", "It is closed", "It is open"], correctAnswer: 1, explanation: "Definition of a complete metric space." },
  { question: "The Riemann-Stieltjes integral $\int_a^b f d\alpha$ exists if $f$ is continuous and $\alpha$ is:", options: ["Monotonic", "Continuous", "Bounded", "None of these"], correctAnswer: 0, explanation: "It exists if $f$ is continuous and $\alpha$ is monotonically increasing." },
  { question: "Which is a property of the Cantor set?", options: ["It has positive measure", "It is uncountable", "It is open", "It contains intervals"], correctAnswer: 1, explanation: "The Cantor set is a classic example of an uncountable set with measure zero." },
  { question: "Let $f$ be continuous on $[0,1]$ and $f(x) \in \mathbb{Q}$ for all $x$. Then $f$ is:", options: ["A polynomial", "Constant", "Identity function", "Unbounded"], correctAnswer: 1, explanation: "Since the image of a connected set under a continuous function is connected, $f([0,1])$ must be a single rational point." },
  { question: "The power series $\sum n! x^n$ has radius of convergence:", options: ["$1$", "$\infty$", "$0$", "$e$"], correctAnswer: 2, explanation: "By ratio test, limit is $\infty$, so radius is 0." },
  { question: "A subset of $\mathbb{R}$ is compact if and only if it is:", options: ["Closed", "Bounded", "Closed and bounded", "Open"], correctAnswer: 2, explanation: "Heine-Borel Theorem." },
  { question: "The limit inferior of the sequence $a_n = (-1)^n \frac{n+1}{n}$ is:", options: ["$1$", "$-1$", "$0$", "Does not exist"], correctAnswer: 1, explanation: "The subsequences converge to $1$ and $-1$. The limit inferior is the smallest limit point, which is $-1$." }
];


const CLASSICAL_ALGEBRA_POOLS: Question[][] = [
  // Mock Test 1
  [
    { question: "If $\\alpha, \\beta, \\gamma$ are roots of $x^3 - px^2 + qx - r = 0$, what is the value of $\\alpha^2 + \\beta^2 + \\gamma^2$?", options: ["$p^2 - 2q$", "$p^2 + 2q$", "$q^2 - 2pr$", "$p^2 - 2r$"], correctAnswer: 0, explanation: "We know $\\sum \\alpha^2 = (\\sum \\alpha)^2 - 2 \\sum \\alpha \\beta = p^2 - 2q$." }
  ],
  // Mock Test 2
  [
    { question: "The number of real roots of the equation $x^4 + x^2 + 1 = 0$ is:", options: ["0", "2", "4", "1"], correctAnswer: 0, explanation: "$x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$. The roots are complex." }
  ],
  // Mock Test 3
  [
    { question: "If $a, b, c$ are in Harmonic Progression (H.P.), then $\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c}$ are in:", options: ["A.P.", "G.P.", "H.P.", "None of the above"], correctAnswer: 0, explanation: "By definition, the reciprocals of terms in an H.P. form an A.P." }
  ],
  // Mock Test 4
  [
    { question: "The sum of the roots of the equation $2x^3 - 3x^2 + 4x - 5 = 0$ is:", options: ["$3/2$", "$-3/2$", "$2$", "$5/2$"], correctAnswer: 0, explanation: "Sum of roots is $-(\\text{coeff of } x^2) / (\\text{coeff of } x^3) = 3/2$." }
  ],
  // Mock Test 5
  [
    { question: "If $\\omega$ is a complex cube root of unity, then $1 + \\omega + \\omega^2$ equals:", options: ["0", "1", "$-1$", "$3$"], correctAnswer: 0, explanation: "The sum of the cube roots of unity is 0." }
  ],
  // Mock Test 6
  [
    { question: "By Descartes' Rule of Signs, the maximum number of positive real roots of $x^5 - 2x^3 + 3x - 4 = 0$ is:", options: ["3", "2", "1", "5"], correctAnswer: 0, explanation: "The signs are + - + -. There are 3 sign changes, so max 3 positive roots." }
  ],
  // Mock Test 7
  [
    { question: "Let $A$ be a square matrix of order $n$. Then $\\det(kA)$ is equal to:", options: ["$k^n \\det(A)$", "$k \\det(A)$", "$k^{n-1} \\det(A)$", "$n^k \\det(A)$"], correctAnswer: 0, explanation: "Multiplying a matrix of order $n$ by scalar $k$ multiplies its determinant by $k^n$." }
  ],
  // Mock Test 8
  [
    { question: "If the roots of $x^2 - px + q = 0$ are real and distinct, then:", options: ["$p^2 > 4q$", "$p^2 < 4q$", "$p^2 = 4q$", "$p^2 \\ge 4q$"], correctAnswer: 0, explanation: "Discriminant $\\Delta = p^2 - 4q > 0$ for real distinct roots." }
  ],
  // Mock Test 9
  [
    { question: "The value of $\\omega^n + \\omega^{n+1} + \\omega^{n+2}$, where $\\omega$ is a complex cube root of unity, is:", options: ["0", "1", "$\\omega$", "$\\omega^2$"], correctAnswer: 0, explanation: "$\\omega^n(1 + \\omega + \\omega^2) = \\omega^n(0) = 0$." }
  ],
  // Mock Test 10
  [
    { question: "Which inequality holds for any positive real numbers $a, b$?", options: ["A.M. $\\ge$ G.M.", "G.M. $\\ge$ A.M.", "A.M. $\\le$ H.M.", "None of these"], correctAnswer: 0, explanation: "Arithmetic Mean is always greater than or equal to Geometric Mean." }
  ],
  // Mock Test 11
  [
    { question: "If $A$ is a symmetric matrix, then $A^T$ equals:", options: ["$A$", "$-A$", "$I$", "$A^{-1}$"], correctAnswer: 0, explanation: "For a symmetric matrix, $A^T = A$." }
  ],
  // Mock Test 12
  [
    { question: "The minimum value of $x + \\frac{1}{x}$ for $x > 0$ is:", options: ["2", "1", "0", "$-2$"], correctAnswer: 0, explanation: "By AM-GM inequality, $(x + 1/x)/2 \\ge \\sqrt{x(1/x)} = 1$, so min is 2." }
  ],
  // Mock Test 13
  [
    { question: "What is the sum of the coefficients of the polynomial $(x-1)^n$?", options: ["0", "1", "$2^n$", "$n!$"], correctAnswer: 0, explanation: "Substitute $x=1$ to find the sum of coefficients, giving $(1-1)^n = 0$." }
  ],
  // Mock Test 14
  [
    { question: "For what values of $k$ will the equations $x+y+z=1$, $x+2y+3z=1$, $x+3y+kz=1$ have no solution?", options: ["$k=5$", "$k=0$", "$k=1$", "$k=-1$"], correctAnswer: 0, explanation: "The determinant of the coefficient matrix must be 0 for no unique solution, resolving to $k=5$." }
  ],
  // Mock Test 15
  [
    { question: "If $\\alpha, \\beta$ are the roots of $x^2 - 5x + 6 = 0$, then the quadratic equation with roots $\\alpha^2, \\beta^2$ is:", options: ["$x^2 - 13x + 36 = 0$", "$x^2 - 25x + 36 = 0$", "$x^2 + 13x + 36 = 0$", "$x^2 - 36x + 13 = 0$"], correctAnswer: 0, explanation: "Roots are 2 and 3. Squares are 4 and 9. Sum = 13, Product = 36." }
  ],
  // Mock Test 16
  [
    { question: "The discriminant of the cubic $x^3 + qx + r = 0$ is proportional to:", options: ["$4q^3 + 27r^2$", "$q^3 + r^2$", "$27q^3 + 4r^2$", "$q^2 + r^3$"], correctAnswer: 0, explanation: "The standard discriminant for $x^3+px+q=0$ is proportional to $4q^3 + 27r^2$." }
  ],
  // Mock Test 17
  [
    { question: "If a polynomial equation with real coefficients has a root $a+ib$, it must also have a root:", options: ["$a-ib$", "$-a+ib$", "$-a-ib$", "$1/(a+ib)$"], correctAnswer: 0, explanation: "Complex roots of polynomials with real coefficients appear in conjugate pairs." }
  ],
  // Mock Test 18
  [
    { question: "If $A$ and $B$ are square matrices of the same order, then $(AB)^T$ is equal to:", options: ["$B^T A^T$", "$A^T B^T$", "$A B^T$", "$A^T B$"], correctAnswer: 0, explanation: "By the reversal law of transposes." }
  ],
  // Mock Test 19
  [
    { question: "The rank of a non-zero skew-symmetric matrix over reals is always:", options: ["Even", "Odd", "1", "Depends on the matrix"], correctAnswer: 0, explanation: "The rank of a real skew-symmetric matrix is always an even number." }
  ],
  // Mock Test 20
  [
    { question: "A polynomial of odd degree with real coefficients must have at least how many real roots?", options: ["1", "0", "2", "3"], correctAnswer: 0, explanation: "Complex roots occur in pairs, so an odd degree polynomial must have at least one real root." }
  ]
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

export function generateQuestionSet(topic: string, count: number = 30, mockIndex: number = 0) {
  let pool = DEFAULT_POOL;
  if (topic === "Real Analysis") {
    if (mockIndex === 0) pool = REAL_ANALYSIS_POOL;
    else if (mockIndex === 1) pool = REAL_ANALYSIS_POOL_2;
    else pool = REAL_ANALYSIS_POOL_3;
  } else if (topic === "Classical Algebra") {
    const specificQuestions = CLASSICAL_ALGEBRA_POOLS[mockIndex % 20] || [];
    pool = [...specificQuestions, ...DEFAULT_POOL];
  }

  
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
    questions: (topic === "Real Analysis" && i > 2) ? [] : generateQuestionSet(topic, 30, i)
  }));
}
