// columns.js
export const columnormaux = [
  {
    accessorKey: "Nom",
    header: "Nom",
  },
  {
    accessorKey: "Telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "Adresse",
    header: "Adresse",
  },
  {
    accessorKey: "Lieu",
    header: "Lieu",
  },
  {
    accessorKey: "Responsable",
    header: "Responsable",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleString("fr-FR"),
  },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Modification",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v).toLocaleString("fr-FR") : "—";
    },
  },
  {
    accessorKey: "Agent",
    header: "Créé par",
  },
];
