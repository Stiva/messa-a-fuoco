import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'step4Output',
  title: 'Step 4 — Restituzione',
  type: 'document',
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Titolo header',
      type: 'string',
    }),
    defineField({
      name: 'headerText',
      title: 'Testo header',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'action1Title',
      title: 'Azione 1 — Titolo',
      type: 'string',
    }),
    defineField({
      name: 'action1Text',
      title: 'Azione 1 — Testo principale',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'action1SubText',
      title: 'Azione 1 — Testo secondario',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'action2Title',
      title: 'Azione 2 — Titolo',
      type: 'string',
    }),
    defineField({
      name: 'action2Text',
      title: 'Azione 2 — Testo principale',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'action2SubText',
      title: 'Azione 2 — Testo secondario',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'action2Note',
      title: 'Azione 2 — Nota finale',
      type: 'string',
    }),
    defineField({
      name: 'formUrl',
      title: 'URL Modulo di Verifica Capi',
      type: 'url',
    }),
    defineField({
      name: 'closingText',
      title: 'Testo di chiusura',
      type: 'string',
    }),
    defineField({
      name: 'action2ButtonLabel',
      title: 'Etichetta bottone modulo Capi',
      type: 'string',
      description: 'Es. "Compila Modulo di Verifica Capi"',
    }),
    defineField({
      name: 'uploadButtonLabel',
      title: 'Etichetta bottone carica foto',
      type: 'string',
      description: 'Es. "Carica la foto della Mappa della Pace"',
    }),
    defineField({
      name: 'uploadedLabel',
      title: 'Testo dopo caricamento',
      type: 'string',
      description: 'Es. "Foto Caricata! 📸"',
    }),
    defineField({
      name: 'uploadingLabel',
      title: 'Testo durante caricamento',
      type: 'string',
      description: 'Es. "Caricamento in corso..."',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Restituzione (Step 4)'}
    },
  },
})
