// columns/columnsSensibles.jsx
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CellAction = ({ nom }) => (
  <Dialog>
    <DialogTrigger>
      <X className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
    </DialogTrigger>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Supprimer {nom} ?</DialogTitle>
        <DialogDescription>
          Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce
          cas sensible ?
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export const columnsSensibles = [
  { header: "Nom", accessorKey: "Nom" },
  { header: "Téléphone", accessorKey: "Telephone" },
  { header: "Lieu", accessorKey: "Lieu" },
  { header: "Type", accessorKey: "Type" },
  { header: "Responsable", accessorKey: "Responsable" },
  { header: "Date", accessorKey: "Date" },
  {
    header: "Description",
    accessorKey: "Description",
    cell: ({ row }) => (

      <p className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
 
        {row.original.Description}{" "}
      </p>
    ),
  },
  {
    header: "Modification",
    accessorKey: "updated_at",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v).toLocaleString("fr-FR") : "—";
    },
  },
  { header: "Agent", accessorKey: "Agent" },
  // {
  //   header: "Actions",
  //   cell: ({ row }) => <CellAction nom={row.original.nom} />,
  // },
];
