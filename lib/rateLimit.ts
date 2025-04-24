/**
 * Redis-based rate limiting solution
 * Note: To use this solution, you need to install the following packages first:
 * npm install @upstash/redis @upstash/ratelimit
 */

// Packages to import:
// import { Redis } from '@upstash/redis'
// import { Ratelimit } from '@upstash/ratelimit'
import { NextRequest, NextResponse } from 'next/server'

import { rateLimitConfig } from '../config/rateLimit';

// Activate this function when used
/*
 * Create Redis connection and configure rate limiter
 * Note: You need to set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables
 * 
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Customized solution for static IP addresses
// You can create exceptions for static IPs here
// Example: ['123.456.789.012', '234.567.890.123'] etc.
const STATIC_IPS: string[] = []

// Create rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    rateLimitConfig.MAX_REQUESTS,
    rateLimitConfig.WINDOW_MS + 'ms'
  ),
  analytics: true, // Store statistics
})
*/

/**
 * Get the real IP address
 * @param request Incoming HTTP request
 * @returns Returns the IP address
 */
export function getIP(request: NextRequest): string {
  return (
    request.headers.get('CF-Connecting-IP') || // CloudFlare
    request.headers.get('x-real-ip') || // Nginx and other proxies
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || // Most common proxy header
    'unknown-ip'
  )
}

/**
 * Check rate limiting
 * @param request Incoming HTTP request
 * @returns If allowed, returns undefined; if limit exceeded, returns NextResponse
 */
export async function rateLimitCheck(request: NextRequest) {
  const ip = getIP(request)
  
  // Description for in-memory solution - Reference for Redis solution
  /*
  // Check whitelist IPs
  if (STATIC_IPS.includes(ip)) {
    return undefined // No limit check
  }

  // Rate limit check
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)
  
  if (!success) {
    return new NextResponse(
      JSON.stringify({
        error: rateLimitConfig.MESSAGES.ERROR_TITLE,
        message: rateLimitConfig.MESSAGES.TOO_MANY_REQUESTS,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    )
  }
  */
  
  return undefined // Currently using in-memory solution
}

/**
 * How to implement rate limiting with Redis?
 * 
 * 1. Install @upstash/redis and @upstash/ratelimit packages:
 *    npm install @upstash/redis @upstash/ratelimit
 * 
 * 2. Add your Upstash Redis information to your environment variables:
 *    UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
 *    UPSTASH_REDIS_REST_TOKEN=xxx
 * 
 * 3. Activate the commented code in this file
 * 
 * 4. Replace the rateLimit function call in middleware.ts with your
 *    Redis-based solution
 */ 