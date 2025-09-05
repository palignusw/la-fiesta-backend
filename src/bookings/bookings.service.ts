import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsRepository } from './bookings.repository';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookingsRepository.create(createBookingDto);
  }

  findAll() {
    return this.bookingsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingsRepository.update(id, updateBookingDto);
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
