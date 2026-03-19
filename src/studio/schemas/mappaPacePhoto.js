export default {
  name: 'mappaPacePhoto',
  title: 'Foto Mappa della Pace',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'uploaderName',
      title: 'Nome',
      type: 'string',
    },
    {
      name: 'uploaderLastName',
      title: 'Cognome',
      type: 'string',
    },
    {
      name: 'uploaderEmail',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'scoutGroup',
      title: 'Gruppo Scout',
      type: 'string',
    },
    {
      name: 'uploadedAt',
      title: 'Data di caricamento',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      uploaderName: 'uploaderName',
      uploaderLastName: 'uploaderLastName',
      scoutGroup: 'scoutGroup',
      subtitle: 'uploadedAt'
    },
    prepare(selection) {
      const {title, media, uploaderName, uploaderLastName, scoutGroup, subtitle} = selection;
      const uploader = [uploaderName, uploaderLastName].filter(Boolean).join(' ');
      const parts = [uploader, scoutGroup].filter(Boolean);
      return {
        title: title || 'Senza titolo',
        subtitle: parts.length ? `${parts.join(' · ')} · ${subtitle ? new Date(subtitle).toLocaleString('it-IT') : ''}` : (subtitle ? new Date(subtitle).toLocaleString('it-IT') : 'Nessuna data'),
        media: media
      }
    }
  }
}
