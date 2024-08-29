import { ExecutionContext, CanActivate, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Http2ServerRequest } from "http2";

@Injectable()
export class AuthGuarde implements CanActivate{
    constructor(private jawtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token){
            throw new UnauthorizedException();
        }
        try{
            const jwtSecKey: string = "JWT SUPER SECRET";
            const payload = await this.jawtService.verify(
                token,
                {
                    secret: jwtSecKey,
                }
            );
            request['user'] = payload;
        }
        catch{
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Http2ServerRequest): string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}