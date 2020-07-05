import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

const providersRoutes = Router()

const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRoutes.use(ensureAuthenticated)

providersRoutes.get('/', providersController.index)
providersRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)
providersRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
)

export default providersRoutes
