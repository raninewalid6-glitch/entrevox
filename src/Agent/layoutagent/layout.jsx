import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const menuItems = [
  { name: "La Poste", path: "/agent/dashboard/poste" },
  { name: "CasGeneraleSensible", path: "/agent/dashboard/CasGeneraleSensible" },
  { name: "ADR", path: "/agent/dashboard/adr" },
  { name: "DPCR", path: "/agent/dashboard/dpcr" },
  { name: "Saba Bank", path: "/agent/dashboard/sababank" },
  { name: "East Africa Bank", path: "/agent/dashboard/eab" },
  { name: "Arulos", path: "/agent/dashboard/arulos" },
  { name: "CartIn", path: "/agent/dashboard/cartin" },
  { name: "Mass", path: "/agent/dashboard/mass" },
  { name: "Signalement", path: "/agent/dashboard/signalement" },
  { name: "Information", path: "/agent/dashboard/info" },
  { name: "Annulation commande", path: "/agent/dashboard/annulation" },
  { name: "Rechercher", path: "/agent/dashboard/recherche" },
];

export default function AgentLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/"); // Retour à la page de connexion
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold tracking-wide">Agent Panel</h1>
          </div>

          <nav className="mt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bouton déconnexion */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-4 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
