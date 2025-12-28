import { validateCVV } from './validcvv.js';
import { validateCardExpiry } from './validexp.js';
import { validateCardholder } from './validname.js';
import { validateCardNumber } from './validnumber.js';

const form = document.getElementById('form');

const error_name = document.querySelector('.error_name');
const error_number = document.querySelector('.error_number');
const error_date = document.querySelector('.error_date');
const error_cvv = document.querySelector('.error_cvv');

let data = {
    name: '',
    number: '',
    month: '',
    year: '',
    cvv: '',
};

form.addEventListener('focusout', (e) => {
    const field = e.target.name;
    const value = e.target.value;
    switch (field) {
        case 'name':
            const res_name = validateCardholder(value);
            showError(error_name, res_name.error);
            if (res_name.valid) {
                data.name = res_name.name;
            }
            break;
        case 'number':
            const res_num = validateCardNumber(value);
            showError(error_number, res_num.error);
            if (res_num.valid) {
                data.number = res_num.number;
            }
            break;
        case 'date':
            const res_date = validateCardExpiry(value);
            showError(error_date, res_date.error);
            if (res_date) {
                data.month = res_date.month;
                data.year = res_date.year;
            }
            break;
        case 'cvv':
            const res_cvv = validateCVV(value);
            showError(error_cvv, res_cvv.error);
            if (res_cvv) {
                data.cvv = res_cvv.cvv;
            }
            break;
        default:
            console.warn('Unknown field:', field);
            break;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isComplete = Object.values(data).every(Boolean);
    if (!isComplete) {
        console.error('No data available');
        return;
    }

    console.log(data);
});

function showError(element, err) {
    element.textContent = err ? `Error: ${err}` : '';
}
