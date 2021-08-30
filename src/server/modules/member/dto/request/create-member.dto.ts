export class CreateMemberDto {
  name: string;
  email: string;
  level: number;
  oauth?: CreateOauthDto;
}

export class CreateOauthDto {
  oauthType: string;
  oauthEmail: string;
  oauthId: string;
  oauthPicture?: string;
  oauthToken?: string;
}
