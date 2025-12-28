/**
 * @param {string} value
 * @returns {{ valid: boolean, cvv?: string, error?: string }}
 */
export function validateCVV(value) {
    if (typeof value !== 'string') {
        return { valid: false, error: 'INVALID_TYPE' };
    }

    const cleaned = value.trim();

    if (cleaned.length === 0) {
        return { valid: false, error: 'EMPTY' };
    }

    if (!/^\d+$/.test(cleaned)) {
        return { valid: false, error: 'INVALID_CHARACTERS' };
    }

    if (cleaned.length !== 3) {
        return { valid: false, error: 'INVALID_LENGTH' };
    }

    return { valid: true, cvv: cleaned };
}
