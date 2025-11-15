import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type Customer } from "../../lib/mockData";

interface CustomerSpendingChartProps {
  customers: Customer[];
}

export default function CustomerSpendingChart({
  customers,
}: CustomerSpendingChartProps) {
  const maxSpent = Math.max(...customers.map((c) => c.totalSpent));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Clientes por Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer, index) => {
            const percentage = (customer.totalSpent / maxSpent) * 100;
            return (
              <div key={customer.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                  <span className="font-bold text-green-600">
                    R$ {customer.totalSpent.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-linear-to-r from-blue-500 to-blue-600"
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
