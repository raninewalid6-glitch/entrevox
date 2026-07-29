"use client";

import { useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// ✅ Les scénarios du guide (source : document "Support Cart'in Amazon")
const SCENARIOS = [
  {
    id: 1,
    titre: "La commande n'apparaît pas immédiatement",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client vient de passer sa commande sur Amazon et souhaite vérifier immédiatement si elle est visible dans son espace Cart'In.",
      },
      {
        label: "Explication",
        type: "text",
        content:
          "La commande peut mettre un certain temps avant d'être synchronisée dans le système Cart'In. Il est donc normal qu'elle n'apparaisse pas immédiatement après la validation.",
      },
      {
        label: "Réponse à apporter au client",
        type: "quote",
        content:
          "« Votre commande a bien été effectuée. Il est normal qu'elle ne soit pas encore visible dans votre espace Cart'In. Le système nécessite un délai de synchronisation. Nous vous invitons à patienter quelques instants puis à actualiser votre espace. Si la commande n'apparaît toujours pas après un délai raisonnable, n'hésitez pas à nous recontacter. »",
      },
    ],
  },
  {
    id: 2,
    titre: "Le client n'a pas reçu l'e-mail de confirmation",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client indique qu'il n'a reçu aucun e-mail après son inscription.",
      },
      {
        label: "Vérifications",
        type: "list",
        items: [
          "Vérifier l'adresse e-mail renseignée.",
          "Demander au client de consulter le dossier Spam ou Courrier indésirable.",
          "Vérifier qu'il n'y a pas d'erreur de saisie dans l'adresse e-mail.",
        ],
      },
      {
        label: "Réponse à apporter au client",
        type: "quote",
        content:
          "« Je vous invite à vérifier votre dossier Spam ainsi que l'adresse e-mail utilisée lors de votre inscription. Si vous ne trouvez toujours pas le message, nous effectuons les vérifications nécessaires. »",
      },
    ],
  },
  {
    id: 3,
    titre: "Le client a oublié son mot de passe",
    sections: [
      {
        label: "Situation",
        type: "text",
        content: "Le client ne peut plus accéder à son compte.",
      },
      {
        label: "Solution",
        type: "list",
        items: [
          "Cliquer sur « Mot de passe oublié ».",
          "Saisir l'adresse e-mail.",
          "Suivre les instructions envoyées par e-mail.",
        ],
      },
    ],
  },
  {
    id: 4,
    titre: "Le client a oublié son code secret",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client ne se souvient plus de son code secret à 6 chiffres.",
      },
      {
        label: "Explication",
        type: "text",
        content: "Le code secret est indispensable pour retirer un colis.",
      },
      {
        label: "Conduite à tenir",
        type: "text",
        content:
          "Le client doit se connecter à son compte Cart'In puis aller dans l'option « Sécurité » pour voir le code à 6 chiffres.",
      },
    ],
  },
  {
    id: 5,
    titre: "Le client a sélectionné le mauvais pays",
    sections: [
      {
        label: "Situation",
        type: "text",
        content: "Le client a choisi un autre pays que Djibouti.",
      },
      {
        label: "Conséquence",
        type: "text",
        content:
          "La commande peut ne pas être correctement prise en charge par Cart'In.",
      },
      {
        label: "Solution",
        type: "text",
        content:
          "Vérifier si la commande peut encore être modifiée. Si ce n'est plus possible, informer le client que le support compétent prend en charge sa demande.",
      },
    ],
  },
  {
    id: 6,
    titre: "La commande reste en attente",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client constate que sa commande est toujours en attente.",
      },
      {
        label: "Vérifications",
        type: "list",
        items: [
          "Paiement validé.",
          "Synchronisation en cours.",
          "Validation du vendeur Amazon.",
        ],
      },
      {
        label: "Réponse à apporter au client",
        type: "quote",
        content:
          "« Une commande peut rester temporairement en attente le temps des différentes validations. Nous vous invitons à patienter jusqu'à la mise à jour de son statut. »",
      },
    ],
  },
  {
    id: 7,
    titre: "Le paiement a été effectué mais la commande est absente",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client indique que le paiement a été débité, mais aucune commande n'apparaît.",
      },
      {
        label: "Vérifications",
        type: "list",
        items: [
          "Date et heure de la commande.",
          "Numéro de commande Amazon.",
          "Adresse e-mail utilisée.",
          "Capture d'écran de la confirmation (si nécessaire).",
          "Demander si le compte a été débité ou pas.",
        ],
      },
      {
        label: "Action",
        type: "text",
        content:
          "Escalader le dossier au support technique si aucune synchronisation n'intervient après le délai prévu de 24h.",
      },
    ],
  },
  {
    id: 8,
    titre: "Le client souhaite modifier sa commande",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client veut ajouter ou supprimer un article après avoir confirmé la commande.",
      },
      {
        label: "Réponse",
        type: "text",
        content:
          "Si la commande est confirmée, autrement dit si le paiement est effectué, aucune modification ou annulation n'est possible.",
      },
    ],
  },
  {
    id: 9,
    titre: "Le client ne retrouve pas sa commande",
    sections: [
      {
        label: "Situation",
        type: "text",
        content:
          "Le client affirme avoir commandé mais ne retrouve aucune trace.",
      },
      {
        label: "Vérifications",
        type: "list",
        items: [
          "Numéro de commande.",
          "Adresse e-mail utilisée.",
          "Date de la commande.",
          "Compte Amazon utilisé.",
        ],
      },
      {
        label: "Solution",
        type: "text",
        content:
          "Vérifier les informations avant d'ouvrir une demande de recherche, puis informer le client de patienter une durée de 72h.",
      },
    ],
  },
  {
    id: 10,
    titre: "Le client reçoit plusieurs confirmations",
    sections: [
      {
        label: "Situation",
        type: "text",
        content: "Le client pense avoir payé plusieurs fois.",
      },
      {
        label: "Vérifications",
        type: "list",
        items: [
          "Nombre de commandes enregistrées.",
          "Historique des paiements.",
          "Numéros de commande.",
        ],
      },
      {
        label: "Réponse",
        type: "text",
        content:
          "Vérifier si plusieurs commandes distinctes ont été créées avant de conclure à un double paiement.",
      },
    ],
  },
];

// ✅ Checklist des bonnes pratiques du téléconseiller
const BONNES_PRATIQUES = [
  "L'identité du client.",
  "L'adresse e-mail du compte.",
  "Le numéro de commande.",
  "La date et l'heure de la commande.",
  "Le statut de la commande.",
  "Le mode de paiement utilisé.",
];

// ✅ Rendu d'une section de scénario (texte, liste ou réponse type)
const ScenarioSection = ({ section }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
      {section.label}
    </p>
    {section.type === "text" && (
      <p className="text-slate-700 text-sm leading-relaxed">
        {section.content}
      </p>
    )}
    {section.type === "list" && (
      <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm leading-relaxed">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
    {section.type === "quote" && (
      <p className="text-sm leading-relaxed italic text-slate-700 bg-blue-50 border-l-4 border-blue-600 rounded-r-md px-4 py-3">
        {section.content}
      </p>
    )}
  </div>
);

export default function SupportCartin() {
  const [recherche, setRecherche] = useState("");

  // Filtre les scénarios sur le titre et le contenu
  const terme = recherche.trim().toLowerCase();
  const scenariosFiltres = SCENARIOS.filter((scenario) => {
    if (!terme) return true;
    if (scenario.titre.toLowerCase().includes(terme)) return true;
    return scenario.sections.some((section) => {
      if (section.content?.toLowerCase().includes(terme)) return true;
      return section.items?.some((item) =>
        item.toLowerCase().includes(terme)
      );
    });
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 🟦 En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Guide
          </div>
          <h1 className="text-3xl font-bold text-white mt-3 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Support Cart'In — Amazon
          </h1>
          <p className="text-slate-100 mt-2 text-sm">
            Guide des scénarios les plus fréquents et des réponses à apporter
            aux clients.
          </p>
        </div>

        {/* 📄 Contenu */}
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-6 space-y-6">
          {/* 🔎 Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher un scénario (ex : mot de passe, paiement, e-mail...)"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 📚 Scénarios */}
          {scenariosFiltres.length === 0 ? (
            <p className="text-center text-slate-500 py-8">
              Aucun scénario ne correspond à votre recherche.
            </p>
          ) : (
            scenariosFiltres.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-slate-200 rounded-xl p-5 space-y-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center">
                    {scenario.id}
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {scenario.titre}
                  </h2>
                </div>
                <div className="space-y-3 pl-11">
                  {scenario.sections.map((section) => (
                    <ScenarioSection key={section.label} section={section} />
                  ))}
                </div>
              </div>
            ))
          )}

          {/* ✅ Bonnes pratiques */}
          <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-900">
              Bonnes pratiques du téléconseiller
            </h2>
            <p className="text-sm text-emerald-900">
              Avant toute réponse, toujours vérifier :
            </p>
            <ul className="space-y-2">
              {BONNES_PRATIQUES.map((pratique) => (
                <li
                  key={pratique}
                  className="flex items-start gap-2 text-sm text-emerald-900"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                  {pratique}
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800 font-medium">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
              Ne jamais confirmer un incident sans avoir effectué les
              vérifications nécessaires dans le système.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
