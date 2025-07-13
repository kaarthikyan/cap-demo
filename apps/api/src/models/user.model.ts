// apps/api/src/models/user.model.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
} from 'sequelize-typescript';

@Table({ tableName: 'users' }) // matches your table name
export class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare firstName: string;

    @Column(DataType.STRING)
    declare lastName: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare email: string;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare role: string;

    @Column(DataType.STRING)
    declare designation: string;

    @Column(DataType.STRING)
    declare image: string;

    @Column(DataType.STRING)
    declare state: string;

    @Column(DataType.STRING)
    declare country: string;

    @Column(DataType.STRING)
    declare postalcode: string;

    @Column(DataType.STRING)
    declare taxID: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.STRING)
    declare facebook: string;

    @Column(DataType.STRING)
    declare x: string;

    @Column(DataType.STRING)
    declare linkedin: string;

    @Column(DataType.STRING)
    declare insta: string;

    @Column(DataType.STRING)
    declare bio: string;
}
