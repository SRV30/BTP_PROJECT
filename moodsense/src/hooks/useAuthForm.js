import { useState } from 'react'

export const useAuthForm = ({ initialValues, onSuccess, onValidate, successMessage }) => {
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

  const handleSubmit = async (event) => {
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

    try {
      await onSuccess?.(values)
      setStatus({ type: 'success', message: successMessage })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsLoading(false)
    }
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
