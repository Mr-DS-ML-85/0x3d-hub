# ES6

> A quick reference cheatsheet of what's new in JavaScript for ES2015, ES2016, ES2017, ES2018 and beyond

Category: Programming

## Getting Started

### Block-scoped

#### Let

```js{2,4}
function fn () {
  let x = 0
  if (true) {
    let x = 1 // only inside this `if`
  }
}

```

#### Const

```js
const a = 1;

```

letis the newvar. Constants (const) work just likelet, but cannot be reassigned. See:Let and const

### Template Strings

#### Interpolation

```js
const message = `Hello ${name}`;

```

#### Multi-line string

```js
const str = `
hello
the world
`;

```

Templates and multiline strings. See:template strings

### Binary and octal literals

```js
let bin = 0b1010010;
let oct = 0o755;

```

See:Binary and Octal Literals

### Exponential Operator

```js
const byte = 2 ** 8;

```

Same as: Math.pow(2, 8)

### New library additions

#### New string methods

```js
'hello'.repeat(3);
'hello'.includes('ll');
'hello'.startsWith('he');
'hello'.padStart(8); // "hello"
'hello'.padEnd(8); // "hello"
'hello'.padEnd(8, '!'); // hello!!!
'\u1E9B\u0323'.normalize('NFC');

```

#### New Number Methods

```js
Number.EPSILON;
Number.isInteger(Infinity); // false
Number.isNaN('NaN'); // false

```

#### New Math methods

```js
Math.acosh(3); // 1.762747174039086
Math.hypot(3, 4); // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2); // 2

```

#### New Array methods

```js
//return a real array
Array.from(document.querySelectorAll('*'));
//similar to new Array(...), but without the special single-argument behavior
Array.of(1, 2, 3);

```

See:New library additions

### kind

```js
class Circle extends Shape {

```

#### Constructor

```js
constructor (radius) {
  this.radius = radius
}

```

#### method

```js
getArea () {
  return Math.PI *2 *this.radius
}

```

#### Call the superclass method

```js
expand(n) {
  return super.expand(n) *Math.PI
}

```

#### Static methods

```js
static createFromDiameter(diameter) {
  return new Circle(diameter /2)
}

```

Syntactic sugar for prototypes. See:classes

### Private class

The javascript default field is public (public), if you need to indicate private, you can use (#)

```js
class Dog {
  #name;
  constructor(name) {
    this.#name = name;
  }
  printName() {
    // Only private fields can be called inside the class
    console.log(`Your name is ${this.#name}`);
  }
}

const dog = new Dog('putty');
//console.log(this.#name)
//Private identifiers are not allowed outside class bodies.
dog.printName();

```

#### Static private class

```js
class ClassWithPrivate {
  static #privateStaticField;
  static #privateStaticFieldWithInitializer = 42;

  static #privateStaticMethod() {
    // â¦
  }
}

```

## Promises

### make the commitment

```js
new Promise((resolve, reject) => {
  if (ok) {
    resolve(result);
  } else {
    reject(error);
  }
});

```

for asynchronous programming. See:Promises

### Using Promises

```js{2,3}
promise
  .then((result) => { Â·Â·Â· })
  .catch((error) => { Â·Â·Â· })

```

### Using Promises in finally

```js
promise
  .then((result) => { Â·Â·Â· })
  .catch((error) => { Â·Â·Â· })
  .finally(() => {
    /*logic independent of success/error */
  })

```

The handler is called when the promise is fulfilled or rejected

### Promise function

```js
Promise.all(Â·Â·Â·)
Promise.race(Â·Â·Â·)
Promise.reject(Â·Â·Â·)
Promise.resolve(Â·Â·Â·)

```

### Async-await

```js{2,3}
async function run () {
  const user = await getUser()
  const tweets = await getTweets(user)
  return [user, tweets]
}

```

asyncfunctions are another way to use functions. See:Async Function

## Destructuring

### Destructuring assignment

#### Arrays

```js
const [first, last] = ['Nikola', 'Tesla'];

```

#### Objects

```js
let { title, author } = {
  title: 'The Silkworm',
  author: 'R. Galbraith'
};

```

Supports matching arrays and objects. See:Destructuring

### Defaults

```js
const scores = [22, 33];
const [math = 50, sci = 50, arts = 50] = scores;

```

```js
//Result:
//math === 22, sci === 33, arts === 50

```

A default value can be assigned when destructuring an array or object

### Function parameters

```js
function greet({ name, greeting }) {
  console.log(`${greeting}, ${name}!`);
}

```

```js
greet({ name: 'Larry', greeting: 'Ahoy' });

```

Destructuring of objects and arrays can also be done in function parameters

### Defaults

```js
function greet({ name = 'Rauno' } = {}) {
  console.log(`Hi ${name}!`);
}

```

```js
greet(); // Hi Rauno!
greet({ name: 'Larry' }); // Hi Larry!

```

### Reassign keys

```js
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`);
}

```

```js
printCoordinates({ left: 25, top: 90 });

```

This example assignsxto the value of theleftkey

### Loop

```js
for (let {title, artist} of songs) {
  Â·Â·Â·
}

```

Assignment expressions also work in loops

### Object Deconstruction

```js
const { id, ...detail } = song;

```

Use therest(...)operator to extract some keys individually and the rest of the keys in the object

## Spread Operator

### Object Extensions

#### with object extensions

```js
const options = {
  ...defaults,
  visible: true
};

```

#### No object extension

```js
const options = Object.assign({}, defaults, { visible: true });

```

The object spread operator allows you to build new objects from other objects. See:Object Spread

### Array Expansion

#### with array extension

```js{2,3}
const users = [
  ...admins,
  ...editors,
  'rstacruz'
]

```

#### No array expansion

```js
const users = admins.concat(editors).concat(['rstacruz']);

```

The spread operator allows you to build new arrays in the same way. See:Spread operator

## Functions

### Function parameters

#### Default parameters

```js
function greet(name = 'Jerry') {
  return `Hello ${name}`;
}

```

#### Rest parameters

```js
function fn(x, ...y) {
  // y is an array
  return x * y.length;
}

```

#### Extensions

```js
fn(...[1, 2, 3]);
//same as fn(1, 2, 3)

```

Default (default), rest, spread (extension). See:function parameters

### Arrow function

#### Arrow functions

```js
setTimeout(() => {
  Â·Â·Â·
})

```

#### with parameters

```js
readFile('text.txt', (err, data) => {
  ...
})

```

#### implicit return

```js{1,4,5,6}
arr.map(n => n*2)
//no curly braces = implicit return
//Same as: arr.map(function (n) { return n*2 })
arr.map(n => ({
  result: n*2
}))
//Implicitly returning an object requires parentheses around the object

```

Like a function, but preservesthis. See:Arrow functions

### Parameter setting default value

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello'); // Hello World
log('Hello', 'China'); // Hello China
log('Hello', ''); // Hello

```

### Used in conjunction with destructuring assignment defaults

```js
function foo({ x, y = 5 } = {}) {
  console.log(x, y);
}

foo(); // undefined 5

```

### name attribute

```js
function foo() {}
foo.name; // "foo"

```

### length property

```js
function foo(a, b) {}
foo.length; // 2

```

## Objects

### Shorthand Syntax

```js
module.exports = { hello, bye };

```

same below:

```js
module.exports = {
  hello: hello,
  bye: bye
};

```

See:Object Literals Enhanced

### method

```js
const App = {
  start() {
    console.log('running');
  }
};
//Same as: App = { start: function () {Â·Â·Â·} }

```

See:Object Literals Enhanced

### Getters and setters

```js{2,5}
const App = {
  get closed () {
    return this.status === 'closed'
  },
  set closed (value) {
    this.status = value ? 'closed' : 'open'
  }
}

```

See:Object Literals Enhanced

### Computed property name

```js
let event = 'click';
let handlers = {
  [`on${event}`]: true
};
//Same as: handlers = { 'onclick': true }

```

See:Object Literals Enhanced

### Extract value

```js{3,5}
const fatherJS = { age: 57, name: "Zhang San" }
Object.values(fatherJS)
//[57, "Zhang San"]
Object.entries(fatherJS)
//[["age", 57], ["name", "Zhang San"]]

```

## Modules module

### Imports import

```js
import 'helpers';
//aka: require('Â·Â·Â·')

```

```js
import Express from 'express';
//aka: const Express = require('Â·Â·Â·').default || require('Â·Â·Â·')

```

```js
import { indent } from 'helpers';
//aka: const indent = require('Â·Â·Â·').indent

```

```js
import * as Helpers from 'helpers';
//aka: const Helpers = require('Â·Â·Â·')

```

```js
import { indentSpaces as indent } from 'helpers';
//aka: const indent = require('Â·Â·Â·').indentSpaces

```

importis the newrequire(). See:Module imports

### Exports export

```js
export default function () { Â·Â·Â· }
//aka: module.exports.default = Â·Â·Â·

```

```js
export function mymethod () { Â·Â·Â· }
//aka: module.exports.mymethod = Â·Â·Â·

```

```js
export const pi = 3.14159;
//aka: module.exports.pi = Â·Â·Â·

```

```js
const firstName = 'Michael';
const lastName = 'Jackson';
const year = 1958;
export { firstName, lastName, year };

```

```js
export * from 'lib/math';

```

exportis the newmodule.exports. See:Module exports

### askeyword renaming

```js{2,8,12-14}
import {
  lastName as surname // import rename
} from './profile.js';

function v1() { ... }
function v2() { ... }

export { v1 as default };
//Equivalent to export default v1;

export {
  v1 as streamV1, // export rename
  v2 as streamV2, // export rename
  v2 as streamLatestVersion // export rename
};

```

### Dynamically load modules

```js
button.addEventListener('click', (event) => {
  import('./dialogBox.js')
    .then((dialogBox) => {
      dialogBox.open();
    })
    .catch((error) => {
      /*Error handling */
    });
});

```

ES2020 Proposalintroduceimport()function

### import() allows module paths to be dynamically generated

```js
const main = document.querySelector('main');

import(`./modules/${someVariable}.js`)
  .then((module) => {
    module.loadPageInto(main);
  })
  .catch((err) => {
    main.textContent = err.message;
  });

```

### import.meta

ES2020Added a meta propertyimport.metato theimportcommand,
which returns the meta information of the current module

```js
new URL('data.txt', import.meta.url);

```

In the Node.js environment,import.meta.urlalways returns a local path, that is, a string of thefile:URLprotocol,
such asfile:/// home/user/foo.js

### Import Assertions

#### static import

```js
import json from './package.json' assert { type: 'json' };
//Import all objects in the json file

```

#### Dynamic Import

```js
const json = await import('./package.json', { assert: { type: 'json' } });

```

## Generators

### Generator function

```js
function* idMaker() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

```

```js
let gen = idMaker();
gen.next().value; // â 0
gen.next().value; // â 1
gen.next().value; // â 2

```

it's complicated. See:Generators

### For..of + iterator

```js
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      }
    };
  }
};

for (var n of fibonacci) {
  // truncate sequence at 1000
  if (n > 1000) break;
  console.log(n);
}

```

For iterating over generators and arrays. See:For..of iteration

### Relationship with Iterator interface

```js
var gen = {};
gen[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...gen]; // => [1, 2, 3]

```

TheGeneratorfunction is assigned to theSymbol.iteratorproperty, so that thegenobject has theIteratorinterface, which can be traversed by the...operator

### Symbol.iterator property

```js
function* gen() {
  /*some code */
}
var g = gen();

g[Symbol.iterator]() === g; // true

```

genis aGeneratorfunction, calling it will generate a traverser objectg. ItsSymbol.iteratorproperty, which
is also an iterator object generation function, returns itself after execution

## see also

- Learn ES2015(babeljs.io)
- ECMAScript 6 Features Overview(github.com)

