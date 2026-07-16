import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layouts/DashboardLayout";

import {
  menuDataLigne2020,
  menuDataLigneEab,
  menuDataLigneDjiTelcom,
  menuAllLigne,
  menuLigne2020Eab,
  menuLigne2020Djibtel,
  menuLigneEabDjibtel,
} from "../menuData";

import useAsync from "../hooks/useAsync";
import { AfficherAffecter } from "../api/affectation";
import { useAuth } from "../context/AuthContext";

// Agents pages
import MassAgent from "../Agent/massagent";
import AdrAgent from "../Agent/AdrAgent";
import Cartinagent from "../Agent/cartinAgent";
import ArulosAgent from "../Agent/arulosAgent";
import Recherche from "../superviseur/recherche";
import FormDPCR from "../Agent/dpcrAgent";
import InformationAgent from "../Agent/inforAgent";
import AnnulationCommande from "../Agent/annulationAgent";
import EABAgent from "../Agent/eabAgent";
import PlainteForm from "../Agent/Far";
import CallCenterForm from "../Agent/signalement";
import CasSensibleGenerale from "../Agent/CasGeneraleSensible";
import LaPoste from "../Agent/laposteAgent";

export default function AgentsWrapper() {
  const { user } = useAuth();

  const {
    data: affectations,
    loading,
    execute,
  } = useAsync(AfficherAffecter, []);

  React.useEffect(() => {
    execute();
  }, [execute]);

  // DEBUG : logs détaillés
  // React.useEffect(() => {
  //   console.group("[AgentsWrapper] Debug");
  //   console.log("user:", user);
  //   console.log("loading:", loading);
  //   console.log("affectations:", affectations);
  //   console.groupEnd();
  // }, [user, loading, affectations]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-blue-600 font-bold">
        Chargement...
      </div>
    );
  }

  if (!affectations || !affectations.length) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Aucune affectation disponible.
      </div>
    );
  }

  // trouver l'affectation de l'utilisateur connecté (sécurisé)
  const myAffectation = affectations.find(
    (a) => Number(a.id_user) === Number(user?.id)
  );

  // console.log("[AgentsWrapper] myAffectation:", myAffectation);

  if (!myAffectation) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Vous n'avez aucune affectation.
      </div>
    );
  }

  // normalisation
  const ligne = (myAffectation.type_ligne || "").toLowerCase().trim();
  // console.log("[AgentsWrapper] ligne normalisée:", ligne);

  // définir menu et routes
  let menuItems = [];
  let defaultRedirect = "";
  let childRoutes = [];

  switch (ligne) {
    case "ligne_2020":
      menuItems = menuDataLigne2020;
      defaultRedirect = "mass"; // redirect relatif -> /Agents/mass
      childRoutes = [
        <Route key="mass" path="mass" element={<MassAgent />} />,
        <Route key="CasGeneraleSensible" path="CasGeneraleSensible" element={<CasSensibleGenerale />} />,
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="la-poste" path="la-poste" element={<LaPoste />} />,
        <Route key="adr" path="adr" element={<AdrAgent />} />,
        <Route key="cartin" path="cartin" element={<Cartinagent />} />,
        <Route key="recherche" path="recherche" element={<Recherche />} />,
        <Route key="arulos" path="arulos" element={<ArulosAgent />} />,
        <Route key="dpcr" path="dpcr" element={<FormDPCR />} />,
        <Route
          key="information"
          path="InformationData"
          element={<InformationAgent />}
        />,
        <Route
          key="commande-annulee"
          path="commandeannulerData"
          element={<AnnulationCommande />}
        />,
        <Route key="signalement" path="signalement" element={<CallCenterForm />} />,
        <Route key="/Far" path="Far" element={<PlainteForm />} />,
      ];
      break;
    case "allligne":
      menuItems = menuAllLigne;
      defaultRedirect = "mass"; // redirect relatif -> /Agents/mass
      childRoutes = [
        <Route key="mass" path="mass" element={<MassAgent />} />,
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="la-poste" path="la-poste" element={<LaPoste />} />,
        <Route key="adr" path="adr" element={<AdrAgent />} />,
        <Route key="cartin" path="cartin" element={<Cartinagent />} />,
        <Route key="recherche" path="recherche" element={<Recherche />} />,
        <Route key="arulos" path="arulos" element={<ArulosAgent />} />,
        <Route key="dpcr" path="dpcr" element={<FormDPCR />} />,
        <Route
          key="information"
          path="InformationData"
          element={<InformationAgent />}
        />,
        <Route
          key="commande-annulee"
          path="commandeannulerData"
          element={<AnnulationCommande />}
        />,
        <Route key="signalement" path="signalement" element={<CallCenterForm />} />,
        <Route key="EAB" path="EAB" element={<EABAgent />} />,
        <Route
          key="djibouti-tel"
          path="djibouti-tel"
          element={<h1>Djibouti Télécom</h1>}
        />,
        <Route key="/Far" path="Far" element={<PlainteForm />} />,
      ];
      break;

    case "mix_ligne_eab_djib_tel":
      menuItems = menuLigneEabDjibtel;
      defaultRedirect = "EAB"; // redirect relatif -> /Agents/mass
      childRoutes = [
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="EAB" path="EAB" element={<EABAgent />} />,
        <Route
          key="djibouti-tel"
          path="djibouti-tel"
          element={<h1>Djibouti Télécom</h1>}
        />,
      ];
      break;

    case "ligne_eab":
      menuItems = menuDataLigneEab;
      defaultRedirect = "EAB";
      childRoutes = [
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="EAB" path="EAB" element={<EABAgent />} />,
      ];
      break;
    case "mix_ligne_eab_2020":
      menuItems = menuLigne2020Eab;
      defaultRedirect = "EAB";
      childRoutes = [
        <Route key="mass" path="mass" element={<MassAgent />} />,
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="la-poste" path="la-poste" element={<LaPoste />} />,
        <Route key="adr" path="adr" element={<AdrAgent />} />,
        <Route key="cartin" path="cartin" element={<Cartinagent />} />,
        <Route key="recherche" path="recherche" element={<Recherche />} />,
        <Route key="arulos" path="arulos" element={<ArulosAgent />} />,
        <Route key="dpcr" path="dpcr" element={<FormDPCR />} />,
        <Route key="/Far" path="Far" element={<PlainteForm />} />,
        <Route
          key="information"
          path="InformationData"
          element={<InformationAgent />}
        />,
        <Route
          key="commande-annulee"
          path="commandeannulerData"
          element={<AnnulationCommande />}
        />,
        <Route key="signalement" path="signalement" element={<CallCenterForm />} />,
        <Route key="EAB" path="EAB" element={<EABAgent />} />,
      ];
      break;
    case "mix_ligne_2020_djib_tel":
      menuItems = menuLigne2020Djibtel;
      defaultRedirect = "EAB";
      childRoutes = [
        <Route key="mass" path="mass" element={<MassAgent />} />,
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route key="la-poste" path="la-poste" element={<LaPoste />} />,
        <Route key="adr" path="adr" element={<AdrAgent />} />,
        <Route key="cartin" path="cartin" element={<Cartinagent />} />,
        <Route key="recherche" path="recherche" element={<Recherche />} />,
        <Route key="arulos" path="arulos" element={<ArulosAgent />} />,
        <Route key="dpcr" path="dpcr" element={<FormDPCR />} />,
        <Route key="/Far" path="Far" element={<PlainteForm />} />,
        <Route
          key="information"
          path="InformationData"
          element={<InformationAgent />}
        />,
       
        <Route
          key="commande-annulee"
          path="commandeannulerData"
          element={<AnnulationCommande />}
        />,
        <Route key="signalement" path="signalement" element={<CallCenterForm />} />,
        <Route
          key="djibouti-tel"
          path="djibouti-tel"
          element={<h1>Djibouti Télécom</h1>}
        />,
      ];
      break;

    case "ligne_djib_tel":
      menuItems = menuDataLigneDjiTelcom;
      defaultRedirect = "djibouti-tel";
      childRoutes = [
        <Route key="cas-sensible-general" path="cas-sensible-general" element={<CasSensibleGenerale />} />,
        <Route
          key="djibouti-tel"
          path="djibouti-tel"
          element={<h1>Djibouti Télécom</h1>}
        />,
      ];
      break;

    default:
      return (
        <div className="text-center mt-20 text-red-600 font-bold">
          Type de ligne inconnu : {ligne}
        </div>
      );
  }

  // Variante : on retourne une structure <Routes> qui utilise Layout comme parent (même pattern que dans App.jsx)
  // Cela garantit que Layout rendra les routes enfants via <Outlet/>
  return (
    <Routes>
      <Route element={<Layout role="agents" menuItems={menuItems} />}>
        {/* index redirige vers la page par défaut de l'agent */}
        <Route index element={<Navigate to={defaultRedirect} replace />} />

        {/* routes enfants */}
        {childRoutes}

        {/* fallback interne */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-red-600 font-bold">
              Page introuvable (Agents)
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
