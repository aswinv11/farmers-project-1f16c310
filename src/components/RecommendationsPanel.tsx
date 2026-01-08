import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, CheckCircle, Beaker, Bug, Sparkles } from "lucide-react";
import type { SoilData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";

interface RecommendationsPanelProps {
  latestSoilData: SoilData | null;
  t: Translations;
}

export const RecommendationsPanel = ({ latestSoilData, t }: RecommendationsPanelProps) => {
  if (!latestSoilData) {
    return (
      <Card className="border-dashed">
        <CardHeader className="text-center py-12">
          <div className="mx-auto mb-4 p-4 rounded-full bg-muted">
            <Lightbulb className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">{t.recommendations.title}</CardTitle>
          <CardDescription className="max-w-xs mx-auto">
            {t.recommendations.noData}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { nitrogen, ph, moisture, plant } = latestSoilData;

  // Plant-specific optimal ranges
  const plantRequirements: Record<string, { nitrogen: [number, number], ph: [number, number], moisture: [number, number] }> = {
    rice: { nitrogen: [2.0, 3.5], ph: [5.5, 6.5], moisture: [80, 100] },
    wheat: { nitrogen: [2.5, 4.0], ph: [6.0, 7.5], moisture: [40, 60] },
    corn: { nitrogen: [3.0, 5.0], ph: [6.0, 6.8], moisture: [50, 70] },
    tomato: { nitrogen: [2.0, 3.0], ph: [6.0, 6.8], moisture: [60, 80] },
    potato: { nitrogen: [1.5, 2.5], ph: [5.2, 6.4], moisture: [65, 85] },
    cotton: { nitrogen: [2.5, 4.5], ph: [5.8, 8.0], moisture: [50, 70] },
    sugarcane: { nitrogen: [3.5, 5.5], ph: [6.5, 7.5], moisture: [70, 90] },
    beans: { nitrogen: [1.0, 2.0], ph: [6.0, 7.0], moisture: [60, 80] },
    spinach: { nitrogen: [3.0, 4.5], ph: [6.0, 7.0], moisture: [70, 85] },
    cabbage: { nitrogen: [2.5, 4.0], ph: [6.0, 6.5], moisture: [65, 85] }
  };

  const requirements = plantRequirements[plant] || { nitrogen: [2.0, 4.0], ph: [6.0, 7.0], moisture: [60, 80] };

  // Analysis and recommendations
  const recommendations = [];
  const alerts = [];
  const positives = [];
  const fertilizers = [];
  const pesticides = [];

  // Nitrogen analysis
  if (nitrogen < requirements.nitrogen[0]) {
    alerts.push(`${t.recommendations.lowNitrogen} ${plant}`);
    recommendations.push({
      title: "Nitrogen Deficiency",
      description: `Apply nitrogen-rich fertilizer. ${plant} requires ${requirements.nitrogen[0]}-${requirements.nitrogen[1]}% nitrogen.`,
      priority: "high"
    });
    fertilizers.push("Urea (46-0-0)", "Ammonium Sulfate (21-0-0)", "Calcium Ammonium Nitrate");
  } else if (nitrogen > requirements.nitrogen[1]) {
    alerts.push(`${t.recommendations.excessNitrogen} ${plant}`);
    recommendations.push({
      title: "Excess Nitrogen",
      description: `Reduce nitrogen inputs. Consider flushing with water or adding carbon-rich materials.`,
      priority: "medium"
    });
  } else {
    positives.push(`${t.recommendations.nitrogenOptimal} ${plant}`);
  }

  // pH analysis
  if (ph < requirements.ph[0]) {
    alerts.push(`${t.recommendations.soilAcidic} ${plant}`);
    recommendations.push({
      title: "Soil Too Acidic",
      description: `Add lime to raise pH to ${requirements.ph[0]}-${requirements.ph[1]} range for optimal ${plant} growth.`,
      priority: "high"
    });
    fertilizers.push("Agricultural Lime", "Dolomitic Lime", "Wood Ash");
  } else if (ph > requirements.ph[1]) {
    alerts.push(`${t.recommendations.soilAlkaline} ${plant}`);
    recommendations.push({
      title: "Soil Too Alkaline",
      description: `Add sulfur or organic matter to lower pH for ${plant}.`,
      priority: "high"
    });
    fertilizers.push("Sulfur", "Peat Moss", "Compost");
  } else {
    positives.push(`${t.recommendations.phOptimal} ${plant}`);
  }

  // Moisture analysis
  if (moisture < requirements.moisture[0]) {
    alerts.push(`${t.recommendations.lowMoisture} ${plant}`);
    recommendations.push({
      title: "Insufficient Moisture",
      description: `Increase irrigation. ${plant} requires ${requirements.moisture[0]}-${requirements.moisture[1]}% moisture.`,
      priority: "high"
    });
  } else if (moisture > requirements.moisture[1]) {
    alerts.push(`${t.recommendations.excessMoisture} ${plant}`);
    recommendations.push({
      title: "Overwatering Risk",
      description: `Reduce watering to prevent root rot and fungal diseases in ${plant}.`,
      priority: "medium"
    });
    pesticides.push("Copper Fungicide", "Mancozeb", "Proper drainage system");
  } else {
    positives.push(`${t.recommendations.moistureOptimal} ${plant}`);
  }

  // Plant-specific fertilizer recommendations
  const plantFertilizers: Record<string, string[]> = {
    rice: ["NPK 20-10-10", "Potash", "Phosphate", "Zinc Sulfate"],
    wheat: ["DAP (18-46-0)", "NPK 12-32-16", "Potassium Chloride"],
    corn: ["NPK 15-15-15", "Starter Fertilizer 10-34-0", "Side-dress Nitrogen"],
    tomato: ["NPK 10-10-10", "Calcium Nitrate", "Magnesium Sulfate"],
    potato: ["NPK 8-24-24", "Potassium Sulfate", "Bone Meal"],
    cotton: ["NPK 15-5-10", "Boron", "Potassium Nitrate"],
    sugarcane: ["NPK 12-6-12", "Filter Press Mud", "Molasses"],
    beans: ["Phosphorus Fertilizer", "Potash", "Rhizobium Inoculant"],
    spinach: ["NPK 20-10-10", "Iron Chelate", "Nitrogen Boost"],
    cabbage: ["NPK 10-10-10", "Calcium", "Boron Supplement"]
  };

  // Plant-specific pest management
  const plantPesticides: Record<string, string[]> = {
    rice: ["Imidacloprid (for brown planthopper)", "Chlorpyrifos (for stem borer)", "Propiconazole (for blast)"],
    wheat: ["2,4-D (for broadleaf weeds)", "Pendimethalin (pre-emergence)", "Tebuconazole (for rust)"],
    corn: ["Atrazine (for weeds)", "Chlorpyrifos (for corn borer)", "Glyphosate (post-harvest)"],
    tomato: ["Imidacloprid (for whitefly)", "Mancozeb (for blight)", "Spinosad (for caterpillars)"],
    potato: ["Metalaxyl (for late blight)", "Imidacloprid (for aphids)", "Copper oxychloride"],
    cotton: ["Emamectin Benzoate (for bollworm)", "Thiamethoxam (for thrips)", "Propiconazole"],
    sugarcane: ["2,4-D (for weeds)", "Chlorpyrifos (for borers)", "Carbendazim (for red rot)"],
    beans: ["Pendimethalin (for weeds)", "Lambda-cyhalothrin (for pod borer)", "Copper fungicide"],
    spinach: ["Spinosad (for leaf miners)", "Bacillus thuringiensis (for caterpillars)", "Neem oil"],
    cabbage: ["Deltamethrin (for diamondback moth)", "Chlorpyrifos (for aphids)", "Copper sulfate"]
  };

  fertilizers.push(...(plantFertilizers[plant] || []));
  pesticides.push(...(plantPesticides[plant] || []));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-accent/10">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            {t.recommendations.title}
          </CardTitle>
          <CardDescription>
            {`${t.recommendations.basedOnLatest} - ${plant}`}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Status Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            {t.recommendations.soilHealthStatus} {plant}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-soil-warning/10 border border-soil-warning/20">
                <AlertTriangle className="h-4 w-4 text-soil-warning shrink-0 mt-0.5" />
                <span className="text-sm">{alert}</span>
              </div>
            ))}
            {positives.map((positive, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-soil-success/10 border border-soil-success/20">
                <CheckCircle className="h-4 w-4 text-soil-success shrink-0 mt-0.5" />
                <span className="text-sm">{positive}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-1 ${rec.priority === 'high' ? 'bg-destructive' : 'bg-soil-warning'}`} />
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{rec.title}</h3>
                  <Badge 
                    variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Fertilizer Recommendations */}
      {fertilizers.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Beaker className="h-4 w-4 text-primary" />
              </div>
              {t.recommendations.recommendedFertilizers} {plant}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {fertilizers.slice(0, 6).map((fertilizer, index) => (
                <div key={index} className="p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
                  <span className="text-sm font-medium">{fertilizer}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pesticide/Pest Management */}
      {pesticides.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-lg bg-soil-warning/15">
                <Bug className="h-4 w-4 text-soil-warning" />
              </div>
              {t.recommendations.pestManagement} {plant}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {pesticides.slice(0, 6).map((pesticide, index) => (
                <div key={index} className="p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
                  <span className="text-sm font-medium">{pesticide}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t.recommendations.generalTips} {plant}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Monitor soil conditions regularly for optimal {plant} growth
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Follow integrated pest management practices
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Apply fertilizers in split doses for better efficiency
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Maintain proper irrigation schedule based on growth stage
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Practice crop rotation to maintain soil health
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};