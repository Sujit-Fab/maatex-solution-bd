export type Fabric = {
  id: string;
  name: string;
  material: string;
  weave: string;
  color: string;
  image: string;
  price: number;
  tags: string[];
  description: string;
  featured?: boolean;
};

export type Banner = {
    id: string;
    title: string;
    description:string;
    imageUrl: string;
    imageHint: string;
    alt: string;
    buttonText: string;
    buttonLink: string;
    priority: number;
};

export type HomeCategory = {
    id: string;
    name: string;
    imageUrl: string;
    imageHint: string;
};

export type StoryContent = {
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
};

export type MissionContent = {
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  alt: string;
  hint: string;
  priority: number;
};