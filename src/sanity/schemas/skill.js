export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Skill Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'UI/UX', value: 'UI/UX' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'level',
      title: 'Proficiency Level (0-100)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100),
    },
    {
      name: 'glowColor',
      title: 'Neon Glow Color (Hex)',
      type: 'string',
      description: 'e.g., #00aaff for Neon Blue, #bd00ff for Purple, #39ff14 for Green',
      initialValue: '#00aaff',
    },
  ],
};
