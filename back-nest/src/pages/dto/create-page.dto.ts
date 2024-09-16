import { IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty({ message: 'hash обязательно' })
  hash: string;
  name?: string;
  // page_value?: string;
}
