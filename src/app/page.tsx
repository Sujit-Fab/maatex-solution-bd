'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBanners, getFabrics, getHomeCategories } from '@/lib/data-client';
import { FabricCard } from '@/components/fabric-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Banner, Fabric, HomeCategory } from '@/lib/types';


export default function Home() {
  const [featuredFabrics, setFeaturedFabrics] = useState<Fabric[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [homeCategories, setHomeCategories] = useState<HomeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [fabricsData, bannersData, categoriesData] = await Promise.all([
          getFabrics({ featured: true }),
          getBanners(),
          getHomeCategories(),
        ]);
        setFeaturedFabrics(fabricsData);
        setBanners(bannersData);
        setHomeCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch home page data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  const renderHeroSkeleton = () => (
    <div className="relative h-[60vh] min-h-[400px] w-full">
      <Skeleton className="h-full w-full" />
      <div className="absolute inset-0 bg-primary/60 z-10" />
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
        <Skeleton className="h-12 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-1/2 max-w-md mt-4" />
        <Skeleton className="h-12 w-48 mt-8" />
      </div>
    </div>
  );
  
  const renderCardSkeleton = () => (
     <div className="flex flex-col space-y-3">
        <Skeleton className="h-[225px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
  )

  return (
    <div className="flex-1">
      {/* Hero Section Carousel */}
      <section className="w-full">
        {isLoading ? (
          renderHeroSkeleton()
        ) : (
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {(banners && banners.length > 0) ? banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative h-[60vh] min-h-[400px] w-full">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.alt || banner.title}
                      fill
                      priority
                      className="object-cover z-0"
                      data-ai-hint={banner.imageHint}
                    />
                    <div className="absolute inset-0 bg-primary/60 z-10" />
                    <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
                      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                        {banner.title}
                      </h1>
                      <p className="mt-4 max-w-2xl text-lg md:text-xl">
                        {banner.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <Link href={banner.buttonLink}>
                          {banner.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              )) : <CarouselItem>{renderHeroSkeleton()}</CarouselItem>}
            </CarouselContent>
            {banners && banners.length > 1 && <>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
            </>}
          </Carousel>
        )}
      </section>

      {/* Featured Fabrics Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">Featured Fabrics</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Handpicked selections from our premium collection.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <>
                {renderCardSkeleton()}
                {renderCardSkeleton()}
                {renderCardSkeleton()}
              </>
            ) : (
              featuredFabrics.slice(0, 3).map((fabric) => (
                <FabricCard key={fabric.id} fabric={fabric} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-card py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">Browse by Category</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Find the perfect material for your next project.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i}><Skeleton className="aspect-square w-full" /></div>
              ))
            ) : homeCategories
              .filter((category) => category.imageUrl)
              .map((category) => (
                <Link
                  href={`/fabrics?category=${category.name}`}
                  key={category.id}
                >
                  <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader className="p-0">
                      <div className="aspect-square relative">
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          data-ai-hint={category.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-center text-lg">
                        {category.name}
                      </CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary/10 py-12 md:py-20">
        <div className="container text-center">
            <h2 className="text-3xl font-bold">Why Choose Maatex Solution BD?</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-primary">Unmatched Quality</h3>
                <p className="mt-2 text-muted-foreground">We source only the finest materials to ensure durability and excellence.</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-primary">Competitive Pricing</h3>
                <p className="mt-2 text-muted-foreground">Get the best value for your investment with our wholesale pricing.</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-primary">Timely Delivery</h3>
                <p className="mt-2 text-muted-foreground">Reliable and efficient shipping to keep your projects on schedule.</p>
              </div>
            </div>
            <Button asChild size="lg" variant="outline" className="mt-12">
                <Link href="/about">Learn More About Us</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
