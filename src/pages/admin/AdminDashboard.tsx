import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/data/categories";
import { useOffers } from "@/hooks/useOffers";
import { Package, FolderTree, Tag } from "lucide-react";

export default function AdminDashboard() {
  const { products } = useProducts();
  const { activeOffers } = useOffers();

  const stats = [
    { label: "Products", value: products.length, icon: Package, color: "text-primary" },
    { label: "Categories", value: categories.length, icon: FolderTree, color: "text-accent" },
    { label: "Active Offers", value: activeOffers.length, icon: Tag, color: "text-destructive" },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border">
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
