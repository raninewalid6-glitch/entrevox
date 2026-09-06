"use client";

import {
  AlertTriangle,
  BookOpen,
  Cross,
  HeartHandshake,
  Info,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ✅ Étape 1 : écoute active
const ETAPE1_POINTS = [
  {
    titre: "Respecter le rythme de la personne",
    detail:
      "Ne pas l'interrompre dans sa plainte, ne pas la presser, favoriser un environnement calme.",
  },
  {
    titre: "Éviter de juger",
    detail: "Pourquoi ? Comment ? Avec qui ?",
  },
  {
    titre: "Montrer à la personne qu'on la croit",
    detail: "Que l'on compatit à sa douleur, qu'on est là pour elle.",
  },
  {
    titre: "La rassurer",
    detail: "Sur le principe de confidentialité.",
  },
];

// ✅ Étape 2 : évaluation du risque
const ETAPE2_POINTS = [
  {
    titre: "Risque vital",
    detail:
      "Y a-t-il des blessures graves nécessitant une ambulance ? La victime a-t-elle besoin d'être prise en charge rapidement ?",
  },
  {
    titre: "Présence d'enfants",
    detail: "Des mineurs sont-ils en danger immédiat à ses côtés ?",
  },
  {
    titre: "Idées suicidaires",
    detail:
      "Évaluer si la détresse de la victime met ses jours en danger.",
  },
];

// ✅ Étape 3 : services d'orientation
const ORIENTATIONS = [
  {
    icone: Phone,
    titre: "Cellule d'écoute (CEIO) de l'UNFD",
    detail: "Pour le soutien psychologique et juridique.",
  },
  {
    icone: ShieldCheck,
    titre: "Les services de sécurité",
    detail: "Pour la protection et le signalement.",
  },
  {
    icone: Cross,
    titre: "Les centres de santé / hôpitaux",
    detail: "Pour une prise en charge rapide en cas de blessure.",
  },
];

// ✅ Grille de questions progressives
const GRILLE_QUESTIONS = [
  {
    icone: AlertTriangle,
    titre: "Évaluer la souffrance et le danger",
    questions: [
      "Êtes-vous actuellement en danger ?",
      "Avez-vous besoin d'une aide médicale ou d'un abri ?",
      "La personne auteur des violences est-elle toujours en contact avec vous ?",
    ],
  },
  {
    icone: MessageCircle,
    titre: "Écouter et libérer la parole",
    questions: [
      "Prenez votre temps pour me raconter ce que vous souhaitez partager.",
      "Ce que vous vivez est sérieux, et votre parole compte.",
    ],
  },
  {
    icone: ShieldCheck,
    titre: "Questions sur la sécurité",
    questions: [
      "Êtes-vous actuellement dans un endroit sûr ?",
      "Y a-t-il un danger immédiat pour vous ou vos proches ?",
      "Y a-t-il quelqu'un de confiance chez qui vous pourriez aller pour être en sécurité aujourd'hui ?",
      "Pour que nous puissions réagir rapidement si vous ne pouvez plus parler, nous vous proposons d'utiliser le mot SOLEIL. Est-ce que cela vous convient ?",
    ],
  },
  {
    icone: Search,
    titre: "Questions sur l'incident (avec délicatesse)",
    questions: [
      "Pouvez-vous décrire ce qui s'est passé, uniquement si vous vous sentez prêt(e) ?",
      "Quand l'incident a-t-il eu lieu ?",
      "Où l'incident s'est-il produit ?",
    ],
  },
  {
    icone: HeartHandshake,
    titre: "Questions sur le soutien souhaité",
    questions: [
      "Quel type de soutien souhaitez-vous recevoir (médical, psychologique, juridique, autre) ?",
      "Souhaitez-vous que je vous explique vos droits et les possibilités d'aide ?",
    ],
  },
];

export default function ProtocoleVbg() {
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
            Gestion des Plaintes VBG
          </h1>
          <p className="text-slate-100 mt-2 text-sm">
            Protocole d'écoute et grille de questions pour la prise en charge
            des plaintes de violences basées sur le genre.
          </p>
        </div>

        {/* 📄 Contenu */}
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-6">
          <Tabs defaultValue="protocole">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="protocole" className="cursor-pointer">
                Protocole en 3 étapes
              </TabsTrigger>
              <TabsTrigger value="questions" className="cursor-pointer">
                Grille de questions
              </TabsTrigger>
            </TabsList>

            {/* ===== Onglet 1 : Protocole ===== */}
            <TabsContent value="protocole" className="space-y-6">
              {/* Étape 1 */}
              <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Favoriser l'écoute active et rassurer la personne
                  </h2>
                </div>
                <ul className="space-y-3 pl-11">
                  {ETAPE1_POINTS.map((point) => (
                    <li key={point.titre} className="text-sm">
                      <span className="font-semibold text-slate-800">
                        {point.titre}
                      </span>{" "}
                      <span className="text-slate-600">— {point.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Étape 2 */}
              <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Identification du type de violence et évaluation du risque
                  </h2>
                </div>
                <p className="text-sm text-slate-600 pl-11">
                  En identifiant le type de violence et le risque encouru par
                  la victime, on repère assez rapidement l'aide dont elle a
                  besoin.
                </p>
                <ul className="space-y-3 pl-11">
                  {ETAPE2_POINTS.map((point) => (
                    <li key={point.titre} className="text-sm">
                      <span className="font-semibold text-slate-800">
                        {point.titre} :
                      </span>{" "}
                      <span className="text-slate-600">{point.detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="ml-11 flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 text-sm text-amber-900">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                  <span>
                    Si vous estimez que le danger peut se renouveler à tout
                    moment, proposez à la victime de convenir dès maintenant
                    d'un <strong>code d'urgence simple</strong>. Ce mot lui
                    permettra de signaler immédiatement qu'elle est en danger,
                    même si elle ne peut plus communiquer librement.
                  </span>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Orientation directe
                  </h2>
                </div>
                <p className="text-sm text-slate-600 pl-11">
                  Informer la victime des services disponibles et lui donner
                  toutes les coordonnées utiles pour qu'elle puisse agir
                  rapidement et en sécurité. Guider la victime vers l'aide
                  appropriée :
                </p>
                <div className="grid gap-3 sm:grid-cols-3 pl-11">
                  {ORIENTATIONS.map((orientation) => {
                    const Icone = orientation.icone;
                    return (
                      <div
                        key={orientation.titre}
                        className="border border-slate-200 rounded-lg p-4 space-y-2"
                      >
                        <Icone className="w-6 h-6 text-slate-700" />
                        <p className="text-sm font-semibold text-slate-800">
                          {orientation.titre}
                        </p>
                        <p className="text-xs text-slate-600">
                          {orientation.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="ml-11 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-900">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                  <span>
                    Le but principal de l'orientation est avant tout de
                    répondre à la <strong>volonté de la victime</strong>. Elle
                    peut avoir besoin d'être guidée comme elle peut juste
                    vouloir une oreille à l'écoute. Dans cette démarche, il
                    faut à tout prix éviter de la brusquer.
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* ===== Onglet 2 : Grille de questions ===== */}
            <TabsContent value="questions" className="space-y-6">
              {GRILLE_QUESTIONS.map((categorie) => {
                const Icone = categorie.icone;
                return (
                  <div
                    key={categorie.titre}
                    className="border border-slate-200 rounded-xl p-5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center">
                        <Icone className="w-4 h-4" />
                      </span>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {categorie.titre}
                      </h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 pl-11 text-sm text-slate-700 leading-relaxed">
                      {categorie.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Message de clôture */}
              <div className="flex items-start gap-3 border-2 border-dashed border-slate-300 rounded-xl px-5 py-4">
                <HeartHandshake className="w-6 h-6 flex-shrink-0 text-slate-700" />
                <p className="text-sm text-slate-800">
                  <strong>
                    Votre sécurité, votre parole et vos choix sont notre
                    priorité.
                  </strong>{" "}
                  Vous n'êtes pas seul(e). Des solutions existent.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
