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

export function generateQuestionSet(topic: string, count: number = 30, mockIndex: number = 0) {
  let pool = DEFAULT_POOL;
  if (topic === "Real Analysis") {
    if (mockIndex === 0) pool = REAL_ANALYSIS_POOL;
    else if (mockIndex === 1) pool = REAL_ANALYSIS_POOL_2;
    else pool = REAL_ANALYSIS_POOL_3;
  } else if (topic === "Classical Algebra") {
    if (mockIndex === 0) pool = CLASSICAL_ALGEBRA_MOCK_1;
    else if (mockIndex === 1) pool = CLASSICAL_ALGEBRA_MOCK_2;
    else {
      const specificQuestions = CLASSICAL_ALGEBRA_POOLS[mockIndex % CLASSICAL_ALGEBRA_POOLS.length] || [];
      pool = specificQuestions.length > 0 ? specificQuestions : DEFAULT_POOL;
    }
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
