import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'

const providersRoutes = Router()
const providersController = new ProvidersController()

providersRoutes.use(ensureAuthenticated)

providersRoutes.get('/', providersController.index)

export default providersRoutes
