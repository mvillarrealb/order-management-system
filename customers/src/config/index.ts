import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const server = config.get('server');
const db = config.get<TypeOrmModuleOptions>('db');
const result = Object.assign({}, db, {entities: [ __dirname + '/../**/*.entity{.ts,.js}' ]})


export const TypeOrmConfig: TypeOrmModuleOptions = result;

export const ServerConfig = server;