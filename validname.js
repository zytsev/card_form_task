/**
 * Валидирует имя держателя банковской карты (cardholder)
 * @param {string} value - введённое имя
 * @returns {{ valid: boolean, name?: string, error?: string }}
 */
export function validateCardholder(value) {
    if (typeof value !== 'string') {
        return { valid: false, error: 'INVALID_TYPE' };
    }

    // 1. Нормализация
    let normalized = value.trim().replace(/\s+/g, ' ').toUpperCase();

    // Удаляем невидимые Unicode-символы
    normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');

    // 2. Проверка на пустоту
    if (normalized.length === 0) {
        return { valid: false, error: 'EMPTY' };
    }

    // 3. Длина
    if (normalized.length < 2) {
        return { valid: false, error: 'TOO_SHORT' };
    }

    if (normalized.length > 26) {
        return { valid: false, error: 'TOO_LONG' };
    }

    // 4. Допустимые символы
    // Латиница, пробел, дефис, апостроф, точка
    const allowedPattern = /^[A-Z][A-Z\s\-'.]*[A-Z.]$/;

    if (!allowedPattern.test(normalized)) {
        return { valid: false, error: 'INVALID_CHARACTERS' };
    }

    // 5. Дополнительная защита от мусора
    if (/[-'.]{2,}/.test(normalized)) {
        return { valid: false, error: 'INVALID_PUNCTUATION' };
    }

    return {
        valid: true,
        name: normalized,
    };
}
