import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { STATUS } from './common.model';
import { Location } from './location.model';
import { Logistics } from './logistics.model';

@Table({
  tableName: 'detail',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'modify_time',
})
export class Detail extends Model<Detail> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Logistics)
  @Column({
    type: DataType.INTEGER,
  })
  logistics_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  time: string;

  @Column({
    type: DataType.ENUM(...Object.values(STATUS)),
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location_id: string;
}
