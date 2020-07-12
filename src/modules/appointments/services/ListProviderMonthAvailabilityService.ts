import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

// import User from '@modules/users/infra/typeorm/entities/User'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvilabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      }
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDaysArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = eachDaysArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })
      return {
        day,
        available:
          isAfter(compareDate, Date.now()) && appointmentsInDay.length < 10,
      }
    })

    return availability
  }
}

export default ListProviderMonthAvilabilityService
