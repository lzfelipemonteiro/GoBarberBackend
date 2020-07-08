import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderAppointments: ListProviderAppointmentsService
let fakeCacheProvider: FakeCacheProvider

describe('listProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider
    )
  })

  it('Should be able to list the the appointments on a specific day from specific provider', async () => {
    const apppontment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    const apppontment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    })

    expect(appointments).toEqual([apppontment1, apppontment2])
  })
})
