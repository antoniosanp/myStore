import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AppRouter } from './router/AppRouter';
import './theme/theme.css';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <AppRouter />
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
