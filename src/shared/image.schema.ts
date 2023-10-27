import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty({
    example: 'public/gadget/image.svg'
  })
  @Prop({ type: String, required: true })
  readonly src: string;

  @ApiProperty({
    example: 'image alt'
  })
  @Prop({ type: String, required: true })
  readonly alt: string;

  @ApiProperty({
    example: 80
  })
  @Prop({ type: Number, required: true })
  readonly width: number;

  @ApiProperty({
    example: 80
  })
  @Prop({ type: Number, required: true })
  readonly height: number;
}
