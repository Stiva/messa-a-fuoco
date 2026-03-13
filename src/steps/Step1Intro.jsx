import React from 'react';
import { Backpack } from 'lucide-react';

// Hardcoded fallback
const FALLBACK = {
  supTitle: 'Educare cittadini e cristiani che concorrono al bene comune',
  title: 'Crescere Strumenti di Pace',
  subtitle: '"O ci si salva insieme, o non è pace"',
  bodyParagraphs: [
    'vi presentiamo "Crescere strumenti di pace": un cammino semplice, pratico e pieno di vita, costruito per far sperimentare che la pace non è un tema "da dire", ma un modo concreto di stare insieme.',
    'In questo momento storico la parola pace rischia di diventare un contenitore vuoto. Ma la chiamata più decisiva, per noi, non è solo far sentire la nostra voce: è educare persone capaci di pace.',
    'Per questo il percorso che vi proponiamo non è un discorso sulla pace, ma un allenamento alla pace: imparare a riparare i conflitti, a riconoscere emozioni e confini, a fare posto davvero a chi resta ai margini.',
  ],
  closingNote: 'È un lavoro da artigiani, fatto di piccoli gesti e scelte ripetute, finché diventano stile.',
  buttonLabel: 'Zaino in spalla, Inizia!',
};

export default function Step1Intro({ proceed, cms }) {
  const d = { ...FALLBACK, ...cms };

  return (
    <div className="card-wood text-center max-w-lg mx-auto w-full animate-in fade-in zoom-in duration-500">
      <p className="text-sm font-semibold text-green-700 uppercase tracking-widest mb-2">
        {d.supTitle}
      </p>
      <h1 className="text-3xl md:text-4xl font-black text-green-800 mb-2 tracking-tight drop-shadow-sm leading-tight">
        {d.title}
      </h1>
      <p className="text-xl md:text-2xl italic text-green-700 mb-6 font-bold">
        {d.subtitle}
      </p>

      <div className="text-left text-green-900 text-base md:text-lg font-medium leading-relaxed space-y-4 mb-8 px-2">
        <p>
          Cari <strong>VVLL</strong> e <strong>CCAA</strong>,
        </p>
        {d.bodyParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="text-center italic text-green-700">
          {d.closingNote}
        </p>
      </div>

      <button onClick={proceed} className="btn-primary py-5 text-xl md:text-2xl">
        <Backpack fill="currentColor" size={28} />
        {d.buttonLabel}
      </button>
    </div>
  );
}
