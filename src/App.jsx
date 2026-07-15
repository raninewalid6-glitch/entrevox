import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy } from "react";
import CatchAllRedirect from "./components/CatchAllRedirect";

// Pages publiques
const Accueil = lazy(() => import("./Accueil"));

// Superviseur/Admin/SuperAdmin
const Adr = lazy(() => import("./superviseur/adr"));
const CasGeneralSensible = lazy(() =>
  import("./superviseur/casGeneralSensible"),
);
const Agents = lazy(() => import("./superviseur/agents"));
const CartinData = lazy(() => import("./superviseur/cartin"));
const Recherche = lazy(() => import("./superviseur/recherche"));
const Arulos = lazy(() => import("./superviseur/arulos"));
const EAB = lazy(() => import("./superviseur/EAB"));
const InformationData = lazy(() => import("./superviseur/information"));
const AffectationLigne = lazy(() => import("./superviseur/affectation_ligne"));
const CommandeannulerData = lazy(
  () => import("./superviseur/annulationcommande"),
);
const ColisNontrouverData = lazy(
  () => import("./superviseur/colis-nontrouver"),
);

// Masse
const PurcsaData = lazy(() => import("./superviseur/purcsa"));
const AGR = lazy(() => import("./superviseur/agr"));
const Aseri = lazy(() => import("./superviseur/aseri"));
const Crec = lazy(() => import("./superviseur/crec"));
const EABData = lazy(() => import("./superviseur/eabmasse"));
const FreeshData = lazy(() => import("./superviseur/freeshfood"));
const PassData = lazy(() => import("./superviseur/pass"));
const PirbData = lazy(() => import("./superviseur/pirb"));
const PsData = lazy(() => import("./superviseur/ps"));
const HsData = lazy(() => import("./superviseur/horsprojet"));

// Clients Mass
const AgrClient = lazy(() => import("./ClientMass/Agr"));
const PurcsaClient = lazy(() => import("./ClientMass/Purcsa"));
const FreshFood = lazy(() => import("./ClientMass/FreshFood"));
const Ps = lazy(() => import("./ClientMass/Ps"));
const Eaps = lazy(() => import("./ClientMass/Eaps"));
const Pass = lazy(() => import("./ClientMass/Pass"));
const Pirb = lazy(() => import("./ClientMass/Pirb"));
const Crecs = lazy(() => import("./ClientMass/Crec"));
const Aseris = lazy(() => import("./ClientMass/Aseri"));
const Rapport = lazy(() => import("./ClientMass/Rapport"));
const SupDpcr = lazy(() => import("./superviseur/dpcr"));

// Menu
import {
  menuData,
  menuDataEquipe_Qualiter,
  menuDataforClientMass,
  menuFar,
} from "./menuData";

import { Dashboard } from "./components/Dashboard/Dashboard";
import { DashboardClient } from "./components/Dashboard/DashboardClient";
import AgentsWrapper from "./components/AgentsWrapper";
import PlainteForm from "./Agent/Far";
import FarSup from "./superviseur/FarSup";
import GrilleEvaluation from "./components/Grille_d'evaluation/grille_evaluation";
import SignalementSup from "./superviseur/signalement";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="text-center mt-20 text-blue-600 font-bold">
              Chargement...
            </div>
          }
        >
          <Routes>
            {/* Page publique */}
            <Route path="/" element={<Accueil />} />

            {/* Superviseur/Admin */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["superAdmin", "admin", "chefCentre"]}
                />
              }
            >
              <Route element={<Layout menuItems={menuData} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/adr" element={<Adr />} />
                <Route
                  path="/cas-sensible-general"
                  element={<CasGeneralSensible />}
                />
                <Route path="/agents" element={<Agents />} />
                <Route path="/cartin" element={<CartinData />} />
                <Route path="/recherche" element={<Recherche />} />
                <Route path="/arulos" element={<Arulos />} />
                <Route path="/eab" element={<EAB />} />
                <Route path="/dpcr" element={<SupDpcr />} />
                <Route path="/Far" element={<FarSup />} />
                <Route path="/InformationData" element={<InformationData />} />
                <Route
                  path="/affectation-ligne"
                  element={<AffectationLigne />}
                />
                <Route
                  path="/commandeannulerData"
                  element={<CommandeannulerData />}
                />
                <Route
                  path="/ColisNontrouverData"
                  element={<ColisNontrouverData />}
                />
                <Route path="/masse/purcsa" element={<PurcsaData />} />
                <Route path="/masse/agr" element={<AGR />} />
                <Route path="/masse/aseri" element={<Aseri />} />
                <Route path="/masse/crec" element={<Crec />} />
                <Route path="/masse/eab" element={<EABData />} />
                <Route path="/masse/freesh" element={<FreeshData />} />
                <Route path="/masse/pass" element={<PassData />} />
                <Route path="/masse/pirb" element={<PirbData />} />
                <Route path="/masse/ps" element={<PsData />} />
                <Route path="/masse/hs" element={<HsData />} />
                <Route path="/Djib-tel" element={<h1>Djibouti Télécom</h1>} />
                <Route path="/Signalement" element={<SignalementSup />} />{" "}
              </Route>
            </Route>

            {/* Equipe Qualiter */}
            <Route
              element={<ProtectedRoute allowedRoles={["equipe_qualiter"]} />}
            >
              <Route element={<Layout menuItems={menuDataEquipe_Qualiter} />}>
                <Route
                  path="/Equipe_Qualiter/dashboard"
                  element={<Dashboard />}
                />
                <Route path="/Equipe_Qualiter/adr" element={<Adr />} />
                <Route
                  path="/Equipe_Qualiter/cas-sensible-general"
                  element={<CasGeneralSensible />}
                />
                <Route path="/Equipe_Qualiter/agents" element={<Agents />} />
                <Route
                  path="/Equipe_Qualiter/grille-evaluation"
                  element={<GrilleEvaluation />}
                />
                <Route
                  path="/Equipe_Qualiter/cartin"
                  element={<CartinData />}
                />
                <Route
                  path="/Equipe_Qualiter/recherche"
                  element={<Recherche />}
                />
                <Route path="/Equipe_Qualiter/arulos" element={<Arulos />} />
                <Route path="/Equipe_Qualiter/eab" element={<EAB />} />
                <Route path="/Equipe_Qualiter/dpcr" element={<SupDpcr />} />
                <Route path="/Equipe_Qualiter/Far" element={<FarSup />} />
                <Route
                  path="/Equipe_Qualiter/signalement"
                  element={<SignalementSup />}
                />
                <Route
                  path="/Equipe_Qualiter/InformationData"
                  element={<InformationData />}
                />
                <Route
                  path="/Equipe_Qualiter/commandeannulerData"
                  element={<CommandeannulerData />}
                />
                <Route
                  path="/Equipe_Qualiter/ColisNontrouverData"
                  element={<ColisNontrouverData />}
                />
                <Route
                  path="/Equipe_Qualiter/masse/purcsa"
                  element={<PurcsaData />}
                />
                <Route path="/Equipe_Qualiter/masse/agr" element={<AGR />} />
                <Route
                  path="/Equipe_Qualiter/masse/aseri"
                  element={<Aseri />}
                />
                <Route path="/Equipe_Qualiter/masse/crec" element={<Crec />} />
                <Route
                  path="/Equipe_Qualiter/masse/eab"
                  element={<EABData />}
                />
                <Route
                  path="/Equipe_Qualiter/masse/freesh"
                  element={<FreeshData />}
                />
                <Route
                  path="/Equipe_Qualiter/masse/pass"
                  element={<PassData />}
                />
                <Route
                  path="/Equipe_Qualiter/masse/pirb"
                  element={<PirbData />}
                />
                <Route path="/Equipe_Qualiter/masse/ps" element={<PsData />} />
                <Route path="/Equipe_Qualiter/masse/hs" element={<HsData />} />
                <Route
                  path="/Equipe_Qualiter/Djib-tel"
                  element={<h1>Djibouti Télécom</h1>}
                />
              </Route>
            </Route>

            {/* Equipe Qualiter */}
            <Route element={<ProtectedRoute allowedRoles={["far_client"]} />}>
              <Route element={<Layout menuItems={menuFar} />}>
                <Route key="Far" path="Agent/Far" element={<PlainteForm />} />
              </Route>
            </Route>

            {/* Agents */}
            <Route element={<ProtectedRoute allowedRoles={["agents"]} />}>
              <Route path="/Agents/*" element={<AgentsWrapper />} />
            </Route>

            {/* Clients */}
            <Route element={<ProtectedRoute allowedRoles={["clients"]} />}>
              <Route element={<Layout menuItems={menuDataforClientMass} />}>
                <Route path="/Client/dashboard" element={<DashboardClient />} />
                <Route path="/Client/purcsa" element={<PurcsaClient />} />
                <Route path="/Client/agr" element={<AgrClient />} />
                <Route path="/Client/aseri" element={<Aseris />} />
                <Route path="/Client/freshfood" element={<FreshFood />} />
                <Route path="/Client/ps" element={<Ps />} />
                <Route path="/Client/eaps" element={<Eaps />} />
                <Route path="/Client/pass" element={<Pass />} />
                <Route path="/Client/pirb" element={<Pirb />} />
                <Route path="/Client/crec" element={<Crecs />} />
                <Route path="/Client/rapport" element={<Rapport />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<CatchAllRedirect />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
