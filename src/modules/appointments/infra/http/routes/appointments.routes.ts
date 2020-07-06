import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'

const appointmentsRoutes = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRoutes.use(ensureAuthenticated)

appointmentsRoutes.post('/', appointmentsController.create)
appointmentsRoutes.get('/me', providerAppointmentsController.index)

export default appointmentsRoutes
