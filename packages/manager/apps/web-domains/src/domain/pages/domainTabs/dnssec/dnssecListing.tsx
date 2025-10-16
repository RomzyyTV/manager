import { NAMESPACES } from '@ovh-ux/manager-common-translations';
import { useTranslation } from 'react-i18next';
import { Datagrid } from '@ovh-ux/manager-react-components';
import { Button, BUTTON_SIZE } from '@ovhcloud/ods-react';
import { useDomainDnssecDatagridColumns } from '@/domain/hooks/domainTabs/useDomainDnssecDatagridColumns';

export default function DnssecListing() {
  const { t } = useTranslation(['domain', NAMESPACES.ACTIONS, NAMESPACES.FORM]);
  const columns = useDomainDnssecDatagridColumns();

  return (
    <Datagrid
      columns={columns}
      items={[{}]}
      totalItems={1}
      topbar={
        <Button className="mb-4" size={BUTTON_SIZE.sm}>
          {t(`${NAMESPACES.ACTIONS}:add`)}
        </Button>
      }
    />
  );
}
