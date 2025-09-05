import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// Грузинские названия типов событий — как у тебя на фронте
export type EventType = 'ქორწილი' | 'ნათლობა' | 'ბანკეტი' | 'გასვენების სუფრა';

@Index(['date', 'status'])
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  // DATE без времени (совпадает с тем, что ты отправляешь YYYY-MM-DD)
  @Column({ type: 'date', nullable: false })
  date: string; // хранится в БД как 'YYYY-MM-DD'

  @Column('int', { nullable: true })
  guests: number | null;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ type: 'varchar', length: 64 })
  packageSlug: string;

  @Column({ type: 'varchar', length: 32 })
  eventType: EventType;

  @Column({ default: 'pending' })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
