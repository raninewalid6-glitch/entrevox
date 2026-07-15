import {
  ClipboardCheck,
  ClipboardList,
  Database,
  FileText,
  FolderKanban,
  Home,
  Layers,
  Users,
} from "lucide-react";

export const menuData = [
  {
    title: "Gestion Des Utilisateurs Et Agents",
    items: [
      {
        path: "/dashboard",
        label: "Tableau de bord",
        icon: <Home className="w-4 h-4" />,
      },
      {
        path: "/agents",
        label: "Liste des agents",
        icon: <Users className="w-4 h-4" />,
      },
      {
        path: "/affectation-ligne",
        label: "AffectationLigne",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },

  {
    title: "Ligne 2020",
    items: [
      {
        label: "Masse",
        icon: <Layers className="w-4 h-4" />,
        children: [
          { path: "/masse/purcsa", label: "PURCSA" },
          { path: "/masse/AGR", label: "AGR" },
          { path: "/masse/Aseri", label: "ASERI" },
          { path: "/masse/Crec", label: "CREC" },
          { path: "/masse/eab", label: "Eabs" },
          { path: "/masse/freesh", label: "Freesh Food" },
          { path: "/masse/pass", label: "Pass" },
          { path: "/masse/pirb", label: "PIRB" },
          { path: "/masse/ps", label: "PS" },
          { path: "/masse/hs", label: "Hors Projet" },
        ],
      },
      {
        path: "/signalement",
        label: "Commerce",
        icon: <ClipboardList className="w-4 h-4" />,
      },
      {
        path: "/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/cas-sensible-general",
        label: "Cas Sensible Général",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },

      {
        path: "/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/dpcr",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Far",
        label: "Far",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/ColisNontrouverData",
        label: "Colis non trouvé",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Djib-tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataEquipe_Qualiter = [
  {
    title: "Gestion Des Utilisateurs Et Agents",
    items: [
      {
        path: "/Equipe_Qualiter/dashboard",
        label: "Tableau de bord",
        icon: <Home className="w-4 h-4" />,
      },
      {
        path: "/Equipe_Qualiter/agents",
        label: "Liste des agents",
        icon: <Users className="w-4 h-4" />,
      },
      {
        path: "/Equipe_Qualiter/grille-evaluation",
        label: "Grille d'Évaluation",
        icon: <ClipboardCheck />,
      },
    ],
  },

  {
    title: "Ligne 2020",
    items: [
      {
        label: "Masse",
        icon: <Layers className="w-4 h-4" />,
        children: [
          { path: "/Equipe_Qualiter/masse/purcsa", label: "PURCSA" },
          { path: "/Equipe_Qualiter/masse/AGR", label: "AGR" },
          { path: "/Equipe_Qualiter/masse/Aseri", label: "ASERI" },
          { path: "/Equipe_Qualiter/masse/Crec", label: "CREC" },
          { path: "/Equipe_Qualiter/masse/eab", label: "Eabs" },
          { path: "/Equipe_Qualiter/masse/freesh", label: "Freesh Food" },
          { path: "/Equipe_Qualiter/masse/pass", label: "Pass" },
          { path: "/Equipe_Qualiter/masse/pirb", label: "PIRB" },
          { path: "/Equipe_Qualiter/masse/ps", label: "PS" },
          { path: "/Equipe_Qualiter/masse/hs", label: "Hors Projet" },
        ],
      },
      {
        path: "/Equipe_Qualiter/signalement",
        label: "Commerce",
        icon: <ClipboardList className="w-4 h-4" />,
      },
      {
        path: "/Equipe_Qualiter/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },

      {
        path: "/Equipe_Qualiter/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/dpcr",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/Far",
        label: "Far",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/ColisNontrouverData",
        label: "Colis non trouvé",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Equipe_Qualiter/signalement",
        label: "Commerce",
        icon: <ClipboardList className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/Equipe_Qualiter/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Equipe_Qualiter/Djib-tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuFar = [
  {
    title: "Ligne 2020",
    items: [
      {
        path: "/Agent/Far",
        label: "Far",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataLigne2020 = [
  {
    title: "Ligne 2020",
    items: [
      {
        path: "/Agents/mass",
        label: "Mass",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/CasGeneraleSensible",
        label: "Cas Generale Sensible",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/signalement",
        label: "Commerce",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Far",
        label: "Far",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      
    ],
  },
];

export const menuDataLigneEab = [
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/Agents/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/CasGeneraleSensible",
        label: "Cas Generale Sensible",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataLigneDjiTelcom = [
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Agents/Djibouti-Tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/CasGeneraleSensible",
        label: "Cas Generale Sensible",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuDataforClientMass = [
  {
    title: "Programme Mass",
    items: [
      {
        path: "/Client/Dashboard",
        label: "Tableau de bord",
        icon: <Home className="w-4 h-4" />,
      },
      {
        path: "/Client/Purcsa",
        label: "Purcsa",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Agr",
        label: "Agr",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Aseri",
        label: "Aseri",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/FreshFood",
        label: "FreshFood",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Ps",
        label: "Ps",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Eaps",
        label: "Eabs",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Pass",
        label: "Pass",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Pirb",
        label: "Pirb",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Client/Crec",
        label: "Crec",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  
  {
    title: "Rapports Deleguer",
    items: [
      {
        path: "/Client/Rapport",
        label: "Rapport ",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuAllLigne = [
  {
    title: "Ligne 2020",
    items: [
      {
        path: "/Agents/mass",
        label: "Mass",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/CasGeneraleSensible",
        label: "Cas Generale Sensible",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/signalement",
        label: "Commerce",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },

      {
        path: "/Agents/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Far",
        label: "Far",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/signalement",
        label: "CallCenterForm",
        icon: <ClipboardList className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/Agents/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Agents/Djibouti-Tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuLigneEabDjibtel = [
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/Agents/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Agents/Djibouti-Tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];

export const menuLigne2020Djibtel = [
  {
    title: "Ligne 2020",
    items: [
      {
        path: "/Agents/mass",
        label: "Mass",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/signalement",
        label: "Commerce",
        icon:<FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Far",
        label: "Far",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
    ],
  },
  {
    title: "Ligne Djibouti Telecom",
    items: [
      {
        path: "/Agents/Djibouti-Tel",
        label: "Djibouti Telecom",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/signalement",
        label: "CallCenterForm",
        icon: <ClipboardList className="w-4 h-4" />,
      },
    ],
  },
];

export const menuLigne2020Eab = [
  {
    title: "Ligne 2020",
    items: [
      {
        path: "/Agents/mass",
        label: "Mass",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/signalement",
        label: "Commerce",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/adr",
        label: "ADR",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/cartin",
        label: "Cartin",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/recherche",
        label: "Recherche",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Arulos",
        label: "Arulos",
        icon: <FolderKanban className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/DPCR",
        label: "DPCR",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/Far",
        label: "Far",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/commandeannulerData",
        label: "Annulation commande",
        icon: <ClipboardList className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/Agents/InformationData",
        label: "Information",
        icon: <FileText className="w-4 h-4 opacity-70" />,
      },
      {
        path: "/signalement",
        label: "CallCenterForm",
        icon: <ClipboardList className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Ligne EAB",
    items: [
      {
        path: "/Agents/EAB",
        label: "EAB Bank",
        icon: <Database className="w-4 h-4 opacity-70" />,
      },
    ],
  },
];
