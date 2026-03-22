import { useState, createContext, useContext, ReactNode, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const ADMIN_KEY = "tazamart-admin-session";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY);
    if (stored) {
      try {
        const { access_token, refresh_token } = JSON.parse(stored);
        supabase.auth.setSession({ access_token, refresh_token }).then(({ data }) => {
          if (data.session) {
            setIsLoggedIn(true);
          } else {
            sessionStorage.removeItem(ADMIN_KEY);
          }
        });
      } catch {
        sessionStorage.removeItem(ADMIN_KEY);
      }
    }
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { password },
      });

      if (error || !data?.session) {
        return false;
      }

      const { access_token, refresh_token } = data.session;
      await supabase.auth.setSession({ access_token, refresh_token });

      sessionStorage.setItem(ADMIN_KEY, JSON.stringify({ access_token, refresh_token }));
      setIsLoggedIn(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem(ADMIN_KEY);
    setIsLoggedIn(false);
    window.location.href = "/";
  }, []);

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
