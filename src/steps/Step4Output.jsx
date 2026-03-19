import React, { useState, useRef } from 'react';
import { Camera, ExternalLink, CheckCircle2, Users, UserCog, Loader2 } from 'lucide-react';

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
  action2ButtonLabel: 'Compila Modulo di Verifica Capi',
  uploadButtonLabel: 'Carica la foto della Mappa della Pace',
  uploadedLabel: 'Foto Caricata! 📸',
  uploadingLabel: 'Caricamento in corso...',
};

export default function Step4Output({ cms }) {
  const d = { ...FALLBACK, ...cms };
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    scoutGroup: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const isFormValid = formData.name && formData.lastName && formData.email && formData.scoutGroup;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isFormValid) {
      alert('Compila tutti i campi (Nome, Cognome, Email, Gruppo Scout) prima di caricare.');
      e.target.value = '';
      return;
    }

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append('image', file);
      fd.append('name', formData.name);
      fd.append('lastName', formData.lastName);
      fd.append('email', formData.email);
      fd.append('scoutGroup', formData.scoutGroup);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Errore ${res.status}`);
      }

      setPhotoLoaded(true);
    } catch (err) {
      console.error('Errore durante il caricamento:', err);
      alert(err.message || 'Si è verificato un errore durante il caricamento della foto. Riprova.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

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
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              disabled={photoLoaded || uploading}
              className="w-full px-4 py-2 rounded-xl border-2 border-yellow-700/30 bg-white/80 text-green-900 placeholder:text-green-700/60 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/30 outline-none disabled:opacity-60"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Cognome"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={photoLoaded || uploading}
              className="w-full px-4 py-2 rounded-xl border-2 border-yellow-700/30 bg-white/80 text-green-900 placeholder:text-green-700/60 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/30 outline-none disabled:opacity-60"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={photoLoaded || uploading}
            className="w-full px-4 py-2 rounded-xl border-2 border-yellow-700/30 bg-white/80 text-green-900 placeholder:text-green-700/60 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/30 outline-none disabled:opacity-60"
          />
          <input
            type="text"
            name="scoutGroup"
            placeholder="Gruppo Scout"
            value={formData.scoutGroup}
            onChange={handleInputChange}
            disabled={photoLoaded || uploading}
            className="w-full px-4 py-2 rounded-xl border-2 border-yellow-700/30 bg-white/80 text-green-900 placeholder:text-green-700/60 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/30 outline-none disabled:opacity-60"
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={photoLoaded || uploading}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={photoLoaded || uploading || !isFormValid}
            className={`w-full font-bold py-4 px-6 rounded-3xl shadow-md transform transition-all duration-300 active:scale-95 text-lg flex items-center justify-center gap-3
              ${(photoLoaded || uploading || !isFormValid)
                ? 'bg-green-100 text-green-800 ring-4 ring-green-400 cursor-not-allowed shadow-inner'
                : 'bg-yellow-400 hover:bg-yellow-500 text-green-900 border-b-4 border-yellow-600 hover:border-yellow-700 hover:-translate-y-1'
              }`}
          >
            {uploading ? (
              <><Loader2 className="animate-spin" size={22} /> {d.uploadingLabel}</>
            ) : photoLoaded ? (
              <><Camera size={22} /> {d.uploadedLabel}</>
            ) : (
              <><Camera size={22} /> {d.uploadButtonLabel}</>
            )}
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
              {d.action2ButtonLabel}
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
