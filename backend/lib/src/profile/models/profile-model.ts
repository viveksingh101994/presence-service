export interface Profile {
  email: string;
  displayName: string;
  lastLogin: Date;
  avatarUrl: string | null;
  userId: number;
  password: string | null;
  isActive: boolean;
}
