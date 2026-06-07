"use client";

import { useEffect, useState } from "react";

export const PRIVACY_MODE_STORAGE_KEY = "nvs:privacy-mode";
const PRIVACY_MODE_EVENT = "nvs:privacy-mode-change";

function readPrivacyMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(PRIVACY_MODE_STORAGE_KEY) === "on";
}

export function usePrivacyMode() {
  const [privacyMode, setPrivacyModeState] = useState(false);
  const [privacyModeReady, setPrivacyModeReady] = useState(false);

  useEffect(() => {
    setPrivacyModeState(readPrivacyMode());
    setPrivacyModeReady(true);

    function syncPrivacyMode() {
      setPrivacyModeState(readPrivacyMode());
    }

    window.addEventListener("storage", syncPrivacyMode);
    window.addEventListener(PRIVACY_MODE_EVENT, syncPrivacyMode);

    return () => {
      window.removeEventListener("storage", syncPrivacyMode);
      window.removeEventListener(PRIVACY_MODE_EVENT, syncPrivacyMode);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("privacy-mode-active", privacyMode);
  }, [privacyMode]);

  function setPrivacyMode(enabled: boolean) {
    window.localStorage.setItem(PRIVACY_MODE_STORAGE_KEY, enabled ? "on" : "off");
    window.dispatchEvent(new Event(PRIVACY_MODE_EVENT));
  }

  return { privacyMode, privacyModeReady, setPrivacyMode };
}
