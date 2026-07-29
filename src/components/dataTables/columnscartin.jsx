import { useState } from "react";
import { ImageIcon, Pencil, X } from "lucide-react";
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
import { PartialUpdateCartin } from "../../api/cartun";

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

// ✅ Composant d'action — même structure que CellAction des colis non trouvés
const CellActionCartin = ({
  id,
  nom,
  numero_telephone,
  numero_commande,
  date_commande,
  probleme,
  reponse_fournie,
  updated_at,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [newNom, setNewNom] = useState(nom);
  const [newTelephone, setNewTelephone] = useState(numero_telephone);
  const [newCommande, setNewCommande] = useState(numero_commande);
  const [newDateCommande, setNewDateCommande] = useState(date_commande);
  const [newProbleme, setNewProbleme] = useState(probleme);
  const [newReponseFournie, setNewReponseFournie] = useState(reponse_fournie);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  // Ré-initialise les champs avec les valeurs de la ligne à chaque ouverture
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setNewNom(nom);
      setNewTelephone(numero_telephone);
      setNewCommande(numero_commande);
      setNewDateCommande(date_commande);
      setNewProbleme(probleme);
      setNewReponseFournie(reponse_fournie);
    }
  };

  const handleSave = async () => {
    const donnee = {
      nom: newNom,
      numero_telephone: newTelephone,
      numero_commande: newCommande,
      date_commande: newDateCommande,
      probleme: newProbleme,
      reponse_fournie: newReponseFournie,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await PartialUpdateCartin(donnee, id);
      if (response?.success) {
        toast.success("Mise à jour réussie ✅");
        setOpen(false);
        onUpdated?.();
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
            Modifier le cartin de <strong>{nom}</strong>
          </DialogTitle>
          <DialogDescription>
            ID du cartin : <strong>{id}</strong>
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

          {/* Numéro de commande */}
          <div>
            <label className="text-sm font-semibold">Numéro de commande</label>
            <input
              type="text"
              value={newCommande}
              onChange={(e) => setNewCommande(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Date de commande */}
          <div>
            <label className="text-sm font-semibold">Date de commande</label>
            <input
              type="date"
              value={newDateCommande}
              onChange={(e) => setNewDateCommande(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Problème */}
          <div>
            <label className="text-sm font-semibold">Problème</label>
            <Textarea
              value={newProbleme}
              onChange={(e) => setNewProbleme(e.target.value)}
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

// ✅ Colonnes du tableau
export const columncartin = (onUpdated) => [
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
      <CellActionCartin
        id={row.original.id}
        nom={row.original.nom}
        numero_telephone={row.original.numero_telephone}
        numero_commande={row.original.numero_commande}
        date_commande={row.original.date_commande}
        probleme={row.original.probleme}
        reponse_fournie={row.original.reponse_fournie}
        updated_at={row.original.updated_at}
        onUpdated={onUpdated}
      />
    ),
  },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const nom = row?.original.nom;
//       return <CellAction nom={nom} />;
//     },
//   },
];
