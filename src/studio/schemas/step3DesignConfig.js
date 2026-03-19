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
      title: 'Placeholder predefinito (globale)',
      type: 'string',
      description: 'Usato solo se una tappa non ha un proprio "Testo suggerito", o per documenti vecchi con solo elenco etichette.',
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
      name: 'planSteps',
      title: 'Tappe del piano',
      type: 'array',
      description:
        'Aggiungi quante tappe vuoi. Ordine = ordine in pagina. Ogni voce ha titolo e testo suggerito (placeholder) proprio.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Titolo / etichetta',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Testo suggerito (placeholder)',
              type: 'string',
              description: 'Appare dentro il campo vuoto. Lascia vuoto per usare il placeholder globale sopra.',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'placeholder' },
          },
        },
      ],
    }),
    defineField({
      name: 'tappe',
      title: 'Etichette tappe (solo compatibilità)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
      description: 'Deprecato: usa "Tappe del piano". Nascosto in Studio; i dati vecchi restano leggibili.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurazione Progettazione (Step 3)' }
    },
  },
})
