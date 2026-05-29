import { useState } from 'react'

export const useAuthForm = ({ initialValues, onValidate, successMessage }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setStatus(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = onValidate(values)
    const hasErrors = Object.values(nextErrors).some(Boolean)

    setErrors(nextErrors)

    if (hasErrors) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields to continue.' })
      return
    }

    setIsLoading(true)
    setStatus(null)

    window.setTimeout(() => {
      setIsLoading(false)
      setStatus({ type: 'success', message: successMessage })
    }, 800)
  }

  return {
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    status,
    values,
  }
}
