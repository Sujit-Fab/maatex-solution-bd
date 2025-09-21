import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getFabricById } from '../../../lib/data';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { Layers, Palette, DraftingCompass } from 'lucide-react';

type FabricPageProps = {
  params: {
    id: string;
  };
};

export default async function FabricPage({ params }: FabricPageProps) {
  const fabric = await getFabricById(params.id);

  if (!fabric) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-muted">
          {fabric.image ? (
            <Image
              src={fabric.image}
              alt={fabric.name}
              fill
              className="object-cover"
              data-ai-hint={`${fabric.material.toLowerCase()} fabric detail`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
                <span className="text-muted-foreground">No Image Available</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">{fabric.name}</h1>
          {fabric.price && (
            <p className="mt-2 text-2xl font-semibold text-accent">${fabric.price.toFixed(2)}/meter</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.isArray(fabric.tags) && fabric.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          {fabric.description && (
            <div className="mt-6 prose prose-sm max-w-none text-muted-foreground">
              <p>{fabric.description}</p>
            </div>
          )}

          <Card className="mt-6 bg-card/50">
            <CardHeader>
                <CardTitle className="text-xl">Fabric Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-primary" />
                    <span><strong>Material:</strong> {fabric.material}</span>
                </div>
                <div className="flex items-center gap-3">
                    <DraftingCompass className="h-5 w-5 text-primary" />
                    <span><strong>Weave:</strong> {fabric.weave}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-primary" />
                    <span><strong>Color:</strong> {fabric.color}</span>
                </div>
            </CardContent>
          </Card>

          <Button asChild size="lg" className="mt-8 w-full md:w-auto">
            <Link href="/wholesale">Request a Wholesale Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
