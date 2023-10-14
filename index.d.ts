declare module 'package-boilerplate/build' {
  export {};

}
declare module 'package-boilerplate/src/index' {
  export function hello(name: string): string;

}
declare module 'package-boilerplate' {
  import main = require('package-boilerplate/src/index');
  export = main;
}