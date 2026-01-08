
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
import { Leaf, BarChart3, Lightbulb, Cloud, FileText, LogOut, Wifi, WifiOff } from "lucide-react";
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
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-primary/20 animate-pulse-soft" />
            <Leaf className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-muted-foreground font-medium">Loading...</span>
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
      <header className="bg-gradient-to-r from-primary to-primary/85 text-primary-foreground py-4 px-4 shadow-lg">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/15 rounded-lg backdrop-blur-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{t.header.title}</h1>
              <p className="text-xs text-primary-foreground/70">Smart Agriculture</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={switchLanguage}
              label={t.common.language}
            />
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm">
              {isOnline ? (
                <Wifi className="h-3.5 w-3.5 text-soil-success" />
              ) : (
                <WifiOff className="h-3.5 w-3.5 text-destructive" />
              )}
              <span className="text-xs font-medium">{isOnline ? t.header.online : t.header.offline}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/15"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 pb-8">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 h-auto p-1.5 bg-muted/60 rounded-xl">
            <TabsTrigger 
              value="input" 
              className="flex flex-col gap-1.5 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Leaf className="h-4 w-4" />
              <span className="text-[10px] font-medium">{t.tabs.input}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col gap-1.5 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-[10px] font-medium">{t.tabs.data}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="flex flex-col gap-1.5 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="text-[10px] font-medium">{t.tabs.tips}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="weather" 
              className="flex flex-col gap-1.5 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Cloud className="h-4 w-4" />
              <span className="text-[10px] font-medium">{t.tabs.weather}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="flex flex-col gap-1.5 py-3 px-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="text-[10px] font-medium">{t.tabs.report}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="mt-0">
            <SoilDataForm onSubmit={handleAddSoilData} t={t} />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-0">
            <Dashboard soilData={soilData} t={t} />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-0">
            <RecommendationsPanel latestSoilData={getLatestSoilData()} t={t} />
          </TabsContent>

          <TabsContent value="weather" className="mt-0">
            <WeatherWidget 
              weatherData={weatherData} 
              onWeatherUpdate={setWeatherData}
              isOnline={isOnline}
              t={t}
            />
          </TabsContent>

          <TabsContent value="report" className="mt-0">
            <ReportGenerator soilData={soilData} t={t} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;