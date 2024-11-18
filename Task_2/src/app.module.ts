import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Change if using a remote server
      port: 5432, // Default port
      username: 'postgres', // Update to your username
      password: 'Bassel12', // Update to your password
      database: 'test2', // Ensure the database exists
      autoLoadEntities: true,
      synchronize: true, // Disable in production!
    }),
    UserModule,
  ],
})
export class AppModule {}
