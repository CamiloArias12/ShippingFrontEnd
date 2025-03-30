import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@shippingweb/ui';
import { AuthLoginReq, AuthLoginDto } from '../../../../../ShippingBackend/packages/shared/dist/auth'
import { serviceLogin } from '../api/auth';
import { toast } from 'sonner';


export default function Login() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthLoginDto>(
    {
      resolver: zodResolver(AuthLoginReq)
    }
  );
  const onSubmit: SubmitHandler<AuthLoginDto> = (data) => {
    toast.success(t('login.success'));
    const user =  serviceLogin(data);
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
     <h1 className=' text-2xl'>{t('login.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/3">
        <Input
          label={t('singup.fields.email')}
          {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          label={t('singup.fields.password')}
          type="password"
          {...register('password')} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <Button type="submit" label={t('login.button')} variant="contained" />
      </form>
    </div>
  );
};

