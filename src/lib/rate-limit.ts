interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const trackerMap = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter for API endpoints
 * @param identifier Client IP or identifier string
 * @param maxRequests Maximum requests allowed within window (default: 5)
 * @param windowMs Time window in milliseconds (default: 60000ms = 1 min)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60000
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = trackerMap.get(identifier);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    trackerMap.set(identifier, newRecord);
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: newRecord.resetTime,
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.count,
    reset: record.resetTime,
  };
}
