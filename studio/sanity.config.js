import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'crescere-strumenti-di-pace',
  title: 'Crescere Strumenti di Pace',
  projectId: '5l3x7g7u',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
