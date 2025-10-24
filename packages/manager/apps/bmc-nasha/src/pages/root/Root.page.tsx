import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNashaCheck } from '@/data/api/hooks/useNashaServices';

export default function RootPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useNashaCheck();

  useEffect(() => {
    if (!isLoading && data) {
      const hasServices = data.data && data.data.length > 0;
      navigate(hasServices ? 'listing' : 'onboarding', { replace: true });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}
