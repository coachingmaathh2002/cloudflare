import React, { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function SecurityGuard({ children }: { children: React.ReactNode }) {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isScreenHidden, setIsScreenHidden] = useState<boolean>(false);

  useEffect(() => {
    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning("🛡️ Right-Click & Content Copying are Disabled for Copyright Protection.");
    };

    // 2. Keyboard Shortcuts Protection (PrintScreen, F12, DevTools, Ctrl+P, Mac Screenshots)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // PrintScreen Key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        try {
          navigator.clipboard.writeText("Content Protected by Raj Sir Math Classes");
        } catch (err) {
          // ignore
        }
        triggerWarning("🚫 Screenshot Captured Blocked! Watermark and Copyright Protection Active.");
        setIsScreenHidden(true);
        setTimeout(() => setIsScreenHidden(false), 2500);
        return;
      }

      // macOS Screenshot shortcuts: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (isMac && e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        triggerWarning("🚫 macOS Screenshot Shortcut Blocked!");
        setIsScreenHidden(true);
        setTimeout(() => setIsScreenHidden(false), 2500);
        return;
      }

      // F12 or DevTools: Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === "F12" ||
        (cmdOrCtrl && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(e.key)) ||
        (cmdOrCtrl && ["u", "U"].includes(e.key))
      ) {
        e.preventDefault();
        triggerWarning("🔒 Developer Tools & Source Inspection are Disabled.");
        return;
      }

      // Print & Save: Ctrl+P / Cmd+P, Ctrl+S / Cmd+S
      if (cmdOrCtrl && ["p", "P", "s", "S"].includes(e.key)) {
        e.preventDefault();
        triggerWarning("🖨️ Printing or Saving Page is Disabled.");
        return;
      }
    };

    // 3. Screen Recording / Window Focus Lost Shield
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsScreenHidden(true);
      } else {
        // Small delay to restore smoothly
        setTimeout(() => setIsScreenHidden(false), 300);
      }
    };

    const handleBlur = () => {
      // When window loses focus (e.g. snippet tool opened)
      setIsScreenHidden(true);
    };

    const handleFocus = () => {
      setIsScreenHidden(false);
    };

    // Attach event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const triggerWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage(null);
    }, 4000);
  };

  return (
    <div className="relative w-full min-h-screen protected-content select-none">
      {/* Dynamic Watermark Grid */}
      <div className="fixed inset-0 watermark-overlay pointer-events-none z-40 opacity-70"></div>

      {/* Main Application Content */}
      <div className={isScreenHidden ? "blur-xl transition-all duration-200 pointer-events-none" : "transition-all duration-200"}>
        {children}
      </div>

      {/* Blackout Shield Overlay when Screen Recording / Snipper / Focus is active */}
      {isScreenHidden && (
        <div className="fixed inset-0 z-50 bg-[#0a0b0e]/98 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 select-none animate-in fade-in duration-150">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_50px_rgba(240,144,56,0.3)] animate-pulse">
            <EyeOff className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            🛡️ SECURITY PROTECTION ACTIVE
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
            Content is hidden while screen capture, screenshot tool, or external recording window is active.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-amber-300">
            <Lock className="w-4 h-4 text-amber-400" />
            Raj Sir Math Classes • Anti-Piracy Protection
          </div>
        </div>
      )}

      {/* Toast Notification Warning Popup */}
      {warningMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] bg-slate-900/95 border border-amber-500/40 text-amber-200 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
          <div className="text-xs font-semibold leading-snug">
            {warningMessage}
          </div>
        </div>
      )}

      {/* Small subtle active protection indicator at bottom corner */}
      <div className="fixed bottom-3 left-3 z-30 pointer-events-none hidden sm:flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-400 backdrop-blur-md opacity-75">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Anti-Screen Capture Active</span>
      </div>
    </div>
  );
}
