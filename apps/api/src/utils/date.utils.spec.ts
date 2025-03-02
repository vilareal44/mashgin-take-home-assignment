import { parseExpirationDate } from './date.utils';

describe('Date Utils', () => {
  describe('parseExpirationDate', () => {
    it('should parse MM/YY format correctly', () => {
      const result = parseExpirationDate('06/23');

      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(1);
    });

    it('should handle single-digit month correctly', () => {
      const result = parseExpirationDate('3/24');

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(2);
    });

    it('should handle beginning of year correctly', () => {
      const result = parseExpirationDate('01/25');

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
    });

    it('should handle end of year correctly', () => {
      const result = parseExpirationDate('12/26');

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(11);
    });

    it('should convert year to 20xx format', () => {
      const result1 = parseExpirationDate('05/22');
      expect(result1.getFullYear()).toBe(2022);

      const result2 = parseExpirationDate('05/30');
      expect(result2.getFullYear()).toBe(2030);
    });

    it('should handle leading zeros', () => {
      const result = parseExpirationDate('05/05');

      expect(result.getFullYear()).toBe(2005);
      expect(result.getMonth()).toBe(4); // zero-base
    });

    it('should return day 1 of the month', () => {
      const result = parseExpirationDate('07/28');
      expect(result.getDate()).toBe(1);
    });

    it('should throw error for null or undefined input', () => {
      const expectedError = 'Expiration date must be a non-empty string';

      expect(() => parseExpirationDate(null as any)).toThrow(expectedError);
      expect(() => parseExpirationDate(undefined as any)).toThrow(expectedError);
      expect(() => parseExpirationDate('')).toThrow(expectedError);
    });

    it('should throw error for invalid format', () => {
      const expectedError = 'Expiration date must be in MM/YY format';

      expect(() => parseExpirationDate('invalid')).toThrow(expectedError);
      expect(() => parseExpirationDate('12-22')).toThrow(expectedError);
      expect(() => parseExpirationDate('12/22/23')).toThrow(expectedError);
    });

    it('should throw error for non-numeric values', () => {
      const expectedError = 'Month and year must be valid numbers';

      expect(() => parseExpirationDate('xx/xx')).toThrow(expectedError);
      expect(() => parseExpirationDate('12/xx')).toThrow(expectedError);
      expect(() => parseExpirationDate('xx/22')).toThrow(expectedError);
    });

    it('should throw error for invalid month numbers', () => {
      const expectedError = 'Month must be between 1 and 12';

      expect(() => parseExpirationDate('0/22')).toThrow(expectedError);
      expect(() => parseExpirationDate('13/22')).toThrow(expectedError);
      expect(() => parseExpirationDate('99/22')).toThrow(expectedError);
    });
  });
}); 