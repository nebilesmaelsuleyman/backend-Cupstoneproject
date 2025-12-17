import { Controller, Post, Req, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('webhook/clerk')
export class ClerkWebhookController {
  private readonly logger = new Logger('ClerkWebhook');

  constructor(private readonly userService: UserService) {}

  @Post()
  async handle(@Req() req: any) {
    this.logger.log('🔥 WEBHOOK RECEIVED');

    try {
      const payload = req.body;

      // Make sure the payload is for a user
      if (!payload.data) {
        this.logger.warn('⚠️ No user data in webhook');
        return { received: false, message: 'No user data' };
      }

      const userData = payload.data;

      // Parse the email from the first verified email
      const emailObj = userData.email_addresses?.[0];
      const email = emailObj?.email_address || 'no-email@example.com';

      // Create user in DB
      const user = await this.userService.createUser({
        clerkUserId: userData.id,
        email: email,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        role: 'STUDENT', // default role
        status: 'ACTIVE', // optional
      });

      this.logger.log('✅ USER SAVED:', JSON.stringify(user));

      return { received: true };
    } catch (error) {
      this.logger.error('❌ Error processing webhook', error.message);
      return { received: false, error: error.message };
    }
  }
}
