import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getHours } from 'date-fns'

// import User from '@modules/users/infra/typeorm/entities/User'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvilabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    )
    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

    return availability
  }
}

export default ListProviderDayAvilabilityService
