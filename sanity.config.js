import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';
import { StudioNavbar } from './src/components/StudioNavbar';

export default defineConfig({
  name: 'cyber-portfolio',
  title: 'Cyber Portfolio CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mock_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            // Singleton item for Profile Settings
            S.listItem()
              .title('Profile Settings')
              .id('profile-singleton')
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('profile')
                  .title('Profile Settings')
              ),
            S.divider(),
            // Regular list items for Skills and Projects
            S.documentTypeListItem('skill').title('Skills Grid'),
            S.documentTypeListItem('project').title('Projects List'),
            S.divider(),
            S.documentTypeListItem('contactMessage').title('Messages Inbox'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Hide the Singleton profile document from the global "Create New" template options
    templates: (prev) => prev.filter((template) => template.schemaType !== 'profile'),
  },

  document: {
    // Hide delete and duplicate actions for the single Profile document
    actions: (prev, context) => {
      return context.schemaType === 'profile'
        ? prev.filter((action) => !['delete', 'duplicate', 'unpublish'].includes(action.action))
        : prev;
    },
  },

  // Custom Studio layout components
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
});
