
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SoilDataForm } from "@/components/SoilDataForm";
import { Dashboard } from "@/components/Dashboard";
import { WeatherWidget } from "@/components/WeatherWidget";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { ReportGenerator } from "@/components/ReportGenerator";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Leaf, BarChart3, Lightbulb, Cloud, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

export interface SoilData {
  id: string;
  date: string;
  nitrogen: number;
  ph: number;
  moisture: number;
  plant: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { language, t, switchLanguage } = useLanguage();
  const [soilData, setSoilData] = useState<SoilData[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('soilHealthData');
    if (savedData) {
      setSoilData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever soilData changes
  useEffect(() => {
    localStorage.setItem('soilHealthData', JSON.stringify(soilData));
  }, [soilData]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(t.messages.connectionRestored);
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.info(t.messages.workingOffline);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAddSoilData = (newData: Omit<SoilData, 'id' | 'date'>) => {
    const soilEntry: SoilData = {
      ...newData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setSoilData(prev => [soilEntry, ...prev]);
    toast.success(t.messages.dataRecorded);
  };

  const getLatestSoilData = (): SoilData | null => {
    return soilData.length > 0 ? soilData[0] : null;
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 animate-pulse text-primary" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-lg font-bold">{t.header.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={switchLanguage}
              label={t.common.language}
            />
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm">{isOnline ? t.header.online : t.header.offline}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="input" className="flex flex-col gap-1 py-3">
              <Leaf className="h-4 w-4" />
              <span className="text-xs">{t.tabs.input}</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">{t.tabs.data}</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex flex-col gap-1 py-3">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs">{t.tabs.tips}</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex flex-col gap-1 py-3">
              <Cloud className="h-4 w-4" />
              <span className="text-xs">{t.tabs.weather}</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex flex-col gap-1 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">{t.tabs.report}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <SoilDataForm onSubmit={handleAddSoilData} t={t} />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard soilData={soilData} t={t} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsPanel latestSoilData={getLatestSoilData()} t={t} />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherWidget 
              weatherData={weatherData} 
              onWeatherUpdate={setWeatherData}
              isOnline={isOnline}
              t={t}
            />
          </TabsContent>

          <TabsContent value="report">
            <ReportGenerator soilData={soilData} t={t} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
