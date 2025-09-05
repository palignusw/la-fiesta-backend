import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { allowedPackageSlugs } from 'src/common/validators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  findAll() {
    return this.bookingsRepository.find({ order: { date: 'ASC' } });
  }

  async create(dto: CreateBookingDto) {
    if (dto.company && dto.company.length > 0) {
      return { ok: true, skipped: 'HONEYPOT' as const };
    }

    const whitelist = allowedPackageSlugs();
    if (whitelist.length > 0 && !whitelist.includes(dto.packageSlug)) {
      return { ok: false, error: 'INVALID_PACKAGE' as const };
    }

    // (опц.) запрет на прошедшие даты
    // if (!isFutureYmd(dto.date)) return { ok: false, error: 'PAST_DATE' as const }

    // конфликт: та же дата и статус не cancelled
    const sameDay = await this.bookingsRepository
      .createQueryBuilder('b')
      .where('b.date = :d', { d: dto.date })
      .andWhere('b.status <> :cancelled', { cancelled: 'cancelled' })
      .getOne();
    if (sameDay) return { ok: false, reason: 'occupied' as const };

    const saved = await this.bookingsRepository.save(
      this.bookingsRepository.create({
        name: dto.name,
        phone: dto.phone.replace(/\s|-/g, ''),
        date: dto.date, // ⬅️ ОБЯЗАТЕЛЬНО без ?? null
        guests: dto.guests ?? null,
        message: dto.message ?? null,
        packageSlug: dto.packageSlug,
        eventType: dto.eventType,
        status: 'pending',
        notes: null,
      }),
    );

    return { ok: true as const, id: saved.id };
  }

  async update(id: number, dto: UpdateBookingDto) {
    await this.bookingsRepository.update({ id }, dto);
    return this.bookingsRepository.findOneBy({ id });
  }
}
