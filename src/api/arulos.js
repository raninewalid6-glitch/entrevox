const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function GetAllArulos() {
  const apiUrl = `${API_BASE_URL}?method=GetAllArulos`;
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

export async function CreateArulos(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=EnregistreArulos&id=${id}`;
  const payload = {
    nom: Donnee.nom,
    numero_telephone: Donnee.telephone,
    numero_logement: Donnee.logement,
    type: Donnee.typeAppel,
    nom_projet: Donnee.projet,
    quartier: Donnee.quartier,
    equipement: Donnee.equipement,
    affecterTotal: Donnee.affectation,
    commentaire: Donnee.commentaire,
    nomChefChantier: Donnee.nomChefChantier,
    numero_facture: Donnee.facture,
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





export async function PartialUpdateArulos(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateArulos&id=${id}`;

  const payload = {
    nom: Donnee.nom,
    numero_telephone: Donnee.numero_telephone,
    numero_logement: Donnee.numero_logement,
    type: Donnee.type,
    nom_projet: Donnee.nom_projet,
    quartier: Donnee.quartier,
    equipement: Donnee.equipement,
    affecterTotal: Donnee.affecterTotal,
    commentaire: Donnee.commentaire,
    numero_facture: Donnee.numero_facture,
    nomChefChantier: Donnee.nomChefChantier,
    updated_by: Donnee.updated_by,
    updated_at: Donnee.updated_at,
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
    console.error("Erreur lors de la mise à jour de l'arulos :", error);
  }
}

  export async function Countarulos() {
    const apiUrl = `${API_BASE_URL}?method=Countarulos`;
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
