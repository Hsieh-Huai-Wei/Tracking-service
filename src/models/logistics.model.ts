import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from './account.model';
import { Location } from './location.model';
import { STATUS } from './common.model';

@Table({
  tableName: 'logistics',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'modify_time',
})
export class Logistics extends Model<Logistics> {
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
  sno: string;

  @Column({
    type: DataType.ENUM(...Object.values(STATUS)),
    allowNull: false,
  })
  tracking_status: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  estimated_delivery: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recipient_id: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  current_location_id: string;
}
