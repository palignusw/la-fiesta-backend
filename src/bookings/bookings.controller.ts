import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BasicAuthGuard } from '../common/basic-auth.guard';

@Controller()
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // публичный POST — твой фронт шлёт JSON с ровно такими полями
  @Post('bookings')
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }

  // админ — список
  @UseGuards(BasicAuthGuard)
  @Get('admin/bookings')
  findAll() {
    return this.service.findAll();
  }

  // админ — обновление статуса/заметок
  @UseGuards(BasicAuthGuard)
  @Patch('admin/bookings/:id')
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.service.update(Number(id), dto);
  }
}
