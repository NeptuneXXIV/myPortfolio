export default {
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Sender Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      title: 'Message Payload',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'sentAt',
      title: 'Sent At',
      type: 'datetime',
      readOnly: true,
    },
  ],
};
