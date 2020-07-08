import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
)
providersRoutes.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
)

export default providersRoutes
