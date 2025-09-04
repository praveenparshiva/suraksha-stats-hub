import React from 'react';
import { Home, Plus, BarChart3 } from 'lucide-react';
import { TabValue } from '@/types/service';

interface BottomNavigationProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

const navigationItems = [
  {
    id: 'home' as TabValue,
    label: 'Home',
    icon: Home,
  },
  {
    id: 'add' as TabValue,
    label: 'Add Service',
    icon: Plus,
  },
  {
    id: 'analytics' as TabValue,
    label: 'Analytics',
    icon: BarChart3,
  },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav">
      <div className="flex">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}