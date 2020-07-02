import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRoutes = Router()
const appointmentsController = new AppointmentsController()

appointmentsRoutes.use(ensureAuthenticated)

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRoutes.post('/', appointmentsController.create)

export default appointmentsRoutes