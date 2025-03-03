import { useMemo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { useTranslation } from '@/i18n';
import { useLoginMutation } from '@/services';
import { setAuthStoreToken } from '@/stores';

export const LoginForm = () => {
  const { t } = useTranslation();

  const loginMutation = useLoginMutation();

  const router = useRouter();
  const search = useSearch({ from: '/(public)/login/' });
  const navigate = useNavigate();

  const schema = useMemo(() => {
    return z.object({
      email: z
        .string()
        .min(1, { message: t('login.errors.required', { field: t('login.email') }) })
        .email({ message: t('login.errors.invalidField', { field: t('login.email') }) }),
      password: z.string().min(6, {
        message: t('login.errors.minLength', { field: t('login.password'), length: 6 }),
      }),
    });
  }, [t]);

  type LoginValues = z.infer<typeof schema>;

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginValues>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: async ({ data: { authToken } }) => {
        toast.success('Logged in successfully');
        setAuthStoreToken(authToken);
        await router.invalidate();
        await navigate({ to: search.redirect || '/' });
      },
      onError: () => {
        toast.error('Not able to log in');
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">{t('login.email')}</Label>
        <Input {...register('email')} />
        {errors.email ? <p className="mt-2 text-red-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <Label htmlFor="password">{t('login.password')}</Label>
        <Input {...register('password')} type="password" />
        {errors.password ? <p className="mt-2 text-red-600">{errors.password.message}</p> : null}
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('login.submit')}</Button>
      </div>
    </form>
  );
};
