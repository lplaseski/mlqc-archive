import { supabase } from '@/lib/supabase';
import { cacheLife } from 'next/cache';
import { MLQCCardType } from '@/common/types';

const getKarmaData = async () => {
  'use cache';
  cacheLife('hours');

  const { data, error } = await supabase.from('karma_flat').select('*');

  if (error) {
    console.error('Error fetching karma data:', error);
    return [];
  }

  return data as MLQCCardType[];
};

export default getKarmaData;
