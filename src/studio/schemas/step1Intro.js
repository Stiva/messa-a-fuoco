import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'step1Intro',
  title: 'Step 1 — Introduzione',
  type: 'document',
  groups: [
    { name: 'main', title: 'Contenuto principale', default: true },
    { name: 'actions', title: 'Pulsanti e link' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo principale',
      type: 'string',
      group: 'main',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo / Citazione',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'supTitle',
      title: 'Testo sopra il titolo',
      type: 'string',
      group: 'main',
      description: 'Es. "Educare cittadini e cristiani che concorrono al bene comune"',
    }),
    defineField({
      name: 'greeting',
      title: 'Saluto iniziale',
      type: 'string',
      group: 'main',
      description: 'Es. "Cari VVLL e CCAA,"',
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Paragrafi del testo di benvenuto',
      type: 'array',
      group: 'main',
      of: [{ type: 'text', rows: 3 }],
      description: 'Ogni elemento è un paragrafo. Ordine dall\'alto verso il basso.',
    }),
    defineField({
      name: 'closingNote',
      title: 'Nota di chiusura (corsivo)',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Etichetta bottone principale',
      type: 'string',
      group: 'main',
      description: 'Es. "Zaino in spalla, Inizia!" o "Zaino in spalla, si comincia!"',
    }),
    defineField({
      name: 'skipToRestitutionLabel',
      title: 'Link "salta al caricamento"',
      type: 'string',
      group: 'actions',
      description: 'Per chi ha già svolto l\'attività e vuole solo caricare la foto. Es. "Hai già svolto l\'attività? Allora sei pronto per la Restituzione"',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
