const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

/**
 * Enregistrer un colis non trouvé (module "La Poste").
 * created_by est déduit côté serveur à partir de l'id passé en query.
 */
export async function SaveColis(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=savecolis&id=${id}`;

  const payload = {
    nom: Donnee.nom,
    telephone: Donnee.telephone,
    reference: Donnee.reference,
    type: Donnee.type,
    provenance: Donnee.provenance,
    date: Donnee.date,
    reponse_fournie: Donnee.reponse_fournie,
    commentaire: Donnee.commentaire,
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
    console.error("Erreur lors de l'enregistrement du colis :", error);
    throw error;
  }
}

export async function Cancel_order_Show() {
  const apiUrl = `${API_BASE_URL}?method=Cancel_order_Show`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

  export async function CountColisNoFound() {
    const apiUrl = `${API_BASE_URL}?method=CountColisNoFound`;
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