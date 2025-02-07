// import AppError from '@shared/errors/AppError'

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentRepository: FakeAppointmentRepository
let listProvidersDayAvailanility: ListProviderDayAvailabilityService

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()

    listProvidersDayAvailanility = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    )
  })

  it('Should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime()
    })

    const availability = await listProvidersDayAvailanility.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    )
  })
})
