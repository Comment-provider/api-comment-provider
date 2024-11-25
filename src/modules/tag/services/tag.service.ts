import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateManyOptions,
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions, IDatabaseRawOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { ITagService } from 'src/modules/tag/interfaces/tag.service.interface';
import { TagRepository } from 'src/modules/tag/repository/repositories/tag.repository';
import { TagDoc, TagEntity } from 'src/modules/tag/repository/entities/tag.entity';
import { TagCreateDto } from 'src/modules/tag/dtos/tag.create.dto';
import { TagUpdateDto } from 'src/modules/tag/dtos/tag.update.dto';
import { ITagDoc, ITagEntity } from 'src/modules/tag/interfaces/tag.interface';
import { TagImportDto } from 'src/modules/tag/dtos/tag.import.dto';

@Injectable()
export class TagService implements ITagService {
    constructor(private readonly tagRepository: TagRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ITagEntity[]> {
        return this.tagRepository.findAll<ITagEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.tagRepository.findOneById<T>(_id, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.tagRepository.findOne<T>(find, options);
    }

    async findOneByName<T>(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        return this.tagRepository.findOne<T>({ name }, options);
    }

    async create(
        { name, description, owner }: TagCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<TagDoc> {
        const create: TagEntity = new TagEntity();
        create.name = name;
        create.description = description;
        create.owner = owner;

        return this.tagRepository.create<TagEntity>(create, options);
    }

    async delete(
        repository: TagDoc,
        options?: IDatabaseSaveOptions
    ): Promise<TagDoc> {
        return this.tagRepository.softDelete(repository, options);
    }

    async update(
        repository: TagDoc,
        { name, description }: TagUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<TagDoc> {
        repository.name = name;
        repository.description = description;

        return this.tagRepository.save(repository, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.tagRepository.getTotal(find, { ...options, join: true });
    }

    async joinWithOwner(repository: TagDoc): Promise<ITagDoc> {
        return repository.populate({
            path: 'owner',
            localField: 'user',
            foreignField: '_id',
            model: UserEntity.name,
        });
    }

    async belongListById<T>(arr: T[], options?: IDatabaseRawOptions): Promise<T[]> {
        return this.tagRepository.raw([
            {
                $match: {
                    $or: arr
                }
            }, {
                $project: {
                    _id: 1,
                    owner: 1
                }
            }
        ], options)
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.tagRepository.deleteMany(find, options);
    }

    async import(
        data: TagImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean> {
        const tags: TagEntity[] = data.map(({ name, description, owner }) => {
            const create: TagEntity = new TagEntity();
            create.name = name;
            create.description = description;
            create.owner = owner;

            return create;
        });

        return this.tagRepository.createMany<TagEntity>(tags, options);
    }
}
