import {
  FormField,
  FormFieldLabel,
  Input,
  Textarea,
} from '@ovhcloud/ods-react';
import { useTranslation } from 'react-i18next';
import { TDsDataInterface } from '@/domain/types/dnssecConfiguration';

interface DnssecFormProps {
  readonly formData: TDsDataInterface;
}
export default function DnssecForm({ formData }: DnssecFormProps) {
  const { t } = useTranslation('domain');
  const { keyTag, keyType, publicKey, supportedAlgorithm } = formData;

  return (
    <section className="flex flex-col gap-y-6 mb-8">
      <FormField>
        <FormFieldLabel>
          {t('domain_DNSSEC_table_header_keyTag')}
        </FormFieldLabel>
        <Input name="input" placeholder="32456" defaultValue={keyTag} />
      </FormField>

      <FormField>
        <FormFieldLabel>{t('domain_DNSSEC_table_header_flag')}</FormFieldLabel>
        <Input
          name="input"
          placeholder="257 - Key Signing Key (KSK)"
          defaultValue={keyType}
        />
      </FormField>

      <FormField>
        <FormFieldLabel>{t('domain_DNSSEC_table_header_algo')}</FormFieldLabel>
        <Input
          name="input"
          placeholder="8 - RSASHZA3457"
          value={`${supportedAlgorithm.number} - ${supportedAlgorithm.name}`}
        />
      </FormField>

      <FormField>
        <FormFieldLabel>
          {t('domain_DNSSEC_table_header_publicKey')}
        </FormFieldLabel>
        <Textarea
          name="textarea"
          placeholder="SreztregdhtfjghkvjbhlNcqityzfEZFjyfchgvkliYHELVBQSFHCJVD"
          defaultValue={publicKey}
        />
      </FormField>
    </section>
  );
}
