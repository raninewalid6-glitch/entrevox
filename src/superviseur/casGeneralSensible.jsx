import React, { useEffect } from "react";
import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnsCasSensibleGeneral } from "../components/dataTables/columncasgeneralsensible";
import useAsync from "../hooks/useAsync";
import { ShowSensibleCases } from "../api/casgeneralsensible";

export default function CasGeneralSensible() {
  const {
    data: cases,
    loading,
    error,
    execute,
  } = useAsync(ShowSensibleCases, []);

  useEffect(() => {
    execute();
  }, [execute]);

  // Sécurise les données (évite les erreurs TanStack si l'API renvoie autre chose)
  const safeData = Array.isArray(cases) ? cases : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-100">
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">
            Tous les cas sensibles généraux
          </h2>
        </div>

        {loading ? (
          <p className="text-slate-500 py-8 text-center">Chargement...</p>
        ) : error ? (
          <p className="text-red-500 py-8 text-center">
            Erreur lors du chargement des cas sensibles.
          </p>
        ) : (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
            <DataTable
              columns={columnsCasSensibleGeneral}
              data={safeData}
              TypeFilter="nom"
            />
          </div>
        )}
      </div>
    </div>
  );
}
