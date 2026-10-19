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
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PartialUpdateMass } from "../../api/mass";
import { useAuth } from "../../context/AuthContext";

// ✅ Composant d’action
const CellAction = ({
  nom,
  id,
  description,
  information,
  quartier,
  cin,
  telephone,
  updated_at,
}) => {
  const [newDescription, setNewDescription] = useState(description);
  const [newInformation, setNewInformation] = useState(information);
  const [newQuartier, setNewQuartier] = useState(quartier);
  const [newCin, setNewCin] = useState(cin);
  const [newTelephone, setNewTelephone] = useState(telephone);
  const [newNom, setNewNom] = useState(nom);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") return null;

  const handleSave = async () => {
    const Donnee = {
      description: newDescription,
      quartier: newQuartier,
      information: newInformation,
      cin: newCin,
      nom: newNom,
      telephone: newTelephone,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await PartialUpdateMass(Donnee, id);
      if (response.success) {
        toast.success("Mise à jour réussie");
      } else {
        toast.error(response.message || "Échec de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Erreur serveur");
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
            Modifier la plainte de <strong>{nom}</strong>
          </DialogTitle>

          <DialogDescription>
            ID plainte : <strong>{id}</strong>
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

          {/* CIN */}
          <div>
            <label className="text-sm font-semibold">CIN</label>
            <input
              type="text"
              value={newCin}
              onChange={(e) => setNewCin(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>
          {/* ✅ Téléphone */}
          <div>
            <label className="text-sm font-semibold">Téléphone</label>
            <input
              type="text"
              value={newTelephone}
              onChange={(e) => setNewTelephone(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Quartier */}
          <div>
            <label className="text-sm font-semibold">Quartier</label>
            <Textarea
              value={newQuartier}
              onChange={(e) => setNewQuartier(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold">Description</label>
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Information */}
          <div>
            <label className="text-sm font-semibold">Information</label>
            <Textarea
              value={newInformation}
              onChange={(e) => setNewInformation(e.target.value)}
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

export default CellAction;

export const columnsaseri = [
  { header: "Numéro plainte", accessorKey: "numero" },
  { header: "Date saisi", accessorKey: "date" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe (e)", accessorKey: "Nomconjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Numero Etudiant universitaire", accessorKey: "numEtudiant" },
  { header: "Date Naissance", accessorKey: "Date_naissance" },
  { header: "CIN", accessorKey: "cin" },
  { header: "Région", accessorKey: "region" },
  { header: "Commune", accessorKey: "commune" },
  { header: "Quartier", accessorKey: "quartier" },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
  { header: "Creer par ", accessorKey: "agent" },

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
    header: "Actions",
    cell: ({ row }) => {
      const {
        nom,
        id,
        cin,
        description,
        information,
        quartier,
        updated_at,
        telephone,
      } = row.original;

      return (
        <CellAction
          nom={nom}
          id={id}
          cin={cin}
          telephone={telephone}
          description={description}
          information={information}
          quartier={quartier}
          updated_at={updated_at}
        />
      );
    },
  },
];
