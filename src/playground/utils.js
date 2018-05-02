// exports - default export, named export

export const add = x => x + x; // named export

const square = x => x * x;

const subtract = (x, y) => x - y;

// export default (x, y) => x - y; // default export

// named export & default export - can only have one default
// default export can be rename when importing
export { square, subtract as default };

// import subtract, { square, add } from './utils'; // when importing default export it should be import first before named exports