import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('gifts')
class Gift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @Column()
  gift_1: string;

  @Column()
  gift_2: string;

  @Column()
  gift_3: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Gift;
