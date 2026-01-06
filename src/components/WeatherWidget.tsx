
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cloud, Sun, CloudRain, MapPin, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { WeatherData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";

interface WeatherWidgetProps {
  weatherData: WeatherData | null;
  onWeatherUpdate: (data: WeatherData | null) => void;
  isOnline: boolean;
  t: Translations;
}

export const WeatherWidget = ({ weatherData, onWeatherUpdate, isOnline, t }: WeatherWidgetProps) => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const fetchWeather = async (locationQuery: string) => {
    if (!isOnline) {
      toast.error("Internet connection required for weather data");
      return;
    }

    setLoading(true);
    try {
      // Note: In a real implementation, you would use OpenWeather API
      // For MVP demo, we'll simulate weather data
      const mockWeatherData: WeatherData = {
        temperature: Math.round(Math.random() * 15 + 20), // 20-35°C
        humidity: Math.round(Math.random() * 40 + 40), // 40-80%
        description: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
        icon: "01d"
      };

      onWeatherUpdate(mockWeatherData);
      localStorage.setItem('userLocation', locationQuery);
      localStorage.setItem('weatherData', JSON.stringify(mockWeatherData));
      toast.success("Weather data updated");
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location.trim());
    }
  };

  // Load cached weather data on mount
  useEffect(() => {
    const cachedWeather = localStorage.getItem('weatherData');
    if (cachedWeather && !weatherData) {
      try {
        onWeatherUpdate(JSON.parse(cachedWeather));
      } catch (error) {
        console.error('Error loading cached weather:', error);
      }
    }
  }, [weatherData, onWeatherUpdate]);

  const getWeatherIcon = (description: string) => {
    if (description.toLowerCase().includes('rain')) return CloudRain;
    if (description.toLowerCase().includes('cloud')) return Cloud;
    return Sun;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          {t.weather.title}
        </CardTitle>
          <CardDescription>
            Current weather to help plan your farming activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLocationSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Your Location
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter city or area name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isOnline}
                />
                <Button 
                  type="submit" 
                  disabled={loading || !isOnline || !location.trim()}
                  size="icon"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </form>

          {!isOnline && (
            <div className="mt-3 p-3 bg-muted/50 rounded text-sm text-muted-foreground">
              {t.weather.noData}
            </div>
          )}
        </CardContent>
      </Card>

      {weatherData && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComponent = getWeatherIcon(weatherData.description);
                  return <IconComponent className="h-8 w-8 text-yellow-500" />;
                })()}
                <div>
                  <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">{weatherData.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{weatherData.humidity}%</div>
                <div className="text-sm text-muted-foreground">{t.weather.humidity}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/30 rounded">
              <h4 className="font-medium text-sm mb-2">Farming Tips</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                {weatherData.temperature > 30 && (
                  <li>• High temperature - ensure adequate watering</li>
                )}
                {weatherData.humidity > 70 && (
                  <li>• High humidity - watch for fungal diseases</li>
                )}
                {weatherData.description.toLowerCase().includes('rain') && (
                  <li>• Rainy conditions - delay fertilizer application</li>
                )}
                {weatherData.description.toLowerCase().includes('sunny') && (
                  <li>• Good conditions for harvesting and fieldwork</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
