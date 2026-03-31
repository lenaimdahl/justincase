const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const WARNING_THRESHOLD_DAYS = 7;

export type ItemStatus = 'fresh' | 'warning' | 'expired';

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateString(dateStr: string): Date {
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length !== 3) throw new Error('Invalid date format');

  const [year, month, day] = parts.map(p => parseInt(p, 10));
  if (isNaN(year) || isNaN(month) || isNaN(day)) throw new Error('Invalid date values');

  return new Date(year, month - 1, day);
}

function parseExpiryDate(expiryDate: string | Date | undefined): Date | null {
  if (!expiryDate) return null;

  try {
    const date = typeof expiryDate === 'string' ? parseDateString(expiryDate) : expiryDate;
    return isNaN(date.getTime()) ? null : startOfDay(date);
  } catch {
    return null;
  }
}

function calculateDaysUntilExpiry(expiryDate: string | Date | undefined): number | null {
  const parsed = parseExpiryDate(expiryDate);
  if (!parsed) return null;

  const now = startOfDay(new Date());
  return Math.floor((parsed.getTime() - now.getTime()) / MS_PER_DAY);
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

export function getItemStatus(
  expiryDate: string | Date | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): ItemStatus {
  const days = calculateDaysUntilExpiry(expiryDate);

  if (days === null) return 'fresh';
  if (days < 0) return 'expired';
  return days <= thresholdDays ? 'warning' : 'fresh';
}

export function getStatusClassName(
  expiryDate: string | Date | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): string {
  return `item-status-${getItemStatus(expiryDate, thresholdDays)}`;
}

export function formatExpiryDate(expiryDate: string | Date | undefined): string {
  const parsed = parseExpiryDate(expiryDate);
  if (!parsed) return '';

  return parsed.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getStatusMessage(
  expiryDate: string | Date | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): string {
  const days = calculateDaysUntilExpiry(expiryDate);

  if (days === null) return 'Kein Verfallsdatum';
  if (days < 0) {
    const daysPassed = Math.abs(days);
    return `Abgelaufen vor ${daysPassed} ${pluralize(daysPassed, 'Tag', 'Tagen')}`;
  }
  if (days === 0) return 'Verfällt heute';
  if (days <= thresholdDays) return `Verfällt in ${days} ${pluralize(days, 'Tag', 'Tagen')}`;

  return `Verfällt in ${days} Tagen`;
}
