import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // TODO: Add Google Cloud Logging logic here
    super.error(message, stack, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  log(message: any, context?: string) {
    super.log(message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
}
