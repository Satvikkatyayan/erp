import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class BuiltInHelpers implements OnModuleInit {
  onModuleInit() {
    Handlebars.registerHelper('upper', (str) => str?.toUpperCase() || '');
    Handlebars.registerHelper('currency', (num) => '$' + Number(num).toFixed(2));
    Handlebars.registerHelper('eq', (a, b) => a === b);
  }
}