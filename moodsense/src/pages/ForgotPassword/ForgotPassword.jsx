import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthStatus } from '../../components/auth/AuthStatus'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { FormField } from '../../components/auth/FormField'
import { useAuthForm } from '../../hooks/useAuthForm'
import { validateEmail } from '../../utils/authValidation'

const ForgotPassword = () => {
  const { errors, handleChange, handleSubmit, isLoading, status, values } = useAuthForm({
    initialValues: { email: '' },
    onValidate: (formValues) => ({
      email: validateEmail(formValues.email),
    }),
    successMessage: 'Reset instructions are ready to send to this email address.',
  })

  return (
    <AuthLayout
      eyebrow="Recover access"
      subtitle="Validate your email and prepare a guided reset flow without leaving the polished MoodSense AI experience."
      title="Reset access with confidence"
    >
      <AuthCard footerAction="Back to Sign In" footerText="Remembered your password?" footerTo="/login" icon="↺" subtitle="Enter your email to continue" title="Forgot Password">
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
          <AuthSubmitButton isLoading={isLoading}>Send Reset Link</AuthSubmitButton>
        </form>
        <Link className="mt-5 block text-center text-sm font-semibold text-violet-300 hover:text-cyan-200" to="/reset-password">
          I already have a reset code
        </Link>
      </AuthCard>
    </AuthLayout>
  )
}

export default ForgotPassword
