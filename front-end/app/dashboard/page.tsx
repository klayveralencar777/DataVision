import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Percent,
  CreditCard,
} from "lucide-react";

import StatusChart from "../_components/StatusChart";
import CustomerSpendingChart from "../_components/CustomerSpendingChart";
import { calculateMetrics } from "../../lib/mockData";
import KPICard from "../_components/KpiCard";

export default function Dashboard() {
  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard de Métricas
          </h1>
          <p className="text-gray-600">Visão geral de clientes e transações</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="Total de Clientes"
            value={metrics.totalCustomers}
            icon={Users}
            description="Clientes cadastrados"
            trend={{ value: 12.5, isPositive: true }}
          />

          <KPICard
            title="Volume Total de Transações"
            value={metrics.totalTransactions}
            icon={ShoppingCart}
            description="Transações realizadas"
            trend={{ value: 8.3, isPositive: true }}
          />

          <KPICard
            title="Ticket Médio"
            value={`R$ ${metrics.averageTicket.toFixed(2)}`}
            icon={DollarSign}
            description="Valor médio por transação"
            trend={{ value: 5.2, isPositive: true }}
          />

          <KPICard
            title="Volume Total"
            value={`R$ ${metrics.totalVolume.toFixed(2)}`}
            icon={CreditCard}
            description="Receita total"
            trend={{ value: 15.7, isPositive: true }}
          />

          <KPICard
            title="Taxa de Conversão"
            value={`${metrics.conversionRate.toFixed(1)}%`}
            icon={Percent}
            description="Transações concluídas"
            trend={{ value: 3.1, isPositive: true }}
          />

          <KPICard
            title="Gasto Médio por Cliente"
            value={`R$ ${(metrics.totalVolume / metrics.totalCustomers).toFixed(
              2
            )}`}
            icon={TrendingUp}
            description="Média de gastos"
            trend={{ value: 7.4, isPositive: true }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart data={metrics.transactionsByStatus} />
          <CustomerSpendingChart customers={metrics.topCustomers} />
        </div>
      </div>
    </div>
  );
}
