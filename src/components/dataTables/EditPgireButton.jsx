import React, { useRef, useState } from "react";
import { UpdatePgire } from "../../api/pgire";

import {
  LOCALITES_PGIRE,
  MOTIFS_PGIRE,
  STATUTS_PGIRE,
  SATISFACTIONS_PGIRE,
  todayPgire,
} from "../../constants/pgire";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 " +
  "text-sm text-slate-900 outline-none focus:border-slate-600 " +
  "focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100";

function dateValue(value) {
  const match = String(value || "").match(/^\d{4}-\d{2}-\d{2}/);
  return match && match[0] !== "0000-00-00" ? match[0] : "";
}

function initialForm(plainte) {
  const region = plainte.region || "";
  const localite = plainte.localite || "";
  const known = LOCALITES_PGIRE[region]?.includes(localite);

  return {
    nom: plainte.nom || "",
    nomConjoint: plainte.nomConjoint || "",
    telephone: plainte.telephone || "",
    dateNaissance: dateValue(plainte.dateNaissance),
    cin: plainte.cin || "",
    genre: plainte.genre || "",
    region,
    localite: localite ? (known ? localite : "Autre") : "",
    localiteAutre: localite && !known ? localite : "",
    categorie: plainte.categorie || "",
    plainte: plainte.plainte || "",
    descriptionPlainte: plainte.descriptionPlainte || "",
    information: plainte.information || "",
    nomDelegue: plainte.nomDelegue || "",
    dateDepot: dateValue(plainte.dateDepot),
    dateResolution: dateValue(plainte.dateResolution),
    resolutionComiteLocal: plainte.resolutionComiteLocal || "",
    satisfaction: plainte.satisfaction || "",
    statutPlainte: plainte.statutPlainte || "En cours",
  };
}

function Section({ title, description, children }) {
  return (
    <section>
      <h3 className="font-bold text-slate-800">{title}</h3>

      {description && (
        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

export default function EditPgireButton({ plainte }) {
  const dialogRef = useRef(null);
  const submitLock = useRef(false);

  const [form, setForm] = useState(() => initialForm(plainte));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openModal() {
    setForm(initialForm(plainte));
    setError("");
    dialogRef.current?.showModal();
  }

  function closeModal() {
    if (!submitLock.current) {
      dialogRef.current?.close();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,

      ...(name === "region"
        ? { localite: "", localiteAutre: "" }
        : {}),

      ...(name === "localite" && value !== "Autre"
        ? { localiteAutre: "" }
        : {}),

      ...(name === "categorie" ? { plainte: "" } : {}),
    }));
  }

  function field(name, label, options = {}) {
    const {
      choices,
      type = "text",
      required = false,
      wide = false,
      ...attributes
    } = options;

    const id = `edit-pgire-${plainte.id}-${name}`;

    return (
      <div className={wide ? "sm:col-span-2" : ""}>
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-green-800">*</span>
          )}
        </label>

        {choices ? (
          <select
            id={id}
            name={name}
            value={form[name]}
            onChange={handleChange}
            required={required}
            className={inputClass}
            {...attributes}
          >
            <option value="">Sélectionner</option>

            {choices.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            value={form[name]}
            onChange={handleChange}
            required={required}
            rows={4}
            className={`${inputClass} resize-y`}
            {...attributes}
          />
        ) : (
          <input
            id={id}
            name={name}
            value={form[name]}
            onChange={handleChange}
            required={required}
            type={type}
            className={inputClass}
            {...attributes}
          />
        )}
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitLock.current) return;
    setError("");

    const payload = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [
        key,
        value.trim(),
      ])
    );

    const requiredFields = [
      "nom",
      "telephone",
      "region",
      "localite",
      "categorie",
      "plainte",
      "descriptionPlainte",
      "dateDepot",
    ];

    if (!requiredFields.every((key) => payload[key])) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!Object.hasOwn(LOCALITES_PGIRE, payload.region)) {
      setError("Sélectionnez une région valide.");
      return;
    }

    if (payload.localite === "Autre") {
      if (!payload.localiteAutre) {
        setError("Veuillez préciser la localité.");
        return;
      }

      payload.localite = payload.localiteAutre;
    } else if (
      !LOCALITES_PGIRE[payload.region].includes(payload.localite)
    ) {
      setError("Sélectionnez une localité valide.");
      return;
    }

    delete payload.localiteAutre;

    if (
      !MOTIFS_PGIRE[payload.categorie]?.includes(payload.plainte)
    ) {
      setError("Sélectionnez un motif valide.");
      return;
    }

    const today = todayPgire();

    if (
      payload.dateDepot > today ||
      (payload.dateNaissance && payload.dateNaissance > payload.dateDepot)
    ) {
      setError("Vérifiez les dates de naissance et de dépôt.");
      return;
    }

    if (
      payload.dateResolution &&
      (
        payload.dateResolution < payload.dateDepot ||
        payload.dateResolution > today
      )
    ) {
      setError(
        "La résolution doit être comprise entre le dépôt et aujourd’hui."
      );
      return;
    }

    payload.statutPlainte = payload.statutPlainte || "En cours";

    submitLock.current = true;
    setSaving(true);

    try {
      const result = await UpdatePgire(plainte.id, payload);

      dialogRef.current?.close();

      window.dispatchEvent(
        new CustomEvent("pgire:updated", {
          detail: {
            id: plainte.id,
            message: result.message || "Dossier modifié avec succès.",
          },
        })
      );
    } catch (err) {
      setError(err.message || "Impossible de modifier le dossier.");
    } finally {
      submitLock.current = false;
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="whitespace-nowrap rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
      >
        Modifier
      </button>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          if (submitLock.current) event.preventDefault();
        }}
        aria-labelledby={`edit-pgire-title-${plainte.id}`}
        className="m-auto max-h-[90vh] w-[95vw] max-w-3xl overflow-y-auto rounded-xl bg-white p-0 text-left text-slate-900 shadow-xl backdrop:bg-slate-950/50"
      >
        <header className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id={`edit-pgire-title-${plainte.id}`}
                className="text-xl font-bold"
              >
                Modifier le dossier PGIRE
              </h2>

              <p className="mt-1 text-sm text-slate-200">
                Référence : {plainte.reference}
              </p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              disabled={saving}
              aria-label="Fermer"
              className="rounded px-2 py-1 text-xl hover:bg-white/10 disabled:opacity-50"
            >
              ×
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-300">
            Créé le {dateValue(plainte.created_at) || "—"}
            {" · "}Par {plainte.agent || "—"}
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <fieldset disabled={saving} className="space-y-7 p-6">
            <Section title="01 — Identité du réclamant">
              {field("nom", "Nom du réclamant", {
                required: true,
                maxLength: 150,
              })}

              {field("nomConjoint", "Nom du conjoint / de la conjointe", {
                maxLength: 150,
              })}

              {field("telephone", "Téléphone", {
                required: true,
                type: "tel",
                maxLength: 30,
              })}

              {field("dateNaissance", "Date de naissance", {
                type: "date",
                max: todayPgire(),
              })}

              {field("cin", "CIN", { maxLength: 80 })}

              {field("genre", "Genre", {
                choices: ["Femme", "Homme", "Autre", "Non renseigné"],
              })}
            </Section>

            <Section title="02 — Zone d’intervention">
              {field("region", "Région", {
                required: true,
                choices: Object.keys(LOCALITES_PGIRE),
              })}

              {field("localite", "Localité", {
                required: true,
                disabled: !form.region,
                choices: form.region
                  ? [...(LOCALITES_PGIRE[form.region] || []), "Autre"]
                  : [],
              })}

              {form.localite === "Autre" &&
                field("localiteAutre", "Précisez la localité", {
                  required: true,
                  wide: true,
                  maxLength: 100,
                })}
            </Section>

            <Section title="03 — Objet de la demande">
              {field("categorie", "Catégorie", {
                required: true,
                choices: Object.keys(MOTIFS_PGIRE),
              })}

              {field("dateDepot", "Date de dépôt", {
                required: true,
                type: "date",
                max: todayPgire(),
              })}

              {field("plainte", "Motif de la demande", {
                required: true,
                wide: true,
                disabled: !form.categorie,
                choices: MOTIFS_PGIRE[form.categorie] || [],
              })}

              {field("descriptionPlainte", "Description de la plainte / doléance", {
                required: true,
                wide: true,
                type: "textarea",
                maxLength: 10000,
              })}

              {field("information", "Information complémentaire", {
                wide: true,
                type: "textarea",
                maxLength: 10000,
              })}
            </Section>

            <Section
              title="04 — Traitement et résolution"
              description="Tous les champs de cette section sont facultatifs."
            >
              {field("nomDelegue", "Nom du délégué", {
                maxLength: 150,
              })}

              {field("statutPlainte", "Statut", {
                choices: STATUTS_PGIRE,
              })}

              {field("dateResolution", "Date de résolution", {
                type: "date",
                min: form.dateDepot || undefined,
                max: todayPgire(),
              })}

              {field("satisfaction", "Satisfaction", {
                choices: SATISFACTIONS_PGIRE,
              })}

              {field("resolutionComiteLocal", "Résolution du comité local", {
                wide: true,
                type: "textarea",
                maxLength: 10000,
              })}
            </Section>
          </fieldset>

          <footer className="border-t border-slate-200 p-6">
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {saving ? "Enregistrement…" : "Enregistrer les modifications"}
              </button>
            </div>
          </footer>
        </form>
      </dialog>
    </>
  );
}