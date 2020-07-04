import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let uploadProfile: UpdateProfileService

describe('UploadProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    uploadProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('Should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    const updatedUser = await uploadProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@exmple.com',
    })

    expect(updatedUser.name).toBe('Jhon Trê')
    expect(updatedUser.email).toBe('jhontre@exmple.com')
  })

  it('Should not be able update the profile from non-existing user', async () => {
    await expect(
      uploadProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Teste',
        email: 'test@exemple.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'test@exemple.com',
      password: '123456',
    })

    await expect(
      uploadProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhondoe@exemple.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to upload the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    const updatedUser = await uploadProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@exmple.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('Should nto be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    await expect(
      uploadProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@exmple.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should nto be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    await expect(
      uploadProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@exmple.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
