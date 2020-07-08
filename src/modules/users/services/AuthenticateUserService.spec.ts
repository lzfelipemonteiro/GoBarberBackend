import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('Should be able to autenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    const response = await authenticateUser.execute({
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('Should not be able to autenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhondoe@exemple.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to autenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    await expect(
      authenticateUser.execute({
        email: 'jhondoe@exemple.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
