import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Danielacho123',
  database: 'task management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
}
