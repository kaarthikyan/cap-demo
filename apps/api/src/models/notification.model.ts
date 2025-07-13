import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: true })
export class Notification extends Model<Notification> {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string | number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare requestedBy: string;

    @Column(DataType.STRING)
    declare image: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare message: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare request: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare read: boolean;
}
