import { NAMESPACES } from '@ovh-ux/manager-common-translations';
import { ActionMenu, DataGridTextCell } from '@ovh-ux/manager-react-components';
import { ODS_BUTTON_COLOR, ODS_BUTTON_VARIANT } from '@ovhcloud/ods-components';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TDsDataInterface } from '@/domain/types/dnssecConfiguration';
import { DrawerActionEnum } from '@/domain/enum/drawerAction.enum';

interface UseDomainDnssecDatagridColumnsProps {
  readonly setDrawer: Dispatch<
    SetStateAction<{ isOpen: boolean; action?: DrawerActionEnum }>
  >;

  readonly setFormData: Dispatch<
    SetStateAction<{
      keyTag: string;
      keyType: string;
      algorithm: number;
      publicKey: string;
      supportedAlgorithm: {
        name: string;
        number: number;
      };
    }>
  >;
}

export const useDomainDnssecDatagridColumns = ({
  setDrawer,
  setFormData,
}: UseDomainDnssecDatagridColumnsProps) => {
  const { t } = useTranslation('domain');
  const columns = [
    {
      id: 'keyTag',
      cell: (props: TDsDataInterface) => (
        <DataGridTextCell>{props.keyTag}</DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_keyTag'),
    },
    {
      id: 'flag',
      cell: (props: TDsDataInterface) => (
        <DataGridTextCell>
          {props.keyType} - Key Signing Key (KSK)
        </DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_flag'),
    },
    {
      id: 'algorithme',
      cell: (props: TDsDataInterface) => (
        <DataGridTextCell>{`${props.supportedAlgorithm.number} - ${props.supportedAlgorithm.name}`}</DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_algo'),
    },
    {
      id: 'publicKey',
      cell: (props: TDsDataInterface) => (
        <DataGridTextCell>{props.publicKey}</DataGridTextCell>
      ),
      label: t('domain_DNSSEC_table_header_publicKey'),
    },
    {
      id: 'actions',
      cell: (props: TDsDataInterface) => (
        <ActionMenu
          items={[
            {
              id: 1,
              label: t(`${NAMESPACES.ACTIONS}:modify`),
              onClick: () => {
                setDrawer({ isOpen: true, action: DrawerActionEnum.MODIFY });
                setFormData({
                  keyTag: props.keyTag,
                  keyType: `${props.keyType} - Key Signing Key (KSK)`,
                  algorithm: props.algorithm,
                  publicKey: props.publicKey,
                  supportedAlgorithm: {
                    name: props.supportedAlgorithm.name,
                    number: props.supportedAlgorithm.number,
                  },
                });
              },
            },

            {
              id: 2,
              label: t(`${NAMESPACES.ACTIONS}:delete`),
              color: ODS_BUTTON_COLOR.critical,
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
