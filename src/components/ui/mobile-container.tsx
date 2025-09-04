import React from 'react';
import { cn } from '@/lib/utils';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

export function MobileContainer({ children, className, withPadding = true }: MobileContainerProps) {
  return (
    <div className={cn(
      "mobile-container",
      withPadding && "mobile-padding",
      className
    )}>
      {children}
    </div>
  );
}