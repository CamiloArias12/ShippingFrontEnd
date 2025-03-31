import { useState } from 'react'; // Add useState import
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserCreateDto, UserCreateReq } from '@shipping/shared/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceCreate } from '../api/auth';
import { Box, Typography, Alert, Snackbar } from '@mui/material'; // Import Alert and Snackbar
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { toast } from 'sonner';

export default function SingUp() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Use the navigate hook
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateDto>(
    {
      resolver: zodResolver(UserCreateReq),
    }
  );

  const onSubmit = async (data:any) => {
    const result = await serviceCreate(data);
    if (result) {
      toast.success(t('singup.success'));
      navigate('/dashboard');
    } else {
      toast.error(t('singup.error'));
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

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
                {t(`validation.name.${errors.name.type}`)}
              </Typography>
            )}

            <Input
              label={t('fields.email')}
              props={{ ...register('email') }}
            />
            {errors.email && (
              <Typography color="error" fontSize="small"> {/* Fixed extra ] */}
                {t(`validation.email.${errors.email.type}`)}
              </Typography>
            )}

            <Input
              label={t('fields.password')}
              type="password"
              props={{ ...register('password') }}
            />
            {errors.password && (
              <Typography color="error" fontSize="small">
                {t(`validation.password.${errors.password.type}`)}
              </Typography>
            )}

            <Box mt={2}>
              <Button 
                type="submit" 
                label={isLoading ? t('common.loading', 'Loading...') : t('singup.button')} 
                variant="contained" 
                disabled={isLoading}
              />
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
          display: { xs: 'none', md: 'block' }, // Hide on mobile
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
}

