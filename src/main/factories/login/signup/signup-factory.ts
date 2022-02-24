import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller'
import { DbAddAccountUseCase } from '../../../../data/usecases/add-account/db-add-account-usecase'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/account-mongo-repository'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const bbAddAccountUseCase = new DbAddAccountUseCase(bcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(bbAddAccountUseCase, validationComposite)
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
