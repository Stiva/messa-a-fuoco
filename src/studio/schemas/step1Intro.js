import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'step1Intro',
  title: 'Step 1 — Introduzione',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo principale',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo / Citazione',
      type: 'string',
    }),
    defineField({
      name: 'supTitle',
      title: 'Testo sopra il titolo',
      type: 'string',
      description: 'Es. "Educare cittadini e cristiani che concorrono al bene comune"',
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Paragrafi del testo di benvenuto',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'closingNote',
      title: 'Nota di chiusura (corsivo)',
      type: 'string',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Etichetta bottone',
      type: 'string',
    }),
    defineField({
      name: 'skipToRestitutionLabel',
      title: 'Testo link "salta al caricamento"',
      type: 'string',
      description: 'Per chi ha già svolto l\'attività e vuole solo caricare la foto',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
