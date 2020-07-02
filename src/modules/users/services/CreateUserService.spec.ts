import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@exemple.com',
        password: '12456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
