import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  ShoppingCart,
  Shield,
  Package,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation, type SupportedLanguage } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const { isAuthenticated, role, userEmail, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const nextLang: SupportedLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(nextLang);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-surface-card)',
        borderBottom: '1px solid var(--color-border-default)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--color-brand-primary)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>🛍️</span>
          <span>{t('common.appName')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          <style>
            {`
              @media (min-width: 768px) {
                .desktop-nav { display: flex !important; }
                .mobile-toggle { display: none !important; }
              }
            `}
          </style>

          <Link
            to="/"
            style={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              transition: 'color var(--transition-speed)',
            }}
          >
            {t('nav.home')}
          </Link>

          {isAuthenticated && (
            <Link
              to="/orders"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
              }}
            >
              <Package size={17} />
              <span>{t('nav.orders')}</span>
            </Link>
          )}

          {role === 'ROLE_ADMIN' && (
            <Link
              to="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--color-accent-highlight)',
              }}
            >
              <Shield size={17} />
              <span>{t('nav.admin')}</span>
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '12px',
          }}
          className="desktop-nav"
        >
          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            title={t('nav.languageSelector')}
            style={{ fontWeight: 700, minWidth: '40px' }}
          >
            {language.toUpperCase()}
          </Button>

          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            style={{ padding: '8px' }}
          >
            {theme === 'dark' ? <Sun size={18} color="var(--color-accent-highlight)" /> : <Moon size={18} />}
          </Button>

          {/* Cart Icon Button */}
          <Link to="/cart">
            <Button
              variant="outline"
              size="sm"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'var(--color-border-default)',
                color: 'var(--color-text-primary)',
              }}
            >
              <ShoppingCart size={18} />
              <span>{t('nav.cart')}</span>
              {totalItems > 0 && (
                <Badge variant="accent" size="sm">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Auth Info */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={userEmail || ''}
              >
                {userEmail}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                title={t('nav.logout')}
                leftIcon={<LogOut size={16} />}
              >
                {t('nav.logout')}
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginLeft: '6px' }}>
              <Link to="/login">
                <Button variant="ghost" size="sm" leftIcon={<LogIn size={16} />}>
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" leftIcon={<UserPlus size={16} />}>
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="mobile-toggle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/cart" style={{ position: 'relative' }}>
            <Button variant="ghost" size="sm" style={{ padding: '8px' }}>
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge
                  variant="accent"
                  size="sm"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                  }}
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '8px' }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-surface-card)',
            borderTop: '1px solid var(--color-border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 500 }}
          >
            {t('nav.home')}
          </Link>

          {isAuthenticated && (
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '8px 0', fontWeight: 500 }}
            >
              {t('nav.orders')}
            </Link>
          )}

          {role === 'ROLE_ADMIN' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '8px 0',
                fontWeight: 600,
                color: 'var(--color-accent-highlight)',
              }}
            >
              {t('nav.admin')}
            </Link>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              {t('nav.languageSelector')} / {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                {language.toUpperCase()}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} color="var(--color-accent-highlight)" /> : <Moon size={18} />}
              </Button>
            </div>
          </div>

          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {userEmail}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                >
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/login" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" style={{ width: '100%' }}>
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" style={{ width: '100%' }}>
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
