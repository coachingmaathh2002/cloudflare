import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, XCircle, Clock, ChevronRight, ChevronLeft, ArrowLeft, PlayCircle, Lock, User, Phone, MapPin, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MixedLatex } from '../components/LatexRenderer';
import { useSEO } from '../lib/useSEO';

const DAILY_TEST = {
  id: 'daily_slst_math',
  title: 'SLST Math Free Daily Test - ' + new Date().toLocaleDateString(),
  duration: 2700, // 45 minutes
  totalQuestions: 30,
  questions: [
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
  ]
};

type ViewState = 'registration' | 'details' | 'test' | 'results';

export default function FreeDailyTest() {
  const [viewState, setViewState] = useState<ViewState>('registration');

  useSEO(
    "Free Daily Math Mock Test | SLST, JEE & WBJEE",
    "Participate in our free daily mathematics mock tests for SLST and JEE Mains. Solve 30 challenging equations, view instant score reports, and access detailed explanation guides."
  );
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('dailyTestRegistration');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { name: parsed.name || '', mobile: parsed.mobile || '', district: parsed.district || '', code: '' };
      } catch (e) {
        return { name: '', mobile: '', district: '', code: '' };
      }
    }
    return { name: '', mobile: '', district: '', code: '' };
  });
  const [error, setError] = useState('');
  
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(DAILY_TEST.duration);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewState === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState, timeLeft]);

  useEffect(() => {
    if (viewState === 'test' && timeLeft <= 0) {
      handleFinishTest();
    }
  }, [timeLeft, viewState]);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.mobile || !formData.district || !formData.code) {
      setError('Please fill all fields');
      return;
    }
    
    if (formData.code !== 'test@547') {
      setError('Invalid test code. Please check your spelling.');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('dailyTestRegistration', JSON.stringify({
      name: formData.name,
      mobile: formData.mobile,
      district: formData.district
    }));
    
    // We will save to Google Sheets only when the test is finished to avoid two rows per student
    
    setViewState('details');
  };

  const handleStartTest = () => {
    setViewState('test');
    setTimeLeft(DAILY_TEST.duration);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitting(false);
    hasSubmittedRef.current = false;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < DAILY_TEST.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishTest = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);
    
    let newScore = 0;
    DAILY_TEST.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    
    // Save score to Google Sheets
    const GOOGLE_SHEET_URL = (import.meta as any).env?.VITE_GOOGLE_SHEET_URL || "https://script.google.com/macros/s/AKfycbx2MAFZ0nlbrNjYcaG-hhaV8k6pdkPFVC_VFhJKy7efKu9G7OvWY2f2nWPJC3GnFiyooQ/exec";
    if (GOOGLE_SHEET_URL) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('mobile', formData.mobile);
      data.append('district', formData.district);
      data.append('score', newScore.toString());
      data.append('totalQuestions', DAILY_TEST.totalQuestions.toString());
      data.append('timestamp', new Date().toLocaleString());
      data.append('status', 'Completed Test');
      
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      }).catch(err => console.error('Failed to sync score with Google Sheets', err));
    }

    setViewState('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {viewState !== 'test' && (
          <Link to="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-bold uppercase text-xs tracking-widest mb-8 transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> Back Home
          </Link>
        )}

        <AnimatePresence mode="wait">
          {viewState === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <Lock className="h-8 w-8 text-slate-900" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase">Unlock Daily Free Test</h1>
                <p className="text-slate-300 max-w-lg mx-auto">Please enter your details and the secret code to access today's free SLST Math test.</p>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="max-w-md mx-auto space-y-5 relative z-10">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 focus:border-green-400/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 focus:border-green-400/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="District Name"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 focus:border-green-400/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                  <input
                    type="text"
                    placeholder="Test Code (e.g., test@547)"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full bg-slate-900/80 border border-green-500/30 focus:border-green-400 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20 font-medium">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-slate-900 font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] hover:-translate-y-1 mt-6"
                >
                  Verify & Continue
                </button>
              </form>
            </motion.div>
          )}

          {viewState === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Target className="h-10 w-10 text-slate-900" />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">{DAILY_TEST.title}</h2>
              <p className="text-emerald-400 font-bold mb-8 uppercase tracking-widest text-sm">Welcome, {formData.name}</p>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
                <div className="bg-slate-900/80 px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Questions</p>
                    <p className="text-lg font-black text-white">{DAILY_TEST.totalQuestions}</p>
                  </div>
                </div>
                <div className="bg-slate-900/80 px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Duration</p>
                    <p className="text-lg font-black text-white">{DAILY_TEST.duration / 60} mins</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 mb-10 text-left max-w-2xl mx-auto">
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Instructions</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Each question carries 1 mark. There is no negative marking in this free test.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>You cannot pause the test once started. Ensure you have stable internet.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>The test will auto-submit when the timer reaches zero.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-900 font-black py-4 px-12 rounded-xl text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_rgba(52,211,153,0.6)] hover:-translate-y-1 inline-flex items-center gap-3"
              >
                <PlayCircle className="h-6 w-6" /> Start Test Now
              </button>
            </motion.div>
          )}

          {viewState === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-20 shadow-xl">
                <div>
                  <h2 className="text-white font-black text-lg sm:text-xl uppercase tracking-tight">{DAILY_TEST.title}</h2>
                  <p className="text-slate-400 text-sm font-medium">Question {currentQuestionIndex + 1} of {DAILY_TEST.totalQuestions}</p>
                </div>
                <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border font-mono text-xl font-bold transition-all ${timeLeft < 60 ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.8)] scale-105' : 'bg-slate-900 border-white/10 text-emerald-400'}`}>
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl text-white font-medium leading-relaxed">
                    <span className="font-black text-emerald-400 mr-2">Q{currentQuestionIndex + 1}.</span>
                    <MixedLatex content={DAILY_TEST.questions[currentQuestionIndex].question} />
                  </h3>
                </div>

                <div className="space-y-4 mb-10">
                  {DAILY_TEST.questions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = answers[currentQuestionIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_20px_rgba(52,211,153,0.15)]' 
                            : 'bg-slate-900/50 border-white/10 text-slate-300 hover:bg-slate-800 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-900' : 'border-slate-500'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                        </div>
                        <div className="text-base sm:text-lg"><MixedLatex content={option} /></div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <ChevronLeft className="h-5 w-5" /> Prev
                  </button>
                  
                  {currentQuestionIndex === DAILY_TEST.questions.length - 1 ? (
                    <button
                      onClick={handleFinishTest}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                    >
                      Next <ChevronRight className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto w-full relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(52,211,153,0.4)] relative z-10">
                <Target className="h-12 w-12 text-slate-900" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 uppercase tracking-tight relative z-10">Test Completed!</h2>
              <p className="text-slate-300 mb-10 relative z-10">Great effort, {formData.name}. Here is your performance summary.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 relative z-10">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/5">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Total Score</p>
                  <p className="text-4xl font-black text-emerald-400">{score}/{DAILY_TEST.totalQuestions}</p>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/5">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Accuracy</p>
                  <p className="text-4xl font-black text-blue-400">{Math.round((score/DAILY_TEST.totalQuestions)*100)}%</p>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/5">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Time Taken</p>
                  <p className="text-4xl font-black text-purple-400">{formatTime(DAILY_TEST.duration - timeLeft)}</p>
                </div>
              </div>

              <div className="space-y-6 text-left relative z-10 mt-10 border-t border-white/10 pt-10">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">Detailed Solutions</h3>
                {DAILY_TEST.questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isUnanswered = userAnswer === undefined;
                  
                  return (
                    <div key={idx} className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : isUnanswered ? 'bg-slate-900/50 border-white/10' : 'bg-red-500/10 border-red-500/30'}`}>
                      <div className="flex gap-4 items-start mb-4">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                        ) : isUnanswered ? (
                          <div className="h-6 w-6 rounded-full border-2 border-slate-500 shrink-0 mt-1"></div>
                        ) : (
                          <XCircle className="h-6 w-6 text-red-400 shrink-0 mt-1" />
                        )}
                        <div>
                          <div className="text-white font-medium mb-3"><MixedLatex content={`Q${idx+1}. ${q.question}`} /></div>
                          <div className="space-y-2 mb-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className={`p-3 rounded-lg border ${
                                optIdx === q.correctAnswer 
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                  : optIdx === userAnswer
                                    ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                    : 'bg-slate-800 border-white/5 text-slate-400'
                              }`}>
                                <MixedLatex content={opt} />
                              </div>
                            ))}
                          </div>
                          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5">
                            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-2">Explanation</p>
                            <div className="text-sm text-slate-300"><MixedLatex content={q.explanation} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
