import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileType } from './types/file.enum';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  createFile(type: FileType, file: Express.Multer.File) {
    // check picture
    if (
      type === 'image' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/svg + xml'
    ) {
      throw new HttpException(
        'Only PNG JPG and SVG formats are supported',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // check audio
    if (type === 'audio' && file.mimetype !== 'audio/mpeg') {
      throw new HttpException(
        'Only mp3 files are permitted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const extension = path.extname(file.originalname);
      const name = ((Math.random() * Math.pow(36, 6)) | 0).toString(16);
      const fileName = name + extension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      // if no directory -> create one
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      // save file.buffer to destination
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  removeFile(fileName: string) {
    const removePath = path.resolve(__dirname, '..', 'static', fileName);
    fs.unlinkSync(removePath);
  }
}
