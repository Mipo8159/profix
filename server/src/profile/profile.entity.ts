import { Expose } from 'class-transformer';
import { UserEntity } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEnum } from './interface/gender.enum';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  image: string;

  @Expose() get imageUrl(): string {
    return `${process.env.API_URL}/api/${this.image}`;
  }

  @Column({ nullable: true, default: '' })
  mobile: string;

  @Column({ nullable: true, default: '' })
  address: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.UNSET })
  gender: GenderEnum;

  @Column({ nullable: true, default: null })
  age: number;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
