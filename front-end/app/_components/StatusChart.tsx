import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatusChartProps {
  data: Record<string, number>;
}

const statusColors: Record<string, string> = {
  completed: "bg-green-500",
  pending: "bg-yellow-500",
  failed: "bg-red-500",
  cancelled: "bg-gray-500",
};

const statusLabels: Record<string, string> = {
  completed: "Concluídas",
  pending: "Pendentes",
  failed: "Falhas",
  cancelled: "Canceladas",
};

export default function StatusChart({ data }: StatusChartProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações por Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(data).map(([status, count]) => {
            const percentage = (count / total) * 100;
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {statusLabels[status] || status}
                  </span>
                  <span className="text-muted-foreground">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${statusColors[status]}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
