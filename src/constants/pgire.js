export const LOCALITES_PGIRE = {
    Dikhil: [
      "Dadahalou", "Bondara", "Sankal", "Garsaledaba",
      "Aseyla", "Koutabouya", "Teweochinilé", "Galamo",
      "Cheik Sabir", "Gourabous", "Hanlé",
    ],
    Tadjourah: [
      "Garabtissan", "Balho", "Hagandé", "Malaho", "Mounkour",
      "Otoy", "Dorra", "Andaba", "Bouya", "Assourate", "Ripta",
      "Daymoli", "Adbouya", "Roueli Helalé", "Garbanaba",
      "Galeela", "Airi", "Terdo", "Debné",
    ],
    Obock: [
      "Dalay", "Arkaylé", "Orobor", "Galaqto", "Allailidada",
      "Medeho", "Tagaré", "Dallaledaba", "Bossali", "Hamar",
    ],
  };
  
  export const MOTIFS_PGIRE = {
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
  
  export const STATUTS_PGIRE = ["En cours", "Résolue", "Clôturée"];
  
  export const SATISFACTIONS_PGIRE = [
    "Satisfait(e)",
    "Partiellement satisfait(e)",
    "Insatisfait(e)",
    "Non évaluée",
  ];
  
  export function todayPgire() {
    const parts = new Intl.DateTimeFormat("en", {
      timeZone: "Africa/Djibouti",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
  
    const part = (type) =>
      parts.find((item) => item.type === type)?.value;
  
    return `${part("year")}-${part("month")}-${part("day")}`;
  }