const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

// API to fetch mass data for different projects

export async function Hors_projets() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=hors_projets`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Ps() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=ps`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Purcsa() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=purcsa`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Pirb() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=pirb`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Pass() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=pass`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_FreshFood() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=fresh_food`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Eabs() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=eaps`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Crec() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=crec`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Aseri() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=aseri`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Agr() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=agr`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

// Charge les plaintes d'un projet donné (pour le panneau de recherche).
export async function Mass_ShowByProject(projet) {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=${projet}`;
  try {
    const response = await fetch(api, { method: "GET" });
    if (!response.ok) return [];
    const data = await response.json();
    if (data?.error) return [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors du chargement des plaintes Mass :", error);
    return [];
  }
}

// la fonction d'ajouter un projet mass
export async function Add_Mass_Project(Donnee, idUser) {
  const api = `${API_BASE_URL}?method=Mass_Insert&iduser=${idUser}`;
  const payload = {
    numero: Donnee.numero,
    date: Donnee.date,
    nom: Donnee.nom,
    conjointe: Donnee.conjointe,
    telephone: Donnee.telephone,
    date_naissance: Donnee.date_naissance,
    genre: Donnee.genre,
    cin: Donnee.cin,
    type_plainte: Donnee.type_plainte,
    projet: Donnee.projet,
    information: Donnee.information,
    region: Donnee.region,
    region_aseri: Donnee.region_aseri,
    localite: Donnee.localite,
    commune: Donnee.commune,
    information: Donnee.information,
    quartier: Donnee.quartier,
    description: Donnee.description,
    num_etudiant: Donnee.num_etudiant,
    nomdeleguer: Donnee.nomdeleguer,
    categorie: Donnee.categorie,
    type_activite: Donnee.type_activite,
    sous_type_ouvrage: Donnee.sous_type_ouvrage,
    date_depot: Donnee.date_depot,
    date_resolution: Donnee.date_resolution,
    resolution_comite: Donnee.resolution_comite,
    satisfaction: Donnee.satisfaction,
    status_plainte: Donnee.status_plainte,
    type: Donnee.type,
    type_probleme_aseri: Donnee.type_probleme_aseri,
    type_probleme_fresh_food: Donnee.type_probleme_fresh_food,
    type_probleme_agr: Donnee.type_probleme_agr,
    type_probleme_eaps: Donnee.type_probleme_eaps,
    type_probleme_crec: Donnee.type_probleme_crec,
    type_probleme_pass: Donnee.type_probleme_pass,
    type_probleme_pirb: Donnee.type_probleme_pirb,
  };
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new globalThis.Error("Erreur réseau détectée");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding mass project:", error);
  }
}
// fonction qui permet de recupere la dernier numero inserer dans la table mass
export async function Mass_LastNumero() {
  const api = `${API_BASE_URL}?method=Mass_LastNumero`;
  try {
    const response = await fetch(api, {
      method: "GET",
    });
    const data = await response.json();
    const dernierNumero = data.dernierNumero + 1;
    return dernierNumero;
  } catch (error) {
    console.error("Error fetching last mass numero:", error);
  }
}
export async function CountMass(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=CountMass`;
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

export async function PartialUpdateMass(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateMass&id=${id}`;

  const payload = {
    nom: Donnee.nom,
    description: Donnee.description,
    quartier: Donnee.quartier,
    information: Donnee.information,
    cin: Donnee.cin,
    updated_by: Donnee.updated_by,
    updated_at: Donnee.updated_at,
    telephone:Donnee.telephone,
    Date_naissance: Donnee.Date_naissance,
  };
  try {
    const res = await fetch(apiUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}
