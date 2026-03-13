import React from 'react';
import { BookOpen, FileCheck, Map, Compass } from 'lucide-react';

const focusData = {
  A: {
    name: "Giustizia Riparativa",
    subtitle: "Dal giudizio alla cura: il conflitto può diventare crescita se si rimane in relazione.",
    punti: [
      "Spostare lo sguardo dal «colpevole» al danno: cosa è successo, chi è stato toccato, di cosa ha bisogno.",
      "Allenare la postura del dialogo: cercare la verità insieme, senza processi e senza etichette.",
      "Esercitarsi a una comunicazione non violenta: fatti, emozioni, bisogni, richiesta.",
      "Proporre riparazioni concrete: scuse + gesto + restituzione (piccola, ma vera).",
      "Vedere la persona, non solo la sua «colpa»: responsabilità senza umiliazione.",
      "Dare valore a cura e perdono, e celebrare le riconciliazioni come «rientro nel noi»."
    ],
    extra: [
      { title: "Corporeità", note: "Quando sale l'energia, prevedere pause e strumenti di rientro. Allenare «stop» e distanza." },
      { title: "Accoglienza", note: "Dopo la riparazione, curare il rientro: un gesto, un ruolo, un «posto» riconquistato." }
    ]
  },
  B: {
    name: "Corporeità",
    subtitle: "La pace passa dai confini: prima nel corpo, poi nelle parole.",
    punti: [
      "Riconoscere le emozioni per gestirle: governare sentimenti, pensiero e azione.",
      "Allenare limiti e confini: «posso?», «va bene?», «stop», «non ora».",
      "Prendere sul serio il linguaggio corporeo: postura, tono, sguardo e distanza educano empatia.",
      "Progettare attività con «scarico e rientro»: energia alta si governa con ritmo, non solo con richiami.",
      "Rendere coerenti corpo e parola: la pace si vede anche nei dettagli (turni, contatto, spazio).",
      "Usare giochi cooperativi con breve rilettura finale: creare legami e contesti di pace."
    ],
    extra: [
      { title: "Giustizia Riparativa", note: "Se qualcuno supera un limite, non basta «basta!»: serve riconoscere il danno e riparare." },
      { title: "Accoglienza", note: "Dare ruoli veri a chi fatica: appartenenza prima di prestazione." }
    ]
  },
  C: {
    name: "Accoglienza",
    subtitle: "La pace cresce dove nessuno resta fuori, nemmeno «quello difficile».",
    punti: [
      "Accoglienza non è solo «dello straniero»: è costruire appartenenza, ogni settimana.",
      "Creare un ascolto che genera cambiamento: dopo l'ascolto deve esserci un passo concreto.",
      "Andare oltre le motivazioni immediate: dietro un comportamento c'è spesso un bisogno.",
      "Custodire fragilità nostre e altrui senza trasformarle in etichette.",
      "Curare l'ambiente che creo e che abito: luogo e clima influenzano le relazioni e i conflitti.",
      "Dare a ciascuno un posto vero: ruolo, compito, responsabilità, alleanza."
    ],
    extra: [
      { title: "Giustizia Riparativa", note: "Accogliere non significa far finta di niente: quando c'è ferita serve verità e riparazione." },
      { title: "Corporeità", note: "Distanza rispettosa, tono gentile, contatto solo se richiesto: il corpo parla prima della voce." }
    ]
  }
};

const tappe = [
  "Tappa 1 — Lancio",
  "Tappa 2 — Svolgimento: Fase 1",
  "Tappa 3 — Svolgimento: Fase 2",
  "Tappa 4 — Svolgimento: Fase Finale / Climax",
  "Tappa 5 — Chiusura e Verifica"
];

export default function Step3Design({ actions, plan, profile }) {
  const focus = profile ? focusData[profile] : null;

  const handleSave = (e) => {
    e.preventDefault();
    actions.nextStep();
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-300 space-y-6">

      {/* === PARTE 1: FOCUS === */}
      {focus && (
        <div className="bg-yellow-200/90 border-l-8 border-green-600 rounded-r-3xl p-5 shadow-lg text-green-900 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 text-9xl select-none pointer-events-none">🌿</div>
          <div className="flex items-center gap-3 mb-3 font-black text-xl z-10 relative">
            <BookOpen className="text-green-700 shrink-0" size={28} />
            <span>Focus — Scheda {profile}: {focus.name}</span>
          </div>
          <p className="font-bold italic text-base mb-4 relative z-10">{focus.subtitle}</p>
          <ul className="space-y-2 relative z-10">
            {focus.punti.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm md:text-base font-medium">
                <span className="text-green-700 mt-0.5 shrink-0">🍃</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {focus.extra && (
            <div className="mt-4 pt-3 border-t-2 border-yellow-600/20 space-y-2 relative z-10">
              <p className="text-sm font-bold text-green-700">Tenete in considerazione anche:</p>
              {focus.extra.map((e, i) => (
                <p key={i} className="text-sm font-medium">
                  <strong>{e.title}:</strong> {e.note}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === PARTE 2: LA MAPPA DELLA PACE === */}
      <div className="card-wood">
        <div className="flex items-center gap-3 mb-4 font-black text-xl text-green-800">
          <Map className="text-green-700 shrink-0" size={28} />
          <span>🗺️ La Mappa della Pace — Istruzioni di gioco</span>
        </div>

        <div className="space-y-4 text-sm md:text-base font-medium text-green-900">
          <div className="bg-yellow-100/80 rounded-2xl p-4 border-2 border-yellow-500/30">
            <p className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Compass size={18} className="text-green-700" /> Lancio
            </p>
            <p>
              Il gioco si svolge in 5 tappe. Per ogni tappa scegliete una coppia tra le proposte: un <strong>messaggio protagonista</strong> e
              uno <strong>spunto</strong>. Poi inventate la prova, il gioco o la sfida che faccia vivere quel messaggio.
            </p>
          </div>

          <div className="bg-yellow-100/80 rounded-2xl p-4 border-2 border-yellow-500/30">
            <p className="font-bold text-green-800 mb-2">📌 Regole</p>
            <ul className="space-y-1 text-sm">
              <li>• In ogni tappa deve emergere un <strong>simbolo dell'esperienza</strong>: niente immagini scaricate, creatività da Branca L/C!</li>
              <li>• A fine tappa consegnate alla squadra. Il messaggio resta per voi come bussola.</li>
              <li>• <strong>Segretezza del senso</strong>: i bambini devono vivere il gioco, non indovinare la teoria.</li>
            </ul>
          </div>

          <div className="bg-yellow-100/80 rounded-2xl p-4 border-2 border-yellow-500/30">
            <p className="font-bold text-green-800 mb-2">🧩 La Mappa</p>
            <p className="mb-2">
              L'ultima fase del gioco consiste nella costruzione della <strong>Mappa della Pace</strong> usando le tessere conquistate:
            </p>
            <ul className="space-y-1 text-sm">
              <li>• Nessuna tessera può restare isolata: ognuna deve toccarne almeno un'altra o essere collegata</li>
              <li>• Creare <strong>3 "zone"</strong> sulla mappa (le chiamano i L/C, senza suggerimenti)</li>
              <li>• In ogni zona almeno 1 tessera</li>
              <li>• Scegliere e contrassegnare: la tessera <strong>più facile</strong>, la <strong>più difficile</strong>, e la tessera <strong>«Che ci serve adesso»</strong></li>
            </ul>
          </div>

          <div className="bg-yellow-100/80 rounded-2xl p-4 border-2 border-yellow-500/30">
            <p className="font-bold text-green-800 mb-2">⏱️ Le 5 tappe — Svolgimento</p>
            <ol className="space-y-1 text-sm list-decimal list-inside">
              <li><strong>Costruzione</strong> — «Avete 5 minuti per costruire la vostra Mappa della Pace»</li>
              <li><strong>Tour guidato</strong> — Ogni squadra presenta in 30 secondi: zone, tessera facile, difficile, «ci serve adesso»</li>
              <li><strong>Chiusura lampo</strong> — «La tessera che mi porto a casa è…» (una parola)</li>
            </ol>
          </div>
        </div>
      </div>

      {/* === PARTE 3: FORM PROGETTAZIONE === */}
      <form onSubmit={handleSave} className="card-wood flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-black text-green-800 flex items-center gap-3 mb-2">
          📝 Progetta le 5 Tappe
        </h2>
        <p className="text-sm font-medium text-green-700 -mt-4">
          Per ogni tappa scrivi la prova, il gioco o la sfida che hai in mente. L'auto-salvataggio è attivo.
        </p>

        {tappe.map((title, idx) => {
          const key = `tappa${idx + 1}`;
          return (
            <div key={key} className="relative">
              <label className="block font-bold text-green-800 text-base md:text-lg mb-2 ml-1">{title}</label>
              <textarea
                rows="4"
                value={plan[key]}
                onChange={(e) => actions.updatePlan(key, e.target.value)}
                placeholder="Scrivi qui cosa succederà in questa tappa…"
                className="input-wood w-full text-base leading-relaxed shadow-md"
              />
            </div>
          );
        })}

        <button type="submit" className="btn-primary mt-4 text-xl py-4">
          <FileCheck size={24} />
          Salva il piano e prosegui
        </button>
      </form>
    </div>
  );
}
