import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
export const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    // entities: [__dirname + '../**/*.entity{.ts,.js}'],
    entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],

    
    synchronize: true,
    logging: false,
    // timezone: 'Asia/Seoul', // 한국 시간 셋팅
    timezone: configService.get('DB_TIMEZONE'),
    autoLoadEntities: true,
    charset: 'utf8mb4_unicode_ci',
    extra: {
      connectionLimit: configService.get('DB_MAX'),
    },
  }),
  inject: [ConfigService],
};
