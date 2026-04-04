import {beforeEach, describe, expect, it, vi} from 'vitest';

import {formatExpiryDate, getItemStatus, getStatusClassName, getStatusMessage} from './dateHelpers';

describe('dateHelpers', () => {
  beforeEach(() => {
    const mockDate = new Date('2026-03-31T00:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  describe('getItemStatus', () => {
    it('returns fresh for date more than threshold days away', () => {
      const status = getItemStatus('2026-04-15', 7);
      expect(status).toBe('fresh');
    });

    it('returns warning for date within threshold days', () => {
      const status = getItemStatus('2026-04-05', 7);
      expect(status).toBe('warning');
    });

    it('returns expired for date in the past', () => {
      const status = getItemStatus('2026-03-20');
      expect(status).toBe('expired');
    });

    it('returns warning for expiry date today', () => {
      const status = getItemStatus('2026-03-31', 7);
      expect(status).toBe('warning');
    });

    it('returns fresh for undefined expiry date', () => {
      const status = getItemStatus(undefined);
      expect(status).toBe('fresh');
    });

    it('returns fresh for empty string expiry date', () => {
      const status = getItemStatus('');
      expect(status).toBe('fresh');
    });

    it('handles string date format YYYY-MM-DD', () => {
      const status = getItemStatus('2026-04-10', 7);
      expect(status).toBe('fresh');
    });

    it('handles ISO string date format', () => {
      const status = getItemStatus('2026-04-10T00:00:00Z', 7);
      expect(status).toBe('fresh');
    });

    it('respects custom threshold', () => {
      const status = getItemStatus('2026-04-03', 3);
      expect(status).toBe('warning');
    });

    it('returns expired for date 1 day in past', () => {
      const status = getItemStatus('2026-03-30');
      expect(status).toBe('expired');
    });

    it('handles edge case: exactly at threshold', () => {
      const status = getItemStatus('2026-04-07', 7);
      expect(status).toBe('warning');
    });

    it('handles invalid date strings gracefully', () => {
      const status = getItemStatus('invalid-date');
      expect(status).toBe('fresh');
    });
  });

  describe('getStatusClassName', () => {
    it('returns correct class for fresh status', () => {
      const className = getStatusClassName('2026-04-15');
      expect(className).toBe('item-status-fresh');
    });

    it('returns correct class for warning status', () => {
      const className = getStatusClassName('2026-04-05');
      expect(className).toBe('item-status-warning');
    });

    it('returns correct class for expired status', () => {
      const className = getStatusClassName('2026-03-20');
      expect(className).toBe('item-status-expired');
    });
  });

  describe('formatExpiryDate', () => {
    it('formats date correctly', () => {
      const formatted = formatExpiryDate('2026-04-15');
      expect(formatted).toBe('15.04.2026');
    });

    it('returns empty string for undefined date', () => {
      const formatted = formatExpiryDate(undefined);
      expect(formatted).toBe('');
    });

    it('returns empty string for invalid date', () => {
      const formatted = formatExpiryDate('invalid-date');
      expect(formatted).toBe('');
    });

    it('formats Date object correctly', () => {
      const date = new Date('2026-04-15');
      const formatted = formatExpiryDate(date);
      expect(formatted).toBe('15.04.2026');
    });
  });

  describe('getStatusMessage', () => {
    it('returns message for fresh items', () => {
      const message = getStatusMessage('2026-04-15');
      expect(message).toContain('Tagen');
    });

    it('returns message for warning items', () => {
      const message = getStatusMessage('2026-04-05');
      expect(message).toContain('Verfällt in 5');
    });

    it('returns expired message for past dates', () => {
      const message = getStatusMessage('2026-03-20');
      expect(message).toContain('Abgelaufen');
    });

    it('returns correct message for today', () => {
      const message = getStatusMessage('2026-03-31');
      expect(message).toBe('Verfällt heute');
    });

    it('returns message for missing expiry date', () => {
      const message = getStatusMessage(undefined);
      expect(message).toBe('Kein Verfallsdatum');
    });
  });
});
