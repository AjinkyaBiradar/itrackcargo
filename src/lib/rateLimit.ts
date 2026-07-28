const tracker = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const record = tracker.get(ip);

  if (!record) {
    tracker.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1, resetMs: windowMs };
  }

  if (now > record.resetTime) {
    tracker.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1, resetMs: windowMs };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetMs: record.resetTime - now };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, resetMs: record.resetTime - now };
}
