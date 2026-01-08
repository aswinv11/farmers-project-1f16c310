
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, Zap, TestTube, Sprout, Plus } from "lucide-react";
import type { SoilData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";

interface SoilDataFormProps {
  onSubmit: (data: Omit<SoilData, 'id' | 'date'>) => void;
  t: Translations;
}

export const SoilDataForm = ({ onSubmit, t }: SoilDataFormProps) => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    ph: '',
    moisture: '',
    plant: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nitrogen = parseFloat(formData.nitrogen);
    const ph = parseFloat(formData.ph);
    const moisture = parseFloat(formData.moisture);

    // Basic validation
    if (isNaN(nitrogen) || isNaN(ph) || isNaN(moisture) || !formData.plant) {
      return;
    }

    if (nitrogen < 0 || nitrogen > 100 || ph < 0 || ph > 14 || moisture < 0 || moisture > 100) {
      return;
    }

    onSubmit({
      nitrogen,
      ph,
      moisture,
      plant: formData.plant
    });

    // Reset form
    setFormData({
      nitrogen: '',
      ph: '',
      moisture: '',
      plant: ''
    });
  };

  const isValid = formData.nitrogen && formData.ph && formData.moisture && formData.plant;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <TestTube className="h-5 w-5 text-primary" />
          </div>
          {t.soilForm.title}
        </CardTitle>
        <CardDescription>
          {t.soilForm.nitrogenHelper}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nitrogen" className="flex items-center gap-2 text-sm font-medium">
              <div className="p-1 rounded bg-soil-nitrogen/15">
                <Zap className="h-3.5 w-3.5 text-soil-nitrogen" />
              </div>
              {t.soilForm.nitrogen}
            </Label>
            <Input
              id="nitrogen"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="e.g., 2.5"
              value={formData.nitrogen}
              onChange={(e) => setFormData(prev => ({ ...prev, nitrogen: e.target.value }))}
              className="text-base h-12 bg-muted/30 border-muted focus:bg-background transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ph" className="flex items-center gap-2 text-sm font-medium">
              <div className="p-1 rounded bg-soil-ph/15">
                <TestTube className="h-3.5 w-3.5 text-soil-ph" />
              </div>
              {t.soilForm.ph}
            </Label>
            <Input
              id="ph"
              type="number"
              min="0"
              max="14"
              step="0.1"
              placeholder="e.g., 6.5"
              value={formData.ph}
              onChange={(e) => setFormData(prev => ({ ...prev, ph: e.target.value }))}
              className="text-base h-12 bg-muted/30 border-muted focus:bg-background transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="moisture" className="flex items-center gap-2 text-sm font-medium">
              <div className="p-1 rounded bg-soil-moisture/15">
                <Droplets className="h-3.5 w-3.5 text-soil-moisture" />
              </div>
              {t.soilForm.moisture}
            </Label>
            <Input
              id="moisture"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="e.g., 35.0"
              value={formData.moisture}
              onChange={(e) => setFormData(prev => ({ ...prev, moisture: e.target.value }))}
              className="text-base h-12 bg-muted/30 border-muted focus:bg-background transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant" className="flex items-center gap-2 text-sm font-medium">
              <div className="p-1 rounded bg-primary/15">
                <Sprout className="h-3.5 w-3.5 text-primary" />
              </div>
              {t.soilForm.plant}
            </Label>
            <Select value={formData.plant} onValueChange={(value) => setFormData(prev => ({ ...prev, plant: value }))}>
              <SelectTrigger className="text-base h-12 bg-muted/30 border-muted focus:bg-background transition-colors">
                <SelectValue placeholder={t.soilForm.plantPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">{t.plants.rice}</SelectItem>
                <SelectItem value="wheat">{t.plants.wheat}</SelectItem>
                <SelectItem value="corn">{t.plants.corn}</SelectItem>
                <SelectItem value="tomato">{t.plants.tomato}</SelectItem>
                <SelectItem value="potato">{t.plants.potato}</SelectItem>
                <SelectItem value="cotton">{t.plants.cotton}</SelectItem>
                <SelectItem value="sugarcane">{t.plants.sugarcane}</SelectItem>
                <SelectItem value="beans">{t.plants.beans}</SelectItem>
                <SelectItem value="spinach">{t.plants.spinach}</SelectItem>
                <SelectItem value="cabbage">{t.plants.cabbage}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all" 
            disabled={!isValid}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t.soilForm.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};