import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gameInstructions',
  title: 'Step 3 — Istruzioni Mappa della Pace',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sezioni istruzioni',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titolo sezione',
              type: 'string',
              description: 'Es. "Lancio", "Regole", "La Mappa"',
            }),
            defineField({
              name: 'icon',
              title: 'Icona/Emoji',
              type: 'string',
              description: 'Es: 🧭, 📌, 🧩, ⏱️',
            }),
            defineField({
              name: 'content',
              title: 'Contenuto',
              type: 'text',
              rows: 4,
              description: 'Testo principale. Per elenchi puntati usa il campo "Lista punti" sotto.',
            }),
            defineField({
              name: 'items',
              title: 'Lista punti (opzionale)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Aggiungi un elemento per ogni punto elenco. Lascia vuoto se usi solo il testo sopra.',
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'icon'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Istruzioni Mappa della Pace'}
    },
  },
})
