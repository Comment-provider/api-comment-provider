import { ICommentDoc, ICommentEntity } from './comment.interface';
import {
    IDatabaseCreateManyOptions,
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { CommentCreateDto } from 'src/modules/comment/dtos/comment.create.dto';
import { CommentDoc } from 'src/modules/comment/repository/entities/comment.entity';
import { CommentUpdateDto } from 'src/modules/comment/dtos/comment.update.dto';
import { CommentImportDto } from 'src/modules/comment/dtos/comment.import.dto';

export interface ICommentService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<ICommentEntity[]>;
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T>;
    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    findOneByName<T>(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    create(
        { name, value, owner, tags }: CommentCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CommentDoc>;
    delete(
        repository: CommentDoc,
        options?: IDatabaseSaveOptions
    ): Promise<CommentDoc>;
    update(
        repository: CommentDoc,
        { name, value }: CommentUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<CommentDoc>;
    joinWithData(repository: CommentDoc): Promise<ICommentDoc>;
    import(
        data: CommentImportDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
