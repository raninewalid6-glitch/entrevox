import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import {
  CreateSignalement,
  ShowLastNumeroSignalement,
  ShowSignalement,
} from "../api/signalement";

// ─────────────────────────────────────────────────────────────────────────────

const REGIONS_QUARTIERS = {
  "Ali-Sabieh": [
    "Holl-Holl",
    "Centre",
    "Hamboucto",
    "Assamo",
    "Ali-Addeh",
    "Ara-Madowleh",
    "Goubetto",
    "Daasbiyo",
  ],
  Dikhil: [
    "Gami",
    "Centre",
    "Gobaad",
    "Hanle",
    "Harou",
    "Mouloud",
    "Sheikhatou",
    "Koutabouya",
    "Biida",
    "Seik-sabir",
    "Harougo",
    "Galamo",
    "Bondara",
    "Yoboki",
    "Dakka",
    "Moutrous",
    "As-Eyla",
  ],
  Obock: [
    "Oulma",
    "Centre",
    "Wadii",
    "Assasan",
    "Soublaley",
    "Ilisola",
    "Oued-obocki",
    "Bissidirou",
    "Khor-angar",
    "Alaylou",
    "Obocki",
    "Geuherlé",
    "Bossali",
    "Fididis",
    "Ado-Daaba",
    "Qaga",
    "Amassa",
    "Arafa",
  ],
  ARTA: ["Omar Jagac","Centre", "PK50", "PK20", "Atar/Dmarjog", "Wea", "Ali-oune"],
  Tadjourah: [
    "Andabba",
    "Centre",
    "Dorra",
    "Ardo",
    "Bankoualeh",
    "PK9",
    "Dafenatou",
    "Guirori",
    "Kalaf",
    "Sagalou",
    "Douloul",
    "Hambokka",
    "Toha",
    "Randa",
    "Ibna-Radi",
    "Loublakleh",
    "Garassou",
    "Magaleh",
    "Halou",
    "Mabla",
    "Hoboy-harak",
    "Day",
    "Debné",
    "Ambabo",
    "Daymoli",
    "Galaqto",
    "Lagalene",
    "Balho",
    "Dooda",
    "Menguela",
    "Bouyya",
    "Ilayasa",
    "Koulayou",
    "Gilagibleh",
    "Adoyla",
    "Madgoul",
    "Adaillou",
    "Assa-Gayla",
    "Garabtisan",
    "Ripta",
    "Wakir",
    "Wabeyta",
    "Mounkour",
    "Waydarim",
    "Otoy",
    "Aylaadou",
    "Boli",
    "Ougoulfoum",
    "Gablablou",
    "Kalou",
    "Dar'Dara",
    "Hedargabo",
    "Alaf'af",
    "Malaho",
    "Saboub",
    "Dok'af",
  ],
  "Djibouti-ville": [],
};

const QUARTIERS_PAR_COMMUNE = {
  Balbala: [
    "PK20",
    "Arrondissement 4",
    "Balbala 06",
    "PK12",
    "Balbala Q5",
    "Hablayeh",
    "T3",
    "Hamdani",
    "Doraleh",
    "Cheikh moussa",
    "Cité Cheikh osman",
    "cité Hodan",
    "cité Hodan 2",
    "Barwago 1",
    "Barwago 2",
    "cité nassib",
    "Torabora",
    "cite doumeira",
    "cite gargar",
    "pk13",
    "Balbala 2,Agadalise",
    "bulduqo",
    "Bioked",
    "wahledaba",
    "warabaley",
    "Balbala T9",
    "Balbala T10",
    "Chabeley",
    "PK14",
    "cité Moustakaire",
    "8 mètres",
    "4 mètres",
    "nagaadh",
    "guededa ariga",
    "balbala 11",
    "balbala caadi",
    "Layabley",
    "Bahach",
    "Nassib wanag",
    "Karawil",
    "Balbala 13 citoyen",
    "Cité gendarme",
    "oumou salama",
    "vietnam",
    "balbala 10",
    "Balbala 7",
    "Cité millitaire",
    "Balbala jajab",
    "cité sogik",
    "cité chabellé",
  ],
  Boulaos: [
    "Quartier 1",
    "Boulaos",
    "Quartier 2",
    "Quartier 3",
    "Quartier 4",
    "Quartier 5",
    "Quartier 6",
    "Quartier 7",
    "Quartier 7 bis",
    "Arhiba",
    "cite Stade (leer)",
    "Ambouli",
    "Einguela",
    "Zone industrielle",
    "Jamal",
    "Gabode 4",
    "Gabode 1",
    "Gabode 2",
    "Gabode 3",
    "Gabode 5",
    "Haramous 1",
    "Haramous 2",
    "Cité Saoudi",
    "Cité Progrès",
    "Makamoukarama",
    "Gachamaleh",
    "Cité Aviation",
    "Cité Dawale",
    "FNP",
    "cité poudrière",
    "ryad",
    "Cité wadagiir",
    "Place-rainbo",
    "Saline Ouest",
    "xeero fardaha",
    "Port de pêche",
    "Guelleh Batal",
  ],
  "Ras-Dika": [
    "Plateau",
    "Marabout",
    "Héron",
    "Serpent",
    "Paid",
    "Camp-Lelong",
    "place-menelik",
    
    
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

function useAsync(fn) {
  return { loading: false, execute: fn || (async () => {}) };
}

const NATURE_LABELS = {
  prix_abusif: "Prix abusif",
  produit_perime: "Produit périmé",
  refus_facture: "Refus de facture",
  autre: "Autre",
};

const COMMERCE_LABELS = {
  boutique: "Boutique",
  supermarche: "Supermarché",
  marche: "Marché",
  autre: "Autre",
};

const COMPARAISON_LABELS = {
  oui_superieur: "Oui, supérieur au prix habituel",
  oui_inferieur: "Oui, inférieur (suspect)",
  non: "Non, prix habituel",
  ne_sais_pas: "Je ne sais pas",
};

const CAS_TYPES = [
  {
    key: "prix_abusif",
    label: "Cas 1 : Prix abusif",
    message:
      "Votre signalement est bien enregistré. Il sera transmis aux services de contrôle compétents.",
  },
  {
    key: "produit_perime",
    label: "Cas 2 : Produit périmé",
    message:
      "Merci pour votre vigilance, ce type d'information est prioritaire.",
  },
  {
    key: "refus_facture",
    label: "Cas 3 : Refus de facture",
    message: "Cela constitue une irrégularité, votre signalement sera traité.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Signalement() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    nature: "",
    region: "",
    commune: "",
    zone: "",
    commerce: "",
    nom_commerce: "",
    produit: "",
    prix_depart: "",
    prix_actuel: "",
    comparaison: "",
    details: "",
    nom: "",
    tel: "",
    anonyme: false,
  });

  const [signalements, setSignalements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState("");
  const [casActif, setCasActif] = useState(null);

  const { execute: NumExecute } = useAsync(ShowLastNumeroSignalement);
  const { loading: LoadingCreate, execute: CreateExecute } =
    useAsync(CreateSignalement);
  const { execute: ShowExecute } = useAsync(ShowSignalement);

  // ─── handleChange ───────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "region") {
      setFormData((prev) => ({
        ...prev,
        region: value,
        commune: "",
        zone: "",
      }));
      return;
    }

    if (name === "commune") {
      setFormData((prev) => ({ ...prev, commune: value, zone: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "nature") {
      const cas = CAS_TYPES.find((c) => c.key === value);
      setCasActif(cas || null);
    }
  };

  // ─── handleCasType ──────────────────────────────────────────────────────────
  const handleCasType = (cas) => {
    setFormData((prev) => ({ ...prev, nature: cas.key }));
    setCasActif(cas);
  };

  // ─── handleSubmit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nature)
      return toast.warn("Veuillez sélectionner la nature du problème.");
    if (!formData.zone.trim())
      return toast.warn("Veuillez indiquer la localisation.");

    try {
      const nouveauSignalement = {
        ...formData,
        reference: counter,
        status: "En cours",
        id: Date.now(),
      };

      const result = await CreateExecute(nouveauSignalement, user?.id);
      if (result?.success) {
        toast.success(result?.message || "Enregistré avec succès !");

        setFormData({
          date: "",
          nature: "",
          region: "",
          commune: "",
          zone: "",
          commerce: "",
          nom_commerce: "",
          produit: "",
          prix_depart: "",
          prix_actuel: "",
          comparaison: "",
          details: "",
          nom: "",
          tel: "",
          anonyme: false,
        });
        setCasActif(null);

        const numero = await NumExecute();
        if (numero) setCounter(numero);

        const updated = await ShowExecute();
        if (updated) setSignalements(Array.isArray(updated) ? updated : []);
      } else {
        toast.error(result?.error || "Erreur lors de l'enregistrement.");
        console.log(result?.data);
      }
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    }
  };

  // ─── toggleStatus ───────────────────────────────────────────────────────────
  const toggleStatus = (id) => {
    setSignalements((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "En cours" ? "Terminé" : "En cours" }
          : s,
      ),
    );
  };

  // ─── Polling numéro référence ────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    const refreshNumero = async () => {
      try {
        const numero = await NumExecute();
        if (isMounted && numero) setCounter(numero);
      } catch (e) {
        console.error(e);
      }
    };
    refreshNumero();
    const interval = setInterval(refreshNumero, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // ─── Chargement initial liste ────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await ShowExecute();
        if (data) setSignalements(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  // ─── Filtre sécurisé ─────────────────────────────────────────────────────────
  const signalementsFiltres = (
    Array.isArray(signalements) ? signalements : []
  ).filter(
    (s) =>
      (s.reference || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.nom || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.tel || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ═══════════════════════════════════════
            COLONNE GAUCHE — Formulaire
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-xl shadow-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 bg-blue-800 text-white text-xs font-semibold rounded uppercase tracking-wide">
                Centre d'appels 2020 — La Poste de Djibouti
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Formulaire de Signalement
            </h1>
            <p className="text-white text-sm italic">
              « Bonjour, centre d'appels 2020, La Poste de Djibouti, à votre
              écoute. En quoi puis-je vous aider ? »
            </p>
          </div>

          <div className="space-y-4 px-6 py-4">
            {/* Référence */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
              <span className="text-sm text-slate-500 font-medium">
                Référence :
              </span>
              <span className="text-sm font-bold text-blue-700 tracking-wide">
                {counter || "—"}
              </span>
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Anonyme */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="anonyme"
                id="anonyme"
                checked={formData.anonyme}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="anonyme" className="font-medium cursor-pointer">
                Je souhaite rester anonyme
              </label>
            </div>

            {/* Nom */}
            {!formData.anonyme && (
              <div>
                <label className="block font-medium">Nom du déclarant</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Nom complet"
                />
              </div>
            )}

            {/* Téléphone */}
            <div>
              <label className="block font-medium">Numéro de téléphone</label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="+253 77 000 000"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Nature du problème */}
            <div>
              <label className="block font-medium">Nature du problème</label>
              <select
                name="nature"
                value={formData.nature}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">— Sélectionner —</option>
                <option value="prix_abusif">Prix abusif</option>
                <option value="produit_perime">Produit périmé</option>
                <option value="refus_facture">Refus de facture</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            {/* ── Cas types et réponses ── */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                  🧾 Cas types et réponses
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {CAS_TYPES.map((cas) => {
                  const isActif = casActif?.key === cas.key;
                  return (
                    <div
                      key={cas.key}
                      className={`p-3 transition-colors ${isActif ? "bg-red-50" : "hover:bg-slate-50"}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleCasType(cas)}
                        className={`flex items-center gap-2 w-full text-left mb-1`}
                      >
                        <span className="text-red-500 text-xs">🔴</span>
                        <span
                          className={`text-sm font-semibold ${isActif ? "text-red-700" : "text-slate-700"}`}
                        >
                          {cas.label}
                        </span>
                      </button>
                      {isActif && (
                        <p className="text-xs text-red-600 italic ml-5 mt-1">
                          « {cas.message} »
                        </p>
                      )}
                      {!isActif && (
                        <p className="text-xs text-slate-400 ml-5">
                          Cliquer pour sélectionner ce cas
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Région */}
            <div>
              <label className="block font-medium">Région</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">— Sélectionner une région —</option>
                <option value="Ali-Sabieh">Ali-Sabieh</option>
                <option value="Dikhil">Dikhil</option>
                <option value="Obock">Obock</option>
                <option value="ARTA">ARTA</option>
                <option value="Tadjourah">Tadjourah</option>
                <option value="Djibouti-ville">Djibouti-ville</option>
              </select>
            </div>

            {/* Commune — uniquement si Djibouti-ville */}
            {formData.region === "Djibouti-ville" && (
              <div>
                <label className="block font-medium">Commune</label>
                <select
                  name="commune"
                  value={formData.commune}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">— Sélectionner une commune —</option>
                  <option value="Balbala">Balbala</option>
                  <option value="Boulaos">Boulaos</option>
                  <option value="Ras-Dika">Ras-Dika</option>
                </select>
              </div>
            )}

            {/* Quartier — selon région ou commune */}
            {((formData.region && formData.region !== "Djibouti-ville") ||
              (formData.region === "Djibouti-ville" && formData.commune)) && (
              <div>
                <label className="block font-medium">Quartier</label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">— Sélectionner un quartier —</option>
                  {(formData.region === "Djibouti-ville"
                    ? QUARTIERS_PAR_COMMUNE[formData.commune]
                    : REGIONS_QUARTIERS[formData.region]
                  )?.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Type de commerce */}
            <div>
              <label className="block font-medium">Type de commerce</label>
              <select
                name="commerce"
                value={formData.commerce}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">— Sélectionner —</option>
                <option value="boutique">Boutique</option>
                <option value="supermarche">Supermarché</option>
                <option value="marche">Marché</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            {/* Nom du commerce */}
            <div>
              <label className="block font-medium">Nom du commerce</label>
              <input
                type="text"
                name="nom_commerce"
                value={formData.nom_commerce}
                onChange={handleChange}
                placeholder="Ex: Supermarché Al Nour..."
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Produit */}
            <div>
              <label className="block font-medium">Produit concerné</label>
              <input
                type="text"
                name="produit"
                value={formData.produit}
                onChange={handleChange}
                placeholder="Ex: sucre, huile, médicament…"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Prix départ */}
            <div>
              <label className="block font-medium">Prix de départ (FDJ)</label>
              <input
                type="text"
                name="prix_depart"
                value={formData.prix_depart}
                onChange={handleChange}
                placeholder="Ex: 300"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Prix actuel */}
            <div>
              <label className="block font-medium">Prix actuel (FDJ)</label>
              <input
                type="text"
                name="prix_actuel"
                value={formData.prix_actuel}
                onChange={handleChange}
                placeholder="Ex: 500"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Comparaison */}
            <div>
              <label className="block font-medium">
                Prix différent du prix habituel ?
              </label>
              <select
                name="comparaison"
                value={formData.comparaison}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">— Sélectionner —</option>
                <option value="oui_superieur">
                  Oui, supérieur au prix habituel
                </option>
                <option value="oui_inferieur">Oui, inférieur (suspect)</option>
                <option value="non">Non, prix habituel</option>
                <option value="ne_sais_pas">Je ne sais pas</option>
              </select>
            </div>

            {/* Message de confiance */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">🛡️</span>
              <p className="text-sm text-slate-600 italic">
                Vos informations resteront strictement confidentielles. Vous
                pouvez rester anonyme si vous le souhaitez.
              </p>
            </div>

            {/* Détails */}
            <div>
              <label className="block font-medium">
                Détails sur le signalement
              </label>
              <textarea
                name="details"
                rows="5"
                value={formData.details}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Bouton */}
            <div className="text-center pb-2">
              <button
                onClick={handleSubmit}
                disabled={LoadingCreate}
                className="text-white bg-slate-700 hover:bg-slate-800 text-lg py-2 font-semibold cursor-pointer w-full rounded-md disabled:opacity-50 transition-colors"
              >
                {LoadingCreate
                  ? "Enregistrement…"
                  : "Enregistrer le signalement"}
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            COLONNE DROITE — Liste des signalements
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Liste des Signalements
          </h2>

          {/* Barre de recherche */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher par référence (ex: SIG-0001)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Liste */}
          <div className="overflow-auto max-h-[900px]">
            {signalementsFiltres.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun signalement enregistré
              </p>
            ) : (
              <div className="space-y-4">
                {signalementsFiltres.map((s) => (
                  <div
                    key={s.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Header card */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-lg text-slate-700">
                          {s.reference}
                        </span>
                        <span className="text-sm text-gray-600 ml-3">
                          {s.date}
                        </span>
                      </div>
                    </div>

                    {/* Détails card */}
                    <div className="text-sm space-y-1">
                      <p className="break-words">
                        <span className="font-medium">Déclarant :</span>{" "}
                        {s.anonyme ? "Anonyme" : s.nom || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Téléphone :</span>{" "}
                        {s.anonyme ? "—" : s.tel || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Nature :</span>{" "}
                        {NATURE_LABELS[s.nature] || s.nature || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Zone :</span>{" "}
                        {s.zone || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Commerce :</span>{" "}
                        {COMMERCE_LABELS[s.commerce] || s.commerce || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Produit :</span>{" "}
                        {s.produit || "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Prix constaté :</span>{" "}
                        {s.prix ? `${s.prix} FDJ` : "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Comparaison :</span>{" "}
                        {COMPARAISON_LABELS[s.comparaison] ||
                          s.comparaison ||
                          "—"}
                      </p>
                      <p className="break-words">
                        <span className="font-medium">Détails :</span>{" "}
                        {s.details || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
