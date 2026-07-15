const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

// Retourne null pour une valeur vide (une chaîne "" est rejetée par MySQL
// en mode strict pour les colonnes enum/date/datetime nullables).
const orNull = (v) => (v === undefined || v === null || v === "" ? null : v);

// datetime-local renvoie "YYYY-MM-DDTHH:mm" -> MySQL attend un espace.
const toMysqlDateTime = (v) => {
  const s = orNull(v);
  return s ? String(s).replace("T", " ") : null;
};

/**
 * Créer un cas sensible
 */
export async function CreateSensibleCase(data, iduser) {
  // Mappe les champs du formulaire (PascalCase) vers les clés attendues
  // par le model PHP (snake_case). Tolérant si les données arrivent déjà
  // en snake_case. varchar/text -> "" (le model fait un isset sur
  // compagne/description) ; enum/date/datetime -> null si vide.
  const payload = {
    nom: data.nom ?? data.Nom ?? "",
    telephone: data.telephone ?? data.Telephone ?? "",
    email: data.email ?? data.Email ?? "",
    adresse: data.adresse ?? data.Adresse ?? "",
    compagne: data.compagne ?? data.Compagne ?? "",
    compagne_autre: data.compagne_autre ?? data.CompagneAutre ?? "",
    lieu: data.lieu ?? data.Lieu ?? "",
    type_incident: data.type_incident ?? data.Type ?? "",
    responsable: data.responsable ?? data.Responsable ?? "",
    date_incident: toMysqlDateTime(data.date_incident ?? data.Date),
    description: data.description ?? data.Description ?? "",
    signalement: orNull(data.signalement),
    signalement_qui: data.signalement_qui ?? data.Qui ?? "",
    signalement_quand: orNull(data.signalement_quand ?? data.Quand),
  };

  const apiUrl = `${API_BASE_URL}?method=CreateSensibleCase&iduser=${iduser}`;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Error creating sensible case:", error);
  }
}

/**
 * Récupérer tous les cas sensibles
 */
export async function ShowSensibleCases() {
  const apiUrl = `${API_BASE_URL}?method=GetAllSensibleCases`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });

    const data = await res.json();

    if (data?.error) return [];

    return Array.isArray(data) ? data : data.data || [];

  } catch (error) {

    console.error("Error fetching sensible cases:", error);

    return [];

  }
}

/**
 * Modifier un cas sensible
 */
export async function PartialUpdateSensibleCase(donnee, id) {

  const apiUrl = `${API_BASE_URL}?method=PartialUpdateSensibleCase&id=${id}`;

  // Mise à jour partielle : un champ à null est ignoré par le model
  // (isset false), donc "vide" = "ne pas modifier". Les colonnes typées
  // (enum/date/datetime) passent par orNull / toMysqlDateTime pour éviter
  // un rejet MySQL en mode strict.
  const payload = {
    nom: donnee.nom ?? donnee.Nom,
    telephone: donnee.telephone ?? donnee.Telephone,
    email: donnee.email ?? donnee.Email,
    adresse: donnee.adresse ?? donnee.Adresse,
    compagne: donnee.compagne ?? donnee.Compagne,
    compagne_autre: donnee.compagne_autre ?? donnee.CompagneAutre,
    lieu: donnee.lieu ?? donnee.Lieu,
    type_incident: donnee.type_incident ?? donnee.Type,
    responsable: donnee.responsable ?? donnee.Responsable,
    date_incident: toMysqlDateTime(donnee.date_incident ?? donnee.Date),
    description: donnee.description ?? donnee.Description,
    signalement: orNull(donnee.signalement),
    signalement_qui: donnee.signalement_qui ?? donnee.Qui,
    signalement_quand: orNull(donnee.signalement_quand ?? donnee.Quand),
  };

  try {

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Erreur réseau");
    }

    return await res.json();

  } catch (error) {

    console.error("Error updating sensible case:", error);

  }
}