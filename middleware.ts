import { NextRequest, NextResponse } from 'next/server';
import { rateLimitConfig } from './config/rateLimit';
import { getIP } from './lib/rateLimit';

// In-memory rate limit store
// NOTE: For large applications, you should use external storage like Redis
// See lib/rateLimit.ts file for Redis-based alternative
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

// Simple store for rate limit tracking
const rateLimitStore: RateLimitStore = {};

// Clean up the store at regular intervals (to prevent memory leaks)
// The store can grow if the application runs for a long time
const cleanupInterval = 60 * 60 * 1000; // 1 hour
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach(key => {
    if (now > rateLimitStore[key].resetAt) {
      delete rateLimitStore[key];
    }
  });
}, cleanupInterval);

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API requests
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get IP address using the getIP helper function
  const ipAddress = getIP(request);

  // If IP address cannot be obtained (rare case), accept the request
  if (ipAddress === 'unknown-ip') {
    return NextResponse.next();
  }

  const now = Date.now();
  
  // Start a new window if it's the first request for this IP or time has expired
  if (!rateLimitStore[ipAddress] || now > rateLimitStore[ipAddress].resetAt) {
    rateLimitStore[ipAddress] = {
      count: 0,
      resetAt: now + rateLimitConfig.WINDOW_MS,
    };
  }
  
  // Increment request count
  rateLimitStore[ipAddress].count++;
  
  // Limit check
  if (rateLimitStore[ipAddress].count > rateLimitConfig.MAX_REQUESTS) {
    // Rate limit exceeded, return 429 Too Many Requests error
    return new NextResponse(
      JSON.stringify({ 
        error: rateLimitConfig.MESSAGES.ERROR_TITLE, 
        message: rateLimitConfig.MESSAGES.TOO_MANY_REQUESTS 
      }, null, 2),
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(rateLimitConfig.MAX_REQUESTS),
          'X-RateLimit-Reset': String(Math.ceil(rateLimitStore[ipAddress].resetAt / 1000)),
          'Retry-After': String(Math.ceil((rateLimitStore[ipAddress].resetAt - now) / 1000))
        }
      }
    );
  }
  
  // If within request limit, continue
  const response = NextResponse.next();
  
  // Optionally add rate limit information to headers
  if (rateLimitConfig.ADD_HEADERS) {
    response.headers.set('X-RateLimit-Limit', String(rateLimitConfig.MAX_REQUESTS));
    response.headers.set('X-RateLimit-Remaining', 
      String(rateLimitConfig.MAX_REQUESTS - rateLimitStore[ipAddress].count));
    response.headers.set('X-RateLimit-Reset', 
      String(Math.ceil(rateLimitStore[ipAddress].resetAt / 1000)));
  }
  
  return response;
}

// Define which paths the middleware should run on
// Next.js middleware configuration - must be statically defined
export const config = {
  //matcher: rateLimitConfig.MATCHER
  matcher: ['/api/:path*']
}; 