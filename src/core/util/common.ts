/**
 * @param created milliseconds
 * @param ttl second
 */
export function isTtlExpired(created: number | string, ttl: number) {
  const now: number = Date.now();
  const t: number = isString(created) ? new Date(created).getTime() : created as number;
  return now > t + ttl * 1000;
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}
