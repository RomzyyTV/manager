import { NAMESPACES } from '@ovh-ux/manager-common-translations';
import { useTranslation } from 'react-i18next';
import { Datagrid } from '@ovh-ux/manager-react-components';
import { Button, BUTTON_SIZE } from '@ovhcloud/ods-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDomainDnssecDatagridColumns } from '@/domain/hooks/domainTabs/useDomainDnssecDatagridColumns';
import { useGetDomainResource } from '@/domain/hooks/data/query';
import { TDsDataInterface } from '@/domain/types/dnssecConfiguration';
import DnssecDrawer from '@/domain/components/Dnssec/DnssecDrawer';

export default function DnssecListing() {
  const { t } = useTranslation(['domain', NAMESPACES.ACTIONS, NAMESPACES.FORM]);
  const { serviceName } = useParams();
  const columns = useDomainDnssecDatagridColumns();

  const [drawer, setDrawer] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });
  const { domainResource, isFetchingDomainResource } = useGetDomainResource(
    serviceName,
  );
  const [items, setItems] = useState<TDsDataInterface[]>([]);

  useEffect(() => {
    const enriched = domainResource.currentState.dnssecConfiguration.dsData.map(
      (item) => {
        if (item.algorithm === '3') {
          return {
            ...item,
            supportedAlgorithm: { name: 'RSASHZA3457', number: '3' },
          };
        }

        const found = domainResource.currentState.dnssecConfiguration.supportedAlgorithms.find(
          (algo) => algo.number === item.algorithm,
        );

        return {
          ...item,
          supportedAlgorithm: found ?? {
            name: '',
            number: item.algorithm,
          },
        };
      },
    );

    setItems(enriched);
  }, [domainResource]);

  return (
    <section>
      <Datagrid
        columns={columns}
        items={items}
        totalItems={items.length}
        isLoading={isFetchingDomainResource}
        topbar={
          <Button
            className="mb-4"
            size={BUTTON_SIZE.sm}
            onClick={() =>
              setDrawer({
                isOpen: true,
              })
            }
          >
            {t(`${NAMESPACES.ACTIONS}:add`)}
          </Button>
        }
      />
      <DnssecDrawer drawer={drawer} setDrawer={setDrawer} />
    </section>
  );
}
