import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// ✅ Composant d’action (boîte de confirmation)
// ✅ Composant d’action
import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useAuth } from "../../context/AuthContext";


// Garde les imports de useAuth et PartialUpdateMass de ton projet.

const CellAction = ({
  id,
  nom,
  numero_telephone,
  numero_logement,
  type,
  nom_projet,
  quartier,
  equipement,
  affecterTotal,
  commentaire,
  numero_facture,
  nomChefChantier,
  updated_at,
}) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getInitialValues = () => ({
    nom: nom ?? "",
    numero_telephone: numero_telephone ?? "",
    numero_logement: numero_logement ?? "",
    type: type ?? "",
    nom_projet: nom_projet ?? "",
    quartier: quartier ?? "",
    equipement: equipement ?? "",
    affecterTotal: affecterTotal ?? "",
    commentaire: commentaire ?? "",
    numero_facture: numero_facture ?? "",
    nomChefChantier: nomChefChantier ?? "",
  });

  const [form, setForm] = useState(getInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleOpenChange = (nextOpen) => {
    if (isSaving) return;

    if (nextOpen) {
      setForm(getInitialValues());
    }

    setOpen(nextOpen);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (isSaving || user?.role !== "chefCentre") return;

    setIsSaving(true);

    const donnees = {
      ...form,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await PartialUpdateMass(donnees, id);

      if (response?.success) {
        toast.success("Mise à jour réussie");
        setOpen(false);
      } else {
        toast.error(response?.message || "Échec de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Erreur serveur");
    } finally {
      setIsSaving(false);
    }
  };

  if (user?.role !== "chefCentre") return null;

  const fields = [
    { name: "nom", label: "Nom" },
    {
      name: "numero_telephone",
      label: "Numéro de téléphone",
      type: "tel",
    },
    { name: "numero_logement", label: "Numéro de logement" },
    { name: "type", label: "Type" },
    { name: "nom_projet", label: "Nom du projet" },
    { name: "quartier", label: "Quartier" },
    { name: "equipement", label: "Équipement" },
    { name: "affecterTotal", label: "Type d'affectation" },
    { name: "numero_facture", label: "Numéro de facture" },
    { name: "nomChefChantier", label: "Nom du chef de chantier" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Pencil className="h-4 w-4" />
          Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Modifier la plainte de <strong>{nom}</strong>
          </DialogTitle>

          {/* <DialogDescription>
            ID plainte : <strong>{id}</strong>
          </DialogDescription> */}

          {updated_at && (
            <p className="text-sm text-gray-500">
              Dernière modification :{" "}
              <strong>
                {new Date(updated_at).toLocaleDateString("fr-FR")}
              </strong>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <fieldset disabled={isSaving} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`arulos-${id}-${field.name}`}
                    className="text-sm font-semibold"
                  >
                    {field.label}
                  </label>

                  <input
                    id={`arulos-${id}-${field.name}`}
                    name={field.name}
                    type={field.type || "text"}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border px-3 py-2 disabled:opacity-60"
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor={`arulos-${id}-commentaire`}
                className="text-sm font-semibold"
              >
                Commentaire
              </label>

              <Textarea
                id={`arulos-${id}-commentaire`}
                name="commentaire"
                value={form.commentaire}
                onChange={handleChange}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleOpenChange(false)}
                disabled={isSaving}
              >
                Annuler
              </Button>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CellAction;

// ✅ Colonnes du tableau
export const Aruloscolumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "numero_telephone", header: "Numéro de Téléphone" },
  { accessorKey: "numero_logement", header: "Numéro de Logement" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "nom_projet", header: "Nom du Projet" },
  { accessorKey: "quartier", header: "Quartier" },
  { accessorKey: "equipement", header: "Équipement" },
  { accessorKey: "affecterTotal", header: "Type d'affectation" },
  {
    accessorKey: "commentaire",
    header: "Commentaire",
    cell: ({ row }) => (
      <div className="min-w-[500px] max-w-[700px] whitespace-pre-wrap">
        {row.original.commentaire}
      </div>
    ),
  },
  { accessorKey: "numero_facture", header: "Numéro de Facture" },
  { accessorKey: "agent", header: "Enregistré par" },
  { accessorKey: "created_at", header: "Date de Création" },
  { accessorKey: "nomChefChantier", header: "Nom du Chef de Chantier" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const {
        id,
        nom,
        numero_telephone,
        numero_logement,
        type,
        nom_projet,
        quartier,
        equipement,
        affecterTotal,
        commentaire,
        numero_facture,
        nomChefChantier,
        updated_at,
      } = row.original;

      return (
        <CellAction
          id={id}
          nom={nom}
          numero_telephone={numero_telephone}
          numero_logement={numero_logement}
          type={type}
          nom_projet={nom_projet}
          quartier={quartier}
          equipement={equipement}
          affecterTotal={affecterTotal}
          commentaire={commentaire}
          numero_facture={numero_facture}
          nomChefChantier={nomChefChantier}
          updated_at={updated_at}
        />
      );
    },
  },
];
