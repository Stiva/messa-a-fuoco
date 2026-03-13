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
            defineField({name: 'title', title: 'Titolo sezione', type: 'string'}),
            defineField({name: 'icon', title: 'Icona/Emoji', type: 'string', description: 'Es: 📌, 🧩, ⏱️'}),
            defineField({
              name: 'content',
              title: 'Contenuto',
              type: 'text',
              rows: 4,
              description: 'Testo principale della sezione',
            }),
            defineField({
              name: 'items',
              title: 'Lista punti (opzionale)',
              type: 'array',
              of: [{type: 'string'}],
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
