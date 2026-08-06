import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../components/dataTables/Tables/data-table";
import { columnsSensibles } from "../components/dataTables/columnsensible";
import { DataSensibles } from "../components/dataTables/datasensible";
import { columnormaux } from "../components/dataTables/columnsnormal";
import { Datanormaux } from "../components/dataTables/datanormal";
import useAsync from "../hooks/useAsync";
import {
  createSensibleCase,
  getNormaleCases,
  getSensibleCases,
} from "../api/adr";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Adr() {
  const [signalement, setSignalement] = useState("");
  const [loadindSub, setloadindSub] = useState(false);
  const { user } = useAuth();
  const {
    data: sensibleCase,
    error,
    loading,
    execute: sensibleExecute,
  } = useAsync(getSensibleCases, []);
  //utilisation useasync hook  pour enregistre le cas sensible
  const { execute: AdrExecute } = useAsync(createSensibleCase, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("qualification", "cas sensible");

    try {
      setloadindSub(true);
      const result = await AdrExecute(Object.fromEntries(formData), user.id);

      if (result?.success) {
        console.log(result?.success)
        toast.success("Plainte enregistrée avec succès !");
      } else {
        console.log(result?.error);
        toast.error("Erreur lors de l'enregistrement.");
      }

      e.target.reset(); // 👈 form.reset() remplacé
      setSignalement(""); // 👈 remet le state radio à vide aussi
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement de la plainte.");
      console.error(err);
    } finally {
      setloadindSub(false);
    }
  };

  useEffect(() => {
    sensibleExecute();
  }, [sensibleExecute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeDataSensible = Array.isArray(sensibleCase) ? sensibleCase : [];

  const {
    data: NormalCase,
    error: NormalError,
    loading: NormalLoading,
    execute: NormalExecute,
  } = useAsync(getNormaleCases, []);

  useEffect(() => {
    NormalExecute();
  }, [NormalExecute]);
  // Sécurise les données (évite les erreurs TanStack)
  const safeDataNormale = Array.isArray(NormalCase) ? NormalCase : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 w-full">
      <Tabs defaultValue="sensibles" className="w-full max-w-7xl mx-auto">
        {/* Onglets */}
        <TabsList className="flex justify-around bg-white rounded-xl mb-6 p-1.5 shadow-md border border-slate-200">
          <TabsTrigger
            value="sensibles"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Enregistrer le cas sensible
          </TabsTrigger>
          <TabsTrigger
            value="allSensibles"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Tous les cas sensibles
          </TabsTrigger>
          <TabsTrigger
            value="normaux"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-600 hover:text-slate-900 transition-all rounded-lg px-6 py-3 font-semibold"
          >
            Tous les cas normaux
          </TabsTrigger>
        </TabsList>

        {/* Formulaire Cas Sensible */}
        <TabsContent value="sensibles">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-100">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Formulaire des plaintes Cas Sensible
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <ToastContainer position="top-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-slate-700 font-semibold mb-2 block">
                    Nom complet
                  </Label>
                  <Input
                    name="Nom"
                    placeholder="Entrez le nom"
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold mb-2 block">
                    Numéro de téléphone
                  </Label>
                  <Input
                    name="Telephone"
                    type="tel"
                    placeholder="Entrez le numéro téléphone"
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-slate-700 font-semibold mb-2 block">
                    Adresse email
                  </Label>
                  <Input
                    name="Email"
                    type="email"
                    placeholder="Entrez l'adresse email"
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold mb-2 block">
                    Adresse de l'appelant
                  </Label>
                  <Input
                    name="Adresse"
                    placeholder="Entrez l'adresse appelant"
                    className="border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Détails de l'incident
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-700 font-semibold mb-2 block">
                      Lieu de l'incident
                    </Label>
                    <Input
                      name="Lieu"
                      placeholder="Où a eu lieu (VBG, EAS, et HS) ?"
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold mb-2 block">
                      Type d'incident
                    </Label>
                    <Input
                      name="Type"
                      placeholder="Le type (VBG, EAS, et HS) ?"
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold mb-2 block">
                      Responsable
                    </Label>
                    <Input
                      name="Responsable"
                      placeholder="Quel est le nom de la personne/société responsable ?"
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold mb-2 block">
                      Date et heure de l'incident
                    </Label>
                    <Input
                      name="Date"
                      type="datetime-local"
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-semibold mb-2 block">
                  Description détaillée
                </Label>
                <Textarea
                  name="Description"
                  placeholder="Description de la (VBG, EAS, et HS)"
                  className="border-slate-300 focus:border-orange-500 focus:ring-orange-500 bg-slate-50 focus:bg-white min-h-[140px] transition-all"
                />
              </div>

              {/* Section signalement */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <Label className="text-slate-800 font-semibold mb-3 block text-base">
                  Avez-vous déjà signalé cette plainte auparavant ?
                </Label>
                <div className="flex items-center gap-6 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="signalement"
                      value="oui"
                      checked={signalement === "oui"}
                      onChange={(e) => setSignalement(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                      Oui
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="signalement"
                      value="non"
                      checked={signalement === "non"}
                      onChange={(e) => setSignalement(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                      Non
                    </span>
                  </label>
                </div>

                {/* Champs conditionnels — visibles seulement si "oui" */}
                {signalement === "oui" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-blue-200 pt-4">
                    <div>
                      <Label className="text-slate-700 font-semibold mb-2 block">
                        À qui a-t-il été signalé ?
                      </Label>
                      <Input
                        name="Qui"
                        placeholder="Nom de la personne / organisation"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 font-semibold mb-2 block">
                        Quand a-t-il été signalé ?
                      </Label>
                      <Input
                        name="Quand"
                        type="date"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Champs cachés pour soumettre des valeurs vides si "non" */}
                {signalement !== "oui" && (
                  <>
                    <input type="hidden" name="signalement_qui" value="" />
                    <input type="hidden" name="signalement_quand" value="" />
                  </>
                )}
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all rounded-xl"
                disabled={loadindSub} // 👈 conditionnel au lieu de toujours disabled
              >
                {loadindSub ? "Soumission en cours..." : "Soumettre la plainte"}
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Tous les cas sensibles */}
        <TabsContent value="allSensibles">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-100">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Tous les cas sensibles
              </h2>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
              <DataTable
                columns={columnsSensibles(sensibleExecute)}
                data={safeDataSensible}
                TypeFilter="Nom"
              />
            </div>
          </div>
        </TabsContent>

        {/* Tous les cas normaux */}
        <TabsContent value="normaux">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Tous les cas normaux
              </h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-xl">
              <DataTable
                columns={columnormaux(NormalExecute)}
                data={safeDataNormale}
                TypeFilter="Nom"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
