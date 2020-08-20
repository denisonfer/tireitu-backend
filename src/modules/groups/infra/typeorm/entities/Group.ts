import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('groups')
class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_admin: string;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  date_raffle: Date;

  @Column('timestamp with time zone')
  date_party: Date;

  @Column('timestamp with time zone')
  hour_party: Date;

  @Column()
  locale_party: string;

  @Column('decimal')
  value_min: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Group;
