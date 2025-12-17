// auth-service/src/database/mongoose.module.ts
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRoot(
  process.env.MONGO_AUTH_URI || "mongodb://localhost:27017/auth_service",
);
