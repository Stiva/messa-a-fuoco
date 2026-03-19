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
      subtitle: 'uploadedAt'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection;
      return {
        title: title || 'Senza titolo',
        subtitle: subtitle ? new Date(subtitle).toLocaleString('it-IT') : 'Nessuna data',
        media: media
      }
    }
  }
}
