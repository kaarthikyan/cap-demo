// apps/api/src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async getUserByEmail(email: string) {
        return this.userModel.findOne({
            where: { email },
            attributes: { exclude: ['password'] },
        });
    }

    async getAllUsers() {
        return this.userModel.findAll({
            attributes: { exclude: ['password'] },
        });
    }

    async updateUserByEmail(email: string, updates: Partial<User>) {
        const [rowsUpdated] = await this.userModel.update(updates, {
            where: { email },
            individualHooks: true,
        });

        if (rowsUpdated === 0) return null;

        return this.userModel.findOne({
            where: { email },
            attributes: { exclude: ['password'] },
        });
    }

    async updateRole(userId: string, newRole: string) {
        await this.userModel.update({ role: newRole }, { where: { id: userId } });
    }


    async findById(userId: string) {
        return this.userModel.findByPk(userId, {
            attributes: { exclude: ['password'] },
        });
    }
}
