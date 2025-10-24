import { BaseLayout, Button } from '@ovh-ux/muk';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useOvhTracking } from '@ovh-ux/manager-react-shell-client';

export default function OnboardingPage() {
  const { t } = useTranslation('onboarding');
  const navigate = useNavigate();
  const { trackClick } = useOvhTracking();

  const handleOrder = () => {
    trackClick({ actions: ['onboarding::add'] });
    navigate('/order'); // or appropriate order route
  };

  const handleGuideClick = (guideId: string) => {
    trackClick({ actions: [`onboarding::documentation::${guideId}`] });
  };

  const guides = [
    {
      id: 'getting-started',
      category: t('guides.guide1.category'),
      title: t('guides.guide1.title'),
      description: t('guides.guide1.description'),
      cta: t('guides.guide1.cta'),
      link: 'https://docs.ovh.com/us/en/storage/nas/get-started/'
    },
    {
      id: 'nfs',
      category: t('guides.guide2.category'),
      title: t('guides.guide2.title'),
      description: t('guides.guide2.description'),
      cta: t('guides.guide2.cta'),
      link: 'https://docs.ovh.com/us/en/storage/nas-nfs/'
    },
    {
      id: 'cifs',
      category: t('guides.guide3.category'),
      title: t('guides.guide3.title'),
      description: t('guides.guide3.description'),
      cta: t('guides.guide3.cta'),
      link: 'https://docs.ovh.com/us/en/storage/nas/nas-cifs/'
    },
  ];

  return (
    <BaseLayout header={{ title: 'NAS-HA' }}>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero section */}
        <div className="text-center mb-12">
          <img
            src="/assets/instance.png"
            alt="NAS-HA"
            className="mx-auto mb-6 max-w-md"
          />
          <h1 className="text-3xl font-bold mb-4">{t('title_fallback')}</h1>
          <p className="text-lg text-gray-600 mb-4">{t('description_part1')}</p>
          <p className="text-lg text-gray-600 mb-8">{t('description_part2')}</p>
          <Button variant="default" size="lg" onClick={handleOrder}>
            {t('order_button')}
          </Button>
        </div>

        {/* Guide tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <a
              key={guide.id}
              href={guide.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleGuideClick(guide.id)}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-sm text-blue-600 font-semibold mb-2">{guide.category}</div>
              <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <span className="text-blue-600 font-medium">{guide.cta} →</span>
            </a>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
