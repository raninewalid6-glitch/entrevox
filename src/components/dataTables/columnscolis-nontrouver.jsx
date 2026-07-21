import { useState } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { PartialUpdateColis } from "../../api/coli_non_found";

// ✅ Composant d'action — même structure que CellAction du Signalement
const CellActionColis = ({
  id,
  nom,
  telephone,
  reference,
  type,
  provenance,
  date,
  commentaire,
  reponse_fournie,
  updated_at,
}) => {
  const [newNom, setNewNom] = useState(nom);
  const [newTelephone, setNewTelephone] = useState(telephone);
  const [newReference, setNewReference] = useState(reference);
  const [newType, setNewType] = useState(type);
  const [newProvenance, setNewProvenance] = useState(provenance);
  const [newDate, setNewDate] = useState(date);
  const [newCommentaire, setNewCommentaire] = useState(commentaire);
  const [newReponseFournie, setNewReponseFournie] = useState(reponse_fournie);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  const handleSave = async () => {
    const donnee = {
      nom: newNom,
      telephone: newTelephone,
      reference: newReference,
      type: newType,
      provenance: newProvenance,
      date: newDate,
      commentaire: newCommentaire,
      reponse_fournie: newReponseFournie,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await PartialUpdateColis(donnee, id);
      if (response?.success) {
        toast.success("Mise à jour réussie ✅");
      } else {
        toast.error("Échec : " + (response?.error || "Erreur inconnue"));
        console.log(response?.details);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier le colis de <strong>{nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID du colis : <strong>{id}</strong>
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
            <label className="text-sm font-semibold">Nom du client</label>
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

          {/* Référence */}
          <div>
            <label className="text-sm font-semibold">Référence</label>
            <input
              type="text"
              value={newReference}
              onChange={(e) => setNewReference(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Type de colis */}
          <div>
            <label className="text-sm font-semibold">Type de colis</label>
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Provenance */}
          <div>
            <label className="text-sm font-semibold">Provenance</label>
            <input
              type="text"
              value={newProvenance}
              onChange={(e) => setNewProvenance(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
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

          {/* Réponse fournie */}
          <div>
            <label className="text-sm font-semibold">Réponse fournie</label>
            <Textarea
              value={newReponseFournie}
              onChange={(e) => setNewReponseFournie(e.target.value)}
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
      <CellActionColis
        id={row.original.id}
        nom={row.original.nom}
        telephone={row.original.telephone}
        reference={row.original.reference}
        type={row.original.type}
        provenance={row.original.provenance}
        date={row.original.date}
        commentaire={row.original.commentaire}
        reponse_fournie={row.original.reponse_fournie}
        updated_at={row.original.updated_at}
      />
    ),
  },
];
