import { Pencil, X } from "lucide-react";
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
import { PartialUpdateMass } from "../../api/mass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

// ✅ Composant d'action (boîte de confirmation)
const CellAction = ({
  nom,
  id,
  description,
  information,
  quartier,
  cin,
  updated_at,
  telephone,
  Date_naissance,
  Nomconjointe,
}) => {
  const [newDescription, setNewDescription] = useState(description);
  const [newInformation, setNewInformation] = useState(information);
  const [newQuartier, setNewQuartier] = useState(quartier);
  const [newCin, setNewCin] = useState(cin);
  const [newTelephone, setNewTelephone] = useState(telephone);
  const [newDateNaissance, setNewDateNaissance] = useState(Date_naissance);
  const [newNom, setNewNom] = useState(nom);
  const [newNomconjointe, setNewNomconjointe] = useState(Nomconjointe);
  const { user } = useAuth();

  if (user?.role != "chefCentre") {
    return null;
  }

  const handleSave = async () => {
    const Donnee = {
      cin: newCin,
      nom: newNom,
      Nomconjointe: newNomconjointe,
      telephone: newTelephone,
      Date_naissance: newDateNaissance,
      description: newDescription,
      quartier: newQuartier,
      information: newInformation,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };
    console.log("DONNEE ENVOYÉE :", Donnee);

    try {
      const response = await PartialUpdateMass(Donnee, id);
      if (response.success) {
        toast.success("Mise à jour réussie");
      } else {
        toast.error("Échec de la mise à jour partielle :", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour partielle :", error);
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
            ID de la plainte : <strong>{id}</strong>
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

          {/* ✅ Nom conjoint(e) */}
          <div>
            <label className="text-sm font-semibold">Nom conjoint(e)</label>
            <input
              type="text"
              value={newNomconjointe}
              onChange={(e) => setNewNomconjointe(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* ✅ CIN */}
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
          {/* ✅ Date de Naissance */}
          <div>
            <label className="text-sm font-semibold">Date de Naissance</label>
            <input
              type="date"
              value={newDateNaissance}
              onChange={(e) => setNewDateNaissance(e.target.value)}
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

export const columnsagr = [
  { header: "Numéro plainte", accessorKey: "numero" },
  { header: "Date saisi", accessorKey: "date" },
  { header: "Nom", accessorKey: "nom" },
  { header: "Nom conjointe (e)", accessorKey: "Nomconjointe" },
  { header: "Téléphone", accessorKey: "telephone" },
  { header: "Date Naissance", accessorKey: "Date_naissance" },
  { header: "CIN", accessorKey: "cin" },
  {
    header: "Genre",
    accessorKey: "genre",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.genre === "Femme"
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.genre}
      </span>
    ),
  },
  { header: "Région", accessorKey: "region" },
  { header: "commune", accessorKey: "commune" },
  { header: "Quartier", accessorKey: "quartier" },
  {
    header: "Description plainte",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.description}
      </div>
    ),
  },
  {
    header: "Information",
    accessorKey: "information",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.information}
      </div>
    ),
  },
  {
    header: "category plainte",
    accessorKey: "category_plainte",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.original.category_plainte === "doleance"
            ? "bg-purple-100 text-purple-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {row.original.category_plainte}
      </span>
    ),
  },
  { header: "TypeProbleme", accessorKey: "TypeProbleme" },
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
      const nom = row?.original.nom;
      const id = row?.original.id;
      const cin = row?.original.cin;
      const telephone = row?.original.telephone;
      const quartier = row.original.quartier;
      const description = row?.original.description;
      const information = row?.original.information;
      const updated_at = row?.original.updated_at;
      const Date_naissance = row?.original.Date_naissance;
      const Nomconjointe = row?.original.Nomconjointe;
      return (
        <CellAction
          nom={nom}
          id={id}
          cin={cin}
          telephone={telephone}
          Date_naissance={Date_naissance}
          Nomconjointe={Nomconjointe}
          description={description}
          information={information}
          quartier={quartier}
          updated_at={updated_at}
        />
      );
    },
  },
];
