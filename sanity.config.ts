import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig([
  {
    title: 'Template Project Live',
    subtitle: 'production',
    name: 'production-workspace',
    basePath: '/production',
    projectId: '<projectID>',
    dataset: 'production',
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    title: 'Template Project Preview',
    subtitle: 'development',
    name: 'development-workspace',
    basePath: '/development',
    projectId: '<projectID>',
    dataset: 'development',
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
