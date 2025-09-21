import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { getStoryContent, getMissionContent } from '../../lib/data';

export default async function AboutPage() {

  const storyContent = await getStoryContent();
  const missionContent = await getMissionContent();

  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">About Maatex Solution BD</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/90">
            Supplying Quality Fabrics Worldwide, We Weave Trust with Every Thread.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">{storyContent.title}</h2>
            <p className="text-muted-foreground mb-4">
              {storyContent.paragraph1}
            </p>
            <p className="text-muted-foreground">
              {storyContent.paragraph2}
            </p>
          </div>
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={storyContent.imageUrl}
              alt="Fabric roll in a workshop"
              fill
              className="object-cover"
              data-ai-hint="fabric workshop"
            />
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg md:order-2">
            <Image
              src={missionContent.imageUrl}
              alt="Textile patterns and swatches"
              fill
              className="object-cover"
              data-ai-hint="textile patterns"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold text-primary mb-4">{missionContent.title}</h2>
            <p className="text-muted-foreground mb-4">
              {missionContent.paragraph1}
            </p>
            <p className="text-muted-foreground">
              {missionContent.paragraph2}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-primary mb-10">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
              <p className="text-muted-foreground">A wide variety of fabrics including cotton, silk, linen, polyester, and denim to meet all your needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">Every fabric is carefully inspected to ensure it meets our high standards of quality and durability.</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer-Centric Service</h3>
              <p className="text-muted-foreground">Our dedicated team is here to assist you with everything from bulk orders to custom fabric solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
