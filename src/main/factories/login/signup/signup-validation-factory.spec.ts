import { CompareFieldsValidation } from '../../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite'
import { EmailValidator } from '../../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation-factory'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

const makeEmailValidatorStub = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Deveria chamar o ValidationComposite com todos os Validations', async () => {
    makeSignUpValidation()
    const validations: Array<Validation> = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidatorStub()))
    expect(ValidationComposite).toBeCalledWith(validations)
  })
})
