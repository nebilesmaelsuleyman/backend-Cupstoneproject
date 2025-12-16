export interface AuthGrpcService {
  GetUserByClerkId(data: { clerkUserId: string }): any;
}
