import ValidationManager from '../validation-manager';
import MinLengthValidator from '../validators/min-length';

/**
 * Validates the field's minimum length.
 * @param minLength The field's minimum length. Must be a positive integer greater than 0
 * @param message [Optional] Overrides the default validation error message.
 * @returns {function(Object, string): void} A field validation decorator.
 */
export default function MinLength(minLength: number, message?: string): PropertyDecorator {
    return function (targetClass: Object, property: string): void {
        let manager = ValidationManager.get(targetClass);
        manager.addValidator(property, new MinLengthValidator(minLength, message));
    };
}