import React, { useEffect, useRef, useState } from "react";

import {
    CreatePgire,
    ShowPgire,
    ShowLastNumeroPgire,
} from "../api/pgire";

import { useAuth } from "../context/AuthContext";

const LOCALITES_PGIRE = {
    Dikhil: [
        "Dadahalou",
        "Bondara",
        "Sankal",
        "Garsaledaba",
        "Aseyla",
        "Koutabouya",
        "Teweochinilé",
        "Galamo",
        "Cheik Sabir",
        "Gourabous",
        "Hanlé",
    ],
    Tadjourah: [
        "Garabtissan",
        "Balho",
        "Hagandé",
        "Malaho",
        "Mounkour",
        "Otoy",
        "Dorra",
        "Andaba",
        "Bouya",
        "Assourate",
        "Ripta",
        "Daymoli",
        "Adbouya",
        "Roueli Helalé",
        "Garbanaba",
        "Galeela",
        "Airi",
        "Terdo",
        "Debné",
    ],
    Obock: [
        "Dalay",
        "Arkaylé",
        "Orobor",
        "Galaqto",
        "Allailidada",
        "Medeho",
        "Tagaré",
        "Dallaledaba",
        "Bossali",
        "Hamar",
    ],
};

const MOTIFS_PGIRE = {
    Doléance: [
        "Recrutements sur les chantiers",
        "Formations organisées dans les villages",
        "Distributions d’intrants",
        "Activités des animateurs communautaires",
        "Interventions des moniteurs agricoles et des auxiliaires d’élevage",
        "Travaux de réhabilitation des puits et des forages",
        "Autre",
    ],
    Plainte: [
        "Recrutement de travailleurs extérieurs au village",
        "Retards dans l’exécution des travaux",
        "Exclusion des recrutements ou des formations pour absence de CIN",
        "Retards dans la distribution des intrants",
        "Difficultés d’approvisionnement des citernes en eau",
        "Retards dans la réhabilitation des puits",
        "Retards de construction des locaux destinés aux AGR",
        "Autre",
    ],
};

const STATUTS = ["En cours", "Résolue", "Clôturée"];

function today() {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: "Africa/Djibouti",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const getPart = (type) =>
        parts.find((part) => part.type === type)?.value;

    return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

function emptyForm() {
    return {
        nom: "",
        nomConjoint: "",
        telephone: "",
        dateNaissance: "",
        cin: "",
        genre: "",
        region: "",
        localite: "",
        localiteAutre: "",
        descriptionPlainte: "",
        information: "",
        nomDelegue: "",
        dateDepot: today(),
        dateResolution: "",
        resolutionComiteLocal: "",
        categorie: "",
        plainte: "",
        satisfaction: "",
        statutPlainte: "En cours",
    };
}

function dateLabel(value) {
    if (!value) return "Non renseignée";

    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (!match || match[1] === "0000") {
        return "Non renseignée";
    }

    return `${match[3]}/${match[2]}/${match[1]}`;
}

function normalizePlainte(item) {
    return {
        id: item.id,
        reference: item.reference ?? "",
        nom: item.nom ?? item.nom_reclamant ?? "",
        nomConjoint: item.nomConjoint ?? item.nom_conjoint ?? "",
        telephone: item.telephone ?? "",
        dateNaissance: item.dateNaissance ?? item.date_naissance ?? "",
        cin: item.cin ?? "",
        genre: item.genre ?? "",
        region: item.region ?? "",
        localite: item.localite ?? "",
        descriptionPlainte:
            item.descriptionPlainte ?? item.description_plainte ?? "",
        information: item.information ?? "",
        nomDelegue: item.nomDelegue ?? item.nom_delegue ?? "",
        dateDepot: item.dateDepot ?? item.date_depot ?? "",
        dateResolution: item.dateResolution ?? item.date_resolution ?? "",
        resolutionComiteLocal:
            item.resolutionComiteLocal ?? item.resolution_comite_local ?? "",
        categorie: item.categorie ?? "",
        plainte: item.plainte ?? "",
        satisfaction: item.satisfaction ?? "",
        statutPlainte:
            item.statutPlainte ??
            item.statut_plainte ??
            item.status ??
            "En cours",
    };
}

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 " +
    "text-sm text-slate-900 outline-none transition " +
    "focus:border-slate-600 focus:ring-2 focus:ring-slate-200 " +
    "disabled:bg-slate-100 disabled:text-slate-500";

function Field({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    required = false,
    type = "text",
    wide = false,
    ...rest
}) {
    const id = `pgire-${name}`;

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

            {options ? (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={inputClass}
                    {...rest}
                >
                    <option value="">
                        {placeholder || "Sélectionner"}
                    </option>

                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={4}
                    placeholder={placeholder}
                    className={`${inputClass} resize-y`}
                    {...rest}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    type={type}
                    placeholder={placeholder}
                    className={inputClass}
                    {...rest}
                />
            )}
        </div>
    );
}

function Section({ number, title, description, children }) {
    return (
        <section className="border-b border-slate-100 px-5 py-6 sm:px-7">
            <div className="mb-5 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                    {number}
                </span>

                <div>
                    <h2 className="font-bold text-slate-800">
                        {title}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {children}
            </div>
        </section>
    );
}

export default function PgireForm() {
    const { user } = useAuth();

    const [form, setForm] = useState(emptyForm);
    const [plaintes, setPlaintes] = useState([]);
    const [counter, setCounter] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    const [listError, setListError] = useState("");
    const [referenceError, setReferenceError] = useState("");
    const [notice, setNotice] = useState(null);

    const submitting = useRef(false);
    const mounted = useRef(false);
    const listRequest = useRef(0);
    const referenceRequest = useRef(0);

    const isAuthenticated =
        user?.id !== undefined &&
        user?.id !== null &&
        user?.id !== "";

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
            listRequest.current += 1;
            referenceRequest.current += 1;
        };
    }, []);

    async function refreshPlaintes() {
        const requestId = ++listRequest.current;

        if (mounted.current) {
            setListLoading(true);
            setListError("");
        }

        try {
            const result = await ShowPgire();

            if (!Array.isArray(result)) {
                throw new Error("Réponse invalide.");
            }

            if (
                mounted.current &&
                requestId === listRequest.current
            ) {
                setPlaintes(result.map(normalizePlainte));
            }

            return true;
        } catch {
            if (
                mounted.current &&
                requestId === listRequest.current
            ) {
                setListError(
                    "Impossible d’actualiser la liste des plaintes."
                );
            }

            return false;
        } finally {
            if (
                mounted.current &&
                requestId === listRequest.current
            ) {
                setListLoading(false);
            }
        }
    }

    async function refreshReference() {
        const requestId = ++referenceRequest.current;

        try {
            const reference = await ShowLastNumeroPgire();

            if (!reference) {
                throw new Error("Référence manquante.");
            }

            if (
                mounted.current &&
                requestId === referenceRequest.current
            ) {
                setCounter(reference);
                setReferenceError("");
            }

            return true;
        } catch {
            if (
                mounted.current &&
                requestId === referenceRequest.current
            ) {
                setCounter("");
                setReferenceError(
                    "Référence indisponible. Nouvelle tentative automatique…"
                );
            }

            return false;
        }
    }

    useEffect(() => {
        refreshPlaintes();
    }, []);

    useEffect(() => {
        let active = true;
        let timer;

        async function pollReference() {
            if (!active) return;

            if (!submitting.current) {
                await refreshReference();
            }

            if (active) {
                timer = setTimeout(pollReference, 3000);
            }
        }

        pollReference();

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,

            ...(name === "region"
                ? {
                    localite: "",
                    localiteAutre: "",
                }
                : {}),

            ...(name === "localite" && value !== "Autre"
                ? {
                    localiteAutre: "",
                }
                : {}),

            ...(name === "categorie"
                ? {
                    plainte: "",
                }
                : {}),
        }));
    }

    function field(name, label, props = {}) {
        return (
            <Field
                key={name}
                name={name}
                label={label}
                value={form[name]}
                onChange={handleChange}
                {...props}
            />
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (submitting.current) return;

        setNotice(null);

        const fail = (text) => {
            setNotice({ error: true, text });
        };

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
            return fail(
                "Veuillez renseigner tous les champs obligatoires."
            );
        }

        if (
            !Object.prototype.hasOwnProperty.call(
                LOCALITES_PGIRE,
                payload.region
            )
        ) {
            return fail("Sélectionnez une région valide.");
        }

        if (payload.localite === "Autre") {
            if (!payload.localiteAutre) {
                return fail(
                    "Veuillez préciser le nom de la localité."
                );
            }

            if (Array.from(payload.localiteAutre).length > 100) {
                return fail(
                    "La localité ne doit pas dépasser 100 caractères."
                );
            }

            payload.localite = payload.localiteAutre;
        } else if (
            !LOCALITES_PGIRE[payload.region].includes(
                payload.localite
            )
        ) {
            return fail(
                "Sélectionnez une localité de la région choisie."
            );
        }

        // La saisie libre est envoyée dans le champ localite.
        delete payload.localiteAutre;

        if (
            !MOTIFS_PGIRE[payload.categorie]?.includes(
                payload.plainte
            )
        ) {
            return fail(
                "Sélectionnez un motif de la catégorie choisie."
            );
        }

        const currentDate = today();

        if (
            payload.dateNaissance > currentDate ||
            payload.dateDepot > currentDate
        ) {
            return fail(
                "La naissance et le dépôt ne peuvent pas être dans le futur."
            );
        }

        if (
            payload.dateNaissance &&
            payload.dateNaissance > payload.dateDepot
        ) {
            return fail(
                "La date de naissance doit précéder la date de dépôt."
            );
        }

        // Facultative, mais cohérente lorsqu’elle est renseignée.
        if (
            payload.dateResolution &&
            (
                payload.dateResolution < payload.dateDepot ||
                payload.dateResolution > currentDate
            )
        ) {
            return fail(
                "La résolution doit être comprise entre le dépôt et aujourd’hui."
            );
        }

        // Aucun champ de la section 4 n’est obligatoire.
        payload.statutPlainte =
            payload.statutPlainte || "En cours";

        if (!counter) {
            return fail(
                "La référence PGIRE est indisponible. Veuillez patienter."
            );
        }

        if (!isAuthenticated) {
            return fail(
                "Veuillez vous connecter avant d’enregistrer."
            );
        }

        submitting.current = true;
        setLoading(true);

        referenceRequest.current += 1;

        try {
            const result = await CreatePgire(
                {
                    ...payload,
                    reference: counter,
                },
                user.id
            );

            if (!result?.success) {
                throw new Error(
                    result?.error ||
                    result?.message ||
                    "L’enregistrement n’a pas été confirmé."
                );
            }

            if (!mounted.current) return;

            setForm(emptyForm());
            setCounter("");

            const [listUpdated, referenceUpdated] =
                await Promise.all([
                    refreshPlaintes(),
                    refreshReference(),
                ]);

            if (!mounted.current) return;

            setNotice({
                error: false,
                text:
                    listUpdated && referenceUpdated
                        ? result.message ||
                        "Plainte PGIRE enregistrée avec succès."
                        : "Plainte enregistrée avec succès, mais l’actualisation est incomplète. Actualisez le registre avant une nouvelle saisie.",
            });
        } catch (error) {
            if (mounted.current) {
                setNotice({
                    error: true,
                    text:
                        `${error.message || "Impossible de confirmer l’enregistrement."} ` +
                        "Vos données sont conservées. En cas de coupure réseau, vérifiez le registre avant de réessayer.",
                });
            }
        } finally {
            submitting.current = false;

            if (mounted.current) {
                setLoading(false);
            }
        }
    }

    const query = search.trim().toLocaleLowerCase("fr");

    const filteredPlaintes = plaintes.filter((plainte) => {
        const matchesStatus =
            !statusFilter ||
            plainte.statutPlainte === statusFilter;

        const matchesSearch = [
            plainte.reference,
            plainte.nom,
            plainte.telephone,
            plainte.region,
            plainte.localite,
        ].some((value) =>
            String(value ?? "")
                .toLocaleLowerCase("fr")
                .includes(query)
        );

        return matchesStatus && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-slate-100 p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Ligne verte 2020 / PGIRE
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                            Registre de gestion des plaintes et doléances
                        </p>
                    </div>

                    <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
                        3 régions d’intervention
                    </span>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-xl bg-white shadow-md">
                        <header className="bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-7 sm:px-7">
                            <span className="inline-block rounded bg-green-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                                Projet PGIRE
                            </span>

                            <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                                Enregistrement des plaintes
                            </h1>

                            <p className="mt-2 text-sm leading-relaxed text-slate-200">
                                Bonjour et bienvenue sur la ligne verte 2020
                                du projet PGIRE.
                            </p>
                        </header>

                        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 sm:px-7">
                            <div className="flex flex-wrap justify-between gap-2 text-xs">
                                <span className="font-semibold text-slate-700">
                                    Référence : {counter || "Chargement…"}
                                </span>

                                <span className="text-slate-500">
                                    * Champs obligatoires
                                </span>
                            </div>

                            {referenceError && (
                                <p
                                    role="status"
                                    className="mt-2 text-xs text-amber-800"
                                >
                                    {referenceError}
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <fieldset disabled={loading}>
                                <Section
                                    number="01"
                                    title="Identité du réclamant"
                                    description="Informations personnelles et coordonnées"
                                >
                                    {field("nom", "Nom du réclamant", {
                                        required: true,
                                        autoComplete: "name",
                                        maxLength: 150,
                                    })}

                                    {field(
                                        "nomConjoint",
                                        "Nom du conjoint / de la conjointe",
                                        {
                                            maxLength: 150,
                                        }
                                    )}

                                    {field("telephone", "Téléphone", {
                                        required: true,
                                        type: "tel",
                                        autoComplete: "tel",
                                        maxLength: 30,
                                    })}

                                    {field(
                                        "dateNaissance",
                                        "Date de naissance",
                                        {
                                            type: "date",
                                            max: today(),
                                        }
                                    )}

                                    {field(
                                        "cin",
                                        "Carte nationale d’identité (CIN)",
                                        {
                                            placeholder:
                                                "Facultatif — si disponible",
                                            maxLength: 80,
                                        }
                                    )}

                                    {field("genre", "Genre", {
                                        options: [
                                            "Femme",
                                            "Homme",
                                            "Autre",
                                            "Non renseigné",
                                        ],
                                    })}
                                </Section>

                                <Section
                                    number="02"
                                    title="Zone d’intervention"
                                    description="Sélectionnez une localité ou choisissez « Autre » pour la renseigner."
                                >
                                    {field("region", "Région", {
                                        required: true,
                                        options: Object.keys(LOCALITES_PGIRE),
                                    })}

                                    {field("localite", "Localité", {
                                        required: true,
                                        options: form.region
                                            ? [
                                                ...(LOCALITES_PGIRE[form.region] || []),
                                                "Autre",
                                            ]
                                            : [],
                                        disabled: !form.region,
                                        placeholder: form.region
                                            ? "Sélectionner une localité"
                                            : "Choisir d’abord une région",
                                    })}

                                    {form.localite === "Autre" &&
                                        field(
                                            "localiteAutre",
                                            "Précisez la localité",
                                            {
                                                required: true,
                                                wide: true,
                                                placeholder:
                                                    "Saisissez le nom de la localité",
                                                maxLength: 100,
                                            }
                                        )}
                                </Section>

                                <Section
                                    number="03"
                                    title="Objet de la demande"
                                    description="Plainte ou demande d’information liée au projet"
                                >
                                    {field("categorie", "Catégorie", {
                                        required: true,
                                        options: Object.keys(MOTIFS_PGIRE),
                                    })}

                                    {field("dateDepot", "Date de dépôt", {
                                        required: true,
                                        type: "date",
                                        max: today(),
                                    })}

                                    {field(
                                        "plainte",
                                        "Plainte / motif de la doléance",
                                        {
                                            required: true,
                                            wide: true,
                                            options:
                                                MOTIFS_PGIRE[form.categorie] || [],
                                            disabled: !form.categorie,
                                            placeholder: form.categorie
                                                ? "Sélectionner un motif"
                                                : "Choisir d’abord une catégorie",
                                        }
                                    )}

                                    {field(
                                        "descriptionPlainte",
                                        "Description de la plainte / doléance",
                                        {
                                            required: true,
                                            wide: true,
                                            type: "textarea",
                                            placeholder:
                                                "Décrire les faits, le besoin et les précisions utiles…",
                                            maxLength: 10000,
                                        }
                                    )}

                                    {field(
                                        "information",
                                        "Information complémentaire",
                                        {
                                            wide: true,
                                            type: "textarea",
                                            maxLength: 10000,
                                        }
                                    )}
                                </Section>

                                <Section
                                    number="04"
                                    title="Traitement et résolution"
                                    description="Tous les champs de cette section sont facultatifs."
                                >
                                    {field("nomDelegue", "Nom du délégué", {
                                        maxLength: 150,
                                    })}

                                    {field(
                                        "statutPlainte",
                                        "Statut de la plainte",
                                        {
                                            options: STATUTS,
                                            placeholder:
                                                "Non renseigné — En cours par défaut",
                                        }
                                    )}

                                    {field(
                                        "dateResolution",
                                        "Date de résolution",
                                        {
                                            type: "date",
                                            min: form.dateDepot,
                                            max: today(),
                                        }
                                    )}

                                    {field("satisfaction", "Satisfaction", {
                                        options: [
                                            "Satisfait(e)",
                                            "Partiellement satisfait(e)",
                                            "Insatisfait(e)",
                                            "Non évaluée",
                                        ],
                                    })}

                                    {field(
                                        "resolutionComiteLocal",
                                        "Résolution du comité local",
                                        {
                                            wide: true,
                                            type: "textarea",
                                            placeholder:
                                                "Décision prise, mesures retenues et réponse apportée…",
                                            maxLength: 10000,
                                        }
                                    )}
                                </Section>
                            </fieldset>

                            <div className="space-y-4 px-5 py-5 sm:px-7">
                                {notice && (
                                    <p
                                        role={notice.error ? "alert" : "status"}
                                        className={`rounded-lg border px-4 py-3 text-sm ${notice.error
                                                ? "border-red-200 bg-red-50 text-red-800"
                                                : "border-green-200 bg-green-50 text-green-800"
                                            }`}
                                    >
                                        {notice.text}
                                    </p>
                                )}

                                {!isAuthenticated && (
                                    <p className="text-sm text-amber-800">
                                        Connectez-vous pour enregistrer une plainte.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !counter ||
                                        !isAuthenticated
                                    }
                                    className="w-full rounded-lg bg-slate-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Enregistrement…"
                                        : "Enregistrer la plainte / doléance"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <aside className="rounded-xl bg-white p-5 shadow-md sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    Liste des plaintes
                                </h2>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                                    {plaintes.length}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={refreshPlaintes}
                                disabled={listLoading || loading}
                                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                                {listLoading ? "Chargement…" : "Actualiser"}
                            </button>
                        </div>

                        <p className="mb-5 mt-1 text-sm text-slate-500">
                            Plaintes et doléances du projet PGIRE
                        </p>

                        <label
                            htmlFor="pgire-search"
                            className="mb-1.5 block text-xs font-semibold text-slate-600"
                        >
                            Rechercher un dossier
                        </label>

                        <input
                            id="pgire-search"
                            type="search"
                            className={inputClass}
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Référence, nom, téléphone ou localité…"
                        />

                        <div className="my-4 flex items-center justify-between gap-3">
                            <span
                                aria-live="polite"
                                className="text-xs text-slate-500"
                            >
                                {filteredPlaintes.length} résultat(s)
                            </span>

                            <select
                                aria-label="Filtrer par statut"
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(event.target.value)
                                }
                            >
                                <option value="">Tous les statuts</option>

                                {STATUTS.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {listError && (
                            <p
                                role="alert"
                                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                            >
                                {listError} Cliquez sur « Actualiser » pour
                                réessayer.
                            </p>
                        )}

                        <div
                            aria-busy={listLoading}
                            className="max-h-[1100px] space-y-4 overflow-y-auto pr-1"
                        >
                            {listLoading && plaintes.length === 0 && (
                                <p
                                    role="status"
                                    className="py-10 text-center text-sm text-slate-500"
                                >
                                    Chargement des plaintes…
                                </p>
                            )}

                            {!listLoading &&
                                !listError &&
                                filteredPlaintes.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                                        <p className="font-semibold text-slate-700">
                                            {plaintes.length
                                                ? "Aucun dossier correspondant"
                                                : "Aucune plainte enregistrée"}
                                        </p>

                                        <p className="mt-2 text-sm text-slate-500">
                                            {plaintes.length
                                                ? "Modifiez la recherche ou le filtre."
                                                : "Les nouveaux dossiers apparaîtront ici."}
                                        </p>
                                    </div>
                                )}

                            {filteredPlaintes.map((plainte) => (
                                <article
                                    key={plainte.id ?? plainte.reference}
                                    className="rounded-xl border border-slate-200 p-4 transition hover:shadow-md"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <strong className="break-all text-lg text-slate-700">
                                            {plainte.reference}
                                        </strong>

                                        <span
                                            className={`rounded px-2.5 py-1 text-xs font-semibold ${plainte.statutPlainte === "En cours"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {plainte.statutPlainte}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Dépôt le {dateLabel(plainte.dateDepot)}
                                    </p>

                                    <h3 className="mt-4 break-words font-semibold text-slate-800">
                                        {plainte.nom}
                                    </h3>

                                    <p className="mt-1 break-words text-sm text-slate-500">
                                        {plainte.region} · {plainte.localite}
                                    </p>

                                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-green-800">
                                        {plainte.categorie}
                                    </p>

                                    <p className="mt-1 break-words text-sm font-medium text-slate-700">
                                        {plainte.plainte}
                                    </p>

                                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">
                                        {plainte.descriptionPlainte}
                                    </p>

                                    <details className="mt-4 border-t border-slate-100 pt-3">
                                        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                                            Consulter les informations du dossier
                                        </summary>

                                        <dl className="mt-3 space-y-2 text-sm">
                                            {[
                                                ["Conjoint(e)", plainte.nomConjoint],
                                                ["Téléphone", plainte.telephone],
                                                [
                                                    "Date de naissance",
                                                    plainte.dateNaissance
                                                        ? dateLabel(plainte.dateNaissance)
                                                        : "",
                                                ],
                                                ["CIN", plainte.cin],
                                                ["Genre", plainte.genre],
                                                ["Information", plainte.information],
                                                ["Délégué", plainte.nomDelegue],
                                                [
                                                    "Date de résolution",
                                                    plainte.dateResolution
                                                        ? dateLabel(plainte.dateResolution)
                                                        : "",
                                                ],
                                                [
                                                    "Résolution du comité local",
                                                    plainte.resolutionComiteLocal,
                                                ],
                                                ["Satisfaction", plainte.satisfaction],
                                            ].map(([label, value]) => (
                                                <div key={label}>
                                                    <dt className="font-medium text-slate-700">
                                                        {label}
                                                    </dt>

                                                    <dd className="whitespace-pre-wrap break-words text-slate-500">
                                                        {value || "Non renseigné"}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </details>
                                </article>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}