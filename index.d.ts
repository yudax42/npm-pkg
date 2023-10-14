declare module 'package-boilerplate/scripts/build' {
  export {};

}
declare module 'package-boilerplate/src/index' {
  export function hello(name: string): string;

}
declare module 'package-boilerplate' {
  import main = require('package-boilerplate/src/index');
  export = main;
}