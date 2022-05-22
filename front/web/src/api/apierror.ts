class ApiError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ApiError'
  }
}

export default ApiError
