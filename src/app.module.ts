import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CustomerModule } from "./customer/customer.module";
import { OrderModule } from "./order/order.module";
import { error } from "console";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
      formatError: (error) => {
        return {
          message: error.message,
          extensions: {
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>("POSTGRES_HOST"),
        port: config.get<number>("POSTGRES_PORT"),
        username: config.get<string>("POSTGRES_USER"),
        password: config.get<string>("POSTGRES_PASSWORD"),
        database: config.get<string>("POSTGRES_DB"),
        entities: [__dirname + `dist/**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
    }),
    CustomerModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
