import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type Customer } from "../../lib/mockData";

interface CustomerSpendingChartProps {
  customers: Customer[];
}

export default function CustomerSpendingChart({
  customers,
}: CustomerSpendingChartProps) {
  const maxSpent = Math.max(...customers.map((c) => c.totalSpent));
  const topCustomers = customers.slice(0, 5);

  return (
    <Card className="p-6 border border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground mb-4">
          Top 5 Clientes por Gastos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {customers.map((customer, index) => {
            const percentage = (customer.totalSpent / maxSpent) * 100;
            return (
              <div
                key={customer.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-accent/70">
                    #{index + 1}
                  </span>
                  <span className="text-sm text-card-foreground">
                    {customer.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-1 ml-auto justify-end">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-blue-400 ml-2 min-w-20 text-right">
                    R$ {customer.totalSpent.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {topCustomers.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum cliente encontrado
          </p>
        )}
      </CardContent>
    </Card>
  );
}
