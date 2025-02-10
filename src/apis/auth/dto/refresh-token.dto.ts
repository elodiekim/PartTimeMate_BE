import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({
    description: 'The refresh token used to obtain a new access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmYTZjNTA0LWM5MTQtNDMzMS04ZmEyLTVlYzM4YjczNzY4YSIsImVtYWlsIjoia29vbkB0ZXN0LmNvbSIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzM5MTc1MjkzLCJleHAiOjE3Mzk3ODAwOTN9.E_ApvuMH4Ri1Fs1efJE4Dk8oBnpspqh6vlHy6rK6uOk',
  })
  refreshToken: string;
}
