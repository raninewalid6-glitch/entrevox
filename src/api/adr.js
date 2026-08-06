const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function createSensibleCase(data, id) {
  const apiUrl = `${API_BASE_URL}?method=CreateSensible&id=${id}`;

  const payload = { ...data };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Erreur réseau détectée");

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Erreur lors de la création du cas sensible :", error);
    throw error;
  }
}

export async function getSensibleCases() {
  const apiUrl = `${API_BASE_URL}?method=GetAllSensible`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function getNormaleCases() {
  const apiUrl = `${API_BASE_URL}?method=GetAllAdr`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function Transfert(id) {
  const apiUrl = `${API_BASE_URL}?method=Transfert`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: id, transfere: 1 }),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function EnregistreAdr(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=EnregistreAdr&id=${id}`;
  const payload = {
    Nom: Donnee.nom,
    Telephone: Donnee.telephone,
    Email: Donnee.email,
    Adresse: Donnee.adresse,
    Lieu: Donnee.lieuIncident,
    Responsable: Donnee.responsable,
    Genre: Donnee.typeIncident,
    Commentaire: Donnee.description,
    qualification: "cas normal",
    Date: Donnee.date,
    Qui: Donnee.qui || " ",
    Quand: Donnee.quand || " ",
  };
  console.log("Payload to be sent:", payload);
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Mise à jour partielle d'un cas NORMAL (table adr).
export async function PartialUpdateNormal(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateNormal&id=${id}`;

  const payload = {
    Nom: Donnee.Nom,
    Telephone: Donnee.Telephone,
    Email: Donnee.Email,
    Adresse: Donnee.Adresse,
    Lieu: Donnee.Lieu,
    Responsable: Donnee.Responsable,
    date: Donnee.date,
    commentaire: Donnee.commentaire,
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    return await res.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cas normal :", error);
  }
}

// Mise à jour partielle d'un cas SENSIBLE (table sensible).
export async function PartialUpdateSensible(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateSensible&id=${id}`;

  const payload = {
    Nom: Donnee.Nom,
    Telephone: Donnee.Telephone,
    Lieu: Donnee.Lieu,
    Type: Donnee.Type,
    Responsable: Donnee.Responsable,
    date: Donnee.date,
    Description: Donnee.Description,
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    return await res.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cas sensible :", error);
  }
}

export async function countAdrCases() {
  const apiUrl = `${API_BASE_URL}?method=CountAdrCase`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
