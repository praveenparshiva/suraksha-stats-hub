import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={`p-4 bg-gradient-card ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-card-foreground flex items-center gap-1">
              {typeof value === 'string' && value.startsWith('₹') ? (
                <>
                  <span className="text-primary text-base leading-none">₹</span>
                  <span className="leading-none">{value.slice(1)}</span>
                </>
              ) : (
                value
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center text-xs font-medium ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}>
                <span>{trend.isPositive ? '+' : ''}{trend.value}</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg -mt-1">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}