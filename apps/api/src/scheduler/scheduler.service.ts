import { Injectable, Inject } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class SchedulerService {
  private readonly enabled = process.env.ENABLE_SCHEDULER === 'true';

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  @Interval(parseInt(process.env.SCHEDULER_INTERVAL || '60000', 10))
  async handleInterval() {
    if (!this.enabled) return;
    const userCount = await this.userModel.count();
    this.logger.log(`User count: ${userCount}`);
  }
}