import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from '../../i18n';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';

export const RegisterForm = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = t('auth.validationEmailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = t('auth.validationEmailInvalid');
    }

    if (!password) {
      errs.password = t('auth.validationPasswordRequired');
    } else if (password.length < 6) {
      errs.password = t('auth.validationPasswordMin');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register({
        email,
        password,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
      });
      showToast(t('auth.registerSuccess'), 'success');
      navigate('/', { replace: true });
    } catch {
      showToast(t('common.errorTitle'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="elevated" padding="lg" style={{ maxWidth: '440px', margin: '40px auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {t('auth.registerTitle')}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
          {t('auth.registerSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            type="text"
            label={t('auth.firstNameLabel')}
            placeholder={t('auth.firstNamePlaceholder')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            leftIcon={<User size={18} />}
            disabled={isLoading}
          />
          <Input
            type="text"
            label={t('auth.lastNameLabel')}
            placeholder={t('auth.lastNamePlaceholder')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Input
          type="email"
          label={t('auth.emailLabel')}
          placeholder={t('auth.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail size={18} />}
          disabled={isLoading}
        />

        <Input
          type="password"
          label={t('auth.passwordLabel')}
          placeholder={t('auth.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          leftIcon={<Lock size={18} />}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<UserPlus size={18} />}
          style={{ width: '100%', marginTop: '8px' }}
        >
          {t('auth.registerButton')}
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
        <span>{t('auth.hasAccountText')} </span>
        <Link to="/login" style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>
          {t('auth.loginLink')}
        </Link>
      </div>
    </Card>
  );
};
