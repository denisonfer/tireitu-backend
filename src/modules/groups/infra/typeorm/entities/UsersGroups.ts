import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Group from './Group';

@Entity('users_groups')
class UsersGroups {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.users_groups)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Group, group => group.users_groups)
  @JoinColumn({ name: 'id_group' })
  group: Group;

  @Column()
  id_user: string;

  @Column()
  id_group: string;

  @Column('boolean')
  admin: boolean;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_user' })
  user_raffled: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UsersGroups;
