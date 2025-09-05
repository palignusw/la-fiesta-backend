import { IsIn, IsOptional, IsString } from 'class-validator';
export class UpdateBookingDto {
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'cancelled';

  @IsOptional()
  @IsString()
  notes?: string | null;
}
