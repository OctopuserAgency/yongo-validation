import BaseValidator from './validators/base-validator';

export default class FieldOptions {
    private fieldName: string = 'Field';
    private validators: BaseValidator[] = [];

    getFieldName(): string {
        return this.fieldName;
    }

    setFieldName(name: string): void {
        this.fieldName = name;
    }

    addValidator(validator: BaseValidator): void {
        this.validators.push(validator);
    }

    getValidators(): BaseValidator[] {
        return this.validators;
    }

    validateValue(value: any, model: any): string[] {
        let errors: string[] = [],
            fieldName = this.fieldName,
            isEmpty = !value;

        for (let i = 0; i < this.validators.length; i++) {
            let validator = this.validators[i];

            if (!validator.validatesEmptyValue() && isEmpty) {
                continue;
            }

            if (!validator.isValid(value, model)) {
                let message = validator.hasCustomMessage
                    ? validator.getCustomMessage()
                    : validator.getMessage(fieldName, value);
                errors.push(message);
            }
        }

        return errors;
    }
}