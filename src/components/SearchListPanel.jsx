"use client";

import { useState } from "react";

/**
 * Panneau de recherche réutilisable (colonne de droite façon "Commerce").
 *
 * Props :
 *  - title           : titre du panneau
 *  - items           : tableau des enregistrements
 *  - loading         : booléen (affiche "Chargement...")
 *  - searchKeys      : clés sur lesquelles porte la recherche texte
 *  - searchPlaceholder
 *  - fields          : [{ key, label }] champs affichés dans chaque carte
 *  - headerExtra     : contenu optionnel affiché AU-DESSUS de la barre de recherche
 *                      (ex : sélecteur de projet pour Mass)
 *  - emptyText       : texte quand la liste est vide
 */
export default function SearchListPanel({
  title,
  items,
  loading = false,
  searchKeys = [],
  searchPlaceholder = "Rechercher...",
  fields = [],
  headerExtra = null,
  emptyText = "Aucun enregistrement trouvé",
}) {
  const [term, setTerm] = useState("");

  const list = Array.isArray(items) ? items : [];

  const filtered = list.filter((it) => {
    if (!term.trim()) return true;
    const q = term.toLowerCase();
    return searchKeys.some((k) =>
      String(it?.[k] ?? "")
        .toLowerCase()
        .includes(q),
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>

      {headerExtra}

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Liste */}
      <div className="overflow-auto max-h-[900px]">
        {loading ? (
          <p className="text-gray-500 text-center py-8">Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{emptyText}</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((it, index) => (
              <div
                key={it?.id ?? index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="text-sm space-y-1">
                  {fields.map((f) => (
                    <p key={f.key} className="break-words">
                      <span className="font-medium">{f.label} :</span>{" "}
                      {it?.[f.key] !== undefined &&
                      it?.[f.key] !== null &&
                      it?.[f.key] !== ""
                        ? it[f.key]
                        : "—"}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
