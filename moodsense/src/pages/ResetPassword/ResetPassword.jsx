import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthStatus } from '../../components/auth/AuthStatus'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { PasswordField } from '../../components/auth/PasswordField'
import { useAuthForm } from '../../hooks/useAuthForm'
import { validatePassword, validatePasswordMatch } from '../../utils/authValidation'

const ResetPassword = () => {
  const { errors, handleChange, handleSubmit, isLoading, status, values } = useAuthForm({
    initialValues: { password: '', confirmPassword: '' },
    onValidate: (formValues) => ({
      password: validatePassword(formValues.password, 'New password'),
      confirmPassword: validatePasswordMatch(formValues.password, formValues.confirmPassword),
    }),
    successMessage: 'Password strength validated. You can now sign in with your new password.',
  })

  return (
    <AuthLayout
      eyebrow="Create a stronger password"
      subtitle="Complete a secure reset with real-time validation styling, password visibility controls, and neon loading feedback."
      title="Protect your MoodSense AI profile"
    >
      <AuthCard footerAction="Sign In" footerText="Password updated?" footerTo="/login" icon="✓" subtitle="Choose a new secure password" title="Reset Password">
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthStatus status={status} />
          <PasswordField
            autoComplete="new-password"
            error={errors.password}
            label="New Password"
            name="password"
            onChange={handleChange}
            placeholder="Create new password"
            value={values.password}
          />
          <PasswordField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm new password"
            value={values.confirmPassword}
          />
          <AuthSubmitButton isLoading={isLoading}>Reset Password</AuthSubmitButton>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default ResetPassword
