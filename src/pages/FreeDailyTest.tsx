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
    <div className="w-full flex-1 flex flex-col py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030712] text-slate-100">
      {/* Deep ambient background glows */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-blue-950/20 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {viewState !== 'test' && (
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-bold uppercase text-xs tracking-widest mb-8 transition-all bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 shadow-xl hover:border-emerald-500/40 hover:bg-slate-850">
            <ArrowLeft className="h-4 w-4 text-emerald-400" /> Back to Portal
          </Link>
        )}

        <AnimatePresence mode="wait">
          {viewState === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-[32px] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>
              
              <div className="relative z-10 text-center mb-10">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>FREE DAILY PRACTICE • SLST & WBJEE MATHEMATICS</span>
                </div>

                <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-800/90">
                  <Lock className="h-9 w-9 text-emerald-400 stroke-[2.25]" />
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight uppercase font-display">
                  Unlock Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">Free Mock Test</span>
                </h1>
                <p className="text-slate-300 font-medium max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  Enter your candidate information and secret test passcode to unlock today's timed CBT examination.
                </p>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="max-w-md mx-auto space-y-4 relative z-10">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800/90 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800/90 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="District Name"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800/90 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-500 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>

                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400/90 group-focus-within:text-amber-300 transition-colors" />
                  <input
                    type="text"
                    placeholder="Secret Test Code (e.g., test@547)"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-500 outline-none transition-all font-bold tracking-wide text-sm sm:text-base"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-300 text-xs sm:text-sm text-center bg-rose-950/40 py-2.5 px-4 rounded-xl border border-rose-800/60 font-bold"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-black py-4 rounded-xl uppercase tracking-widest text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 hover:-translate-y-0.5 mt-6 flex items-center justify-center gap-2"
                >
                  Verify Credentials & Start <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>
            </motion.div>
          )}

          {viewState === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-[32px] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>

              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-800/90">
                <Target className="h-9 w-9 text-emerald-400 stroke-[2.25]" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight font-display">
                {DAILY_TEST.title}
              </h2>
              
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 mb-8 shadow-sm">
                Candidate: {formData.name} ({formData.district})
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Target className="h-5 w-5 text-cyan-400 mb-1" />
                  <span className="text-2xl font-black text-cyan-300">{DAILY_TEST.totalQuestions}</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Questions</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Clock className="h-5 w-5 text-purple-400 mb-1" />
                  <span className="text-2xl font-black text-purple-300">{DAILY_TEST.duration / 60}m</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Duration</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-2xl font-black text-emerald-300">+1 / 0</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Marking Scheme</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <Lock className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="text-2xl font-black text-amber-300">CBT</span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">Format</span>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-6 mb-8 text-left max-w-2xl mx-auto">
                <h3 className="text-white font-black mb-4 uppercase tracking-wider text-xs border-b border-slate-800 pb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Exam Instructions & Guidelines
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>Each question carries 1 mark. There is no negative marking for incorrect choices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>The timer starts automatically upon launch. Test auto-submits when time expires.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>You can navigate back and forth between questions using the Question Palette.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-black py-4 px-10 rounded-xl text-base sm:text-lg uppercase tracking-widest transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 hover:-translate-y-0.5 inline-flex items-center gap-3"
              >
                <PlayCircle className="h-6 w-6 stroke-[2.25]" /> Launch Test Portal
              </button>
            </motion.div>
          )}

          {viewState === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-5"
            >
              {/* Sticky Exam Top Bar */}
              <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-30">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-800/80 mr-2">
                      Question {currentQuestionIndex + 1} / {DAILY_TEST.totalQuestions}
                    </span>
                    <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                      ({Object.keys(answers).length} Answered)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full sm:w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 hidden md:block">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / DAILY_TEST.totalQuestions) * 100}%` }}
                  ></div>
                </div>

                <div className={`flex items-center gap-2.5 px-5 py-2 rounded-xl border font-mono text-lg font-black transition-all ${
                  timeLeft < 300 
                    ? 'bg-rose-950/90 border-rose-600 text-rose-200 animate-pulse shadow-md' 
                    : timeLeft < 600
                      ? 'bg-amber-950/80 border-amber-600/80 text-amber-300'
                      : 'bg-slate-950 border-emerald-800/60 text-emerald-400'
                }`}>
                  <Clock className="h-5 w-5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Question Navigation Drawer Palette */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 flex flex-wrap gap-1.5 justify-center max-h-28 overflow-y-auto custom-scrollbar">
                {DAILY_TEST.questions.map((_, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = answers[idx] !== undefined;

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-black transition-all border ${
                        isCurrent
                          ? 'bg-emerald-400 text-slate-950 border-emerald-300 ring-2 ring-emerald-400/40 shadow-md scale-110'
                          : isAnswered
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Main Question Card */}
              <div className="bg-slate-900/95 border border-slate-800/90 rounded-[28px] p-6 sm:p-10 shadow-2xl relative">
                
                {/* Question Text */}
                <div className="mb-8">
                  <div className="text-lg sm:text-2xl text-white font-medium leading-relaxed bg-slate-950/90 p-5 rounded-2xl border border-slate-800">
                    <span className="font-black text-emerald-400 mr-2">Q{currentQuestionIndex + 1}.</span>
                    <MixedLatex content={DAILY_TEST.questions[currentQuestionIndex].question} />
                  </div>
                </div>

                {/* Option Cards */}
                <div className="space-y-3.5 mb-10">
                  {DAILY_TEST.questions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = answers[currentQuestionIndex] === idx;
                    const optionLabels = ["A", "B", "C", "D"];

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/30 shadow-md' 
                            : 'bg-slate-950/70 border-slate-800/80 text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 text-xs font-black transition-colors ${
                          isSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-400'
                        }`}>
                          {optionLabels[idx]}
                        </div>
                        <div className="text-base sm:text-lg pt-0.5 font-medium"><MixedLatex content={option} /></div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Footer Action Bar */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  
                  {currentQuestionIndex === DAILY_TEST.questions.length - 1 ? (
                    <button
                      onClick={handleFinishTest}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-amber-950/40 hover:scale-105"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Test Now'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/80"
                    >
                      Next <ChevronRight className="h-4 w-4" />
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
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-[32px] p-6 sm:p-12 shadow-2xl max-w-4xl mx-auto w-full relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-800/90">
                <Target className="h-10 w-10 text-emerald-400 stroke-[2.25]" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight font-display">
                Test Completed!
              </h2>
              <p className="text-slate-300 font-medium mb-8">
                Great job, <span className="text-emerald-300 font-black">{formData.name}</span>! Here is your performance evaluation.
              </p>
              
              {/* Score Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Total Score</p>
                  <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    {score} <span className="text-xl text-slate-400 font-normal">/ {DAILY_TEST.totalQuestions}</span>
                  </p>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Accuracy Rate</p>
                  <p className="text-4xl sm:text-5xl font-black text-cyan-300">
                    {Math.round((score / DAILY_TEST.totalQuestions) * 100)}%
                  </p>
                </div>

                <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center shadow-md">
                  <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-2">Time Consumed</p>
                  <p className="text-4xl sm:text-5xl font-black text-purple-300">
                    {formatTime(DAILY_TEST.duration - timeLeft)}
                  </p>
                </div>
              </div>

              {/* Detailed Solutions Section */}
              <div className="space-y-6 text-left border-t border-slate-800 pt-10">
                <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Detailed Question Solutions
                </h3>

                {DAILY_TEST.questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isUnanswered = userAnswer === undefined;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-6 rounded-2xl border transition-all ${
                        isCorrect 
                          ? 'bg-emerald-950/20 border-emerald-800/60' 
                          : isUnanswered 
                            ? 'bg-slate-950/60 border-slate-800' 
                            : 'bg-rose-950/20 border-rose-800/60'
                      }`}
                    >
                      <div className="flex gap-4 items-start">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
                        ) : isUnanswered ? (
                          <div className="h-6 w-6 rounded-full border-2 border-amber-400/80 text-amber-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-1">?</div>
                        ) : (
                          <XCircle className="h-6 w-6 text-rose-400 shrink-0 mt-1" />
                        )}

                        <div className="w-full">
                          <div className="text-white font-medium text-base sm:text-lg mb-4 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                            <span className="font-bold text-emerald-400 mr-2">Q{idx + 1}.</span>
                            <MixedLatex content={q.question} />
                          </div>

                          <div className="space-y-2 mb-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className={`p-3.5 rounded-xl border text-sm font-medium ${
                                optIdx === q.correctAnswer 
                                  ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-bold'
                                  : optIdx === userAnswer
                                    ? 'bg-rose-950/80 border-rose-500/80 text-rose-200'
                                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                              }`}>
                                <MixedLatex content={opt} />
                              </div>
                            ))}
                          </div>

                          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                            <p className="text-[11px] text-emerald-400 font-black uppercase tracking-widest mb-1.5">Explanation & Method</p>
                            <div className="text-sm text-slate-300 leading-relaxed font-medium"><MixedLatex content={q.explanation} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-800 flex justify-center">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black py-4 px-10 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg hover:scale-105"
                >
                  Return to Portal Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
