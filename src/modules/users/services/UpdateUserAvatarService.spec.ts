import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let uploadAvatar: UpdateUserAvatarService

describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    uploadAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })

  it('Should be able to upload a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('Shold not be able to update avatar from non existing user', async () => {
    await expect(
      uploadAvatar.execute({
        user_id: 'no-existin-user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Shold delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    })

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await uploadAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-avatar.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe('new-avatar.jpg')
  })
})
