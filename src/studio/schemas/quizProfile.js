import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quizProfile',
  title: 'Profilo Quiz (A/B/C)',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Chiave profilo (A, B o C)',
      type: 'string',
      options: {list: ['A', 'B', 'C']},
      validation: r => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome profilo',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'key', subtitle: 'name'},
    prepare({title, subtitle}) {
      return {title: `Profilo ${title}`, subtitle}
    },
  },
})
