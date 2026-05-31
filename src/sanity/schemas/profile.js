export default {
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  fields: [
    {
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      initialValue: "Hi, I'm",
      description: 'e.g., Hi, I\'m or Welcome, I\'m',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., Full-Stack Developer',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Bio',
      type: 'text',
      description: 'A cyber-themed short biography',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'GRID_SECTOR_7',
      description: 'Your physical or cybernetic location (e.g. Grid Sector 7, Neo-Tokyo, Paris)',
    },
    {
      name: 'avatar',
      title: 'Profile Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'skillsTitle',
      title: 'Skills Section Title',
      type: 'string',
      initialValue: 'Skills Grid',
      description: 'The heading of the skills section',
    },
    {
      name: 'skillsSubtitle',
      title: 'Skills Section Subtitle',
      type: 'string',
      initialValue: '// ACCESS_CORE_COMPETENCY',
      description: 'The code-styled subtitle above the main heading',
    },
    {
      name: 'socials',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    },
  ],
};
