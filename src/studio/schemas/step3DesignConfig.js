import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'step3DesignConfig',
  title: 'Step 3 — Configurazione Progettazione',
  type: 'document',
  fields: [
    defineField({
      name: 'instructionsTitle',
      title: 'Titolo sezione istruzioni',
      type: 'string',
      description: 'Es. "La Mappa della Pace — Istruzioni di gioco"',
    }),
    defineField({
      name: 'formTitle',
      title: 'Titolo form progettazione',
      type: 'string',
      description: 'Es. "Progetta le 5 Tappe"',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Sottotitolo form',
      type: 'string',
      description: 'Es. "Per ogni tappa scrivi la prova, il gioco o la sfida che hai in mente. L\'auto-salvataggio è attivo."',
    }),
    defineField({
      name: 'textareaPlaceholder',
      title: 'Placeholder testo tappe',
      type: 'string',
      description: 'Es. "Scrivi qui cosa succederà in questa tappa…"',
    }),
    defineField({
      name: 'saveButtonLabel',
      title: 'Etichetta bottone salva',
      type: 'string',
      description: 'Es. "Scarica Piano e Prosegui"',
    }),
    defineField({
      name: 'savingLabel',
      title: 'Testo durante salvataggio',
      type: 'string',
      description: 'Es. "Salvataggio e Generazione PDF..."',
    }),
    defineField({
      name: 'extraSectionTitle',
      title: 'Titolo sezione "Tenete in considerazione"',
      type: 'string',
      description: 'Es. "Tenete in considerazione anche:"',
    }),
    defineField({
      name: 'tappe',
      title: 'Etichette delle 5 tappe',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.length(5).error('Servono esattamente 5 etichette (una per tappa)'),
      description: 'Ordine: Tappa 1, 2, 3, 4, 5',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurazione Progettazione (Step 3)' }
    },
  },
})
