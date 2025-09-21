
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Fabric } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FabricCardProps {
  fabric: Fabric;
}

export function FabricCard({ fabric }: FabricCardProps) {
  const description = fabric.description || '';
  const truncatedDescription =
    description.length > 140
      ? `${description.substring(0, 140)}...`
      : description;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/fabrics/${fabric.id}`} className="block">
          <div className="aspect-[4/3] relative bg-muted">
            {fabric.image ? (
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                  data-ai-hint={`${fabric.material.toLowerCase()} fabric`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            ) : (
                <div className="h-full w-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No Image</span>
                </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg leading-snug">
          <Link href={`/fabrics/${fabric.id}`} className="hover:text-primary">
            {fabric.name}
          </Link>
        </CardTitle>
        <p className="mt-2 text-sm text-muted-foreground h-[60px] overflow-hidden">
          {truncatedDescription}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {fabric.price ? (
          <p className="text-lg font-semibold text-primary">${fabric.price.toFixed(2)}/m</p>
        ) : (
          <div /> 
        )}
        <Button asChild variant="ghost" size="sm">
          <Link href={`/fabrics/${fabric.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
