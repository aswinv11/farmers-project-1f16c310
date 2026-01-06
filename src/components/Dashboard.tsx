
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Activity } from "lucide-react";
import type { SoilData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";

interface DashboardProps {
  soilData: SoilData[];
  t: Translations;
}

export const Dashboard = ({ soilData, t }: DashboardProps) => {
  if (soilData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {t.dashboard.title}
          </CardTitle>
          <CardDescription>
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
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {t.dashboard.title}
        </CardTitle>
          <CardDescription>
            {soilData.length} readings recorded
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Current Values */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{latestData.nitrogen}%</div>
            <div className="text-xs text-muted-foreground">{t.dashboard.nitrogen}</div>
            <div className="text-xs">Avg: {averages.nitrogen}%</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{latestData.ph}</div>
            <div className="text-xs text-muted-foreground">{t.dashboard.ph}</div>
            <div className="text-xs">Avg: {averages.ph}</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{latestData.moisture}%</div>
            <div className="text-xs text-muted-foreground">{t.dashboard.moisture}</div>
            <div className="text-xs">Avg: {averages.moisture}%</div>
          </div>
        </Card>
      </div>

      {/* Trend Chart */}
      {soilData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="reading" 
                    label={{ value: 'Reading #', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => `Reading ${value}`}
                    formatter={(value: number, name: string) => [
                      `${value}${name === 'ph' ? '' : '%'}`,
                      name === 'ph' ? 'pH' : name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Line type="monotone" dataKey="nitrogen" stroke="#ca8a04" strokeWidth={2} />
                  <Line type="monotone" dataKey="ph" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="moisture" stroke="#0891b2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            {t.dashboard.recentReadings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {soilData.slice(0, 5).map((data) => (
              <div key={data.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <div className="text-sm">
                  {new Date(data.date).toLocaleDateString()}
                </div>
                <div className="text-sm font-mono">
                  N:{data.nitrogen}% pH:{data.ph} M:{data.moisture}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
