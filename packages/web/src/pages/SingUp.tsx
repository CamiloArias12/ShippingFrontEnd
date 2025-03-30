import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserCreateDto, UserCreateReq } from '@shipping/shared/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceCreate, serviceLogin } from '../api/auth';
import { Box, Typography } from '@mui/material';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { loginFailure, loginStart, loginSuccess } from '../store/authSlice';

export default function SingUp() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateDto>(
    {
      resolver: zodResolver(UserCreateReq),
    }
  );

  const onSubmit: SubmitHandler<UserCreateDto> = async (data) => {
    dispatch(loginStart());
    try {
      const user = await serviceLogin(data);
      if (user) {
        localStorage.setItem('token', user.token);
        dispatch(loginSuccess(user.token));
        window.location.href = '/dashboard';
      } else {
        dispatch(loginFailure(t('errors.login')));
      }
    } catch (err) {
      dispatch(loginFailure(t('errors.login')));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100%"
      width="100%"
      sx={{
        overflow: "hidden",
        flex: 1
      }}
    >
      {/* Left side - SignUp form */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
        sx={{
          overflowY: "auto"
        }}
      >
        <Box
          width="100%"
          maxWidth="400px"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography fontSize={"24px"} variant='h4' component="h4" >
            {t('singup.title')}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
          >
            <Input
              label={t('fields.name')}
              props={{ ...register('name') }}
            />
            {errors.name && (
              <Typography color="error" fontSize="small">
                {errors.name.message}
              </Typography>
            )}

            <Input
              label={t('fields.email')}
              props={{ ...register('email') }}
            />
            {errors.email && (
              <Typography color="error" fontSize="small">]
                {`validation.email.${errors.email.type}`}
              </Typography>
            )}

            <Input
              label={t('fields.password')}
              type="password"
              props={{ ...register('password') }}
            />
            {errors.password && (
              <Typography color="error" fontSize="small">
                {`validation.password.${errors.password.type}`}
              </Typography>
            )}

            <Box mt={2}>
              <Button type="submit" label={t('singup.button')} variant="contained" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box
        flex={1}
        position="relative"
        sx={{
          overflow: "hidden",
          height: "100%"
        }}
      >
        <Box
          component="img"
          src="https://suite.coordinadora.com/resources/71ye7/login/cm-keycloak-theme/build/static/media/Hub-Autenticacion-mini-N.bfdfe11a5fe0db6c6ef4.png"
          alt="SignUp Illustration"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
    </Box>
  );
};

