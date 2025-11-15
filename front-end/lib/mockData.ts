export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
}

// Dados mockados de transações
export const transactions: Transaction[] = [
  { id: '1', customerId: 'c1', amount: 150.00, status: 'completed', date: '2024-01-15' },
  { id: '2', customerId: 'c2', amount: 320.50, status: 'completed', date: '2024-01-16' },
  { id: '3', customerId: 'c1', amount: 89.99, status: 'pending', date: '2024-01-17' },
  { id: '4', customerId: 'c3', amount: 450.00, status: 'completed', date: '2024-01-18' },
  { id: '5', customerId: 'c4', amount: 200.00, status: 'failed', date: '2024-01-19' },
  { id: '6', customerId: 'c2', amount: 175.25, status: 'completed', date: '2024-01-20' },
  { id: '7', customerId: 'c5', amount: 99.99, status: 'completed', date: '2024-01-21' },
  { id: '8', customerId: 'c3', amount: 300.00, status: 'cancelled', date: '2024-01-22' },
  { id: '9', customerId: 'c1', amount: 125.50, status: 'completed', date: '2024-01-23' },
  { id: '10', customerId: 'c6', amount: 275.00, status: 'pending', date: '2024-01-24' },
  { id: '11', customerId: 'c4', amount: 180.00, status: 'completed', date: '2024-01-25' },
  { id: '12', customerId: 'c7', amount: 420.00, status: 'completed', date: '2024-01-26' },
  { id: '13', customerId: 'c5', amount: 95.00, status: 'failed', date: '2024-01-27' },
  { id: '14', customerId: 'c8', amount: 350.00, status: 'completed', date: '2024-01-28' },
  { id: '15', customerId: 'c6', amount: 210.00, status: 'completed', date: '2024-01-29' },
];

// Dados mockados de clientes
export const customers: Customer[] = [
  { id: 'c1', name: 'João Silva', email: 'joao@email.com', totalSpent: 365.49 },
  { id: 'c2', name: 'Maria Santos', email: 'maria@email.com', totalSpent: 495.75 },
  { id: 'c3', name: 'Pedro Oliveira', email: 'pedro@email.com', totalSpent: 750.00 },
  { id: 'c4', name: 'Ana Costa', email: 'ana@email.com', totalSpent: 380.00 },
  { id: 'c5', name: 'Carlos Souza', email: 'carlos@email.com', totalSpent: 194.99 },
  { id: 'c6', name: 'Juliana Lima', email: 'juliana@email.com', totalSpent: 485.00 },
  { id: 'c7', name: 'Roberto Alves', email: 'roberto@email.com', totalSpent: 420.00 },
  { id: 'c8', name: 'Fernanda Rocha', email: 'fernanda@email.com', totalSpent: 350.00 },
];

// Cálculo das métricas
export const calculateMetrics = () => {
  const totalCustomers = customers.length;
  const totalTransactions = transactions.length;
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTicket = totalVolume / totalTransactions;
  
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const conversionRate = (completedTransactions / totalTransactions) * 100;
  
  const transactionsByStatus = transactions.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
  
  return {
    totalCustomers,
    totalTransactions,
    totalVolume,
    averageTicket,
    conversionRate,
    transactionsByStatus,
    topCustomers,
  };
};