/**
 * Валидирует номер банковской карты
 * @param {string} value - введённый номер карты
 * @returns {{
 *   valid: boolean,
 *   number?: string,
 *   error?: string
 * }}
 */
export function validateCardNumber(value) {
    if (typeof value !== 'string') {
        return { valid: false, error: 'INVALID_TYPE' };
    }

    // 1. Нормализация: убираем пробелы и дефисы
    const normalized = value.replace(/[\s-]/g, '');

    // 2. Проверка на пустоту
    if (normalized.length === 0) {
        return { valid: false, error: 'EMPTY' };
    }

    // 3. Только цифры
    if (!/^\d+$/.test(normalized)) {
        return { valid: false, error: 'INVALID_CHARACTERS' };
    }

    // 4. Длина (общий диапазон ISO/IEC 7812)
    if (normalized.length < 13 || normalized.length > 19) {
        return { valid: false, error: 'INVALID_LENGTH' };
    }

    // 5. Проверка Luhn
    if (!luhnCheck(normalized)) {
        return { valid: false, error: 'LUHN_FAILED' };
    }

    return {
        valid: true,
        number: normalized,
    };
}

function luhnCheck(number) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = Number(number[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}
