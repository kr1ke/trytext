import { IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty({ message: 'hash обязательно' })
  hash: string;
  // page_value?: string;
}
