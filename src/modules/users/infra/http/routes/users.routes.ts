import { Router } from 'express'
import multer from 'multer'
import { celebrate, Segments, Joi, CelebrateError } from 'celebrate'

import uploadConfig from '@config/upload'

import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'

const usersRoutes = Router()
const upload = multer(uploadConfig.multer)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRoutes
