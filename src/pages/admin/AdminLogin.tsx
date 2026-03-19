import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Welcome back!");
      navigate("/admin");
    } else {
      toast.error("Wrong password");
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
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
