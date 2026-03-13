import React from 'react';
import { Target, ArrowRight } from 'lucide-react';

const questions = [
  {
    id: 'q1',
    text: "Dopo un litigio, di solito il gruppo…",
    options: [
      { id: 'A', label: "riparte abbastanza in fretta, ma il tema torna fuori più avanti (frecciatine, musi, episodi \"fotocopia\")." },
      { id: 'B', label: "si calma solo dopo un \"reset\" molto concreto (cambio attività, pausa, movimento, abbassare l'energia)." },
      { id: 'C', label: "si spacca in micro-alleanze: due o tre \"fazioni\" e qualcuno resta appiccicato ai margini." }
    ]
  },
  {
    id: 'q2',
    text: "Nei momenti di passaggio (da un'attività all'altra, da gioco a cerchio, da merenda a attività…), noti più spesso che…",
    options: [
      { id: 'A', label: "basta poco perché si accenda una catena di \"tu hai fatto… io però…\", e il gruppo si incaglia lì." },
      { id: 'B', label: "la difficoltà più grande è rientrare: rumore, corpi in movimento, fatica a fermarsi e ascoltare." },
      { id: 'C', label: "alcuni \"spariscono\": non è chiaro dove metterli, come coinvolgerli, o restano in silenzio." }
    ]
  },
  {
    id: 'q3',
    text: "Quando chiedi \"che cosa è successo?\", capita spesso che…",
    options: [
      { id: 'A', label: "la narrazione diventi una gara a chi ha ragione (con dettagli sempre più \"a favore\")." },
      { id: 'B', label: "la narrazione sia frammentata perché prima serve riportare calma e attenzione." },
      { id: 'C', label: "a parlare sono sempre gli stessi, mentre altri abbassano lo sguardo o si tirano indietro." }
    ]
  },
  {
    id: 'q4',
    text: "Se qualcuno fa una figura imbarazzante davanti agli altri (perde una gara, sbaglia una consegna, inciampa), il gruppo tende a…",
    options: [
      { id: 'A', label: "commentare, giudicare, fare ironia, e poi la cosa resta \"appiccicata\" all'interessato." },
      { id: 'B', label: "reagire in modo istintivo e \"di pancia\": rumore, esplosioni, interventi impulsivi." },
      { id: 'C', label: "prendere distanza: qualcuno lo evita o lo \"mette da parte\" senza cattiveria esplicita, ma succede." }
    ]
  },
  {
    id: 'q5',
    text: "Durante un gioco competitivo, ciò che si vede più spesso è che…",
    options: [
      { id: 'A', label: "le contestazioni sul \"come\" (regole, falli, torti) si allungano più del gioco stesso." },
      { id: 'B', label: "l'intensità sale rapidamente (urla, corse, spinte involontarie, invasione di spazio)." },
      { id: 'C', label: "chi è meno rapido/sicuro viene scelto per ultimo o si auto-esclude per non \"pesare\"." }
    ]
  },
  {
    id: 'q6',
    text: "Quando alcuni dei più grandi dicono \"mi annoio\" e si sfilano dal gioco, di solito…",
    options: [
      { id: 'A', label: "iniziano a commentare/contestare (regole, decisioni, \"non vale\"), e la cosa trascina altri in discussioni o tensioni." },
      { id: 'B', label: "faticano a restare \"in attesa\": aumentano volume e movimento, interrompono, cercano stimoli altrove e diventa difficile rientrare." },
      { id: 'C', label: "si mettono da parte con aria di distacco, non trovano un ruolo che li agganci davvero, e il gruppo si divide tra \"chi gioca\" e \"chi guarda\"." }
    ]
  },
  {
    id: 'q7',
    text: "Quando qualcuno provoca (punzecchia, interrompe, \"fa il personaggio\"), di solito il gruppo…",
    options: [
      { id: 'A', label: "risponde colpo su colpo: si innesca un botta e risposta che contagia altri." },
      { id: 'B', label: "viene trascinato dall'ondata: l'attenzione collettiva salta e diventa difficile riprendere." },
      { id: 'C', label: "si irrigidisce: alcuni lo evitano, altri lo etichettano e lo tengono fuori dal giro." }
    ]
  },
  {
    id: 'q8',
    text: "Nel circle time, l'ostacolo più frequente è…",
    options: [
      { id: 'A', label: "passare dal \"processo\" al \"capire\": la discussione si concentra su chi ha sbagliato." },
      { id: 'B', label: "stare in presenza: posture, micro-distrazioni, corpi che cercano movimento, attenzione che scappa." },
      { id: 'C', label: "far emergere voci diverse: alcuni non parlano quasi mai, o parlano solo \"per forza\"." }
    ]
  },
  {
    id: 'q9',
    text: "Quando qualcuno si chiude (broncio, silenzio, ritiro), più spesso…",
    options: [
      { id: 'A', label: "è collegato a qualcosa che sente irrisolto e che torna a galla più volte." },
      { id: 'B', label: "è collegato a sovraccarico: troppo stimolo, troppa energia, e serve decomprimere prima di parlare." },
      { id: 'C', label: "è collegato al sentirsi \"fuori posto\": non trova aggancio, non si sente visto, teme giudizio." }
    ]
  },
  {
    id: 'q10',
    text: "Se guardi l'anno in corso, la cosa che vi fa perdere più tempo/energia è…",
    options: [
      { id: 'A', label: "le frizioni che si riaprono e si ripetono (stesse dinamiche, stessi \"copioni\")." },
      { id: 'B', label: "il livello di attivazione: tenere il gruppo regolato (energia, volume, movimento) è la vera fatica." },
      { id: 'C', label: "la tenuta del \"noi\": inclusione fragile, ruoli sbilanciati, qualcuno resta spesso in ombra." }
    ]
  }
];

const PROFILES = {
  A: {
    name: "GIUSTIZIA RIPARATIVA",
    tagline: "Dal giudizio alla cura: il conflitto può diventare crescita se si rimane in relazione.",
    emoji: "⚖️"
  },
  B: {
    name: "CORPOREITÀ",
    tagline: "La pace passa dai confini: prima nel corpo, poi nelle parole.",
    emoji: "🤸"
  },
  C: {
    name: "ACCOGLIENZA",
    tagline: "La pace cresce dove nessuno resta fuori, nemmeno \"quello difficile\".",
    emoji: "🤗"
  }
};

export default function Step2Focus({ actions, quizAnswers }) {
  const answeredCount = questions.filter(q => quizAnswers[q.id]).length;
  const currentQ = Math.min(answeredCount, questions.length - 1);
  const allAnswered = answeredCount === questions.length;

  const handleAnswer = (optionId) => {
    const qId = questions[currentQ].id;
    actions.setQuizAnswer(qId, optionId);

    if (answeredCount === questions.length - 1) {
      const answersDict = { ...quizAnswers, [qId]: optionId };
      const counts = { A: 0, B: 0, C: 0 };
      Object.values(answersDict).forEach(val => { counts[val] = (counts[val] || 0) + 1; });
      const maxCount = Math.max(counts.A, counts.B, counts.C);
      const resultingProfile = counts.A === maxCount ? 'A' : counts.B === maxCount ? 'B' : 'C';
      actions.setProfile(resultingProfile);
    }
  };

  const q = questions[currentQ];
  const profile = allAnswered ? PROFILES[Object.entries(
    Object.values(quizAnswers).reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1])[0][0]] : null;
  const profileKey = allAnswered ? Object.entries(
    Object.values(quizAnswers).reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1])[0][0] : null;

  return (
    <div className="card-wood w-full max-w-lg mx-auto animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center gap-2 text-green-800 mb-4 border-b-2 border-yellow-700/20 pb-4">
        <Target size={28} />
        <div>
          <h2 className="text-2xl font-bold">Messa a Fuoco</h2>
          <p className="text-sm text-green-700 font-medium">Per ogni domanda scegli A, B o C</p>
        </div>
      </div>

      {!allAnswered ? (
        <div className="space-y-5">
          <p className="font-bold text-lg text-green-900 border-l-4 border-red-500 pl-3">
            <span className="text-base text-green-700">{currentQ + 1} / {questions.length}</span>
            <br />
            <span className="text-lg font-semibold block mt-1 text-green-800">{q.text}</span>
          </p>
          <div className="flex flex-col gap-3">
            {q.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                className={`text-left w-full p-4 rounded-2xl border-4 font-semibold text-base transition-all active:scale-95
                  ${quizAnswers[q.id] === opt.id
                    ? 'bg-yellow-400 border-green-600 text-green-900 shadow-md transform scale-[1.02]'
                    : 'bg-white border-yellow-300 text-green-800 hover:bg-yellow-100 hover:border-yellow-500 hover:shadow shadow-sm'
                  }`}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-800 text-white font-black text-sm mr-2 shrink-0">{opt.id}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 animate-in zoom-in space-y-4">
          <div className="text-6xl mb-2">{profile?.emoji || '✨'}</div>
          <h3 className="text-2xl md:text-3xl font-black text-green-800">
            Il vostro Focus è:
          </h3>
          <div className="bg-yellow-200/90 border-l-8 border-green-600 rounded-r-2xl p-4 text-left">
            <p className="text-xl font-black text-green-800 mb-1">
              Scheda {profileKey}: {profile?.name}
            </p>
            <p className="text-base font-semibold text-green-700 italic">
              {profile?.tagline}
            </p>
          </div>
          <p className="text-base font-medium text-green-700 leading-relaxed">
            Se c'è un pareggio, troverete più di un profilo: potete sceglierne uno come focus principale.
          </p>
          <button onClick={actions.nextStep} className="btn-primary py-4 mt-2">
            Procedi alla Progettazione
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
