import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

// import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRespository'

interface IRequestDTO {
  user_id: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    })

    users.forEach(user => delete user.password)

    return users
  }
}

export default ListProviderService
