import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12456',
    })

    await expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@exemple.com',
        password: '12456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
