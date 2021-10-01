import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from 'src/auth/user.entity';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/settings/user.decorator';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // UPDATE PROFILE
  @Put('update')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @User() user: UserEntity,
    @UploadedFile() image: Express.Multer.File,
    @Body() profileDto: ProfileDto,
  ): Promise<ProfileEntity> {
    return await this.profileService.updateProfile(user, profileDto, image);
  }
}
