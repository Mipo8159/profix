import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { FileType } from 'src/file/types/file.enum';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly fileService: FileService,
  ) {}

  async createProfile(profileDto: ProfileDto): Promise<ProfileEntity> {
    const profile = new ProfileEntity();
    Object.assign(profile, profileDto);

    return await this.profileRepository.save(profile);
  }

  async updateProfile(
    user: UserEntity,
    profileDto: ProfileDto,
    image: Express.Multer.File,
  ): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne({ user });

    if (image) {
      if (profile.image !== '') {
        this.fileService.removeFile(profile.image);
      }
      const imagePath = this.fileService.createFile(FileType.IMAGE, image);
      profile.image = imagePath;
      await this.profileRepository.save(profile);
    }

    Object.assign(profile, { ...profileDto });
    return await this.profileRepository.save(profile);
  }
}
