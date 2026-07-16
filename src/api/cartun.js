const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function GetAllCartin() {
  const apiUrl = `${API_BASE_URL}?method=GetAllCartin`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function CreateCartin(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=CreateCartin&id=${id}`;

  const payload = {
    dateCommande: Donnee.dateCommande,
    nom: Donnee.nom,
    numeroCommande: Donnee.commande,
    numeroTelephone: Donnee.telephone,
    probleme: Donnee.probleme,
    reponseFournie: Donnee.reponseFournie,
  };

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
    console.error("Erreur lors de la création du cartin :", error);
    throw error;
  }
}


export async function Countcartin() {
  const apiUrl = `${API_BASE_URL}?method=Countcartin`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}
