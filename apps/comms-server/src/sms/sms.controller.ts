import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sms') // Group in Swagger
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  @ApiOperation({ summary: 'sends a test SMS' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Hello Alok!' },
        to: { type: 'string', example: '+19452441606' },
      },
      required: ['message', 'to'],
    },
  })
  async testsms(@Body() body: { to: string; message: string }) {
    return this.smsService.testsms(body.to, body.message);
  }

  
}
