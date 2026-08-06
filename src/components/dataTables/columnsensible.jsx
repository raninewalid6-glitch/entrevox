// columns/columnsSensibles.jsx
import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { PartialUpdateSensible } from "../../api/adr";

// ✅ Bouton "Modifier" + modal — même structure que le module Cartin
const CellActionSensible = ({
  id,
  Nom,
  Telephone,
  Lieu,
  Type,
  Responsable,
  date,
  Description,
  updated_at,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [newNom, setNewNom] = useState(Nom);
  const [newTelephone, setNewTelephone] = useState(Telephone);
  const [newLieu, setNewLieu] = useState(Lieu);
  const [newType, setNewType] = useState(Type);
  const [newResponsable, setNewResponsable] = useState(Responsable);
  const [newDate, setNewDate] = useState(String(date || "").slice(0, 10));
  const [newDescription, setNewDescription] = useState(Description);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setNewNom(Nom);
      setNewTelephone(Telephone);
      setNewLieu(Lieu);
      setNewType(Type);
      setNewResponsable(Responsable);
      setNewDate(String(date || "").slice(0, 10));
      setNewDescription(Description);
    }
  };

  const handleSave = async () => {
    const donnee = {
      Nom: newNom,
      Telephone: newTelephone,
      Lieu: newLieu,
      Type: newType,
      Responsable: newResponsable,
      date: newDate,
      Description: newDescription,
    };

    try {
      const response = await PartialUpdateSensible(donnee, id);
      if (response?.success) {
        toast.success("Mise à jour réussie ✅");
        setOpen(false);
        onUpdated?.();
      } else {
        toast.error("Échec : " + (response?.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier le cas de <strong>{Nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID : <strong>{id}</strong>
          </DialogDescription>
          {updated_at && (
            <p className="text-sm text-gray-500">
              Dernière modification :{" "}
              <strong>{new Date(updated_at).toLocaleDateString("fr-FR")}</strong>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Nom</label>
            <input
              type="text"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Téléphone</label>
            <input
              type="text"
              value={newTelephone}
              onChange={(e) => setNewTelephone(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Lieu</label>
            <input
              type="text"
              value={newLieu}
              onChange={(e) => setNewLieu(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Type</label>
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Responsable</label>
            <input
              type="text"
              value={newResponsable}
              onChange={(e) => setNewResponsable(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Description</label>
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes du tableau (fonction pour recevoir le callback de rafraîchissement)
export const columnsSensibles = (onUpdated) => [
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
  { header: "Agent", accessorKey: "Agent" },
  {
    header: "Dernière modification",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      const date = row.original.updated_at;
      if (!date) return <span className="text-gray-400">—</span>;
      return (
        <span className="text-sm text-gray-700">
          {new Date(date).toLocaleDateString("fr-FR")}
        </span>
      );
    },
  },
  {
    header: "Modification",
    cell: ({ row }) => (
      <CellActionSensible
        id={row.original.id}
        Nom={row.original.Nom}
        Telephone={row.original.Telephone}
        Lieu={row.original.Lieu}
        Type={row.original.Type}
        Responsable={row.original.Responsable}
        date={row.original.Date}
        Description={row.original.Description}
        updated_at={row.original.updated_at}
        onUpdated={onUpdated}
      />
    ),
  },
];
