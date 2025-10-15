import '@/common/setupTests';
import { render } from '@testing-library/react';
import HostsListing from './hostsListing';
import { wrapper } from '@/common/utils/test.provider';

describe('DomainTabHost', () => {
  it('should display the content of host datagrid', () => {
    const { getByTestId } = render(<HostsListing />, {
      wrapper,
    });
    expect(getByTestId('datagrid')).toBeInTheDocument();
  });
});
