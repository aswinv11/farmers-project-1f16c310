
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Activity, Droplets, TestTube, Zap } from "lucide-react";
import type { SoilData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";

interface DashboardProps {
  soilData: SoilData[];
  t: Translations;
}

export const Dashboard = ({ soilData, t }: DashboardProps) => {
  if (soilData.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader className="text-center py-12">
          <div className="mx-auto mb-4 p-4 rounded-full bg-muted">
            <Activity className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">{t.dashboard.title}</CardTitle>
          <CardDescription className="max-w-xs mx-auto">
            {t.dashboard.noData}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Prepare chart data (reverse to show chronological order)
  const chartData = soilData
    .slice()
    .reverse()
    .map((data, index) => ({
      reading: index + 1,
      date: new Date(data.date).toLocaleDateString(),
      nitrogen: data.nitrogen,
      ph: data.ph,
      moisture: data.moisture
    }));

  const latestData = soilData[0];
  const averages = {
    nitrogen: (soilData.reduce((sum, d) => sum + d.nitrogen, 0) / soilData.length).toFixed(1),
    ph: (soilData.reduce((sum, d) => sum + d.ph, 0) / soilData.length).toFixed(1),
    moisture: (soilData.reduce((sum, d) => sum + d.moisture, 0) / soilData.length).toFixed(1)
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            {t.dashboard.title}
          </CardTitle>
          <CardDescription>
            {soilData.length} readings recorded
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Current Values */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-soil-nitrogen/15">
                <Zap className="h-3.5 w-3.5 text-soil-nitrogen" />
              </div>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                {t.dashboard.nitrogen}
              </span>
            </div>
            <div className="text-2xl font-bold text-soil-nitrogen">{latestData.nitrogen}%</div>
            <div className="text-xs text-muted-foreground">Avg: {averages.nitrogen}%</div>
          </div>
          <div className="h-1 bg-soil-nitrogen/20">
            <div 
              className="h-full bg-soil-nitrogen transition-all" 
              style={{ width: `${Math.min(latestData.nitrogen * 10, 100)}%` }} 
            />
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-soil-ph/15">
                <TestTube className="h-3.5 w-3.5 text-soil-ph" />
              </div>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                {t.dashboard.ph}
              </span>
            </div>
            <div className="text-2xl font-bold text-soil-ph">{latestData.ph}</div>
            <div className="text-xs text-muted-foreground">Avg: {averages.ph}</div>
          </div>
          <div className="h-1 bg-soil-ph/20">
            <div 
              className="h-full bg-soil-ph transition-all" 
              style={{ width: `${(latestData.ph / 14) * 100}%` }} 
            />
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-soil-moisture/15">
                <Droplets className="h-3.5 w-3.5 text-soil-moisture" />
              </div>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                {t.dashboard.moisture}
              </span>
            </div>
            <div className="text-2xl font-bold text-soil-moisture">{latestData.moisture}%</div>
            <div className="text-xs text-muted-foreground">Avg: {averages.moisture}%</div>
          </div>
          <div className="h-1 bg-soil-moisture/20">
            <div 
              className="h-full bg-soil-moisture transition-all" 
              style={{ width: `${latestData.moisture}%` }} 
            />
          </div>
        </Card>
      </div>

      {/* Trend Chart */}
      {soilData.length > 1 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-lg bg-accent/10">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="reading" 
                    label={{ value: 'Reading #', position: 'insideBottom', offset: -5 }}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    labelFormatter={(value) => `Reading ${value}`}
                    formatter={(value: number, name: string) => [
                      `${value}${name === 'ph' ? '' : '%'}`,
                      name === 'ph' ? 'pH' : name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="nitrogen" stroke="hsl(var(--soil-nitrogen))" strokeWidth={2.5} dot={{ strokeWidth: 2, r: 3 }} />
                  <Line type="monotone" dataKey="ph" stroke="hsl(var(--soil-ph))" strokeWidth={2.5} dot={{ strokeWidth: 2, r: 3 }} />
                  <Line type="monotone" dataKey="moisture" stroke="hsl(var(--soil-moisture))" strokeWidth={2.5} dot={{ strokeWidth: 2, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-soil-nitrogen" />
                <span className="text-xs text-muted-foreground">Nitrogen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-soil-ph" />
                <span className="text-xs text-muted-foreground">pH</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-soil-moisture" />
                <span className="text-xs text-muted-foreground">Moisture</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Readings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="p-1.5 rounded-lg bg-secondary">
              <Calendar className="h-4 w-4 text-secondary-foreground" />
            </div>
            {t.dashboard.recentReadings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {soilData.slice(0, 5).map((data) => (
              <div 
                key={data.id} 
                className="flex justify-between items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="text-sm font-medium">
                  {new Date(data.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-soil-nitrogen/15 text-soil-nitrogen">
                    N:{data.nitrogen}%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-soil-ph/15 text-soil-ph">
                    pH:{data.ph}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-soil-moisture/15 text-soil-moisture">
                    M:{data.moisture}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};