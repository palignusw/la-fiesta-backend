import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { GE_PHONE_RE } from '../../common/validators';

const EVENT_TYPES = [
  'ქორწილი',
  'ნათლობა',
  'ბანკეტი',
  'გასვენების სუფრა',
] as const;
type EventType = (typeof EVENT_TYPES)[number];

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  // на фронте у тебя лояльная проверка, но бэк — минимально строгий
  @IsString()
  @Matches(GE_PHONE_RE, { message: 'invalid_ge_phone' })
  phone!: string;

  // YYYY-MM-DD (optional, но если есть — должно быть сегодня/будущее)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date_format_yyyy_mm_dd' })
  date!: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  @Min(1)
  @Max(1200)
  guests?: number;

  @IsOptional()
  @IsString()
  message?: string;

  // honeypot — не сохраняем, просто отбрасываем
  @IsOptional()
  @IsString()
  company?: string;

  @IsString()
  packageSlug!: string;

  @IsIn(EVENT_TYPES as unknown as string[])
  eventType!: EventType;
}
