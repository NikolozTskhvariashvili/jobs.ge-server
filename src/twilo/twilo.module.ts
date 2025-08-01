import { Module } from '@nestjs/common';
import { TwilioService } from './twilo.service';

@Module({
  providers: [TwilioService],
  exports:[TwilioService]
})
export class TwiloModule {}
