// auth-service/src/database/mongoose.module.ts
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRoot(
  process.env.MONGO_URI || "",
);
