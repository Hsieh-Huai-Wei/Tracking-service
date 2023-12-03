import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Logistics } from './logistics.model';

@Table({
  tableName: 'account',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'modify_time',
})
export class Account extends Model<Account> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @HasMany(() => Logistics, {
    foreignKey: 'recipient_id',
    sourceKey: 'id',
  })
  recipient_id: Logistics;
}
