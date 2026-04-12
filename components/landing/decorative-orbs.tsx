"use client";

export const DecorativeOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
    <div className="bg-signal absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[120px]" />
    <div className="bg-mint absolute top-1/2 -right-40 h-80 w-80 rounded-full blur-[100px]" />
    <div className="bg-lavender absolute -bottom-40 left-1/2 h-96 w-96 rounded-full blur-[120px]" />
  </div>
);
