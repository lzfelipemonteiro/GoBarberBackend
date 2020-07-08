import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

// import AppError from '@shared/errors/AppError'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRespository'

interface IRequestDTO {
  user_id: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      })

      // console.log('A query do banco foi feita.')

      await this.cacheProvider.save(`providers-list:${user_id}`, users)
    }

    users.forEach(user => delete user.password)

    return users
  }
}

export default ListProviderService
