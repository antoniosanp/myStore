import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from '../i18n';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { Button } from '../components/Button/Button';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <EmptyState
        icon={<HelpCircle size={64} color="var(--color-text-muted)" />}
        title={t('common.notFoundTitle')}
        subtitle={t('common.notFoundSubtitle')}
        action={
          <Link to="/">
            <Button variant="primary">{t('common.goToHome')}</Button>
          </Link>
        }
      />
    </div>
  );
};
