import React from "react";
import EditPgireButton from "./EditPgireButton";

function formatDate(value) {
  if (!value) return "—";

  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match || match[1] === "0000") return "—";

  return `${match[3]}/${match[2]}/${match[1]}`;
}

function textColumn(accessorKey, header) {
  return {
    accessorKey,
    header,
    cell: ({ getValue }) => getValue() || "—",
  };
}

function dateColumn(accessorKey, header) {
  return {
    accessorKey,
    header,
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap">
        {formatDate(getValue())}
      </span>
    ),
  };
}

function longTextColumn(accessorKey, header) {
  return {
    accessorKey,
    header,
    cell: ({ getValue }) => (
      <div className="min-w-[280px] max-w-[500px] whitespace-pre-wrap break-words">
        {getValue() || "—"}
      </div>
    ),
  };
}

function badgeColumn(accessorKey, header, colors, fallback = "—") {
  return {
    accessorKey,
    header,
    cell: ({ getValue }) => {
      const value = getValue();

      return (
        <span
          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
            colors[value] || "bg-slate-100 text-slate-600"
          }`}
        >
          {value || fallback}
        </span>
      );
    },
  };
}

export const Pgirecolumns = [
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <EditPgireButton plainte={row.original} />
    ),
  },

  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap font-semibold text-slate-700">
        {getValue() || "—"}
      </span>
    ),
  },

  dateColumn("dateDepot", "Date de dépôt"),
  textColumn("nom", "Nom du réclamant"),
  textColumn("nomConjoint", "Nom du conjoint / de la conjointe"),
  textColumn("telephone", "Téléphone"),
  dateColumn("dateNaissance", "Date de naissance"),
  textColumn("cin", "CIN"),
  textColumn("genre", "Genre"),
  textColumn("region", "Région"),
  textColumn("localite", "Localité"),

  badgeColumn("categorie", "Catégorie", {
    Plainte: "bg-amber-100 text-amber-800",
    Doléance: "bg-green-100 text-green-800",
  }),

  longTextColumn("plainte", "Motif de la demande"),
  longTextColumn("descriptionPlainte", "Description de la plainte / doléance"),
  longTextColumn("information", "Information complémentaire"),
  textColumn("nomDelegue", "Nom du délégué"),
  dateColumn("dateResolution", "Date de résolution"),
  longTextColumn("resolutionComiteLocal", "Résolution du comité local"),

  badgeColumn(
    "satisfaction",
    "Satisfaction",
    {
      "Satisfait(e)": "bg-green-100 text-green-800",
      "Partiellement satisfait(e)": "bg-yellow-100 text-yellow-800",
      "Insatisfait(e)": "bg-red-100 text-red-800",
      "Non évaluée": "bg-slate-100 text-slate-600",
    },
    "Non renseignée"
  ),

  badgeColumn("statutPlainte", "Statut", {
    "En cours": "bg-yellow-100 text-yellow-800",
    Résolue: "bg-green-100 text-green-800",
    Clôturée: "bg-slate-200 text-slate-700",
  }),

  dateColumn("created_at", "Date de création"),
  textColumn("agent", "Créé par"),
];