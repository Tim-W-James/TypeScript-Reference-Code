let implicitVar = 23; // implicit type inference
// implicitVar = '23'; // ! illegal operation - wrong type
let dynamicVar = 23; // opt out of type checking
dynamicVar = '23'; // ! generally best to avoid
let noAssignmentVar; // no assignment = any type
noAssignmentVar = 23;
noAssignmentVar = '23';
let explicitVar;
explicitVar = 23;
let font1;
let font2;
font2 = 'bold';
font2 = 23;
let font3 = 'bold';
const person1 = {
    first: 'Tim',
    last: 'J'
};
const pet1 = {
    name: 'Mindy',
    animal: 'Cat',
    breed: 'Grey Tabby' // can have additional properties
};
// * functions
// argument types, return types
function pow(x, y) {
    return Math.pow(x, y);
}
pow(2, 6);
// pow('23', 'foo'); // ! illegal operation - wrong type
// no return value - void
function sayHi(name) {
    console.log(`Hi ${name}!`);
}
sayHi('Bob');
// TODO optional arguments
// TODO default arguments
// * arrays
const arr = [23, 66]; // array can only have numbers
const lst1 = [23, 'Hi', true];
const lst2 = [23, 'Hi'];
// * generics
class Observable {
    value;
    constructor(value) {
        this.value = value;
    }
}
let x;
let y;
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
const addEmoji = (val) => val.toString() + '🙂';
const emojiData = mutableData.map(addEmoji);
console.log(emojiData);
// functions as a return value
const appendEmoji = (fixed) => (dynamic) => fixed + dynamic;
const cloud = appendEmoji('☁️');
const sun = appendEmoji('☀️');
console.log(cloud(' today'));
console.log(appendEmoji('💧')('today'));
// * object oriented TypeScript
// in vanilla JS
class Emoji1 {
    icon;
    constructor(icon) {
        this.icon = icon;
    }
}
const moon1 = new Emoji1('🌑');
// in TS
class Emoji2 {
    icon;
    // public variables/methods are available to the class itself and any instances of the class
    constructor(icon) {
        this.icon = icon;
    }
}
const earth = new Emoji2('🌎');
earth.icon = '💨';
// encapsulation
class Emoji3 {
    _icon;
    // private variables/methods are only available in the class definition
    constructor(_icon) {
        this._icon = _icon;
    } // convention is to use _
    get icon() {
        return this._icon;
    }
}
const comet = new Emoji3('☄️');
// comet._icon = '💨'; // ! illegal operation - property not directly accessible outside class
console.log(comet.icon); // use getter
// internal state
class Emoji4 {
    _icon;
    _prev;
    constructor(_icon) {
        this._icon = _icon;
    }
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
const tree = new Emoji4('🌲');
console.log(tree.icon, tree.prev);
tree.change('🌳');
tree.change('🌴');
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
    name;
    constructor(name) {
        this.name = name;
    }
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
const superMan = new SuperHuman('Clark');
console.log(superMan.sayHi()); // code reuse
// ! avoid nesting sub-classes too deep
console.log('1');
export {};
