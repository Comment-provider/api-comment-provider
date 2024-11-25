import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { TagDoc } from 'src/modules/tag/repository/entities/tag.entity';
import { TagService } from 'src/modules/tag/services/tag.service';

@Injectable()
export class TagPutToRequestGuard implements CanActivate {
    constructor(private readonly tagService: TagService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __tag: TagDoc }>();
        const { params } = request;
        const { tag } = params;

        const check: TagDoc = await this.tagService.findOneById(tag, {
            join: true,
        });
        request.__tag = check;

        return true;
    }
}
