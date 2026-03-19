import React, { useState, useEffect } from 'react';
import { useClient } from 'sanity';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function DownloadImagesTool() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await client.fetch(`
        *[_type == "mappaPacePhoto"] | order(uploadedAt desc) {
          _id,
          title,
          uploadedAt,
          "url": image.asset->url,
          "filename": image.asset->originalFilename
        }
      `);
      setImages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSingle = async (url, filename) => {
    try {
      const response = await fetch(url + '?dl=' + encodeURIComponent(filename || 'immagine.jpg'));
      const blob = await response.blob();
      saveAs(blob, filename || 'immagine.jpg');
    } catch (err) {
      console.error(err);
      window.open(url + '?dl', '_blank');
    }
  };

  const handleDownloadZip = async () => {
    if (images.length === 0) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      
      const promises = images.map(async (img, index) => {
        if (!img.url) return;
        try {
          const response = await fetch(img.url);
          const blob = await response.blob();
          const ext = img.url.split('.').pop() || 'jpg';
          const filename = img.filename || `foto-${index + 1}.${ext}`;
          zip.file(filename, blob);
        } catch (err) {
          console.error(`Errore nel download di ${img.url}`, err);
        }
      });
      
      await Promise.all(promises);
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `mappe-della-pace-${new Date().toISOString().slice(0, 10)}.zip`);
    } catch (error) {
      console.error('Errore creazione ZIP:', error);
      alert('Errore durante la creazione dello ZIP');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Scarica Foto Mappe della Pace</h1>
        <button 
          onClick={handleDownloadZip} 
          disabled={downloading || loading || images.length === 0}
          style={{
            padding: '10px 16px',
            backgroundColor: (images.length === 0 || downloading) ? '#ccc' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: (images.length === 0 || downloading) ? 'not-allowed' : 'pointer'
          }}
        >
          {downloading ? 'Creazione ZIP...' : `Scarica Tutte (${images.length})`}
        </button>
      </header>
      
      {loading ? (
        <p>Caricamento in corso...</p>
      ) : images.length === 0 ? (
        <p>Nessuna foto trovata.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {images.map(img => (
            <div key={img._id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', paddingBottom: '1rem' }}>
              <div 
                style={{ 
                  height: '150px', 
                  backgroundImage: `url(${img.url}?h=300&fit=max)`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  backgroundColor: '#f5f5f5'
                }} 
              />
              <div style={{ padding: '0.5rem', fontSize: '14px' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {img.title || 'Senza titolo'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {img.uploadedAt ? new Date(img.uploadedAt).toLocaleDateString('it-IT') : ''}
                  </span>
                  <button 
                    onClick={() => handleDownloadSingle(img.url, img.filename)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Scarica
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
