const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

async function requestPgire(method, { params = {}, payload } = {}) {
  const query = new URLSearchParams({
    method,
    ...params,
  });

  const separator = API_BASE_URL.includes("?") ? "&" : "?";

  const response = await fetch(
    `${API_BASE_URL}${separator}${query.toString()}`,
    {
      method: payload === undefined ? "GET" : "POST",
      cache: "no-store",
      ...(payload === undefined
        ? {}
        : {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }),
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Le serveur a retourné une réponse JSON invalide.");
  }

  if (!response.ok || result.success === false) {
    throw new Error(
      result.error ||
      result.message ||
      `Erreur HTTP ${response.status}`
    );
  }

  return result;
}

function buildPayload(data) {
  return {
    nom: data.nom,
    nomConjoint: data.nomConjoint || null,
    telephone: data.telephone,
    dateNaissance: data.dateNaissance || null,
    cin: data.cin || null,
    genre: data.genre || null,
    region: data.region,
    localite: data.localite,
    categorie: data.categorie,
    plainte: data.plainte,
    descriptionPlainte: data.descriptionPlainte,
    information: data.information || null,
    nomDelegue: data.nomDelegue || null,
    dateDepot: data.dateDepot,
    dateResolution: data.dateResolution || null,
    resolutionComiteLocal: data.resolutionComiteLocal || null,
    satisfaction: data.satisfaction || null,
    statutPlainte: data.statutPlainte || "En cours",
  };
}

export async function ShowPgire() {
  const result = await requestPgire("GetAllPlaintesPgire");

  if (!Array.isArray(result.data)) {
    throw new Error("La liste des plaintes PGIRE est invalide.");
  }

  return result.data;
}

export async function ShowLastNumeroPgire() {
  const result = await requestPgire("GetNextPgireReference");

  if (!result.reference) {
    throw new Error("La référence PGIRE est manquante.");
  }

  return result.reference;
}

export async function CreatePgire(data, id) {
  if (id === undefined || id === null || id === "") {
    throw new Error("Utilisateur non connecté.");
  }

  return requestPgire("InsererPgire", {
    params: { iduser: String(id) },
    payload: {
      ...buildPayload(data),
      reference: data.reference,
    },
  });
}

export async function UpdatePgire(id, data) {
  if (id === undefined || id === null || id === "") {
    throw new Error("Identifiant du dossier manquant.");
  }

  return requestPgire("ModifierPgire", {
    params: { id: String(id) },
    payload: buildPayload(data),
  });
}