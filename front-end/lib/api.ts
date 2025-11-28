const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3555";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Erro desconhecido" }));
    throw new ApiError(response.status, error.error || error.message);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi<{
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
      }>("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    sendLoginEmail: (email: string) =>
      fetchApi<{ message: string }>("/send/send-login", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  },

  metrics: {
    getAll: () =>
      fetchApi<{
        totalCustomers: number;
        totalTransactions: number;
        activeCustomers: number;
        totalRevenue: number;
        averageTicket: number;
        conversionRate: number;
        topCustomers: Array<{ id: string; name: string; totalPaid: number }>;
      }>("/metrics"),
  },

  customers: {
    getAll: () =>
      fetchApi<
        Array<{
          id: string;
          name: string;
          email: string;
          phone: string;
          cpf: string;
          status: string;
          createdAt: string;
        }>
      >("/customers/find"),

    getById: (id: string) =>
      fetchApi<{
        id: string;
        name: string;
        email: string;
        phone: string;
        cpf: string;
        status: string;
        createdAt: string;
      }>(`/customers/find/${id}`),

    getByEmail: (email: string) =>
      fetchApi<{
        id: string;
        name: string;
        email: string;
        phone: string;
        cpf: string;
        status: string;
        createdAt: string;
      }>(`/customers/find/email/${email}`),

    create: (customer: {
      name: string;
      email: string;
      phone: string;
      cpf: string;
    }) =>
      fetchApi<{ id: string }>("/customers/create", {
        method: "POST",
        body: JSON.stringify(customer),
      }),

    deleteById: (id: string) =>
      fetchApi(`/customers/delete/${id}`, { method: "DELETE" }),

    deleteByEmail: (email: string) =>
      fetchApi(`/customers/delete/email/${email}`, { method: "DELETE" }),
  },

  transactions: {
    getAll: () =>
      fetchApi<
        Array<{
          id: string;
          amount: number;
          status: string;
          type: string;
          date: string;
          customerId: string;
        }>
      >("/transactions/find"),

    getById: (id: string) =>
      fetchApi<{
        id: string;
        amount: number;
        status: string;
        type: string;
        date: string;
        customerId: string;
      }>(`/transactions/find/${id}`),

    create: (transaction: {
      amount: number;
      status: string;
      type: string;
      customerId: string;
    }) =>
      fetchApi<{ id: string }>("/transactions/create", {
        method: "POST",
        body: JSON.stringify(transaction),
      }),
  },

  users: {
    getAll: () =>
      fetchApi<
        Array<{
          id: string;
          name: string;
          email: string;
          role: string;
          createdAt: string;
        }>
      >("/users/find"),

    getByEmail: (email: string) =>
      fetchApi<{
        id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string;
      }>(`/users/find/email/${email}`),
  },
};
