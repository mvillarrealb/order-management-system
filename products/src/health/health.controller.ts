import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, DNSHealthIndicator } from '@nestjs/terminus';
import { elasticSearch } from '../config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('elastic-search', elasticSearch.url),
    ]);
  }
}
