import React, { useRef, useEffect } from 'react';
import katex from 'katex';
import { cn } from '../lib/utils';

interface LatexProps {
  children: string;
  displayMode?: boolean;
  className?: string;
  key?: React.Key;
}

export default function Latex({ children, displayMode = false, className }: LatexProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(children, containerRef.current, {
          displayMode: displayMode,
          throwOnError: false,
          strict: false,
          trust: true,
        });
      } catch (e) {
        console.error("Katex error:", e);
        containerRef.current.textContent = children;
      }
    }
  }, [children, displayMode]);

  return <span ref={containerRef} className={cn("inline-block", className)} />;
}

// Helper to render mixed text and math. Simple parser that looks for $$...$$ and $...$
export function MixedLatex({ content, className }: { content: string, className?: string }) {
  const parseMath = (text: string) => {
    const parts = [];
    let current = text;

    while (current.length > 0) {
      // Find the next math block
      const displayStart = current.indexOf('$$');
      const inlineStart = current.indexOf('$');

      if (displayStart !== -1 && (inlineStart === -1 || displayStart < inlineStart)) {
        // Display math found
        if (displayStart > 0) {
          parts.push({ type: 'text', content: current.substring(0, displayStart) });
        }
        const displayEnd = current.indexOf('$$', displayStart + 2);
        if (displayEnd !== -1) {
          parts.push({ type: 'display', content: current.substring(displayStart + 2, displayEnd) });
          current = current.substring(displayEnd + 2);
        } else {
          parts.push({ type: 'text', content: current });
          break;
        }
      } else if (inlineStart !== -1) {
        // Inline math found
        if (inlineStart > 0) {
          parts.push({ type: 'text', content: current.substring(0, inlineStart) });
        }
        const inlineEnd = current.indexOf('$', inlineStart + 1);
        if (inlineEnd !== -1) {
          parts.push({ type: 'inline', content: current.substring(inlineStart + 1, inlineEnd) });
          current = current.substring(inlineEnd + 1);
        } else {
          parts.push({ type: 'text', content: current });
          break;
        }
      } else {
        parts.push({ type: 'text', content: current });
        break;
      }
    }
    return parts;
  };

  const parsed = parseMath(content);

  return (
    <div className={cn("text-inherit leading-relaxed font-medium", className)}>
      {parsed.map((part, i) => {
        if (part.type === 'text') {
          return <span key={i} className="whitespace-pre-wrap">{part.content}</span>;
        } else if (part.type === 'display') {
          return <Latex key={i} displayMode>{part.content}</Latex>;
        } else {
          return <Latex key={i}>{part.content}</Latex>;
        }
      })}
    </div>
  );
}
