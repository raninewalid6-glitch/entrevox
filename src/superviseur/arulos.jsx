"use client";

import { DataTable } from "../components/dataTables/Tables/data-table";
import { Aruloscolumns } from "../components/dataTables/columnarulos";
import { GetAllArulos } from "../api/arulos";
import useAsync from "../hooks/useAsync";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Arulos() {
  const { data, error, loading, execute } = useAsync(GetAllArulos, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8 w-full">
      <ToastContainer position="top-center" />
      <div className="w-[90%] mx-25">
        {/* Header avec badge */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Gestion des Logements et Interventions ARULOS
          </h1>
          <p className="text-slate-600 text-lg">
            Suivi des projets, interventions et affectations des équipements
          </p>
        </div>

        {/* Tableau principal */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions ARULOS
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          <div className="p-6">
            <DataTable
              columns={Aruloscolumns(execute)}
              data={safeData}
              TypeFilter="nom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
