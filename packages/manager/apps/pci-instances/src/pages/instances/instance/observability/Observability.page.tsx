import { FC, Suspense } from 'react';
import { ObservabilityToCustomerModule } from '@ovh-ux/observability-to-customer';

const ObservabilityPage: FC = () => (
  <Suspense fallback="loading observability module ...">    
      <ObservabilityToCustomerModule />
  </Suspense>  
);

export default ObservabilityPage;
