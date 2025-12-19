import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import mongoConfig from './mongo.config'
import { Connection } from 'mongoose'

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(mongoConfig),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('mongo.uri')

        console.log('🔗 MongoDB URI:', uri)

        return {
          uri,
          connectionFactory: (connection: Connection) => {
            connection.on('connected', () => {
              console.log('🟢 MongoDB connected successfully')
            })

            connection.on('error', (err) => {
              console.error('🔴 MongoDB connection error:', err)
            })

            connection.on('disconnected', () => {
              console.warn('🟠 MongoDB disconnected')
            })

            return connection
          },
        }
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
