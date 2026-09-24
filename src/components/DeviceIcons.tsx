"use client";
import { Monitor, Smartphone, Tablet, Tv, Gamepad2, Watch, HelpCircle, Globe, Bot, ShieldAlert } from "lucide-react";

export function DeviceIcon({ type, className = "size-3.5" }: { type: string; className?: string }) {
  switch (type) {
    case "mobile":
      return <Smartphone className={className} />;
    case "tablet":
      return <Tablet className={className} />;
    case "smarttv":
      return <Tv className={className} />;
    case "console":
      return <Gamepad2 className={className} />;
    case "wearable":
      return <Watch className={className} />;
    case "":
      return <Monitor className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}

export function deviceLabel(type: string) {
  return type === "" ? "desktop" : type;
}

export { Globe, Bot, ShieldAlert };
