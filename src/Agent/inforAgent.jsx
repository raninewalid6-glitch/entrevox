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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../context/AuthContext";
import useAsync from "../hooks/useAsync";
import { Info_Create } from "../api/information";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Validation du formulaire
const formSchema = z.object({
  typeInfo: z.string().min(1, "Type d'information requis"),
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro invalide"),
  commentaire: z.string().min(5, "Commentaire obligatoire"),
  reponse_fournie: z.string().optional(),
});

export default function InformationAgent() {
  const { user } = useAuth();
  const { execute } = useAsync(Info_Create, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeInfo: "",
      nom: "",
      telephone: "",
      commentaire: "",
      reponse_fournie: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const result = await execute(values, user.id);

      if (result?.success) {
        toast.success("Enregistrée avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }

      form.reset();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement de l'information.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 border-r-3">
      <ToastContainer position="top-center" />
      <div className="max-w-3xl mx-auto">
        {/* 🟦 En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Ligne 2020
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">
            Informations sur la ligne 2020
          </h1>
          <p className="text-white mt-2">
            Merci de renseigner les détails ci-dessous afin d’obtenir ou de
            signaler une information liée à la ligne 2020.
          </p>
        </div>

        {/* 🧾 Formulaire */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Type d'info */}
              <FormField
                control={form.control}
                name="typeInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'information</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white w-full">
                        <SelectItem
                          value="adr"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Adr info
                        </SelectItem>
                        <SelectItem
                          value="arulos"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Arulos Info
                        </SelectItem>
                        <SelectItem
                          value="cartin"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Cart in info
                        </SelectItem>
                        <SelectItem
                          value="Mass"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Info Mass 
                        </SelectItem>
                        <SelectItem
                          value="La Poste"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Info la poste
                        </SelectItem>
                        <SelectItem
                          value="Far"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Info Far
                        </SelectItem>
                        <SelectItem
                          value="commerce"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Info commerce
                        </SelectItem>
                        <SelectItem
                          value="Ligne 2020"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Info générale
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre nom" {...field} />
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
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: +253 77 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Commentaire */}
              <FormField
                control={form.control}
                name="commentaire"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaire</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Votre commentaire..." {...field} />
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
                    <FormLabel>Réponse fournie (optionnel)</FormLabel>
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

              {/* Bouton */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="border-radius-8 text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold cursor-pointer"
                >
                  Soumettre
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
