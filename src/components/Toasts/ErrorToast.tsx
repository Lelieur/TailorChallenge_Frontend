"use client";

import { useEffect, useRef } from "react";
import { sileo } from "sileo";

export default function AuthErrorToast({ message }: { message?: string }) {
  const lastMessageRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!message) return;
    if (lastMessageRef.current === message) return;
    lastMessageRef.current = message;
    sileo.error({
      title: "Error",
      description: message,
      fill: "black",
      styles: {
        title: "text-red-500!",
        description: "text-white/75!",
      },
    });
  }, [message]);

  return null;
}
