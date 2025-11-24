"use client";

import { useEffect, useState } from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Percent,
  CreditCard,
} from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import StatusChart from "../_components/StatusChart";
import CustomerSpendingChart from "../_components/CustomerSpendingChart";
import KPICard from "../_components/KpiCard";
import { Skeleton } from "../_components/ui/skeleton";
import Header from "./../_components/Header";

interface Metrics {
  totalCustomers: number;
  totalTransactions: number;
  activeCustomers: number;
  totalRevenue: number;
  averageTicket: number;
  conversionRate: number;
  topCustomers: Array<{ id: string; name: string; totalPaid: number }>;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMetrics = async (showToast = false) => {
    try {
      setIsRefreshing(true);
      const data = await api.metrics.getAll();
      setMetrics(data);
      if (showToast) toast.success("Dados atualizados!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Erro ao carregar métricas");
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onRefresh={() => loadMetrics(true)}
          isRefreshing={isRefreshing}
        />
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  // Simular transactionsByStatus já que o backend retorna apenas topCustomers
  const transactionsByStatus = {
    completed: Math.floor(
      metrics.totalTransactions * (metrics.conversionRate / 100)
    ),
    pending: Math.floor(metrics.totalTransactions * 0.15),
    failed: Math.floor(metrics.totalTransactions * 0.05),
    cancelled:
      metrics.totalTransactions -
      Math.floor(metrics.totalTransactions * (metrics.conversionRate / 100)) -
      Math.floor(metrics.totalTransactions * 0.15) -
      Math.floor(metrics.totalTransactions * 0.05),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onRefresh={() => loadMetrics(true)} isRefreshing={isRefreshing} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
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
            value={`R$ ${metrics.totalRevenue.toFixed(2)}`}
            icon={CreditCard}
            description="Receita total"
            trend={{ value: 15.7, isPositive: true }}
          />

          <KPICard
            title="Taxa de Conversão"
            value={`${metrics.conversionRate.toFixed(1)}%`}
            icon={Percent}
            description="Clientes ativos"
            trend={{ value: 3.1, isPositive: true }}
          />

          <KPICard
            title="Gasto Médio por Cliente"
            value={`R$ ${(
              metrics.totalRevenue / metrics.totalCustomers
            ).toFixed(2)}`}
            icon={TrendingUp}
            description="Média de gastos"
            trend={{ value: 7.4, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart data={transactionsByStatus} />
          <CustomerSpendingChart
            customers={metrics.topCustomers.map((c) => ({
              ...c,
              totalSpent: c.totalPaid,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
