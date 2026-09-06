/**
 * myStore Frontend - Application Configuration
 */

const CONFIG = {
    // Backend API base URL
    API_BASE_URL: 'http://localhost:8080/api/v1',
    
    // Auth Token Storage Keys
    ACCESS_TOKEN_KEY: 'mystore_access_token',
    REFRESH_TOKEN_KEY: 'mystore_refresh_token',
    USER_KEY: 'mystore_user',
    CART_KEY: 'mystore_cart',
    THEME_KEY: 'mystore_theme',

    // Default API Mode (true = try live API first, fallback to mock if offline)
    AUTO_FALLBACK_TO_MOCK: true
};

window.CONFIG = CONFIG;
