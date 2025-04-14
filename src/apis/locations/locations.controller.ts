import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}
  // ─────────────────────────────────────────────────────────
  //  ✅ location 조회 API
  // ─────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'Get all location categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all location categories.',
  })
  async getLocationCategories() {
    return this.locationsService.getLocationCategories();
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ sub location 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('sub-location/:id')
  @ApiOperation({ summary: 'Get all sub location categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all sub location categories.',
  })
  async getLocationSubCategories(@Param('id') id: number) {
    return this.locationsService.getLocationSubCategories(id);
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ detail location 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('detail-location/:id')
  @ApiOperation({ summary: 'Get location detail' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved location detail.',
  })
  async getLocationDetail(@Param('id') id: number) {
    return this.locationsService.getLocationDetail(id);
  }
}
