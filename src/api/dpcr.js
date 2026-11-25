const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function DpcrShow() {
  const apiUrl = `${API_BASE_URL}?method=getIncidents`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function FetchNextId() {
  const apiUrl = `${API_BASE_URL}?method=getNextCallId`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data?.nextCallId;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function EnregistrerDpcr(dataToSend, iduser) {
  const Data = {
    callId: dataToSend.idAppel,
    callerName: dataToSend.nomAppelant,
    contact: dataToSend.contact,
    userType: dataToSend.typeUsager,
    requestType: dataToSend.typeDemande,
    description: dataToSend.description,
    location: {
      region: dataToSend.region,
      city: dataToSend.ville,
      roadName: dataToSend.route,
    },
    datetime: dataToSend.dateHeure,
    severity: dataToSend.gravite,
    langue: dataToSend.langue,
    lieu: dataToSend.lieu,
    immatriculation: dataToSend.immatriculation,
    refMobileMoney: dataToSend.refMobileMoney,
  };
  const apiUrl = `${API_BASE_URL}?method=PlaintInsert&iduser=${iduser}`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function PartialUpdateDpcr(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateDpcr&id=${id}`;

  const payload = {
    caller_name: Donnee.caller_name,
    contact: Donnee.contact,
    user_type: Donnee.user_type,
    request_type: Donnee.request_type,
    description: Donnee.description,
    region: Donnee.region,
    city: Donnee.city,
    road_name: Donnee.road_name,
    datetime: Donnee.datetime,
    severity: Donnee.severity,
    langue: Donnee.langue,
    lieu: Donnee.lieu,
    immatriculation: Donnee.immatriculation,
    ref_mobile_money: Donnee.ref_mobile_money,
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
    console.error("Erreur lors de la mise à jour du DPCR :", error);
  }
}

export async function InformServices(dataToSend, iduser) {
  const Data = {
    ...dataToSend,
  };
  const apiUrl = `${API_BASE_URL}?method=InformServices&iduser=${iduser}`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}
