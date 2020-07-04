import { Router } from 'express'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'

const profileRoutes = Router()
const profileController = new ProfileController()

profileRoutes.use(ensureAuthenticated)

profileRoutes.put('/', profileController.update)
profileRoutes.get('/', profileController.show)

export default profileRoutes
