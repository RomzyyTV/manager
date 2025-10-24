import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import OnboardingPage from './Onboarding.page';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'title_fallback': 'NAS-HA',
        'description_part1': 'Discover how to get the most out of NAS-HA storage.',
        'description_part2': 'Follow our guides to get started quickly.',
        'order_button': 'Order a NAS-HA',
        'guides.guide1.category': 'Discovery',
        'guides.guide1.title': 'Get started with NAS-HA',
        'guides.guide1.description': 'Learn the basics to get started.',
        'guides.guide1.cta': 'Get started',
        'guides.guide2.category': 'Tutorials',
        'guides.guide2.title': 'Configure NFS access',
        'guides.guide2.description': 'Follow our step-by-step guide for NFS.',
        'guides.guide2.cta': 'See tutorial',
        'guides.guide3.category': 'Tutorials',
        'guides.guide3.title': 'Configure CIFS access',
        'guides.guide3.description': 'Follow our step-by-step guide for CIFS.',
        'guides.guide3.cta': 'See tutorial',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock tracking
const mockTrackClick = vi.fn();
vi.mock('@ovh-ux/manager-react-shell-client', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOvhTracking: () => ({ trackClick: mockTrackClick }),
  };
});

// Mock MUK components
vi.mock('@ovh-ux/muk', () => ({
  BaseLayout: ({ header, children }: { header: { title: string }; children: React.ReactNode }) => (
    <div>
      <h1>{header.title}</h1>
      {children}
    </div>
  ),
  Button: ({ children, onClick, variant, size }: any) => (
    <button
      data-testid="order-button"
      data-variant={variant}
      data-size={size}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

describe('OnboardingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the onboarding page with title and description', () => {
    render(
      <BrowserRouter>
        <OnboardingPage />
      </BrowserRouter>
    );

    expect(screen.getByText('NAS-HA')).toBeInTheDocument();
    expect(screen.getByText('Discover how to get the most out of NAS-HA storage.')).toBeInTheDocument();
    expect(screen.getByText('Follow our guides to get started quickly.')).toBeInTheDocument();
  });

  it('renders order button', () => {
    render(
      <BrowserRouter>
        <OnboardingPage />
      </BrowserRouter>
    );

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeInTheDocument();
    expect(orderButton).toHaveTextContent('Order a NAS-HA');
  });

  it('handles order button click', () => {
    render(
      <BrowserRouter>
        <OnboardingPage />
      </BrowserRouter>
    );

    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    expect(mockTrackClick).toHaveBeenCalledWith({ actions: ['onboarding::add'] });
    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });

  it('renders guide tiles', () => {
    render(
      <BrowserRouter>
        <OnboardingPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Get started with NAS-HA')).toBeInTheDocument();
    expect(screen.getByText('Configure NFS access')).toBeInTheDocument();
    expect(screen.getByText('Configure CIFS access')).toBeInTheDocument();
  });

  it('handles guide click tracking', () => {
    render(
      <BrowserRouter>
        <OnboardingPage />
      </BrowserRouter>
    );

    const guideLinks = screen.getAllByRole('link');
    fireEvent.click(guideLinks[0]);

    expect(mockTrackClick).toHaveBeenCalledWith({ actions: ['onboarding::documentation::getting-started'] });
  });
});
