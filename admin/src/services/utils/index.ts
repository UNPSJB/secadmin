export function isEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return email.match(emailRegex)
}
