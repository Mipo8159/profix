import { ProfileEntity } from 'src/profile/profile.entity';
import { ModelEntity } from 'src/shared/models/model.entity';
import { TokenEntity } from 'src/token/token.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { RolesEnum } from './interface/roles.enum';

@Entity('users')
export class UserEntity extends ModelEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @Column({ nullable: true, select: false })
  activationLink: string;

  @Column({ nullable: true, select: false })
  forgottenPasswordLink: string;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
}
