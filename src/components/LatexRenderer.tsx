import React, { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface LatexProps {
  children: string;
  displayMode?: boolean;
  className?: string;
  key?: React.Key;
}

export default function Latex({ children, displayMode = false, className }: LatexProps) {
  const [copied, setCopied] = useState(false);
  const content = displayMode ? `$$${children}$$` : `$${children}$`;

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className={cn("inline-block relative group", className)}>
      <MathJax inline={!displayMode} dynamic>{content}</MathJax>
      {displayMode && (
        <button
          onClick={handleCopy}
          className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-slate-300 hover:text-white p-1.5 rounded-lg border border-slate-700 shadow-md backdrop-blur-md"
          title="Copy LaTeX"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
    </span>
  );
}

export function MixedLatex({ content, className }: { content?: string, className?: string }) {
  if (!content) return null;
  return (
    <div className={cn("text-inherit leading-relaxed font-medium whitespace-pre-wrap tex2jax_process", className)}>
      <MathJax dynamic>{content}</MathJax>
    </div>
  );
}
