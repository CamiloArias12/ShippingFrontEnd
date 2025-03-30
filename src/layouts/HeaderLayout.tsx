import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Language } from '../components/Language';

export function HeaderLayout() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center h-screen w-screen'>
      <div className='w-full h-24 shadow-md p-4 flex justify-between items-center p-4' >
        <h1>{t('singup.title')}</h1>
        <Language />
      </div>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;