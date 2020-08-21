import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Group from './Group';

@Entity('invites')
class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_group: string;

  @OneToOne(() => Group)
  group: Group;

  @Column()
  invite_key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Invite;
