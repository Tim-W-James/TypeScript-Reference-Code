let implicitVar = 23; // implicit type inference
// implicitVar = '23'; // ! illegal operation - wrong type

let dynamicVar: any = 23; // opt out of type checking with any
dynamicVar = "23"; // ! generally best to avoid

let noAssignmentVar; // no assignment = any type
noAssignmentVar = 23;
noAssignmentVar = "23";

let explicitVar: number;
explicitVar = 23;
// explicitVar = '23'; // ! illegal operation - wrong type

// any vs unknown type 
function f1(a: any) {
  a.b(); // OK
}
// unknown is safer
// function f2(a: unknown) {
//   a.b(); // ! object is of type unknown
// }

// * custom types
type Style1 = string;
let font1: Style1;

type Style2 = string | number; // union type
let font2: Style2;
font2 = "bold";
font2 = 23;

type Style3 = "bold" | "italic" | 23; // union type
let font3: Style3 = "bold";
// font3: Style3 = 'underline'; // ! illegal operation - wrong type

// short circut (lazy) assignment
type username = string | undefined;
let myUsername = undefined;
console.log(myUsername || "Guest");

// * type assertion
let font5: Style3 = <Style3>explicitVar; // not usable in .tsx
let font4: Style3 = explicitVar as Style3;
let strVar2: string = 23 as any as string; // ! coercion with any - best to avoid
// primitive assertions
let strVar: string = (23).toString(); // number -> string
let numVar: number = parseInt("23"); // string -> number

// * interfaces
// interfaces are like types, but are extendable
interface Person {
  first: string;
  last: string;
}

const person1: Person = {
  first: "Tim",
  last: "J",
};

/* const person2: Person = { // ! missing property: last
  first: 'John',
  age: 23 // ! property not in interface
} */

// extending interfaces and optional properties
interface Employee extends Person {
  department?: string;
}

const empoyee1: Employee = {
  first: "Tim",
  last: "J",
  department: "IT",
};

// readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
}

// allow any additional properties - less restrictive
interface Pet {
  name: string;
  animal: string;
  [key: string]: any;
}
const pet1: Pet = {
  name: "Mindy",
  animal: "Cat",
  breed: "Grey Tabby", // can have additional properties
};

// index signatures
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

// * functions
// argument types, return types
function pow(x: number, y?: number): number {
  return Math.pow(x, y);
}
pow(2, 6);
// pow('23', 'foo'); // ! illegal operation - wrong type

// no return value - void
function sayHi(name: string): void {
  console.log(`Hi ${name}!`);
}
sayHi("Bob");

// narrow argument types with typeof guards
function printId(id: number | string) {
  if (typeof id === "string") {
    // in this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // here, id is of type 'number'
    console.log(id);
  }
}

// use ! to assert as not null or undefined
function liveDangerously(x?: number | null) {
  // no error
  console.log(x!.toFixed());
}
// liveDangerously(null); // ! will cause an error since there is no explicit check

// narrow via truthiness
// use !! to coerce into boolean
!!"world"; // true
// && only evaluates the second operand if the first is truthy
function printAll(strs: string | string[] | null) {
  // use && to check if strs is truthy, then narrow type
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// narrow by property with the in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}

// named arguments
// use an object as an argument
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// optional arguments
// simulates last: string | undefined
function printName1(first: string, last?: string) {
  console.log(`${first} ${last || ""}`);
}
// both OK
printName1("Bob");
printName1("Alice", "Alisson");
// or via named objects
function printName2(obj: { first: string; last?: string }) {
  console.log(`${obj.first} ${obj.last || ""}`);
}
// both OK
printName2({ first: "Bob" });
printName2({ first: "Alice", last: "Alisson" });

// default arguments
// note that the type can be inferred
function f(x: number = 10) {
  console.log(x);
}
f(5);
f();
// requires a workaround to set defaults for object parameters
type FullName = {
  firstName: string;
  /** @defaultValue 'Smith' */
  lastName? : string;
}
function sayName(params: FullName) {
  // set defaults for parameter object
  var { firstName, lastName = 'Smith'} = params;
  // do Stuff
  var name = firstName + " " + lastName;
  console.log(name);
}
sayName({
  firstName: 'Bob'
});

// overloading
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // ! no overload with these arguments

// function types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
};

// * arrays
const arr: number[] = [23, 66]; // array can only have numbers
const arr2: Array<number> = [23, 66]; // alternate syntax (not usable in .tsx)

// tuple
type MyList1 = [number, string, boolean];
const lst1: MyList1 = [23, "Hi", true];
// tuple with optional values
type MyList2 = [number, string, boolean?];
const lst2: MyList2 = [23, "Hi"];

// * generics
class Observable<T> {
  constructor(public value: T) {}
}
let x: Observable<number>;
let y: Observable<Person>;
let z = new Observable(23); // implicit

// using generics with functions
// specifying the generic sets both the types of parameters and return value
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

// generic contraints (aka bounded)
// require parameters to have a length property of type number
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const longerArray = longest([1, 2], [1, 2, 3]); // longerArray is of type 'number[]'
const longerString = longest("alice", "bob"); // longerString is of type 'alice' | 'bob'
// const notOK = longest(10, 100); // ! Numbers don't have a 'length' property

// * functional TypeScript

// pure functions
function pureFunction(val) {
  return val.toString();
}
let number = 123;
function impureFunction() {
  let val = number;
  // mutates the number variable - side effect
  return val.toString();
}
// pure functions do not have side effects or rely on external values

// immutable data
const mutableData = [1, 2, 3, 4, 5, 6];
const immutableData = Object.freeze([1, 2, 3, 4, 5, 6]);
// functional code is stateless - when data is created it is never mutated

// higher order functions - functions as arguments
const addEmoji = (val) => val.toString() + "🙂";

const emojiData = mutableData.map(addEmoji);
console.log(emojiData);

// functions as a return value
const appendEmoji = (fixed) => (dynamic) => fixed + dynamic;
const cloud = appendEmoji("☁️");
const sun = appendEmoji("☀️");

console.log(cloud(" today"));
console.log(appendEmoji("💧")("today"));

// * object oriented TypeScript

// in vanilla JS
class Emoji1 {
  icon: string;

  constructor(icon) {
    this.icon = icon;
  }
}
const moon1 = new Emoji1("🌑");

// in TS
class Emoji2 {
  // public variables/methods are available to the class itself and any instances of the class
  constructor(public icon) {}
}
const earth = new Emoji2("🌎");
earth.icon = "💨";

// encapsulation
class Emoji3 {
  // private variables/methods are only available in the class definition
  constructor(private _icon) {} // convention is to use _

  get icon() {
    return this._icon;
  }
}
const comet = new Emoji3("☄️");
// comet._icon = '💨'; // ! illegal operation - property not directly accessible outside class
console.log(comet.icon); // use getter

// internal state
class Emoji4 {
  private _prev;

  constructor(private _icon) {}

  get icon() {
    return this._icon;
  }

  get prev() {
    return this._prev;
  }

  change(val) {
    this._prev = this._icon;
    this._icon = val;
  }
}
const tree = new Emoji4("🌲");
console.log(tree.icon, tree.prev);
tree.change("🌳");
tree.change("🌴");
console.log(tree.icon, tree.prev);

// static method - tied to the class itself rather than an instance
class Emoji5 {
  static addOneTo(val) {
    return 1 + val;
  }
}
// useful as a namespace
Emoji5.addOneTo(3);

// inheritance
class Human {
  constructor(public name) {}

  sayHi() {
    return `Hello, ${this.name}`;
  }
}
// sub-class
class SuperHuman extends Human {
  heroName;

  constructor(name) {
    super(name);
    this.heroName = `HERO ${name}`;
  }

  superpower() {
    return `${this.heroName} can fly`;
  }
}
const superMan = new SuperHuman("Clark");
console.log(superMan.sayHi()); // code reuse
// ! avoid nesting sub-classes too deep

// * enums
// ! not a type-level addition but something added to the language and runtime
// Up = 0, Down = 1, etc.
enum Direction1 {
  Up,
  Down,
  Left,
  Right,
}
console.log(Direction1.Down); // returns the index 1
console.log(Direction1[0]); // returns the value Up

// auto-increment: Up = 1, Down = 2, etc.
enum Direction2 {
  Up = 1,
  Down,
  Left,
  Right,
}

// string enums
enum Direction3 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// alternatively, use a const array
// this allows you to iterate across possible values
// but no intellisense and runtime checks must be explit
const compassValues = [0, 90, 180, 270] as const;
type compassPoint = typeof compassValues[number];
let myCompass: compassPoint = 0;

function nextCompassPoint(angle: compassPoint) {
  return compassValues[
    (compassValues.indexOf(angle) + 1) % compassValues.length
  ];
}

function isValidCompassPoint(angle: number) {
  return compassValues.includes(angle as compassPoint);
}

// TODO data structures

// TODO design patterns
