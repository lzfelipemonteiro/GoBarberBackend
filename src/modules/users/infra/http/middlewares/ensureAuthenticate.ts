import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authoConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAutenticate(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decode = verify(token, authoConfig.jwt.secret)

    const { sub } = decode as ITokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('JWT invalid token', 401)
  }
}
