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
import { PartialUpdateNormal } from "../../api/adr";

// ✅ Bouton "Modifier" + modal — même structure que le module Cartin
const CellActionNormal = ({
  id,
  Nom,
  Telephone,
  Email,
  Adresse,
  Lieu,
  Responsable,
  date,
  commentaire,
  updated_at,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [newNom, setNewNom] = useState(Nom);
  const [newTelephone, setNewTelephone] = useState(Telephone);
  const [newEmail, setNewEmail] = useState(Email);
  const [newAdresse, setNewAdresse] = useState(Adresse);
  const [newLieu, setNewLieu] = useState(Lieu);
  const [newResponsable, setNewResponsable] = useState(Responsable);
  const [newDate, setNewDate] = useState(String(date || "").slice(0, 10));
  const [newCommentaire, setNewCommentaire] = useState(commentaire);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  // Ré-initialise les champs à chaque ouverture
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setNewNom(Nom);
      setNewTelephone(Telephone);
      setNewEmail(Email);
      setNewAdresse(Adresse);
      setNewLieu(Lieu);
      setNewResponsable(Responsable);
      setNewDate(String(date || "").slice(0, 10));
      setNewCommentaire(commentaire);
    }
  };

  const handleSave = async () => {
    const donnee = {
      Nom: newNom,
      Telephone: newTelephone,
      Email: newEmail,
      Adresse: newAdresse,
      Lieu: newLieu,
      Responsable: newResponsable,
      date: newDate,
      commentaire: newCommentaire,
    };

    try {
      const response = await PartialUpdateNormal(donnee, id);
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
            <label className="text-sm font-semibold">Email</label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Adresse</label>
            <input
              type="text"
              value={newAdresse}
              onChange={(e) => setNewAdresse(e.target.value)}
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
            <label className="text-sm font-semibold">Commentaire</label>
            <Textarea
              value={newCommentaire}
              onChange={(e) => setNewCommentaire(e.target.value)}
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
export const columnormaux = (onUpdated) => [
  { accessorKey: "Nom", header: "Nom" },
  { accessorKey: "Telephone", header: "Téléphone" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Adresse", header: "Adresse" },
  { accessorKey: "Lieu", header: "Lieu" },
  { accessorKey: "Responsable", header: "Responsable" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const v = getValue();
      return v ? new Date(v).toLocaleString("fr-FR") : "—";
    },
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
      <CellActionNormal
        id={row.original.id}
        Nom={row.original.Nom}
        Telephone={row.original.Telephone}
        Email={row.original.Email}
        Adresse={row.original.Adresse}
        Lieu={row.original.Lieu}
        Responsable={row.original.Responsable}
        date={row.original.date}
        commentaire={row.original.commentaire}
        updated_at={row.original.updated_at}
        onUpdated={onUpdated}
      />
    ),
  },
];
