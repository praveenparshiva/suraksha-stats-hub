import React from 'react';
import { TrendingUp, Calendar, PieChart, BarChart3 } from 'lucide-react';
import { useService } from '@/contexts/ServiceContext';
import { StatCard } from '@/components/service/StatCard';
import { Card } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const CHART_COLORS = {
  sump: '#3b82f6',    // Blue
  tank: '#f59e0b',    // Orange
  both: '#8b5cf6',    // Purple
  primary: '#3b82f6'
};

export function AnalyticsScreen() {
  const { getCurrentMonthStats, getMonthlyHistory } = useService();
  
  const currentStats = getCurrentMonthStats();
  const monthlyHistory = getMonthlyHistory().slice(0, 6); // Last 6 months
  
  // Prepare service breakdown data for pie chart
  const serviceData = [
    {
      name: 'Sump Cleaning',
      value: currentStats.serviceBreakdown.sump,
      color: CHART_COLORS.sump
    },
    {
      name: 'Tank Cleaning',
      value: currentStats.serviceBreakdown.tank,
      color: CHART_COLORS.tank
    },
    {
      name: 'Both Services',
      value: currentStats.serviceBreakdown.both,
      color: CHART_COLORS.both
    }
  ].filter(item => item.value > 0);

  // Prepare monthly income data for bar chart
  const monthlyIncomeData = monthlyHistory.map(stats => ({
    month: new Date(stats.month + '-01').toLocaleDateString('en-IN', { 
      month: 'short',
      year: '2-digit'
    }),
    income: stats.totalIncome,
    customers: stats.customersServed
  })).reverse();

  const chartConfig = {
    income: {
      label: "Income",
      color: CHART_COLORS.primary,
    },
    sump: {
      label: "Sump Cleaning",
      color: CHART_COLORS.sump,
    },
    tank: {
      label: "Tank Cleaning", 
      color: CHART_COLORS.tank,
    },
    both: {
      label: "Both Services",
      color: CHART_COLORS.both,
    },
  };

  const totalServices = currentStats.serviceBreakdown.sump + 
                       currentStats.serviceBreakdown.tank + 
                       currentStats.serviceBreakdown.both;

  const avgIncomePerService = totalServices > 0 ? 
    Math.round(currentStats.totalIncome / totalServices) : 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-header-text p-6 -mx-4 -mt-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Analytics</h1>
          <p className="text-header-subtitle">Business insights and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Avg per Service"
          value={`₹${avgIncomePerService.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          className="bg-gradient-to-br from-purple-50 to-purple-100"
        />
        
        <StatCard
          title="Total Services"
          value={totalServices}
          subtitle="This month"
          icon={BarChart3}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100"
        />
      </div>

      {/* Service Breakdown - Pie Chart */}
      {serviceData.length > 0 && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Service Type Distribution</h3>
            </div>
            
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RechartsPieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <RechartsPieChart data={serviceData}>
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <ChartLegend 
                  content={<ChartLegendContent />}
                />
              </RechartsPieChart>
            </ChartContainer>

            {/* Service breakdown stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: CHART_COLORS.sump }}>
                  {currentStats.serviceBreakdown.sump}
                </div>
                <div className="text-xs text-muted-foreground">Sump Only</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: CHART_COLORS.tank }}>
                  {currentStats.serviceBreakdown.tank}
                </div>
                <div className="text-xs text-muted-foreground">Tank Only</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: CHART_COLORS.both }}>
                  {currentStats.serviceBreakdown.both}
                </div>
                <div className="text-xs text-muted-foreground">Both Services</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Monthly Income Trend - Bar Chart */}
      {monthlyIncomeData.length > 0 && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Monthly Income Trend</h3>
            </div>
            
            <ChartContainer config={chartConfig}>
              <BarChart
                data={monthlyIncomeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [
                    `₹${value.toLocaleString('en-IN')}`, 
                    'Income'
                  ]}
                />
                <Bar 
                  dataKey="income" 
                  fill={CHART_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      )}

      {/* Monthly History Summary */}
      {monthlyHistory.length > 1 && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Monthly History</h3>
            </div>
            
            <div className="space-y-3">
              {monthlyHistory.slice(0, 3).map((stats) => {
                const monthName = new Date(stats.month + '-01').toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric'
                });
                
                return (
                  <div key={stats.month} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{monthName}</div>
                      <div className="text-xs text-muted-foreground">
                        {stats.customersServed} customers
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">
                        ₹{stats.totalIncome.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}