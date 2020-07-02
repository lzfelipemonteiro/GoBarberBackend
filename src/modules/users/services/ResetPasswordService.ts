import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'

import AppError from '@shared/errors/AppError'

// import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRespository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequestDTO {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('UserToken does not exists')
    }

    const user = await this.usersRepository.findById(userToken?.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at

    // console.log(userToken)
    // console.log(tokenCreatedAt)
    // console.log(Date.now(new Date()))
    // console.log(differenceInHours(Date.now(), tokenCreatedAt))

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token Expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
