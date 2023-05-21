import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { uuid } from '../uuid.type';

export class WinnersParams {
    @ApiProperty({ type: String })
    @IsUUID()
    winnerId: uuid;
}
