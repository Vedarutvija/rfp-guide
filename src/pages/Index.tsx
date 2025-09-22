import { useState } from "react";
import { Header } from "@/components/Header";
import { DashboardView } from "@/components/DashboardView";
import { RFPUpload } from "@/components/RFPUpload";
import { InquiryBot } from "@/components/InquiryBot";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'upload':
        return <RFPUpload />;
      case 'inquiry':
        return <InquiryBot />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-6 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
