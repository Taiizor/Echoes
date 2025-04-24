// Rate limit settings for API requests
export const rateLimitConfig = {
  // How many requests to allow in a window
  MAX_REQUESTS: 5,
  
  // Time window (in milliseconds)
  WINDOW_MS: 1000, // 1 second
  
  // Whether to add headers in each request
  ADD_HEADERS: true,
  
  // Rate limit messages
  MESSAGES: {
    TOO_MANY_REQUESTS: 'You have sent too many requests. Please wait for a while.',
    ERROR_TITLE: 'Rate Limit Exceeded'
  },
  
  // Size of in-memory store (for different IPs)
  // For large applications, using external storage like Redis is recommended
  STORE_SIZE_LIMIT: 10000,
  
  // Which routes are subject to rate limiting
  MATCHER: [
    // All API routes
    '/api/:path*'
  ]
}; 