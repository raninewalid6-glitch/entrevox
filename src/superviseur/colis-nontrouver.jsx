import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnsColisNonTrouver } from "../components/dataTables/columnscolis-nontrouver";
import useAsync from "../hooks/useAsync";
import { ShowColis } from "../api/annulation_cmd";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ColisNontrouverData() {
  const { data, error, loading, execute } = useAsync(ShowColis, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <ToastContainer position="top-center" />
      <div className="w-[90%] mx-25">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Colis Non Trouvés
          </h1>
          <p className="text-slate-600">
            Suivi des colis manquants et non localisés
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Liste des colis non trouvés
            </h2>
          </div>
          <div className="p-6">
            <DataTable
              columns={columnsColisNonTrouver(execute)}
              data={safeData}
              TypeFilter="nom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
