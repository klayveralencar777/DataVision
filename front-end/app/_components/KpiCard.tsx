import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function KPICard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: KPICardProps) {
  return (
    <Card className="p-6 border border-border/50 bg-card hover:bg-card/80 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/10">
      <CardHeader className="flex items-start justify-between mb-4">
        <CardTitle className="text-card-foreground font-medium text-sm">
          {title}
        </CardTitle>
        <Icon className="text-accent/60 w-5 h-5" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {trend && (
          <p
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% em relação ao mês anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
}
