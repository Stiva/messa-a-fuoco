import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'step3Focus',
  title: 'Step 3 — Scheda Focus',
  type: 'document',
  fields: [
    defineField({
      name: 'profileKey',
      title: 'Profilo (A, B o C)',
      type: 'string',
      options: {list: ['A', 'B', 'C']},
      validation: r => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome Focus',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo / Frase guida',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'punti',
      title: 'Punti chiave',
      type: 'array',
      of: [{type: 'text', rows: 2}],
    }),
    defineField({
      name: 'extra',
      title: 'Tenete in considerazione anche…',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titolo', type: 'string'}),
            defineField({name: 'note', title: 'Nota', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'note'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'profileKey', subtitle: 'name'},
    prepare({title, subtitle}) {
      return {title: `Focus ${title}`, subtitle}
    },
  },
})
