import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'userdb',
  entities: [User],
  synchronize: false,
});

async function seedDatabase() {
  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);

  const users = [];
  for (let i = 0; i < 1000000; i++) {
    users.push({
      firstName: `First${i}`,
      lastName: `Last${i}`,
      age: Math.floor(Math.random() * 80) + 10,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      hasProblems: Math.random() > 0.7,
    });
  }

  console.log('Seeding users...');
  await userRepository.insert(users);
  console.log('Done!');
  process.exit();
}

seedDatabase();
