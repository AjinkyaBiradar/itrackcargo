import React from "react";

interface BalancerProps {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Balancer({
  children,
  className = "",
  as: Component = "span",
}: BalancerProps) {
  return (
    <Component
      className={`[text-wrap:balance] ${className}`}
      style={{ textWrap: "balance" }}
    >
      {children}
    </Component>
  );
}
