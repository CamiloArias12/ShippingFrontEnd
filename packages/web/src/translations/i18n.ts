// filepath: /Users/juanarias/Documents/test/shipping-web/packages/shared/src/i18n.ts
import { log } from 'console';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        singup: {
          title: 'Sign up',
          button: 'Register',
        },
        login: {
          title: 'Login',
          button: 'Login'
        },
        fields: {
          name: 'Names',
          email: 'Email',
          password: 'Password',
        },
        validation: {
          email: {
            invalid_string: 'Invalid email format',
          },
          password: {
            invalid_string: 'Invalid password format',
            too_small: 'Password is too short',
            too_big: 'Password is too long',
          }
        },
        errors:{
          login:"Login error",
          create:"Create error",
        }
      }
    },
    es: {
      translation: {
        singup: {
          title: 'Crear cuenta',
          button: 'Registrar',
        },
        login: {
          title: 'Iniciar sesión',
          button: 'Iniciar sesión',
        },
        fields: {
          name: 'Nombres',
          email: 'Correo',
          password: 'Contraseña',
        },

        validation: {
          email: {
            invalid_string: 'Formato de correo inválido',
          },
          password: {
            invalid_string: 'Formato de contraseña inválido',
            too_small: 'La contraseña es muy corta',
            too_big: 'La contraseña es muy larga',
          }
        },

        errors:{
          login:"Error al iniciar sesión",
          create:"Error al registrar",
        }
      }
    },
  },
  lng: 'es', // Default language
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;