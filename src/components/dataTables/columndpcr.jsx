import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// ✅ Composant d’action (boîte de confirmation)
const CellAction = ({ nom }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <X className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Supprimer {nom} ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce
            colis ?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes du tableau
export const columnDPCR = [
  { accessorKey: "identifiant_appel", header: "ID Appel" },
  { accessorKey: "user_type", header: "Usager" },
  { accessorKey: "caller_name", header: "Plaignant" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "request_type", header: "Type de requête" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "region", header: "Région" },
  { accessorKey: "city", header: "Ville" },
  { accessorKey: "road_name", header: "Route" },
  { accessorKey: "datetime", header: "Date" },
  { accessorKey: "gravite", header: "Gravité" },
  
  // ✅ Informations du formulaire "Informer les services"
  {
    accessorKey: "dpcr",
    header: "DPCR informé",
    cell: ({ row }) =>
      row.original.dpcr || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "gendarmerie",
    header: "Gendarmerie",
    cell: ({ row }) =>
      row.original.gendarmerie || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "smur",
    header: "SMUR",
    cell: ({ row }) =>
      row.original.smur || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "inform_date",
    header: "Services informés le",
    cell: ({ row }) => {
      const date = row.original.inform_date;
      if (!date) return <span className="text-gray-400">—</span>;
      return (
        <span className="text-sm text-gray-700 whitespace-nowrap">
          {new Date(date).toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      );
    },
  },
  { accessorKey: "attachments", header: "Pièces jointes" },
  { header: "Creer par ", accessorKey: "agent" },

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
