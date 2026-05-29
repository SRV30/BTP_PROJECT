import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthStatus } from '../../components/auth/AuthStatus'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { FormField } from '../../components/auth/FormField'
import { PasswordField } from '../../components/auth/PasswordField'
import { SocialAuth } from '../../components/auth/SocialAuth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { validateEmail, validatePassword } from '../../utils/authValidation'

const Login = () => {
  const { errors, handleChange, handleSubmit, isLoading, status, values } = useAuthForm({
    initialValues: { email: '', password: '' },
    onValidate: (formValues) => ({
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
    }),
    successMessage: 'Login validated. Redirecting to your MoodSense dashboard...',
  })

  return (
    <AuthLayout
      eyebrow="Secure mood intelligence"
      subtitle="Sign in to continue tracking mood, focus, stress, and AI-powered wellbeing signals in one neon command center."
      title="Welcome back to MoodSense AI"
    >
      <AuthCard footerAction="Create account" footerText="New to MoodSense?" footerTo="/signup" subtitle="Glad to see you again" title="Welcome Back">
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthStatus status={status} />
          <FormField
            autoComplete="email"
            error={errors.email}
            icon="✉️"
            label="Email"
            name="email"
            onChange={handleChange}
            placeholder="example@email.com"
            type="email"
            value={values.email}
          />
          <PasswordField
            autoComplete="current-password"
            error={errors.password}
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            value={values.password}
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2">
              <input className="accent-violet-400" type="checkbox" />
              Remember me
            </label>
            <Link className="font-semibold text-violet-300 hover:text-cyan-200" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <AuthSubmitButton isLoading={isLoading}>Sign In</AuthSubmitButton>
        </form>
        <div className="mt-6">
          <SocialAuth />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default Login
