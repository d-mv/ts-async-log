/* eslint-disable no-console */
import eventsLib from 'events';

const events = new eventsLib.EventEmitter();

export function dir(data: unknown) {
  events.emit('log_dir', data);
}

export function info(...data: (string | number)[]) {
  events.emit('log_info', ...data);
}

export function warn(...data: (string | number)[]) {
  events.emit('log_warn', ...data);
}

export function write(message: string, eol = false) {
  events.emit('write', message, eol);
}

export function error(error: unknown, message?: string) {
  events.emit('log_error', error, message);
}

events.on('log', function logPrinter(...data: unknown[]) {
  console.log(...data);
});

events.on('log_info', function logInfoPrinter(...message: string[]) {
  console.log('[ info ]', message.join('. '));
});

events.on('log_warn', function logWarnPrinter(...message: string[]) {
  console.log('[ warn ]', message.join('. '));
});

events.on('log_dir', function logDirPrinter(data: unknown) {
  console.dir(data, { depth: 15 });
});

events.on('log_error', function logErrorPrint(error: unknown, message?: string) {
  write('', true);

  if (message) console.log('[ error ]', message || '');

  dir(error);
});

events.on('write', function logWritePrinter(message: string, eol = false) {
  process.stdout.write(`${message}${eol ? '\n' : ''}`);
});
