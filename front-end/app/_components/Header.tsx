"use client";

import { RefreshCw, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import UserMenu from "./userMenu";

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const Header = ({ onRefresh, isRefreshing = false }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="bg-linear-to-r from-blue-600 to-pink-500 shadow-xl border-b border-pink-400/20 px-5">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">DataVision</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de Refresh - Apenas na Dashboard e se estiver logado */}
          {user && isDashboard && onRefresh && (
            <Button
              className="border-white/30 text-white hover:bg-white/10 bg-white/5"
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          )}

          {/* User Menu ou Botão de Login */}
          {user ? (
            <UserMenu />
          ) : (
            <Button variant="default" size="sm" onClick={handleLoginClick}>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
