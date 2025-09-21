// This file contains client-side data fetching functions.
// It's a separate file to avoid bundling server-side code (like Firebase Admin) to the client.

import { db } from './firebase';
import { collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import type { Fabric, Banner, HomeCategory } from './types';

export async function getFabrics(options: { featured?: boolean } = {}): Promise<Fabric[]> {
  let q;
  if (options.featured) {
    q = query(collection(db, 'fabrics'), where('featured', '==', true), limit(3));
  } else {
    q = query(collection(db, 'fabrics'), orderBy('name'));
  }
  const fabricSnapshot = await getDocs(q);
  return fabricSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Fabric));
}


export async function getFabricCategories(): Promise<string[]> {
  const q = query(collection(db, 'fabrics'), orderBy('material'));
  const fabricSnapshot = await getDocs(q);
  const fabrics = fabricSnapshot.docs.map(doc => doc.data() as Fabric);
  const categories = new Set(fabrics.map(f => f.material));
  return ['All', ...Array.from(categories)];
}

export async function getFabricColors(): Promise<string[]> {
  const q = query(collection(db, 'fabrics'), orderBy('color'));
  const fabricSnapshot = await getDocs(q);
  const fabrics = fabricSnapshot.docs.map(doc => doc.data() as Fabric);
  const colors = new Set(fabrics.map(f => f.color));
  return ['All', ...Array.from(colors)];
}

export async function getBanners(): Promise<Banner[]> {
    const q = query(collection(db, 'banners'), orderBy('priority'));
    const bannerSnapshot = await getDocs(q);
    return bannerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Banner));
}

export async function getHomeCategories(): Promise<HomeCategory[]> {
    const q = query(collection(db, 'home_categories'), orderBy('name', 'asc'));
    const categorySnapshot = await getDocs(q);
    return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HomeCategory));
}
