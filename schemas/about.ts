import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'summary',
      title: 'Professional Summary',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'icon', type: 'string', title: 'Icon Name'},
            {name: 'color', type: 'string', title: 'Color'},
          ],
        },
      ],
    }),
    defineField({
      name: 'specializations',
      title: 'Core Specializations',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'softSkills',
      title: 'Soft Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'language', type: 'string', title: 'Language'},
            {name: 'proficiency', type: 'string', title: 'Proficiency'},
          ],
        },
      ],
    }),
  ],
})
