import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthStatus } from '../../components/auth/AuthStatus'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { FormField } from '../../components/auth/FormField'
import { useAuthForm } from '../../hooks/useAuthForm'
import { authApi } from '../../services/authApi'
import { validateEmail } from '../../utils/authValidation'

const ForgotPassword = () => {
  const [resetToken, setResetToken] = useState('')
  const { errors, handleChange, handleSubmit, isLoading, status, values } = useAuthForm({
    initialValues: { email: '' },
    onSuccess: async (formValues) => {
      const response = await authApi.forgotPassword({ email: formValues.email })
      setResetToken(response.resetToken || '')
    },
    onValidate: (formValues) => ({
      email: validateEmail(formValues.email),
    }),
    successMessage: 'Reset instructions were generated successfully.',
  })

  return (
    <AuthLayout
      eyebrow="Recover access"
      subtitle="Request a secure password reset token for your MoodSense AI account."
      title="Reset access with confidence"
    >
      <AuthCard footerAction="Back to Sign In" footerText="Remembered your password?" footerTo="/login" icon="↺" subtitle="Enter your email to continue" title="Forgot Password">
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthStatus status={status} />
          {resetToken && (
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm leading-6 text-cyan-100">
              <p className="font-bold">Reset token</p>
              <p className="mt-2 break-all font-mono text-xs text-cyan-200">{resetToken}</p>
              <Link className="mt-3 inline-flex font-bold text-violet-200 hover:text-white" to={`/reset-password/${resetToken}`}>Continue to reset password</Link>
            </div>
          )}
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
