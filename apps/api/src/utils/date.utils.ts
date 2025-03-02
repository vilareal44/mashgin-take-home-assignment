/**
 * Parses the expiration date from MM/YY format to a Date object
 * @param {string} expirationDate - The expiration date in MM/YY format
 * @returns {Date} The parsed expiration date
 * @throws {Error} If the format is invalid
 */
export function parseExpirationDate(expirationDate: string): Date {
  if (!expirationDate || typeof expirationDate !== 'string') {
    throw new Error('Expiration date must be a non-empty string');
  }

  const parts = expirationDate.split('/');
  if (parts.length !== 2) {
    throw new Error('Expiration date must be in MM/YY format');
  }

  const [month, shortYear] = parts;

  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(shortYear, 10);

  if (isNaN(monthNum) || isNaN(yearNum)) {
    throw new Error('Month and year must be valid numbers');
  }

  if (monthNum < 1 || monthNum > 12) {
    throw new Error('Month must be between 1 and 12');
  }

  const year = 2000 + yearNum;
  return new Date(year, monthNum - 1, 1);
} 