import { createClient } from '@sanity/client';

export async function POST(request) {
  const token =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN;
  const projectId =
    process.env.SANITY_API_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset =
    process.env.SANITY_API_DATASET || process.env.SANITY_DATASET;

  if (!token) {
    console.error('SANITY_API_WRITE_TOKEN non configurato');
    return Response.json(
      { error: 'Configurazione server incompleta' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file.arrayBuffer !== 'function') {
      return Response.json({ error: 'Nessun file ricevuto' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const sanityClient = createClient({
      projectId,
      dataset,
      token,
      useCdn: false,
      apiVersion: '2024-01-01',
    });

    const imageAsset = await sanityClient.assets.upload('image', buffer, {
      filename: file.name || 'upload.jpg',
    });

    await sanityClient.create({
      _type: 'mappaPacePhoto',
      title: `Caricata il ${new Date().toLocaleString('it-IT')}`,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Errore upload Sanity:', err);
    const message = err?.message?.includes('Insufficient permissions')
      ? 'Permessi Sanity insufficienti. Verifica che il token abbia permessi Editor.'
      : 'Errore durante il caricamento. Riprova.';
    return Response.json({ error: message }, { status: 500 });
  }
}
