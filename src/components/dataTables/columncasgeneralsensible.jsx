// columns/columncasgeneralsensible.jsx
// Colonnes du module "Cas Sensible Général".
// Les accessorKey sont en snake_case car l'API GetAllSensibleCases renvoie
// les lignes brutes de la table `sensible_cases` (+ u.name AS Agent).

// Formate une date/datetime MySQL ("YYYY-MM-DD HH:mm:ss") en format FR lisible.
const formatDateTime = (v) => {
  if (!v) return "—";
  const d = new Date(String(v).replace(" ", "T"));
  return isNaN(d.getTime()) ? v : d.toLocaleString("fr-FR");
};

// Formate une date seule ("YYYY-MM-DD").
const formatDate = (v) => {
  if (!v) return "—";
  const d = new Date(String(v).replace(" ", "T"));
  return isNaN(d.getTime()) ? v : d.toLocaleDateString("fr-FR");
};

export const columnsCasSensibleGeneral = [
  { header: "Nom", accessorKey: "nom" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Compagne",
    accessorKey: "compagne",
    // Affiche la précision si "autre" a été choisi.
    cell: ({ row }) =>
      row.original.compagne === "autre"
        ? row.original.compagne_autre || "Autre"
        : row.original.compagne,
  },
  { header: "Lieu", accessorKey: "lieu" },
  { header: "Type d'incident", accessorKey: "type_incident" },
  { header: "Responsable", accessorKey: "responsable" },
  {
    header: "Date incident",
    accessorKey: "date_incident",
    cell: ({ row }) => formatDateTime(row.original.date_incident),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <p className="min-w-[400px] max-w-[700px] whitespace-pre-wrap">
        {row.original.description}
      </p>
    ),
  },
  {
    header: "Signalé ?",
    accessorKey: "signalement",
    cell: ({ row }) => row.original.signalement || "—",
  },
  {
    header: "Signalé à",
    accessorKey: "signalement_qui",
    cell: ({ row }) => row.original.signalement_qui || "—",
  },
  {
    header: "Signalé le",
    accessorKey: "signalement_quand",
    cell: ({ row }) => formatDate(row.original.signalement_quand),
  },
  { header: "Agent", accessorKey: "Agent" },
  {
    header: "Créé le",
    accessorKey: "created_at",
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
];
