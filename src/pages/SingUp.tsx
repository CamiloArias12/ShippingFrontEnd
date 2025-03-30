import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../ui/src';
import { UserCreateDto, UserCreateReq } from '../../../../../ShippingBackend/packages/shared/dist/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceCreate } from '../api/auth';

export default function SingUp() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateDto>(
    {
      resolver: zodResolver(UserCreateReq),
    }
  );

  const onSubmit: SubmitHandler<UserCreateDto> = async (data) => {
    const token = serviceCreate(data)
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
      <h1 className=' text-2xl'>{t('singup.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/3">
        <Input
          label={t('singup.fields.name')}
          {...register('name')} />
        <Input
          label={t('singup.fields.email')}
          {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          label={t('singup.fields.password')}
          type="password"
          {...register('password')} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <Button type="submit" label={t('singup.button')} variant="contained" />
      </form>
    </div>
  );
};

