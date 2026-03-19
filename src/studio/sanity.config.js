import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { DownloadImagesTool } from './components/DownloadImagesTool'

export default defineConfig({
  name: 'crescere-strumenti-di-pace',
  title: 'Crescere Strumenti di Pace',
  projectId: '5l3x7g7u',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  tools: [
    {
      name: 'scarica-foto',
      title: 'Scarica Foto',
      component: DownloadImagesTool,
    }
  ],
  schema: {
    types: schemaTypes,
  },
})
