import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RootPage from './Root.page';

// Mock the API hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUseNashaCheck = vi.fn();
vi.mock('@/data/api/hooks/useNashaServices', () => ({
  useNashaCheck: () => mockUseNashaCheck(),
}));

describe('RootPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner while checking services', () => {
    mockUseNashaCheck.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('navigates to onboarding when no services exist', () => {
    mockUseNashaCheck.mockReturnValue({
      data: { data: [] },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('onboarding', { replace: true });
  });

  it('navigates to listing when services exist', () => {
    mockUseNashaCheck.mockReturnValue({
      data: { data: [{ serviceName: 'test-service' }] },
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('listing', { replace: true });
  });
});
