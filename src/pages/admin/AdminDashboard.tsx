import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, FolderTree, Tag } from "lucide-react";

export default function AdminDashboard() {
  const { data: productCount } = useQuery({
    queryKey: ["admin-product-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: categoryCount } = useQuery({
    queryKey: ["admin-category-count"],
    queryFn: async () => {
      const { count } = await supabase.from("categories").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: offerCount } = useQuery({
    queryKey: ["admin-offer-count"],
    queryFn: async () => {
      const { count } = await supabase.from("special_offers").select("*", { count: "exact", head: true }).eq("is_active", true);
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Products", value: productCount ?? 0, icon: Package, color: "text-primary" },
    { label: "Categories", value: categoryCount ?? 0, icon: FolderTree, color: "text-accent" },
    { label: "Active Offers", value: offerCount ?? 0, icon: Tag, color: "text-destructive" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
