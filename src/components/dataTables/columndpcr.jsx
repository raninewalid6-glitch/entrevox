import { useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { PartialUpdateDpcr } from "../../api/dpcr";

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

// ✅ Bouton "Modifier" + modal — même structure que les autres modules
const CellActionDpcr = ({
  id,
  identifiant_appel,
  caller_name,
  contact,
  user_type,
  request_type,
  description,
  region,
  city,
  road_name,
  datetime,
  gravite,
  updated_at,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [newCallerName, setNewCallerName] = useState(caller_name);
  const [newContact, setNewContact] = useState(contact);
  const [newUserType, setNewUserType] = useState(user_type);
  const [newRequestType, setNewRequestType] = useState(request_type);
  const [newDescription, setNewDescription] = useState(description);
  const [newRegion, setNewRegion] = useState(region);
  const [newCity, setNewCity] = useState(city);
  const [newRoadName, setNewRoadName] = useState(road_name);
  const [newDatetime, setNewDatetime] = useState(
    String(datetime || "").replace(" ", "T").slice(0, 16)
  );
  const [newGravite, setNewGravite] = useState(gravite);

  const { user } = useAuth();

  if (user?.role !== "chefCentre") {
    return null;
  }

  // Ré-initialise les champs avec les valeurs de la ligne à chaque ouverture
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      setNewCallerName(caller_name);
      setNewContact(contact);
      setNewUserType(user_type);
      setNewRequestType(request_type);
      setNewDescription(description);
      setNewRegion(region);
      setNewCity(city);
      setNewRoadName(road_name);
      setNewDatetime(String(datetime || "").replace(" ", "T").slice(0, 16));
      setNewGravite(gravite);
    }
  };

  const handleSave = async () => {
    const donnee = {
      caller_name: newCallerName,
      contact: newContact,
      user_type: newUserType,
      request_type: newRequestType,
      description: newDescription,
      region: newRegion,
      city: newCity,
      road_name: newRoadName,
      // "2026-11-24T14:35" -> "2026-11-24 14:35:00" (format attendu par MySQL)
      datetime: newDatetime ? newDatetime.replace("T", " ") + ":00" : newDatetime,
      severity: newGravite,
      updated_by: user?.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await PartialUpdateDpcr(donnee, id);
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
            Modifier l'incident de <strong>{caller_name}</strong>
          </DialogTitle>
          <DialogDescription>
            ID Appel : <strong>{identifiant_appel}</strong>
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
          {/* Plaignant */}
          <div>
            <label className="text-sm font-semibold">Nom du plaignant</label>
            <input
              type="text"
              value={newCallerName}
              onChange={(e) => setNewCallerName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm font-semibold">Contact</label>
            <input
              type="text"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Type d'usager */}
          <div>
            <label className="text-sm font-semibold">Type d'usager</label>
            <input
              type="text"
              value={newUserType}
              onChange={(e) => setNewUserType(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Type de requête */}
          <div>
            <label className="text-sm font-semibold">Type de requête</label>
            <input
              type="text"
              value={newRequestType}
              onChange={(e) => setNewRequestType(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
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

          {/* Région */}
          <div>
            <label className="text-sm font-semibold">Région</label>
            <input
              type="text"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Ville */}
          <div>
            <label className="text-sm font-semibold">Ville</label>
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Route */}
          <div>
            <label className="text-sm font-semibold">Route</label>
            <input
              type="text"
              value={newRoadName}
              onChange={(e) => setNewRoadName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Date et heure */}
          <div>
            <label className="text-sm font-semibold">Date et heure</label>
            <input
              type="datetime-local"
              value={newDatetime}
              onChange={(e) => setNewDatetime(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Gravité */}
          <div>
            <label className="text-sm font-semibold">Gravité</label>
            <input
              type="text"
              value={newGravite}
              onChange={(e) => setNewGravite(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
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
export const columnDPCR = (onUpdated) => [
  { accessorKey: "identifiant_appel", header: "ID Appel" },
  { accessorKey: "user_type", header: "Usager" },
  { accessorKey: "caller_name", header: "Plaignant" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "request_type", header: "Type de requête" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "region", header: "Région" },
  { accessorKey: "city", header: "Ville" },
  { accessorKey: "road_name", header: "Route" },
  { accessorKey: "datetime", header: "Date" },
  { accessorKey: "gravite", header: "Gravité" },

  // ✅ Informations du formulaire "Informer les services"
  {
    accessorKey: "dpcr",
    header: "DPCR informé",
    cell: ({ row }) =>
      row.original.dpcr || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "gendarmerie",
    header: "Gendarmerie",
    cell: ({ row }) =>
      row.original.gendarmerie || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "smur",
    header: "SMUR",
    cell: ({ row }) =>
      row.original.smur || <span className="text-gray-400">—</span>,
  },
  {
    accessorKey: "inform_date",
    header: "Services informés le",
    cell: ({ row }) => {
      const date = row.original.inform_date;
      if (!date) return <span className="text-gray-400">—</span>;
      return (
        <span className="text-sm text-gray-700 whitespace-nowrap">
          {new Date(date).toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      );
    },
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
    header: "Modification",
    cell: ({ row }) => (
      <CellActionDpcr
        id={row.original.id}
        identifiant_appel={row.original.identifiant_appel}
        caller_name={row.original.caller_name}
        contact={row.original.contact}
        user_type={row.original.user_type}
        request_type={row.original.request_type}
        description={row.original.description}
        region={row.original.region}
        city={row.original.city}
        road_name={row.original.road_name}
        datetime={row.original.datetime}
        gravite={row.original.gravite}
        updated_at={row.original.updated_at}
        onUpdated={onUpdated}
      />
    ),
  },
];
