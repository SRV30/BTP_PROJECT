const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required.'
  if (!emailPattern.test(email)) return 'Enter a valid email address.'
  return ''
}

export const validatePassword = (password, label = 'Password') => {
  if (!password) return `${label} is required.`
  if (password.length < 8) return `${label} must be at least 8 characters.`
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return `${label} needs one uppercase letter and one number.`
  }
  return ''
}

export const validateRequired = (value, label) => {
  if (!value.trim()) return `${label} is required.`
  return ''
}

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return 'Confirm password is required.'
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}
