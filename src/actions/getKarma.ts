import { supabase } from '@/lib/supabase';
import { MLQCCardType } from '@/common/types';

const getKarmaData = async () => {
  const { data, error } = await supabase.from('karma_flat').select('*');

  if (error) {
    console.error('Error fetching karma data:', error);
    return [];
  }

  return data as MLQCCardType[];
};

export default getKarmaData;
