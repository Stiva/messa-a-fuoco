import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'step2QuizConfig',
  title: 'Step 2 — Configurazione Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Titolo header',
      type: 'string',
      description: 'Es. "Crescere strumenti di Pace"',
    }),
    defineField({
      name: 'headerSubtitle',
      title: 'Sottotitolo header',
      type: 'string',
      description: 'Es. "Per ogni domanda scegli A, B o C"',
    }),
    defineField({
      name: 'resultTitle',
      title: 'Titolo risultato',
      type: 'string',
      description: 'Es. "Il vostro Focus è:"',
    }),
    defineField({
      name: 'tieNote',
      title: 'Nota in caso di pareggio',
      type: 'text',
      rows: 2,
      description: 'Es. "Se c\'è un pareggio, troverete più di un profilo: potete sceglierne uno come focus principale."',
    }),
    defineField({
      name: 'proceedButtonLabel',
      title: 'Etichetta bottone "Procedi"',
      type: 'string',
      description: 'Es. "Procedi alla Progettazione"',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurazione Quiz (Step 2)' }
    },
  },
})
