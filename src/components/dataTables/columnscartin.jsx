import { ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";

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
export const columncartin = [
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "numero_telephone", header: "Téléphone" },
  { accessorKey: "numero_commande", header: "Numéro de commande" },
  { accessorKey: "date_commande", header: "Commande de date" },
  { accessorKey: "date_enregistrement", header: "Enregistre le" },
  {
    accessorKey: "probleme",
    header: "Problèmes",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.probleme}
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
  {
    accessorKey: "photo",
    header: "Image",
    cell: ({ row }) => {
      const photoPath = row.original.photo;
      return (
        <div className="flex justify-center">
          {photoPath ? (
            <img
              src={`http://192.168.100.4:8080/CallCentre/callmanager/${photoPath}`}
              alt="Image utilisateur"
              className="object-cover rounded w-[64px] h-[64px]"
            />
          ) : (
            <span className="text-gray-500 italic">Aucune image</span>
          )}
        </div>
      );
    },
  },
  { accessorKey: "Agent", header: "Créer par" },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const nom = row?.original.nom;
//       return <CellAction nom={nom} />;
//     },
//   },
];
