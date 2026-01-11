"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redireciona para a página HTML pura
    window.location.href = "/landing.html";
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
    </div>
  );
}
