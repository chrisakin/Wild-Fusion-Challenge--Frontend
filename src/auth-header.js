export function authHeader () {
  const token = (sessionStorage.getItem('token'))
  if (token) {
    return { Authorization: token }
  } else {
    return {}
  }
}
