import { createClient } from '@sanity/client';

// Read-only client (no token needed for public datasets)
// useCdn: false per vedere subito le modifiche da Sanity (la CDN può cachare fino a 60s)
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
});

export async function fetchSanity(query, params = {}) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback data:', error.message);
    return null;
  }
}
