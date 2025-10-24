import { useResources } from './useResources';
import type { NashaService } from '@/types/Nasha.type';

export function useNashaCheck() {
  return useResources<NashaService>({
    page: 1,
    pageSize: 1,
  });
}
