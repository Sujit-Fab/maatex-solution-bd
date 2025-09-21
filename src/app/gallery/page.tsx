import Image from 'next/image';
import { getGalleryImages } from '../../lib/data';

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <>
      <section className="bg-card border-b">
        <div className="container py-8 text-center">
          <h1 className="text-4xl font-bold text-primary">Inspiration Gallery</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Discover the endless possibilities with our fabrics. See what creators and manufacturers have made with textiles from Maatex Solution BD.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter((image) => image.imageUrl)
              .map((image, index) => (
                <div key={index} className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={image.hint}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-semibold">{image.alt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
