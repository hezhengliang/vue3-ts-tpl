
import faker from 'faker'
import dayjs from 'dayjs'
faker.locale = "zh_CN";
const userList = []

for (let i = 0; i < 30; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    createTime: dayjs(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss"),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor']
  })
}

export default userList