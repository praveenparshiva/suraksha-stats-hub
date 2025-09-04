import React from 'react';
import { Droplets, Shield, Sparkles, CheckCircle } from 'lucide-react';

interface EnhancedHeaderProps {
  title: string;
  subtitle: string;
  showStats?: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function EnhancedHeader({ title, subtitle, showStats = false, stats = [] }: EnhancedHeaderProps) {
  return (
    <div className="bg-gradient-header text-header-text p-6 -mx-4 -mt-4 mb-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="header-decoration">
        <Droplets className="w-32 h-32" />
      </div>
      
      <div className="header-content">
        <div className="flex items-start justify-between">
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-header-subtitle" />
                  <p className="text-header-subtitle font-medium">{subtitle}</p>
                </div>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-xs font-medium text-white">Professional Service</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Droplets className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-medium text-white">Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional stats row */}
        {showStats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-header-subtitle">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}