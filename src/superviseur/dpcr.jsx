import { useEffect } from "react";
import { DpcrShow } from "../api/dpcr";
import { columnDPCR } from "../components/dataTables/columndpcr";
import { DataTable } from "../components/dataTables/Tables/data-table";
import useAsync from "../hooks/useAsync";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SupDpcr() {
  const { data, error, loading, execute } = useAsync(DpcrShow, []);

  useEffect(() => {
    execute();
  }, [execute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-slate-100 py-8 w-full">
      <ToastContainer position="top-center" />
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Tableau DPCR
          </h1>
          <p className="text-slate-600">
            Gestion des incidents et urgences routières
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Registre des interventions DPCR
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Liste complète des opérations enregistrées
            </p>
          </div>
          {loading ? (
            <div className="p-6 text-center text-blue-600 font-bold">
              Chargement des données...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600 font-bold">
              Erreur lors du chargement des données : {error.message}
            </div>
          ) : (
            <div className="p-6">
              <DataTable
                columns={columnDPCR(execute)}
                data={safeData}
                TypeFilter="caller_name"
                DateFilter="date"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
