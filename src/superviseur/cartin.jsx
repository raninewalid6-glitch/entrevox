"use client";
import { DataTable } from "../components/dataTables/Tables/data-table";
import { columncartin } from "../components/dataTables/columnscartin";
import useAsync from "../hooks/useAsync";
import { GetAllCartin } from "../api/cartun";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartinData() {
  const { data, error, loading, execute } = useAsync(GetAllCartin, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-slate-100 py-8 w-full">
      <ToastContainer position="top-center" />
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3"></div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion Cartin
          </h1>
          <p className="text-slate-600">
            Suivi des commandes et gestion des colis
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions Cartin
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            {loading || safeData.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium mb-1">
                  Aucune commande enregistrée
                </p>
                <p className="text-slate-500 text-sm">
                  Les commandes Cartin apparaîtront ici une fois ajoutées
                </p>
              </div>
            ) : (
              <DataTable
                columns={columncartin(execute)}
                data={safeData}
                TypeFilter="nom"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
