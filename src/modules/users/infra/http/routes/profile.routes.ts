import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'

const profileRoutes = Router()
const profileController = new ProfileController()

profileRoutes.use(ensureAuthenticated)

profileRoutes.get('/', profileController.show)
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
)

export default profileRoutes
