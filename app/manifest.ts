import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DFoto',
    short_name: 'DFoto',
    description: 'Datateknologsektionens fotogalleri',
    id: '/',
    start_url: '/',
    lang: 'sv',
    orientation: 'any',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#f97316',
    background_color: '#ffffff',
    display: 'standalone',
  };
}
