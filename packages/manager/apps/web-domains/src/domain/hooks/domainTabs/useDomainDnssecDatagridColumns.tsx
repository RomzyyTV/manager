import { NAMESPACES } from '@ovh-ux/manager-common-translations';
import { ActionMenu, DataGridTextCell } from '@ovh-ux/manager-react-components';
import { ODS_BUTTON_COLOR, ODS_BUTTON_VARIANT } from '@ovhcloud/ods-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useDomainDnssecDatagridColumns = () => {
  const { t } = useTranslation('domain');
  const navigate = useNavigate();
  const columns = [
    {
      id: 'keyTag',
      cell: () => <DataGridTextCell>32456</DataGridTextCell>,
      label: t('domain_DNSSEC_table_header_keyTag'),
    },
    {
      id: 'flag',
      cell: () => (
        <DataGridTextCell>257 - Key Signing Key (KSK) </DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_flag'),
    },
    {
      id: 'Algorithme',
      cell: () => <DataGridTextCell>8 - RSASHZA3457</DataGridTextCell>,
      label: t('domain_DNSSEC_table_header_algo'),
    },
    {
      id: 'publicKey',
      cell: () => (
        <DataGridTextCell>
          SreztregdhtfjghkvjbhlNcqityzfEZFjyfchgvkliYHELVBQSFHCJVD
        </DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_publicKey'),
    },
    {
      id: 'actions',
      cell: () => (
        <ActionMenu
          items={[
            {
              id: 1,
              label: t(`${NAMESPACES.ACTIONS}:modify`),
            },

            {
              id: 2,
              label: t(`${NAMESPACES.ACTIONS}:delete`),
              color: ODS_BUTTON_COLOR.critical,
              onClick: () => navigate(`32456/delete`),
            },
          ]}
          id={'1'}
          isCompact
          variant={ODS_BUTTON_VARIANT.ghost}
        />
      ),
      label: '',
    },
  ];
  return columns;
};
