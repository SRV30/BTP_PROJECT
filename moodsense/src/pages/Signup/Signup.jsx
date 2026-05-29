import { AuthCard } from '../../components/auth/AuthCard'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthStatus } from '../../components/auth/AuthStatus'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { FormField } from '../../components/auth/FormField'
import { PasswordField } from '../../components/auth/PasswordField'
import { SocialAuth } from '../../components/auth/SocialAuth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '../../utils/authValidation'

const Signup = () => {
  const { errors, handleChange, handleSubmit, isLoading, status, values } = useAuthForm({
    initialValues: { fullName: '', email: '', password: '', confirmPassword: '' },
    onValidate: (formValues) => ({
      fullName: validateRequired(formValues.fullName, 'Full name'),
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
      confirmPassword: validatePasswordMatch(formValues.password, formValues.confirmPassword),
    }),
    successMessage: 'Account details validated. Your MoodSense workspace is ready to personalize.',
  })

  return (
    <AuthLayout
      eyebrow="Start your wellness journey"
      subtitle="Create a premium MoodSense AI profile with secure access, polished validation, and responsive form states."
      title="Create your AI wellness account"
    >
      <AuthCard footerAction="Sign In" footerText="Already have an account?" footerTo="/login" subtitle="Start your wellness journey" title="Create Account">
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthStatus status={status} />
          <FormField
            autoComplete="name"
            error={errors.fullName}
            icon="👤"
            label="Full Name"
            name="fullName"
            onChange={handleChange}
            placeholder="Jane Doe"
            value={values.fullName}
          />
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
            autoComplete="new-password"
            error={errors.password}
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Create password"
            value={values.password}
          />
          <PasswordField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm password"
            value={values.confirmPassword}
          />
          <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
            <input className="mt-1 accent-violet-400" defaultChecked type="checkbox" />
            I agree to the Terms and Privacy Policy for personalized MoodSense AI insights.
          </label>
          <AuthSubmitButton isLoading={isLoading}>Create Account</AuthSubmitButton>
        </form>
        <div className="mt-6">
          <SocialAuth />
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default Signup
