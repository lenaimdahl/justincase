const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const WARNING_THRESHOLD_DAYS = 7;

export type ItemStatus = 'expired' | 'fresh' | 'warning';

export function formatExpiryDate(expiryDate: Date | string | undefined): string {
  const parsed = parseExpiryDate(expiryDate);
  if (!parsed) {
    return '';
  }

  return parsed.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function getItemStatus(
  expiryDate: Date | string | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): ItemStatus {
  const days = calculateDaysUntilExpiry(expiryDate);

  if (days === null) {
    return 'fresh';
  }
  if (days < 0) {
    return 'expired';
  }
  return days <= thresholdDays ? 'warning' : 'fresh';
}

export function getStatusClassName(
  expiryDate: Date | string | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): string {
  return `item-status-${getItemStatus(expiryDate, thresholdDays)}`;
}

export function getStatusMessage(
  expiryDate: Date | string | undefined,
  thresholdDays: number = WARNING_THRESHOLD_DAYS
): string {
  const days = calculateDaysUntilExpiry(expiryDate);

  if (days === null) {
    return 'Kein Verfallsdatum';
  }
  if (days < 0) {
    const daysPassed = Math.abs(days);
    return `Abgelaufen vor ${daysPassed} ${pluralize(daysPassed, 'Tag', 'Tagen')}`;
  }
  if (days === 0) {
    return 'Verfällt heute';
  }
  if (days <= thresholdDays) {
    return `Verfällt in ${days} ${pluralize(days, 'Tag', 'Tagen')}`;
  }

  return `Verfällt in ${days} Tagen`;
}

function calculateDaysUntilExpiry(expiryDate: Date | string | undefined): null | number {
  const parsed = parseExpiryDate(expiryDate);
  if (!parsed) {
    return null;
  }

  const now = startOfDay(new Date());
  return Math.floor((parsed.getTime() - now.getTime()) / MS_PER_DAY);
}

function parseDateString(dateStr: string): Date {
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  const [year, month, day] = parts.map(part => parseInt(part, 10));
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date values');
  }

  return new Date(year, month - 1, day);
}

function parseExpiryDate(expiryDate: Date | string | undefined): Date | null {
  if (!expiryDate) {
    return null;
  }

  try {
    const date = typeof expiryDate === 'string' ? parseDateString(expiryDate) : expiryDate;
    return isNaN(date.getTime()) ? null : startOfDay(date);
  } catch {
    return null;
  }
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
