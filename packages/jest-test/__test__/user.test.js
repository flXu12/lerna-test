import getUserData from '../src/user'
import axios from 'axios'

jest.mock('axios')

test('1、should fetch user', () => {
  const user = [
    { name: 'Marry', age: 24 },
    { name: 'Lucy', age: 30 },
  ]
  const response = { data: user }
  axios.get.mockResolvedValue(response)
  return getUserData().then((data) => expect(data).toEqual(user))
})
