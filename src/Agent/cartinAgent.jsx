"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useAsync from "../hooks/useAsync";
import { CreateCartin, GetAllCartin } from "../api/cartun";
import SearchListPanel from "../components/SearchListPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

// ✅ Validation du formulaire
const formSchema = z.object({
  nom: z.string().min(2, "Le nom est requis."),
  telephone: z
    .string()
    .min(8, "Le numéro est requis.")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres."),
  commande: z.string().min(1, "Le numéro de commande est requis."),
  dateCommande: z.string().min(1, "La date de commande est requise."),
  probleme: z.string().min(5, "Veuillez décrire le problème."),
  reponseFournie: z.string().min(1, "La réponse fournie est requise."),
});

export default function Cartinagent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      commande: "",
      dateCommande: "",
      probleme: "",
      reponseFournie: "",
    },
  });
  const { user } = useAuth();
  const { data, error, loading, execute } = useAsync(CreateCartin, []);

  // Liste des cart'in (colonne de recherche)
  const [cartins, setCartins] = useState([]);
  const [loadingCartins, setLoadingCartins] = useState(false);

  const loadCartins = async () => {
    try {
      setLoadingCartins(true);
      const res = await GetAllCartin();
      setCartins(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error("Erreur chargement cart'in :", e);
    } finally {
      setLoadingCartins(false);
    }
  };

  useEffect(() => {
    loadCartins();
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await execute(data, user.id);

      if (result?.success) {
        toast.success("Cart'in enregistrée avec succès !");
        loadCartins(); // rafraîchit la liste de recherche
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }

      form.reset();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement Cart'in.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ═══ COLONNE GAUCHE — Formulaire ═══ */}
        <div>
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-700 px-3 py-1 text-white text-xs font-semibold rounded uppercase tracking-wide">
              CART'IN - SIGNALEMENT CLIENT
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Formulaire de Signalement Cart'in
          </h1>
          <p className="text-white">
            Enregistrement des problèmes liés aux commandes
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Détails du signalement
            </h2>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 space-y-5"
            >
              {/* Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Nom complet
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom complet"
                        {...field}
                        className="border-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Téléphone & Numéro de commande */}
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Numéro de téléphone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+253 77 000 000"
                          {...field}
                          className="border-slate-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commande"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">
                        Numéro de commande
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: DJ1032"
                          {...field}
                          className="border-slate-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date de commande */}
              <FormField
                control={form.control}
                name="dateCommande"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Date de commande
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="border-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Problème */}
              <FormField
                control={form.control}
                name="probleme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Description du problème
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre problème en détail..."
                        {...field}
                        className="border-slate-300 min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Réponse fournie */}
              <FormField
                control={form.control}
                name="reponseFournie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Réponse fournie
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Réponse communiquée au client..."
                        {...field}
                        className="border-slate-300 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className=" text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold cursor-pointer"
                >
                  Soumettre
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Message d'info */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
          <p className="text-blue-900 text-sm leading-relaxed">
            Votre signalement sera traité dans les plus brefs délais par notre
            service client Cart'in.
          </p>
        </div>
        </div>

        {/* ═══ COLONNE DROITE — Liste recherchable ═══ */}
        <SearchListPanel
          title="Liste des Cart'in"
          items={cartins}
          loading={loadingCartins}
          searchKeys={["numero_commande", "nom", "numero_telephone"]}
          searchPlaceholder="Rechercher par commande, nom ou téléphone..."
          fields={[
            { key: "numero_commande", label: "N° commande" },
            { key: "nom", label: "Nom" },
            { key: "numero_telephone", label: "Téléphone" },
            { key: "date_commande", label: "Date commande" },
            { key: "probleme", label: "Problème" },
            { key: "reponse_fournie", label: "Réponse fournie" },
            { key: "Agent", label: "Créé par" },
          ]}
          emptyText="Aucune Cart'in enregistrée"
        />
      </div>
    </div>
  );
}
