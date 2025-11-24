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
    <div className="sticky inset-0 bg-linear-to-br from-blue-950/20 via-purple-950/10 to-pink-950/20 border-b shadow-sm top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DataVision
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de Refresh - Apenas na Dashboard e se estiver logado */}
          {user && isDashboard && onRefresh && (
            <Button
              className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`text-white h-4 w-4 mr-2 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
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
    </div>
  );
};

export default Header;
