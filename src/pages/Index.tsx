import React, { useState } from 'react';
import { MobileContainer } from '@/components/ui/mobile-container';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { HomeScreen } from '@/screens/HomeScreen';
import { AddServiceScreen } from '@/screens/AddServiceScreen';
import { AnalyticsScreen } from '@/screens/AnalyticsScreen';
import { TabValue } from '@/types/service';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'add':
        return <AddServiceScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileContainer>
        <main className="min-h-screen">
          {renderScreen()}
        </main>
        
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </MobileContainer>
    </div>
  );
};

export default Index;
