import { useState } from 'react'
import { FormField } from './FormField'

export const PasswordField = ({ autoComplete, error, label, name, onChange, placeholder, value }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="space-y-2">
      <FormField
        autoComplete={autoComplete}
        error={error}
        icon="🔒"
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={isVisible ? 'text' : 'password'}
        value={value}
      />
      <button
        className="ml-auto block text-xs font-semibold text-violet-300 transition hover:text-cyan-200"
        onClick={() => setIsVisible((current) => !current)}
        type="button"
      >
        {isVisible ? 'Hide password' : 'Show password'}
      </button>
    </div>
  )
}
