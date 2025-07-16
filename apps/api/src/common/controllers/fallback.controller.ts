import { Controller, Request, All, NotFoundException } from '@nestjs/common';

@Controller()
export class FallbackController {
  @All('*')
  all(@Request() req) {
    throw new NotFoundException(`Route ${req.url} not found`);
  }
}