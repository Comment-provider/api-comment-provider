import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';
import { Type } from 'class-transformer';

export class CommentGetSerialization extends ResponseIdSerialization {
    @ApiProperty({
        required: true,
        nullable: false,
        type: () => UserProfileSerialization,
    })
    @Type(() => UserProfileSerialization)
    readonly owner: UserProfileSerialization;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.string.alphanumeric(50),
    })
    readonly name: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.string.alphanumeric(300),
    })
    readonly value: string;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly updatedAt: Date;
}
