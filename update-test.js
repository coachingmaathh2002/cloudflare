const fs = require('fs');

const newQuestions = [
  {
    "question": "If the differential equation $(2x + 3y)dx + (3x + 4y)dy = 0$ is exact, what is its general solution?",
    "options": ["$x^2 + 3xy + 2y^2 = C$", "$x^2 + 2xy + 3y^2 = C$", "$2x^2 + 3xy + y^2 = C$", "$x^2 + 3xy + y^2 = C$"],
    "correctAnswer": 0,
    "explanation": "Check exactness: $M = 2x+3y$, $N = 3x+4y$. $\\frac{\\partial M}{\\partial y} = 3 = \\frac{\\partial N}{\\partial x}$, so exact. Integrate $M$ w.r.t. $x$: $\\int (2x+3y)dx = x^2 + 3xy + g(y)$. Differentiate w.r.t. $y$: $3x + g'(y) = N = 3x+4y$, so $g'(y) = 4y$ and $g(y) = 2y^2$. General solution: $x^2 + 3xy + 2y^2 = C$."
  },
  {
    "question": "The integrating factor for the first-order linear differential equation $\\frac{dy}{dx} - \\frac{2}{x}y = x^2 \\sin x$ is:",
    "options": ["$x^{-2}$", "$x^2$", "$e^{-2/x}$", "$e^{2/x}$"],
    "correctAnswer": 0,
    "explanation": "The standard form is $y' + P(x)y = Q(x)$ with $P(x) = -\\frac{2}{x}$. The integrating factor is $\\mu(x) = e^{\\int P(x)dx} = e^{\\int -\\frac{2}{x}dx} = e^{-2\\ln|x|} = x^{-2}$."
  },
  {
    "question": "The equation $\\frac{dy}{dx} + y = xy^3$ is a Bernoulli equation. Which substitution linearizes it?",
    "options": ["$v = y^{-2}$", "$v = y^2$", "$v = y^{-1}$", "$v = y^3$"],
    "correctAnswer": 0,
    "explanation": "For Bernoulli equation $y' + P(x)y = Q(x)y^n$ with $n=3$, the linearizing substitution is $v = y^{1-n} = y^{-2}$."
  },
  {
    "question": "The general solution of Clairaut's equation $y = xy' + (y')^2$ is:",
    "options": ["$y = Cx + C^2$", "$y = Cx - C^2$", "$y = Cx^2 + C$", "$y = Cx + 1/C$"],
    "correctAnswer": 0,
    "explanation": "Clairaut's equation has the form $y = xp + f(p)$ with $p = y'$. Its general solution is obtained by replacing $p$ with an arbitrary constant $C$: $y = Cx + f(C)$. Here $f(p) = p^2$, so $y = Cx + C^2$."
  },
  {
    "question": "Which of the following is Lagrange's equation?",
    "options": ["$y = x(y')^2 + (y')^3$", "$y = (y')x + \\sin x$", "$y = x^2 y' + (y')^2$", "$y = x y' + \\ln(y')$"],
    "correctAnswer": 0,
    "explanation": "Lagrange's equation is of the form $y = x\\phi(p) + \\psi(p)$ where $p = y'$, with $\\phi(p) \\neq p$. Option (A) has $\\phi(p)=p^2$, $\\psi(p)=p^3$, so it is Lagrange. Option (B) contains $\\sin x$, not solely a function of $p$. Option (C) has $x^2$ instead of $x$. Option (D) is Clairaut's equation ($\\phi(p)=p$)."
  },
  {
    "question": "Solve the first-order linear IVP: $\\frac{dy}{dx} + y \\tan x = \\sec x$, $y(0) = 0$.",
    "options": ["$y = \\sin x$", "$y = \\cos x$", "$y = \\tan x$", "$y = \\sec x$"],
    "correctAnswer": 0,
    "explanation": "Integrating factor: $\\mu(x) = e^{\\int \\tan x\\,dx} = \\sec x$. Multiply: $\\frac{d}{dx}(y\\sec x) = \\sec^2 x$. Integrate: $y\\sec x = \\tan x + C$. Using $y(0)=0$ gives $0 = 0 + C$, so $C=0$. Thus $y = \\sin x$."
  },
  {
    "question": "Which of the following differential equations is homogeneous (of degree 0)?",
    "options": ["$\\frac{dy}{dx} = \\frac{x+y}{x-y}$", "$\\frac{dy}{dx} = \\frac{x^2+y}{x}$", "$\\frac{dy}{dx} = \\frac{x+y^2}{xy}$", "$\\frac{dy}{dx} = \\frac{\\sin x + y}{x}$"],
    "correctAnswer": 0,
    "explanation": "A first-order ODE $\\frac{dy}{dx} = f(x,y)$ is homogeneous if $f(tx,ty) = f(x,y)$ for all $t$. For (A), $\\frac{tx+ty}{tx-ty} = \\frac{x+y}{x-y}$, so homogeneous. The others do not satisfy this property."
  },
  {
    "question": "The complementary function (CF) of the higher-order linear ODE $y''' - 3y'' + 3y' - y = 0$ is:",
    "options": ["$(C_1 + C_2 x + C_3 x^2)e^x$", "$C_1 e^x + C_2 e^{-x} + C_3$", "$(C_1 + C_2 x)e^x + C_3 e^{-x}$", "$C_1 e^x + C_2 \\cos x + C_3 \\sin x$"],
    "correctAnswer": 0,
    "explanation": "The auxiliary equation is $r^3 - 3r^2 + 3r - 1 = (r-1)^3 = 0$, giving a triple root $r=1$. The CF is therefore $(C_1 + C_2 x + C_3 x^2)e^x$."
  },
  {
    "question": "The appropriate form of the particular integral (PI) for $y'' + y = \\sin x$ using undetermined coefficients is:",
    "options": ["$x(A\\sin x + B\\cos x)$", "$A\\sin x + B\\cos x$", "$Ax\\sin x$", "$Ax\\cos x$"],
    "correctAnswer": 0,
    "explanation": "The CF is $y_c = C_1 \\cos x + C_2 \\sin x$. Since $\\sin x$ is part of the CF, the PI must be multiplied by $x$: $y_p = x(A\\sin x + B\\cos x)$."
  },
  {
    "question": "The general solution of the Cauchy–Euler equation $x^2 y'' - xy' + y = 0$ for $x > 0$ is:",
    "options": ["$y = (C_1 + C_2 \\ln x)x$", "$y = C_1 x + C_2 x^{-1}$", "$y = C_1 x^2 + C_2 x^{-1}$", "$y = C_1 \\cos(\\ln x) + C_2 \\sin(\\ln x)$"],
    "correctAnswer": 0,
    "explanation": "Assume $y = x^m$. Substituting gives $m(m-1) - m + 1 = m^2 - 2m + 1 = (m-1)^2 = 0$, so $m=1$ is a double root. The general solution is $y = (C_1 + C_2 \\ln x)x$."
  },
  {
    "question": "The Wronskian of $f(x) = e^x \\cos x$ and $g(x) = e^x \\sin x$ is:",
    "options": ["$e^{2x}$", "$e^x$", "$2e^{2x}$", "$0$"],
    "correctAnswer": 0,
    "explanation": "$W(f,g) = \\begin{vmatrix} e^x\\cos x & e^x\\sin x \\\\ e^x\\cos x - e^x\\sin x & e^x\\sin x + e^x\\cos x \\end{vmatrix} = e^{2x}(\\cos x\\sin x + \\cos^2 x - \\sin x\\cos x + \\sin^2 x) = e^{2x}$."
  },
  {
    "question": "Consider the IVP $\\frac{dy}{dx} = \\sqrt{y}$, $y(0) = 0$. Which statement is true?",
    "options": ["A solution exists but is not unique", "No solution exists", "A unique solution exists", "Infinite solutions exist only for $x > 0$"],
    "correctAnswer": 0,
    "explanation": "$f(x,y)=\\sqrt{y}$ is continuous at $(0,0)$, so a solution exists. However, $\\frac{\\partial f}{\\partial y} = \\frac{1}{2\\sqrt{y}}$ is not continuous at $y=0$, so uniqueness is not guaranteed. Indeed, $y=0$ and $y=(x/2)^2$ (for $x \\ge 0$) both satisfy the IVP."
  },
  {
    "question": "An integrating factor of the form $\\mu(x)$ for the differential equation $(x^2 + y^2)dx - 2xy\\,dy = 0$ is:",
    "options": ["$1/x^2$", "$1/x$", "$1/y^2$", "$x$"],
    "correctAnswer": 0,
    "explanation": "$M = x^2+y^2$, $N = -2xy$. $\\frac{\\partial M}{\\partial y} - \\frac{\\partial N}{\\partial x} = 2y - (-2y) = 4y$. Then $\\frac{M_y - N_x}{N} = \\frac{4y}{-2xy} = -\\frac{2}{x}$. Integrating factor: $\\mu(x) = e^{\\int -\\frac{2}{x}dx} = x^{-2} = 1/x^2$."
  },
  {
    "question": "The general solution of the Bernoulli equation $\\frac{dy}{dx} + y = y^2$ is:",
    "options": ["$y = \\frac{1}{1+Ce^x}$", "$y = \\frac{Ce^x}{1+Ce^x}$", "$y = \\frac{1}{Ce^{-x}-1}$", "$y = \\frac{1}{1-Ce^x}$"],
    "correctAnswer": 0,
    "explanation": "Rewrite as $y^{-2}y' + y^{-1} = 1$. Let $v = y^{-1}$, then $v' = -y^{-2}y'$, giving $-v' + v = 1$ or $v' - v = -1$. Integrating factor $e^{-x}$: $\\frac{d}{dx}(ve^{-x}) = -e^{-x} \\Rightarrow ve^{-x} = e^{-x} + C \\Rightarrow v = 1 + Ce^x$. Thus $y = \\frac{1}{1+Ce^x}$."
  },
  {
    "question": "The singular solution of Clairaut's equation $y = xy' - (y')^2$ is:",
    "options": ["$y = x^2/4$", "$y = -x^2/4$", "$y = x^2/2$", "$y = -x^2/2$"],
    "correctAnswer": 0,
    "explanation": "Let $p = y'$. Differentiate $y = xp - p^2$ w.r.t. $x$: $p = p + x\\frac{dp}{dx} - 2p\\frac{dp}{dx} \\Rightarrow (x-2p)\\frac{dp}{dx}=0$. Setting $\\frac{dp}{dx}=0$ gives general solution $y = Cx - C^2$. Setting $x = 2p$ gives $p = x/2$, and singular solution $y = x(x/2) - (x/2)^2 = x^2/4$."
  },
  {
    "question": "In solving Lagrange's equation $y = x(1+y') + (y')^2$, differentiating and treating $p = y'$ as independent variable yields a linear differential equation in:",
    "options": ["$dp/dx$ as a function of $p$", "$dx/dp$ as a function of $p$", "$dy/dp$ as a function of $p$", "$dp/dy$ as a function of $y$"],
    "correctAnswer": 1,
    "explanation": "For Lagrange's equation $y = x\\phi(p) + \\psi(p)$, differentiating gives a first-order ODE that, after inverting $dp/dx$, becomes linear in $x$ as a function of $p$: $\\frac{dx}{dp} + \\left(\\frac{\\phi'(p)}{\\phi(p)-p}\\right)x = \\frac{\\psi'(p)}{p-\\phi(p)}$."
  },
  {
    "question": "For $y'' - 4y' + 4y = e^{2x}\\ln x$, the Wronskian of the fundamental set of solutions of the homogeneous equation is:",
    "options": ["$e^{4x}$", "$e^{2x}$", "$2e^{4x}$", "$e^{-2x}$"],
    "correctAnswer": 0,
    "explanation": "The homogeneous equation has characteristic equation $r^2-4r+4=0$, so $r=2,2$. Fundamental solutions: $y_1 = e^{2x}$, $y_2 = xe^{2x}$. $W = \\begin{vmatrix} e^{2x} & xe^{2x} \\\\ 2e^{2x} & e^{2x}+2xe^{2x} \\end{vmatrix} = e^{4x}$."
  },
  {
    "question": "For which initial condition does the IVP $y' = y^{2/5}$ guarantee a unique solution?",
    "options": ["$y_0 \\neq 0$", "$y_0 = 0$ only", "Any $y_0$", "$y_0 > 0$ only"],
    "correctAnswer": 0,
    "explanation": "$f(y)=y^{2/5}$ is continuous everywhere, so existence is guaranteed. $f'(y)=\\frac{2}{5}y^{-3/5}$ is discontinuous at $y=0$, so the Lipschitz condition fails there. Uniqueness is guaranteed when $y_0 \\neq 0$."
  },
  {
    "question": "The complementary function of the Cauchy–Euler equation $x^2 y'' - 2xy' + 2y = 0$ is:",
    "options": ["$C_1 x + C_2 x^2$", "$C_1 x^2 + C_2 x^{-1}$", "$C_1 \\cos(\\ln x) + C_2 \\sin(\\ln x)$", "$C_1 e^x + C_2 e^{2x}$"],
    "correctAnswer": 0,
    "explanation": "Substitute $y = x^m$: $m(m-1) - 2m + 2 = m^2 - 3m + 2 = (m-1)(m-2) = 0$. Roots $m=1,2$. CF: $y = C_1 x + C_2 x^2$."
  },
  {
    "question": "If $y_1 = \\sin x$ and $y_2 = \\cos x$ are solutions of $y''+y=0$, their Wronskian is:",
    "options": ["$-1$", "$1$", "$\\sin 2x$", "$0$"],
    "correctAnswer": 0,
    "explanation": "$W(\\sin x, \\cos x) = \\begin{vmatrix} \\sin x & \\cos x \\\\ \\cos x & -\\sin x \\end{vmatrix} = -\\sin^2 x - \\cos^2 x = -1$."
  },
  {
    "question": "An integrating factor for the differential equation $(x^2+y^2+x)dx + xy\\,dy = 0$ is:",
    "options": ["$x$", "$y$", "$1/x$", "$1/y$"],
    "correctAnswer": 0,
    "explanation": "$M=x^2+y^2+x$, $N=xy$. $\\frac{M_y - N_x}{N} = \\frac{2y - y}{xy} = \\frac{1}{x}$. Integrating factor $\\mu(x) = e^{\\int \\frac{1}{x}dx} = x$. Multiplying by $x$ makes the equation exact."
  },
  {
    "question": "Using variation of parameters, a particular integral of $y'' + y = \\sec x$ is:",
    "options": ["$x\\sin x + \\cos x \\ln|\\cos x|$", "$\\sin x \\ln|\\cos x| + x\\cos x$", "$x\\sin x - \\cos x \\ln|\\sin x|$", "$\\cos x \\ln|\\sec x| - \\sin x$"],
    "correctAnswer": 0,
    "explanation": "CF: $y_1=\\cos x$, $y_2=\\sin x$, $W=1$. $u_1 = -\\int y_2 \\sec x\\,dx = -\\int \\tan x\\,dx = \\ln|\\cos x|$. $u_2 = \\int y_1 \\sec x\\,dx = \\int 1\\,dx = x$. PI: $y_p = u_1 y_1 + u_2 y_2 = \\cos x \\ln|\\cos x| + x\\sin x$."
  },
  {
    "question": "The substitution $y = vx$ reduces the homogeneous equation $x^2 dy = (x^2 + y^2)dx$ to:",
    "options": ["$v' = 1/x$", "$x v' = 1 + v^2 - v$", "$x v' = 1 - v$", "$v' = v^2/x$"],
    "correctAnswer": 1,
    "explanation": "$\\frac{dy}{dx} = 1 + \\frac{y^2}{x^2} = 1 + v^2$. With $y = vx$, $y' = v + xv'$, so $v + xv' = 1 + v^2 \\Rightarrow xv' = 1 + v^2 - v$."
  },
  {
    "question": "The complementary function of $y'' + 2y' + 5y = 0$ is:",
    "options": ["$e^{-x}(C_1 \\cos 2x + C_2 \\sin 2x)$", "$e^{x}(C_1 \\cos 2x + C_2 \\sin 2x)$", "$C_1 e^{-x} + C_2 e^{-5x}$", "$e^{-2x}(C_1 \\cos x + C_2 \\sin x)$"],
    "correctAnswer": 0,
    "explanation": "Auxiliary equation: $r^2+2r+5=0$ gives $r = -1 \\pm 2i$. The CF is $e^{-x}(C_1 \\cos 2x + C_2 \\sin 2x)$."
  },
  {
    "question": "The IVP $x y' + 2y = 4x^2$, $y(1)=2$ has a unique solution on the interval:",
    "options": ["$(0, \\infty)$", "$(-\\infty, \\infty)$", "$(-\\infty, 0)$", "$(1, \\infty)$"],
    "correctAnswer": 0,
    "explanation": "Rewrite as $y' + \\frac{2}{x}y = 4x$. $P(x)=2/x$ is continuous on $(-\\infty,0)$ and $(0,\\infty)$. The initial point $x_0=1$ lies in $(0,\\infty)$, so the unique solution exists on $(0,\\infty)$."
  },
  {
    "question": "The general solution of the Cauchy–Euler equation $x^2 y'' + 3xy' + y = 0$, $x>0$, is:",
    "options": ["$y = C_1 x^{-1} + C_2 x^{-1} \\ln x$", "$y = C_1 x + C_2 x^{-1}$", "$y = C_1 \\cos(\\ln x) + C_2 \\sin(\\ln x)$", "$y = C_1 x^{-2} + C_2 x^{-1}$"],
    "correctAnswer": 0,
    "explanation": "Substituting $y = x^m$: $m(m-1)+3m+1 = m^2+2m+1 = (m+1)^2=0$. Double root $m=-1$. General solution: $y = (C_1 + C_2 \\ln x)x^{-1}$."
  },
  {
    "question": "To solve $2xy\\frac{dy}{dx} + y^2 = x$, the substitution $v = y^2$ transforms it into:",
    "options": ["$x \\frac{dv}{dx} + v = x$", "$x \\frac{dv}{dx} - v = x$", "$2x \\frac{dv}{dx} + v = x$", "$x \\frac{dv}{dx} + 2v = x$"],
    "correctAnswer": 0,
    "explanation": "Let $v = y^2$, so $\\frac{dv}{dx} = 2y\\frac{dy}{dx}$. The equation $2xyy' + y^2 = x$ becomes $x v' + v = x$."
  },
  {
    "question": "The differential equation $y = 2xy' - \\ln y'$ is classified as:",
    "options": ["Clairaut's equation", "Lagrange's equation", "Bernoulli's equation", "Cauchy–Euler equation"],
    "correctAnswer": 1,
    "explanation": "The equation is of the form $y = x\\phi(p) + \\psi(p)$ with $\\phi(p)=2p$, $\\psi(p)=-\\ln p$, and $\\phi(p)\\neq p$. This is Lagrange's equation. Clairaut's equation is the special case $\\phi(p)=p$."
  },
  {
    "question": "By Abel's formula, the Wronskian $W$ of two solutions of $y'' + p(x)y' + q(x)y = 0$ satisfies $W' + p(x)W = 0$. If $p(x) = 2/x$, then $W(x)$ is proportional to:",
    "options": ["$x^{-2}$", "$x^2$", "$e^{-2/x}$", "$e^{2/x}$"],
    "correctAnswer": 0,
    "explanation": "$W = C \\exp\\left(-\\int p(x)dx\\right) = C \\exp\\left(-\\int \\frac{2}{x}dx\\right) = C x^{-2}$. So $W \\propto x^{-2}$."
  },
  {
    "question": "The appropriate form of the particular integral for $y'' - 3y' + 2y = e^x \\sin x$ using undetermined coefficients is:",
    "options": ["$e^x (A \\sin x + B \\cos x)$", "$x e^x (A \\sin x + B \\cos x)$", "$e^{2x} (A \\sin x + B \\cos x)$", "$A e^x \\sin x$"],
    "correctAnswer": 0,
    "explanation": "The characteristic equation $r^2-3r+2=0$ has roots $r=1,2$. The right-hand side is $e^{x}\\sin x$ ($\\alpha=1$, $\\beta=1$). Since $\\alpha + i\\beta = 1+i$ is not a root, there is no resonance. The PI form is $e^x(A\\sin x + B\\cos x)$."
  }
];

const targetFile = './src/pages/FreeDailyTest.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

const regex = /const DAILY_TEST = \{[\s\S]*?\n\};\n/;

const replacement = `const DAILY_TEST = {
  id: 'daily_slst_math',
  title: 'SLST Math Free Daily Test - ' + new Date().toLocaleDateString(),
  duration: 2700, // 45 minutes
  totalQuestions: 30,
  questions: ${JSON.stringify(newQuestions, null, 2)}
};\n`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('Successfully updated the questions');
} else {
  console.error('Failed to find DAILY_TEST block');
}
