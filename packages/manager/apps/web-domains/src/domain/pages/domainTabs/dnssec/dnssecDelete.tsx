import { NAMESPACES } from '@ovh-ux/manager-common-translations';
import { Modal } from '@ovh-ux/manager-react-components';
import { ODS_MODAL_COLOR } from '@ovhcloud/ods-components';
import { Text } from '@ovhcloud/ods-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { urls } from '@/domain/routes/routes.constant';
import { useGenerateUrl } from '@/domain/hooks/generateUrl/useGenerateUrl';

export default function DnssecDelete() {
  const { t } = useTranslation(['domain', NAMESPACES.ACTIONS]);
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const cancelUrl = useGenerateUrl(urls.domainTabDnssec, 'path', {
    serviceName,
  });
  return (
    <Modal
      isOpen={true}
      type={ODS_MODAL_COLOR.critical}
      heading={t('domain_DNSSEC_modal_delete_heading')}
      primaryLabel={t(`${NAMESPACES.ACTIONS}:delete`)}
      secondaryLabel={t(`${NAMESPACES.ACTIONS}:cancel`)}
      onSecondaryButtonClick={() => navigate(cancelUrl)}
    >
      <div className="py-6">
        <Text>{t('domain_DNSSEC_modal_delete_subtitle')}</Text>
      </div>
    </Modal>
  );
}
