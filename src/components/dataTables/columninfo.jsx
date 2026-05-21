import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import { Info_Update } from "../../api/information"; // ← adaptez le chemin

// ✅ Composant d'action (modification)
const CellAction = ({ nom, id, telephone, commentaire, updated_at }) => {
  const [newNom, setNewNom] = useState(nom);
  const [newTelephone, setNewTelephone] = useState(telephone);
  const [newCommentaire, setNewCommentaire] = useState(commentaire);
  const { user } = useAuth();

  // ⚠️ Adaptez le rôle autorisé selon votre logique métier
  if (user?.role !== "chefCentre") {
    return null;
  }

  const handleSave = async () => {
    const Donnee = {
      nom: newNom,
      telephone: newTelephone,
      commentaire: newCommentaire,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await Info_Update(Donnee, id);
      if (response.success) {
        toast.success("Mise à jour réussie");
      } else {
        toast.error("Échec de la mise à jour : " + response.message);
      }
      console.log("Données à enregistrer :", Donnee, "ID :", id);
      toast.success("Mise à jour réussie");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <Dialog>
      <ToastContainer position="top-center" />
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Modifier l'enregistrement de <strong>{nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID : <strong>{id}</strong>
          </DialogDescription>
          {updated_at && (
            <p className="text-sm text-gray-500">
              Dernière modification :{" "}
              <strong>
                {new Date(updated_at).toLocaleDateString("fr-FR")}
              </strong>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {/* Nom */}
          <div>
            <label className="text-sm font-semibold">Nom</label>
            <input
              type="text"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="text-sm font-semibold">Téléphone</label>
            <input
              type="text"
              value={newTelephone}
              onChange={(e) => setNewTelephone(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Commentaire */}
          <div>
            <label className="text-sm font-semibold">Commentaire</label>
            <Textarea
              value={newCommentaire}
              onChange={(e) => setNewCommentaire(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary">Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ✅ Colonnes pour Information
export const columnsInformation = [
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "type", header: "Compagne" },
  { accessorKey: "telephone", header: "Téléphone" },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  { accessorKey: "created_at", header: "Date Enregistrement" },
  { accessorKey: "agent", header: "Créé par" },
  {
    accessorKey: "updated_at",
    header: "Dernière modification",
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
    header: "Actions",
    cell: ({ row }) => {
      const nom = row?.original.nom;
      const id = row?.original.id;
      const telephone = row?.original.telephone;
      const commentaire = row?.original.commentaire;
      const updated_at = row?.original.updated_at;
      return (
        <CellAction
          nom={nom}
          id={id}
          telephone={telephone}
          commentaire={commentaire}
          updated_at={updated_at}
        />
      );
    },
  },
];
