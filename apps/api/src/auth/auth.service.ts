// apps/api/src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model'; // adjust path as per your structure
import { SignupDto } from './dto/signup.dto';
import { CreationAttributes } from 'sequelize';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RabbitMQProducerService } from '../rabbitmq/rabbitmq-producer.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        @InjectModel(User) private userModel: typeof User,
        private readonly rabbitMQProducer: RabbitMQProducerService
    ) {}

    async signIn({ email, password }: SignInDto): Promise<string> {
        const user = await this.userModel.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            this.logger.error('Invalid credentials', { email });
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                userId: user.id,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return token;
    }

    async signUp(dto: SignupDto): Promise<string> {
        const { firstName, lastName, email, password } = dto;

        if (!firstName || !lastName || !email || !password) {
            throw new Error('All fields are required');
        }

        const userExists = await this.userModel.findOne({ where: { email } });
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userModel.create({
            id: crypto.randomUUID(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user',
            designation: 'Team Manager',
            image: '/images/user/user-03.jpg',
            state: 'Arizona',
            country: 'United States',
            postalcode: 'ERT 2489',
            taxID: 'AS4568384',
            phone: '+09 36339846',
            facebook: 'https://www.facebook.com/PimjoHQ',
            x: 'https://x.com/PimjoHQ',
            linkedin: 'https://www.linkedin.com/company/hridhyatech',
            insta: 'https://instagram.com/PimjoHQ',
            bio: 'Team Manager',
        } as CreationAttributes<User>);

        await this.rabbitMQProducer.sendMessage({
            event: 'user_created',
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
            },
        });


        // this.logger.info('User created successfully', { email });
        return 'User created successfully';
    }
}
