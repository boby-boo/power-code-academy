import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

const form = () => {
    const $form = document.querySelector('#form');
    const $inputs = $form.querySelectorAll('[data-input]');
    const errorMessages = {
        require: 'Это поле обязательно для заполнения',
        to_short: 'Минимум два символа',
        to_short_number: 'Минимум 10 символов',
        only_word: 'Только буквы',
        only_numbers: 'Только цифры',
        incorrect_mail: 'Не корректная почта',
    };

    const input = document.querySelector('#phone');
    intlTelInput(input);

    const validatedForm = {
        isValidEmail: null,
        isValidText: null,
        isValidPhone: null,
    };

    const validationSchema = input => {
        const addErrorClass = (elem, msg = errorMessages.require) => {
            const msgContainer =
                elem.type === 'tel'
                    ? findElement(elem)
                    : elem.nextElementSibling;

            elem.classList.remove('field-success');
            elem.classList.add('field-error');

            msgContainer.classList.add('error-input');
            msgContainer.textContent = msg;
        };

        const removeErrorClass = elem => {
            elem.classList.remove('field-error');
            elem.classList.add('field-success');

            const msgContainer =
                elem.type === 'tel'
                    ? findElement(elem)
                    : elem.nextElementSibling;
            msgContainer.classList.remove('error-input');
        };

        const findElement = elem => {
            return elem.parentElement.closest('.input-field').lastElementChild;
        };

        switch (input.type) {
            case 'text':
                validatedForm.isValidText = false;
                if (input.value === '') {
                    addErrorClass(input, errorMessages.require);
                    return;
                }

                if (!input.value.match(/^[a-zA-Zа-яА-ЯёЁ\u10A0-\u10FF\s-]+$/)) {
                    addErrorClass(input, errorMessages.only_word);
                    return;
                }

                if (input.value.length <= 1) {
                    addErrorClass(input, errorMessages.to_short);
                    return;
                }

                validatedForm.isValidText = true;
                removeErrorClass(input);
                break;
            case 'email':
                validatedForm.isValidEmail = false;
                if (input.value === '') {
                    addErrorClass(input, errorMessages.require);
                    return;
                }

                if (
                    !input.value.match(
                        /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,3}$/i,
                    )
                ) {
                    addErrorClass(input, errorMessages.incorrect_mail);
                    return;
                }

                validatedForm.isValidEmail = true;
                removeErrorClass(input);
                break;
            case 'tel':
                validatedForm.isValidPhone = false;

                if (input.value === '') {
                    addErrorClass(input, errorMessages.require);
                    return;
                }

                if (!input.value.match(/^[+-]?[0-9]+$/)) {
                    addErrorClass(input, errorMessages.only_numbers);
                    return;
                }

                if (input.value.length <= 9) {
                    addErrorClass(input, errorMessages.to_short_number);
                    return;
                }

                validatedForm.isValidPhone = true;
                removeErrorClass(input);
                break;
            default:
                () => {};
        }
    };

    $form.addEventListener('submit', e => {
        const { isValidEmail, isValidText, isValidPhone } = validatedForm;
        e.preventDefault();

        $inputs.forEach(input => validationSchema(input));

        if (isValidEmail && isValidText && isValidPhone) {
            $form.submit();
            $form.reset();
        }
    });

    $inputs.forEach(input => {
        input.addEventListener('input', e => {
            validationSchema(e.target);
        });
    });
};

// input.intlTelInput = intlTelInput(input, {
//     preferredCountries: ['UA', 'US'],
//     // utilsScript: 'node_modules/intl-tel-input/build/js/utils.js',
// });

export default form;
