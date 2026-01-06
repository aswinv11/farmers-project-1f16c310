import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, TrendingUp } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SoilData } from "@/pages/Index";
import type { Translations } from "@/lib/translations";
import { toast } from "sonner";

interface ReportGeneratorProps {
  soilData: SoilData[];
  t: Translations;
}

export const ReportGenerator = ({ soilData, t }: ReportGeneratorProps) => {
  const generatePDFReport = () => {
    if (soilData.length === 0) {
      toast.error("No data available to generate report");
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = (doc as any).internal.pageSize.width;
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40, 116, 166);
      doc.text('Smart Soil Health Report', pageWidth / 2, 20, { align: 'center' });
      
      // Report details
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      doc.text(`Total Readings: ${soilData.length}`, 20, 45);
      
      // Summary Statistics
      const avgNitrogen = (soilData.reduce((sum, d) => sum + d.nitrogen, 0) / soilData.length).toFixed(2);
      const avgPH = (soilData.reduce((sum, d) => sum + d.ph, 0) / soilData.length).toFixed(2);
      const avgMoisture = (soilData.reduce((sum, d) => sum + d.moisture, 0) / soilData.length).toFixed(2);
      
      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text('Summary Statistics', 20, 65);
      
      doc.setFontSize(12);
      doc.text(`Average Nitrogen Level: ${avgNitrogen}%`, 20, 80);
      doc.text(`Average pH Level: ${avgPH}`, 20, 90);
      doc.text(`Average Moisture Content: ${avgMoisture}%`, 20, 100);
      
      // Latest Reading Highlight
      const latestReading = soilData[0];
      doc.setFontSize(16);
      doc.text('Latest Reading', 20, 120);
      
      doc.setFontSize(12);
      doc.text(`Date: ${new Date(latestReading.date).toLocaleDateString()}`, 20, 135);
      doc.text(`Nitrogen: ${latestReading.nitrogen}%`, 20, 145);
      doc.text(`pH Level: ${latestReading.ph}`, 20, 155);
      doc.text(`Moisture: ${latestReading.moisture}%`, 20, 165);
      doc.text(`Plant/Crop: ${latestReading.plant}`, 20, 175);
      
      // Data Table
      const tableData = soilData.slice(0, 15).map(data => [
        new Date(data.date).toLocaleDateString(),
        `${data.nitrogen}%`,
        data.ph.toString(),
        `${data.moisture}%`,
        data.plant
      ]);
      
      autoTable(doc, {
        head: [['Date', 'Nitrogen', 'pH', 'Moisture', 'Plant/Crop']],
        body: tableData,
        startY: 190,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [40, 116, 166] },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 25 },
          2: { cellWidth: 20 },
          3: { cellWidth: 25 },
          4: { cellWidth: 60 }
        }
      });
      
      // Add new page for recommendations
      doc.addPage();
      
      // Soil Health Analysis
      doc.setFontSize(18);
      doc.setTextColor(40, 116, 166);
      doc.text('Soil Health Analysis', 20, 20);
      
      // Health Status Assessment
      let yPosition = 40;
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Health Status Assessment', 20, yPosition);
      yPosition += 20;
      
      doc.setFontSize(11);
      
      // Nitrogen Analysis
      if (latestReading.nitrogen < 1.5) {
        doc.setTextColor(220, 20, 60);
        doc.text('⚠ Nitrogen Deficiency Detected', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Apply organic compost or nitrogen-rich fertilizer', 25, yPosition);
        yPosition += 8;
        doc.text('• Consider planting legumes to fix nitrogen naturally', 25, yPosition);
        yPosition += 15;
      } else if (latestReading.nitrogen > 4) {
        doc.setTextColor(255, 140, 0);
        doc.text('⚠ Excess Nitrogen Levels', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Reduce nitrogen inputs temporarily', 25, yPosition);
        yPosition += 8;
        doc.text('• Consider growing leafy vegetables', 25, yPosition);
        yPosition += 15;
      } else {
        doc.setTextColor(34, 139, 34);
        doc.text('✓ Nitrogen levels are optimal', 20, yPosition);
        yPosition += 15;
      }
      
      // pH Analysis
      if (latestReading.ph < 6) {
        doc.setTextColor(220, 20, 60);
        doc.text('⚠ Acidic Soil Conditions', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Add lime or wood ash to raise pH', 25, yPosition);
        yPosition += 8;
        doc.text('• Most crops prefer 6.0-7.0 pH range', 25, yPosition);
        yPosition += 15;
      } else if (latestReading.ph > 8) {
        doc.setTextColor(220, 20, 60);
        doc.text('⚠ Alkaline Soil Conditions', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Add organic matter or sulfur to lower pH', 25, yPosition);
        yPosition += 15;
      } else {
        doc.setTextColor(34, 139, 34);
        doc.text('✓ pH levels are optimal for most crops', 20, yPosition);
        yPosition += 15;
      }
      
      // Moisture Analysis
      if (latestReading.moisture < 20) {
        doc.setTextColor(220, 20, 60);
        doc.text('⚠ Low Soil Moisture', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Increase watering frequency', 25, yPosition);
        yPosition += 8;
        doc.text('• Consider mulching to retain moisture', 25, yPosition);
        yPosition += 15;
      } else if (latestReading.moisture > 80) {
        doc.setTextColor(255, 140, 0);
        doc.text('⚠ Excessive Soil Moisture', 20, yPosition);
        yPosition += 10;
        doc.setTextColor(100);
        doc.text('• Reduce watering frequency', 25, yPosition);
        yPosition += 8;
        doc.text('• Ensure proper drainage', 25, yPosition);
        yPosition += 15;
      } else {
        doc.setTextColor(34, 139, 34);
        doc.text('✓ Moisture levels are adequate', 20, yPosition);
        yPosition += 15;
      }
      
      // Crop Recommendations
      yPosition += 10;
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Recommended Crops', 20, yPosition);
      yPosition += 20;
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      
      if (latestReading.nitrogen >= 2 && latestReading.ph >= 6 && latestReading.ph <= 7 && latestReading.moisture >= 30) {
        doc.text('• Leafy greens (spinach, lettuce)', 25, yPosition);
        yPosition += 8;
        doc.text('• Tomatoes and peppers', 25, yPosition);
        yPosition += 8;
        doc.text('• Beans and peas', 25, yPosition);
      } else if (latestReading.ph < 6.5 && latestReading.moisture >= 40) {
        doc.text('• Blueberries and cranberries', 25, yPosition);
        yPosition += 8;
        doc.text('• Potatoes and sweet potatoes', 25, yPosition);
      } else if (latestReading.nitrogen < 2 && latestReading.ph >= 6.5) {
        doc.text('• Legumes (peas, beans, lentils)', 25, yPosition);
        yPosition += 8;
        doc.text('• Root vegetables (carrots, beets)', 25, yPosition);
      }
      
      // Trend Analysis (if multiple readings)
      if (soilData.length > 3) {
        yPosition += 20;
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text('Trend Analysis', 20, yPosition);
        yPosition += 20;
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        
        const recentReadings = soilData.slice(0, 5);
        const olderReadings = soilData.slice(-5);
        
        const recentAvgN = recentReadings.reduce((sum, d) => sum + d.nitrogen, 0) / recentReadings.length;
        const olderAvgN = olderReadings.reduce((sum, d) => sum + d.nitrogen, 0) / olderReadings.length;
        
        if (recentAvgN > olderAvgN) {
          doc.text('📈 Nitrogen levels are trending upward', 20, yPosition);
        } else if (recentAvgN < olderAvgN) {
          doc.text('📉 Nitrogen levels are trending downward', 20, yPosition);
        } else {
          doc.text('➡️ Nitrogen levels are stable', 20, yPosition);
        }
      }
      
      // Footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Smart Soil Health Monitoring System - Page ${i} of ${pageCount}`,
          pageWidth / 2,
          (doc as any).internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
      
      // Save the PDF
      const fileName = `soil-health-report-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate report");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Report
          </CardTitle>
          <CardDescription>
            Download a comprehensive PDF report of your soil health data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {soilData.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No data available for report generation. 
                Start recording soil measurements to generate reports.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Report Contents:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Summary statistics and averages</li>
                  <li>• Latest soil readings</li>
                  <li>• Historical data table ({Math.min(soilData.length, 15)} recent entries)</li>
                  <li>• Soil health analysis and recommendations</li>
                  <li>• Crop suggestions based on current conditions</li>
                  {soilData.length > 3 && <li>• Trend analysis over time</li>}
                </ul>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Soil Health Report</p>
                  <p className="text-sm text-muted-foreground">
                    {soilData.length} readings • Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <Button onClick={generatePDFReport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};