/**
 * @param {string} value  MM/YY MM/YYYY
 * @returns {{ valid: boolean, month?: number, year?: number, error?: string }}
 */
export function validateCardExpiry(value) {
    if (typeof value !== 'string') {
        return { valid: false, error: 'INVALID_TYPE' };
    }

    const cleaned = value.trim().replace(/\s/g, '');

    // Проверка формата MM/YY или MM/YYYY
    const match = cleaned.match(/^(\d{1,2})\/(\d{2}|\d{4})$/);
    if (!match) {
        return { valid: false, error: 'INVALID_FORMAT' };
    }

    let month = parseInt(match[1], 10);
    let year = parseInt(match[2], 10);

    // Проверка диапазона месяца
    if (month < 1 || month > 12) {
        return { valid: false, error: 'INVALID_MONTH' };
    }

    // Преобразуем двухзначный год в 4-значный (2000+YY)
    if (year < 100) {
        year += 2000;
    }

    // Последний день месяца карты
    const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);
    const now = new Date();

    if (expiryDate < now) {
        return { valid: false, error: 'EXPIRED' };
    }

    return { valid: true, month, year };
}
