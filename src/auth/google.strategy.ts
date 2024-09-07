import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback} from 'passport-google-oauth20';
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly authService: AuthService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        console.log(JSON.stringify(profile, null, 2));
        try{
            const email = profile?.emails?.[0]?.value || null;
            const lastName = profile?.name?.familyName || 'NoLastName';
            const picture = profile?.photos?.[0]?.value || null;
            const givenName = profile.name.givenName;

            const user = {
                username: email.split('@')[0],
                givename: givenName,
                email: email,
                lastName: lastName,
                picture: picture,
                accessToken,
            };
            const userFromDb = await this.authService.validateUserByGoogle(user);
            done(null, userFromDb);
        }
        catch(error){
            done(error, false);
        }
    }
}