import { collection, getDocs, query, where, limit, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Fabric, Banner, HomeCategory, StoryContent, MissionContent, GalleryImage } from './types';

// Static data for fallback
const staticBanners: Banner[] = [
  { id: '1', title: 'Supplying Quality Fabrics Worldwide', description: 'Your Reliable Partner in Fabrics', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/threadmark-fabrics.appspot.com/o/colorful-fabric-rolls-textile-banner.jpg?alt=media&token=0373b9aa-23e1-4104-a5bb-8a5e4c15a0e4', imageHint: 'colorful fabrics', alt: 'Rolls of colorful fabrics', buttonText: 'Shop Now', buttonLink: '/fabrics', priority: 1},
  { id: '2', title: 'New Summer Collection', description: 'We Weave Trust with Every Thread', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/threadmark-fabrics.appspot.com/o/colorful-fabric-rolls-textiles-banner.jpg?alt=media&token=3996c5fb-2d5b-44fb-a3f9-7c720e39bfdb', imageHint: 'linen fabric', alt: 'Close-up of light linen fabric', buttonText: 'Find Out', buttonLink: '/fabrics', priority: 2},
  { id: '3', title: 'Luxury Silks for Evening Wear', description: 'Elegant silks for any occasion.', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/threadmark-fabrics.appspot.com/o/multicolor-fabric-rolls-in-a-textile-shop-banner.jpg?alt=media&token=6a1215b4-8255-46f9-863a-2114757c91bc', imageHint: 'silk fabric', alt: 'Multicolor fabric rolls in a shop', buttonText: 'Discover Silks', buttonLink: '/fabrics?category=Silk', priority: 3},
];

const staticFabrics: Fabric[] = [
  {
    id: '1',
    name: 'Royal Blue Cotton Twill',
    material: 'Cotton',
    weave: 'Twill',
    color: 'Navy Blue',
    image: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/8d9c0a6b-c4f4-4a0b-8d8a-6e5a1b3b1c1d.jpeg',
    price: 15.99,
    tags: ['cotton', 'durable', 'apparel'],
    description: 'A durable and versatile cotton twill in a deep royal blue, perfect for trousers, jackets, and upholstery.',
    featured: true,
  },
  {
    id: '2',
    name: 'Maroon Silk Charmeuse',
    material: 'Silk',
    weave: 'Satin',
    color: 'Maroon',
    image: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/e3e3b1e8-233c-45e6-992a-87b640a324b1.jpeg',
    price: 35.50,
    tags: ['silk', 'luxurious', 'gowns'],
    description: 'A lustrous and fluid silk charmeuse with a rich maroon hue, ideal for elegant evening wear and lingerie.',
    featured: true,
  },
  {
    id: '3',
    name: 'Natural Beige Linen',
    material: 'Linen',
    weave: 'Plain',
    color: 'Beige',
    image: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/6a2b281b-53c8-4770-87a4-a9310850c90f.jpeg',
    price: 22.00,
    tags: ['linen', 'breathable', 'summer'],
    description: 'A light and breathable linen fabric in a natural beige tone, excellent for summer clothing like shirts and dresses.',
    featured: true,
  },
];

const staticHomeCategories: HomeCategory[] = [
    { id: '1', name: 'Cotton', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/19d65a2f-e875-430c-9d7a-18e31b0f58d7.jpeg', imageHint: 'cotton texture' },
    { id: '2', name: 'Silk', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/039600e2-6a6c-4b6f-8275-52ded1f6e3c2.jpeg', imageHint: 'silk texture' },
    { id: '3', name: 'Linen', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/a42b1046-24d3-4676-9d36-2391d141e6a6.jpeg', imageHint: 'linen texture' },
    { id: '4', name: 'Denim', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/3ac83c13-89a0-4a8f-8d96-c67d6054f0a9.jpeg', imageHint: 'denim texture' },
];

const staticStoryContent: StoryContent = {
  title: 'Our Story',
  paragraph1: 'Founded in 2005, Maatex Solution BD started as a small family-owned business with a passion for high-quality textiles. Our founders saw a need for a reliable fabric supplier that could offer both exceptional products and personalized service.',
  paragraph2: 'Over the years, we\'ve grown into a leading name in the fabric trading and wholesale industry, serving a diverse clientele from independent designers to large-scale garment manufacturers. Despite our growth, our core values of quality, trust, and customer satisfaction remain unchanged.',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/threadmark-fabrics.appspot.com/o/fabric_roll_a_workshop.jpg?alt=media&token=c6898b8f-87ae-468d-8560-6f205a3dd160'
};

const staticMissionContent: MissionContent = {
  title: 'Our Mission & Vision',
  paragraph1: 'Our mission is to be the most trusted and innovative fabric supplier, empowering creators and businesses by providing superior textiles and exceptional service. We aim to build long-lasting partnerships based on reliability and mutual success.',
  paragraph2: 'Our vision is to be at the forefront of the textile industry, continuously expanding our collection with sustainable and cutting-edge materials, while maintaining our commitment to ethical sourcing and operational excellence.',
  imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/b3c6a778-958b-491a-9694-52c01b16c1f1.jpeg',
};

const staticGalleryImages: GalleryImage[] = [
  { id: '1', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/8d9c0a6b-c4f4-4a0b-8d8a-6e5a1b3b1c1d.jpeg', alt: 'Elegant maroon dress', hint: 'clothing design', priority: 1 },
  { id: '2', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/e3e3b1e8-233c-45e6-992a-87b640a324b1.jpeg', alt: 'Stylish navy blue jacket', hint: 'apparel fashion', priority: 2 },
  { id: '3', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/6a2b281b-53c8-4770-87a4-a9310850c90f.jpeg', alt: 'Comfortable beige linen trousers', hint: 'summer clothing', priority: 3 },
  { id: '4', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/0e5b4c4c-3e3d-4c3c-8c8c-1c1c1c1c1c1c.jpeg', alt: 'Cozy brown corduroy chair', hint: 'home decor', priority: 4 },
  { id: '5', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/b3c6a778-958b-491a-9694-52c01b16c1f1.jpeg', alt: 'Textile patterns and swatches', hint: 'textile patterns', priority: 5 },
  { id: '6', imageUrl: 'https://storage.googleapis.com/studioprompt-hosting-apps-dev/3ac83c13-89a0-4a8f-8d96-c67d6054f0a9.jpeg', alt: 'Detailed stitching on denim jeans', hint: 'fashion details', priority: 6 },
];

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const q = query(collection(db, 'gallery'), orderBy('priority'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No gallery images found in Firestore, returning static data.');
      return staticGalleryImages;
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
  } catch (error) {
    console.error("Error fetching gallery images from Firestore: ", error);
    return staticGalleryImages;
  }
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const q = query(collection(db, 'banners'), orderBy('priority'));
    const bannerSnapshot = await getDocs(q);
    
    if (bannerSnapshot.empty) {
      console.log('No banners found in Firestore, returning static data.');
      return staticBanners;
    }
    
    return bannerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Banner));
  } catch (error) {
    console.error("Error fetching banners from Firestore: ", error);
    return staticBanners;
  }
}

export async function getHomeCategories(): Promise<HomeCategory[]> {
    try {
        const q = query(collection(db, 'home_categories'), orderBy('name', 'asc'));
        const categorySnapshot = await getDocs(q);

        if (categorySnapshot.empty) {
            console.log('No home categories found in Firestore, returning static data.');
            return staticHomeCategories;
        }

        return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomeCategory));
    } catch (error) {
        console.error("Error fetching home categories from Firestore: ", error);
        return staticHomeCategories;
    }
}


export async function getFabrics(options: { featured?: boolean } = {}): Promise<Fabric[]> {
  try {
    let q;
    if (options.featured) {
      q = query(collection(db, 'fabrics'), where('featured', '==', true), limit(3));
    } else {
      q = query(collection(db, 'fabrics'), orderBy('name'));
    }
    const fabricSnapshot = await getDocs(q);

    if (fabricSnapshot.empty) {
      console.log('No fabrics found in Firestore, returning static data.');
      return options.featured ? staticFabrics.filter(f => f.featured) : staticFabrics;
    }
    
    return fabricSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Fabric));
  } catch (error) {
    console.error("Error fetching fabrics from Firestore: ", error);
    return options.featured ? staticFabrics.filter(f => f.featured) : staticFabrics;
  }
}

export async function getFabricById(id: string): Promise<Fabric | null> {
  try {
    const docRef = doc(db, 'fabrics', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Fabric;
    } else {
      console.log(`Fabric with ID ${id} not found in Firestore, checking static data.`);
      return staticFabrics.find(f => f.id === id) || null;
    }
  } catch (error) {
    console.error(`Error fetching fabric by ID ${id}: `, error);
    return staticFabrics.find(f => f.id === id) || null;
  }
}

export async function getFabricCategories(): Promise<string[]> {
    try {
        const fabrics = await getFabrics();
        const categories = new Set(fabrics.map(f => f.material));
        return ['All', ...Array.from(categories)];
    } catch (error) {
        console.error("Error fetching fabric categories: ", error);
        const categories = new Set(staticFabrics.map(f => f.material));
        return ['All', ...Array.from(categories)];
    }
}

export async function getFabricColors(): Promise<string[]> {
    try {
        const fabrics = await getFabrics();
        const colors = new Set(fabrics.map(f => f.color));
        return ['All', ...Array.from(colors)];
    } catch (error) {
        console.error("Error fetching fabric colors: ", error);
        const colors = new Set(staticFabrics.map(f => f.color));
        return ['All', ...Array.from(colors)];
    }
}

export async function getStoryContent(): Promise<StoryContent> {
  try {
    const q = query(collection(db, 'story_section'), orderBy('title'), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('Story content not found in Firestore, returning static data.');
      return staticStoryContent;
    }
    
    return snapshot.docs[0].data() as StoryContent;
  } catch (error) {
    console.error("Error fetching story content from Firestore: ", error);
    return staticStoryContent;
  }
}

export async function getMissionContent(): Promise<MissionContent> {
  try {
    const q = query(collection(db, 'mission_section'), orderBy('title'), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('Mission content not found in Firestore, returning static data.');
      return staticMissionContent;
    }
    
    return snapshot.docs[0].data() as MissionContent;
  } catch (error) {
    console.error("Error fetching mission content from Firestore: ", error);
    return staticMissionContent;
  }
}