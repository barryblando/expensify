// -------- New Class Syntax --------
class OldSyntax {
  constructor() {
    this.name = 'Mike';
    this.getGreeting = this.getGreeting.bind(this); // bind to the current instance context to fix TypeError
  }

  getGreeting() {
    return `Hi. My name is ${this.name}`;
  }
}

const oldSyntax = new OldSyntax();
// if you create new instance for the getGreeting method
const oldGetGreeting = oldSyntax.getGreeting; // it will cause TypeError cause of this binding, it can't access anymore the 'this' of the class
console.log(oldGetGreeting());

// -------- New Class Syntax --------
class NewSyntax {
  name = 'Jen';
  // arrow function don't bind their own 'this' value, it's gonna use what upper scope chain 'this' in this case it is the 'this' of class instance
  getGreeting = () => {
    return `Hi. My name is ${this.name}`;
  }
}

const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting; // can access this cause of arrow function 'this' is bound already to the current instance
console.log(newGetGreeting());