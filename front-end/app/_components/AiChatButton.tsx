"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Loader } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(false);
  const { token, logout } = useAuth();

  const fetchAnalysis = async () => {
    setMessages([]);
    setIsLoading(true);

    try {
      const tokenToUse = token || localStorage.getItem("token");
      if (!tokenToUse) {
        setMessages([
          {
            role: "assistant",
            content: "Você não está autenticado. Faça login.",
          },
        ]);
        return;
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToUse}`,
      };

      const response = await fetch("http://localhost:3555/ai", {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // opcional: força logout do usuário para forçar novo login
          logout && logout();
          setMessages([
            {
              role: "assistant",
              content: "Sessão expirada. Faça login novamente.",
            },
          ]);
          return;
        }
        throw new Error(`AI request failed: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      let data: any;
      if (contentType.includes("application/json"))
        data = await response.json();
      else data = await response.text();

      const aiText =
        typeof data === "string"
          ? data
          : data?.response || data?.message || JSON.stringify(data);
      if (!mountedRef.current) return;
      setMessages([{ role: "assistant", content: aiText }]);
    } catch (err) {
      if (!mountedRef.current) return;
      console.error("Error fetching AI analysis:", err);
      setMessages([
        {
          role: "assistant",
          content: "Erro ao obter análise. Tente novamente.",
        },
      ]);
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    mountedRef.current = true;
    fetchAnalysis();
    return () => {
      mountedRef.current = false;
    };
  }, [isOpen]);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir chat IA"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center p-0"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Pergunte à IA</p>
        </TooltipContent>
      </Tooltip>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-96 bg-card border border-border/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-pink-500 p-4 text-white">
            <h3 className="font-semibold">Pergunte à IA</h3>
            <p className="text-sm text-blue-100">Análise de métricas e KPIs</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {isLoading && (
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analisando...</span>
                </div>
              </div>
            )}

            {!isLoading && messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <p>Carregando análise...</p>
              </div>
            )}

            {!isLoading &&
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
          </div>

          <div className="p-3 border-t border-border/50 bg-card">
            <Button
              onClick={fetchAnalysis}
              disabled={isLoading}
              className="w-full"
            >
              Tentar novamente
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
// ...existing code...
