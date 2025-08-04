import { Module, Global } from '@nestjs/common';
import cloudinary from './cloudinary.config';

@Global()
@Module({
  providers: [{ provide: 'CLOUDINARY', useValue: cloudinary }],
  exports: ['CLOUDINARY'],
})
export class CloudinaryModule {}
