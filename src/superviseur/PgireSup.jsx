import React, { useCallback, useEffect, useRef, useState } from "react";
import { ShowPgire } from "../api/pgire";
import { Pgirecolumns } from "../components/dataTables/columnPgire";
import { DataTable } from "../components/dataTables/Tables/data-table";

export default function PgireSup() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mounted = useRef(false);
  const requestNumber = useRef(0);

  const loadPlaintes = useCallback(async () => {
    const currentRequest = ++requestNumber.current;

    setLoading(true);
    setError("");

    try {
      const result = await ShowPgire();

      if (
        mounted.current &&
        currentRequest === requestNumber.current
      ) {
        setData(result);
      }
    } catch (err) {
      if (
        mounted.current &&
        currentRequest === requestNumber.current
      ) {
        setError(
          err.message || "Impossible de charger les demandes PGIRE."
        );
      }
    } finally {
      if (
        mounted.current &&
        currentRequest === requestNumber.current
      ) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadPlaintes();

    function handleUpdated(event) {
      setSuccess(
        event.detail?.message || "Dossier modifié avec succès."
      );
      loadPlaintes();
    }

    window.addEventListener("pgire:updated", handleUpdated);

    return () => {
      mounted.current = false;
      requestNumber.current += 1;
      window.removeEventListener("pgire:updated", handleUpdated);
    };
  }, [loadPlaintes]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 py-8">
      <div className="mx-auto w-[95%] max-w-screen-2xl sm:w-[90%]">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-green-800 px-4 py-1.5 text-sm font-semibold text-white">
            PGIRE
          </span>

          <h1 className="mb-3 mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gestion de PGIRE
          </h1>

          <p className="text-lg text-slate-600">
            Suivi des plaintes et doléances du projet PGIRE
          </p>
        </div>

        {success && (
          <p
            role="status"
            className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {success}
          </p>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Registre des demandes PGIRE
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Liste complète des plaintes et doléances enregistrées
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={loadPlaintes}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
            >
              {loading ? "Chargement…" : "Actualiser"}
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {error} Cliquez sur « Actualiser » pour réessayer.
              </p>
            )}

            {loading && data.length === 0 ? (
              <p role="status" className="py-10 text-center text-slate-500">
                Chargement des demandes PGIRE…
              </p>
            ) : (
              <div className="overflow-x-auto" aria-busy={loading}>
                <DataTable
                  columns={Pgirecolumns}
                  data={data}
                  TypeFilter="nom"
                  DateFilter="created_at"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}