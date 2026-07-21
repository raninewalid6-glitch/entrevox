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

export const columnsColisNonTrouver = [
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "telephone", header: "Téléphone" },
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.reference}
      </div>
    ),
  },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "provenance", header: "Provenance" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[300px] max-w-[500px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  {
    accessorKey: "reponse_fournie",
    header: "Réponse fournie",
    cell: ({ row }) => (
      <div className="min-w-[300px] max-w-[500px] whitespace-pre-wrap">
        {row.original.reponse_fournie}
      </div>
    ),
  },
  { accessorKey: "Agent", header: "Créé par" },

  // {
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const nom = row?.original.nom;
  //     return <CellAction nom={nom} />;
  //   },
  // },
];
