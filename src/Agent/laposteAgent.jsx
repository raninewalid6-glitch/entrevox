"use client";

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
import { Button } from "@/components/ui/button";
import { SaveColis } from "../api/coli_non_found";
import useAsync from "../hooks/useAsync";
import { useAuth } from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Schéma de validation
const formSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro invalide"),
  reference: z.string().min(1, "Référence requise"),
  type: z.string().min(1, "Type de colis requis"),
  provenance: z.string().min(1, "Provenance requise"),
  date: z.string().min(1, "Date obligatoire"),
  reponse_fournie: z.string().min(1, "Réponse fournie requise"),
});

export default function LaPoste() {
  const { user } = useAuth();
  const { execute } = useAsync(SaveColis, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      reference: "",
      type: "",
      provenance: "",
      date: "",
      reponse_fournie: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const result = await execute(values, user.id);

      if (result?.success) {
        toast.success("Colis enregistré avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement.");
        console.error("Erreur API:", result?.error);
      }

      form.reset();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement du colis.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-2xl mx-auto">
        {/* 🟦 En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Colis
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">La Poste</h1>
          <p className="text-slate-100 mt-2 text-sm">
            Merci d’indiquer les détails du colis non trouvé afin d’assurer son
            suivi.
          </p>
        </div>

        {/* 📄 Formulaire */}
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nom du client */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : Ranine Walid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Téléphone */}
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="77 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Référence */}
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Référence</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : RR123456789DJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type de colis */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de colis</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : Lettre, Paquet, EMS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Provenance */}
              <FormField
                control={form.control}
                name="provenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provenance</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : France, Éthiopie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Réponse fournie */}
              <FormField
                control={form.control}
                name="reponse_fournie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Réponse fournie</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Réponse communiquée au client"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton d’envoi */}
              <Button
                type="submit"
                className=" text-white w-full py-6 text-lg font-semibold bg-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                Enregistrer
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
