'use client';

import { useState, useMemo, useEffect } from 'react';
import { Fabric } from '../../lib/types';
import { getFabrics, getFabricCategories, getFabricColors } from '../../lib/data-client';
import { FabricCard } from '../../components/fabric-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';

export default function FabricsPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [fabricsData, categoriesData, colorsData] = await Promise.all([
        getFabrics(),
        getFabricCategories(),
        getFabricColors(),
      ]);
      setFabrics(fabricsData);
      setCategories(categoriesData);
      setColors(colorsData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredFabrics = useMemo(() => {
    return fabrics.filter((fabric) => {
      const matchesSearch = fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) || (Array.isArray(fabric.tags) && fabric.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = selectedCategory === 'All' || fabric.material === selectedCategory;
      const matchesColor = selectedColor === 'All' || fabric.color === selectedColor;
      return matchesSearch && matchesCategory && matchesColor;
    });
  }, [fabrics, searchTerm, selectedCategory, selectedColor]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-card border-b">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-primary">Our Fabric Collection</h1>
          <p className="mt-2 text-muted-foreground">
            Explore our diverse range of high-quality textiles.
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Filters */}
        <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="relative lg:col-span-2">
              <label htmlFor="search" className="text-sm font-medium text-muted-foreground">Search by name or tag</label>
              <Search className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="e.g. Silk, durable, jeans..."
                className="pl-10 h-10 mt-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category-filter" className="text-sm font-medium text-muted-foreground">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter" className="h-10 mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="color-filter" className="text-sm font-medium text-muted-foreground">Filter by Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-filter" className="h-10 mt-1">
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Fabric Grid */}
        {isLoading ? (
          renderSkeletons()
        ) : filteredFabrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFabrics.map((fabric) => (
              <FabricCard key={fabric.id} fabric={fabric} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Fabrics Found</h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
