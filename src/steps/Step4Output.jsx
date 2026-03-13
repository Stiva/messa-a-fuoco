import React, { useState } from 'react';
import { Camera, ExternalLink, CheckCircle2, Users, UserCog } from 'lucide-react';

// Hardcoded fallback
const FALLBACK = {
  headerTitle: 'Restituzione',
  headerText: 'La restituzione non è "scartoffie": è il modo in cui trasformiamo quello che è successo in crescita. Se non raccogliamo niente, resta solo "una bella attività". Se invece lo fissiamo bene, diventa un passo educativo per il Branco/Cerchio.',
  action1Title: 'Azione 1 — Per i L/C',
  action1Text: 'Fate la verifica giocata con le tessere costruendo la Mappa della Pace.',
  action1SubText: "L'obiettivo è semplice: capire quali concetti stanno insieme, cosa è stato facile, cosa difficile, e cosa serve adesso al gruppo.",
  action2Title: 'Azione 2 — Per i Capi',
  action2Text: 'Compilate il modulo online.',
  action2SubText: 'Non vogliamo "è andata bene" o "male". Vorremmo cose viste: chi ha fatto cosa, cosa ha funzionato, dove si è inceppato. E soprattutto: scegliete un micro-impegno per le prossime 2 riunioni — una frase, una regola, un gesto… piccolo ma vero.',
  action2Note: 'Fine. Pochi minuti, ma tanta utilità.',
  formUrl: 'https://example.com',
  closingText: 'Buona Caccia e Buon Volo! 🐾🍃',
};

export default function Step4Output({ cms }) {
  const d = { ...FALLBACK, ...cms };
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500 space-y-6">

      {/* Header */}
      <div className="card-wood text-center">
        <div className="flex justify-center text-green-600 drop-shadow-md mb-4">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-green-800 mb-3 tracking-tight">
          {d.headerTitle}
        </h2>
        <p className="text-base md:text-lg text-green-900 font-medium leading-relaxed">
          {d.headerText}
        </p>
      </div>

      {/* AZIONE 1: Per i L/C */}
      <div className="card-wood">
        <div className="flex items-center gap-3 mb-4 border-b-2 border-yellow-700/20 pb-3">
          <Users size={24} className="text-green-700 shrink-0" />
          <h3 className="text-xl font-black text-green-800">{d.action1Title}</h3>
        </div>
        <div className="space-y-3 text-green-900 font-medium text-base leading-relaxed">
          <p>{d.action1Text}</p>
          <p className="text-sm">{d.action1SubText}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={() => setPhotoLoaded(true)}
            disabled={photoLoaded}
            className={`w-full font-bold py-4 px-6 rounded-3xl shadow-md transform transition-all duration-300 active:scale-95 text-lg flex items-center justify-center gap-3
              ${photoLoaded
                ? 'bg-green-100 text-green-800 ring-4 ring-green-400 cursor-not-allowed shadow-inner'
                : 'bg-yellow-400 hover:bg-yellow-500 text-green-900 border-b-4 border-yellow-600 hover:border-yellow-700 hover:-translate-y-1'
              }`}
          >
            <Camera size={22} />
            {photoLoaded ? "Foto Caricata! 📸" : "Carica la foto della Mappa della Pace"}
          </button>
        </div>
      </div>

      {/* AZIONE 2: Per i Capi */}
      <div className="card-wood">
        <div className="flex items-center gap-3 mb-4 border-b-2 border-yellow-700/20 pb-3">
          <UserCog size={24} className="text-green-700 shrink-0" />
          <h3 className="text-xl font-black text-green-800">{d.action2Title}</h3>
        </div>
        <div className="space-y-3 text-green-900 font-medium text-base leading-relaxed">
          <p><strong>{d.action2Text}</strong></p>
          <p className="text-sm">{d.action2SubText}</p>
          <p className="text-xs text-green-700 italic">{d.action2Note}</p>
        </div>
        <div className="mt-5">
          <a
            href={d.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block no-underline hover:no-underline text-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Compila Modulo di Verifica Capi
              <ExternalLink size={20} />
            </span>
          </a>
        </div>
      </div>

      {/* Closing */}
      <div className="text-center py-4">
        <p className="text-green-800 font-black text-2xl">{d.closingText}</p>
      </div>
    </div>
  );
}
