import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Logistics } from './logistics.model';
import { Detail } from './detail.model';

@Table({
  tableName: 'location',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'modify_time',
})
export class Location extends Model<Location> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @HasMany(() => Logistics, {
    foreignKey: 'current_location_id',
    sourceKey: 'id',
  })
  logistics_id: Logistics;

  @HasMany(() => Detail, {
    foreignKey: 'location_id',
    sourceKey: 'id',
  })
  detail_location_id: Detail;
}
