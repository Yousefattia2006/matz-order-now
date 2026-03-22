import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const success = await login(password);
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="ltr">
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
