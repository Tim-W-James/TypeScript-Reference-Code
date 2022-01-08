let implicitVar = 23; // implicit type inference
// implicitVar = '23'; // ! illegal operation - wrong type

let dynamicVar: any = 23; // opt out of type checking
dynamicVar = "23"; // ! generally best to avoid

let noAssignmentVar; // no assignment = any type
noAssignmentVar = 23;
noAssignmentVar = "23";

let explicitVar: number;
explicitVar = 23;
// explicitVar = '23'; // ! illegal operation - wrong type

// TODO * type casting

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

// * interfaces
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

// any additional properties - less restrictive
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

// * functions
// argument types, return types
function pow(x: number, y: number): number {
  return Math.pow(x, y);
}
pow(2, 6);
// pow('23', 'foo'); // ! illegal operation - wrong type

// no return value - void
function sayHi(name: string): void {
  console.log(`Hi ${name}!`);
}
sayHi("Bob");

// TODO optional arguments
// TODO default arguments

// * arrays
const arr: number[] = [23, 66]; // array can only have numbers

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

// TODO bounded generics

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

// first order functions - functions as arguments
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
