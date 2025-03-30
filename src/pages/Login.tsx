import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@shippingweb/ui';
import { AuthLoginReq, AuthLoginDto } from '../../../../../ShippingBackend/packages/shared/dist/auth'
import { serviceLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<AuthLoginDto>(
    {
      resolver: zodResolver(AuthLoginReq)
    }
  );
  const onSubmit: SubmitHandler<AuthLoginDto> = async (data) => {
    setLoading(true);
    const user = await serviceLogin(data);
    setLoading(false);
    if (user) {
      navigate('/dashboard');
    }
    if (user === null) {
      setError(t('login.error'));
    }
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
      <h1 className=' text-2xl'>{t('login.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/3">
        <Input
          label={t('fields.email')}
          props={{ ...register('email') }} />
        {errors.email && <p className="text-red-500">{t(`validation.email.invalid_string`)}</p>}
        <Input
          label={t('fields.password')}
          type="password"
          props={{ ...register('password') }} />
        {errors.password && <p className="text-red-500">{t(`validation.password.${errors.password.type}`)}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" label={t('login.button')} disabled={loading} variant="contained" />
      </form>
    </div>
  );
};

