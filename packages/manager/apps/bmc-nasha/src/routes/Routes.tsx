import React from 'react';

import { Navigate, Route } from 'react-router-dom';

import { PageType } from '@ovh-ux/manager-react-shell-client';
import ErrorBoundary from '@/components/debug/ErrorBoundary.component';

import { redirectionApp, urls } from './Routes.constants';

const MainLayoutPage = React.lazy(() => import('@/pages/Main.layout'));
const RootPage = React.lazy(() => import('@/pages/root/Root.page'));
const OnboardingPage = React.lazy(() => import('@/pages/onboarding/Onboarding.page'));
const ListingPage = React.lazy(() => import('@/pages/listing/Listing.page'));

export default (
  <>
    {/* Redirect container "/" → flavor-specific root (e.g. /pci/projects/:projectId/appSlug) */}
    <Route path="/" element={<Navigate to={urls.root} replace />} />

    {/* Rooted application layout */}
    <Route
      id="root"
      path={urls.root}
      Component={MainLayoutPage}
      errorElement={
        <ErrorBoundary
          isPreloaderHide={true}
          isRouteShellSync={true}
          redirectionApp={redirectionApp}
        />
      }
    >
      {/* Root with redirect logic */}
      <Route index Component={RootPage} />

      {/* Onboarding page */}
      <Route
        path="onboarding"
        Component={OnboardingPage}
        handle={{
          tracking: {
            pageName: 'onboarding',
            pageType: PageType.onboarding,
          },
        }}
      />

      {/* Listing page */}
      <Route
        path={urls.listing}
        Component={ListingPage}
        handle={{
          tracking: {
            pageName: 'listing',
            pageType: PageType.listing,
          },
        }}
      />

      {/* Catch-all redirect to listing */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Route>
  </>
);
