'use cache';

import { supabase } from '@/lib/supabase';
import { cacheLife } from 'next/cache';

export interface BannerEntry {
  id: number;
  name: string;
  date: string;
}

const getBanners = async (): Promise<BannerEntry[]> => {
  cacheLife('hours');

  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return (data || []) as BannerEntry[];
};

export default getBanners;
