"use client";

import { useEffect, useState, useRef } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
  const [showBanner, setShowBanner] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (sessionStorage.getItem("pwa-banner-dismissed")) return;

    const visits = parseInt(localStorage.getItem("pwa-visits") || "0", 10) + 1;
    localStorage.setItem("pwa-visits", String(visits));

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      if (!dismissedRef.current) {
        setShowBanner(true);
      }
    };

    const installedHandler = () => {
      setShowBanner(false);
      deferredPrompt.current = null;
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    } else {
      dismissedRef.current = true;
      sessionStorage.setItem("pwa-banner-dismissed", "1");
      setShowBanner(false);
    }
    deferredPrompt.current = null;
  };

  const handleDismiss = () => {
    dismissedRef.current = true;
    sessionStorage.setItem("pwa-banner-dismissed", "1");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 flex items-center justify-between gap-3 animate-slide-up"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src="/icons/icon-192x192.png"
          alt=""
          className="w-10 h-10 rounded-xl flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            Add LucidLibs Tools to Home Screen
          </p>
          <p className="text-xs text-gray-500 truncate">
            Quick access to all tools, anytime
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDismiss}
          className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
          aria-label="Not now"
        >
          Later
        </button>
        <button
          onClick={handleInstall}
          className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Install
        </button>
      </div>
    </div>
  );
}
