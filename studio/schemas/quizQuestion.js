import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quizQuestion',
  title: 'Domanda Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'questionId',
      title: 'ID Domanda (es. q1, q2…)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
      validation: r => r.required().min(1).max(10),
    }),
    defineField({
      name: 'text',
      title: 'Testo della domanda',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'options',
      title: 'Opzioni di risposta',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'id', title: 'Lettera (A, B o C)', type: 'string', validation: r => r.required()}),
            defineField({name: 'label', title: 'Testo opzione', type: 'text', rows: 2, validation: r => r.required()}),
          ],
          preview: {
            select: {title: 'id', subtitle: 'label'},
          },
        },
      ],
      validation: r => r.length(3),
    }),
  ],
  orderings: [{title: 'Ordine', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'questionId', subtitle: 'text'},
    prepare({title, subtitle}) {
      return {title: `Domanda ${title}`, subtitle}
    },
  },
})
