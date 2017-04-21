# Control Flow in Javascript

Try to make all of the tests pass and win a prize:  My unending admiration.

## Prerequisites

- NodeJS 7.8.0

## Try it out

```
git clone https://github.com/cttttt/js-control-flow-trials
cd js-control-flow-trials
npm install
npm test
```

## Tips

### Synchronous Programming

Running synchronous code is easy peasey, as Javascript is executed from top to bottom (for the most part):

```javascript
function (a,b,c) {
    a();
    b();
    c();
}
```

### Branching

To run synchronous code conditionally, use `if`:

```javascript
// for tips on truthy vs. falsey, ask Chris

function (value) {
    if (value) {
        // run iff value is truthy
    } else {
        // run iff value is falsey
    }
}
```


### Iteration

To repeat a block of synchronous code, use a `for`, `do`, or `while` loop:

```javascript
function looper(list, doSomething) {
    // a while loop:
    var i=0;
    while (i<list.length) {
      doSomething(list[i]);
      i++;
    }
}

function looperFor(list, doSomething) {
    // an equivalent for loop:
    for (var i=0; i<list.length; i++) {
      doSomething(list[i]);
    }
}

function looperDo(list, doSomething) {
    var i=0;
    
    // runs doSomething() at least once
    do {
      doSomething(list[])
    } while(i<list.length)
}
```

### High Order Functions

Some of the basic types in Javascript have methods that help make certain common flows easier.  For example, `Array`'s have a method, `.map()`.  `map`:

- Expects a `function` as an argument.
- Runs this `function` on all of the elements in the target `Array`.
- Returns a new `Array` containing the results of those transformations, without affecting the original `Array`.

```javascript
function transformer(list, transform) {
  return list.map(transform);
}
```

### Javascript Runs in a Single Thread

Sometimes operations take a long time.  For instance, let's read a file:

```javascript
function printAFile(name) {
  return console.log("%s", require('fs').readFileSync(name));
}
```

While these operations run, no other Javascript can run because Node runs Javascript _in a single thread_.

If this function was run as part of a request handler for an `http` request, or the code that sends a message through a `websocket`, unrelated operations (sending unrelated responses, accepting unrelated connections) would suspended.  This could make your server appear to be down.


### Error First Callbacks

One solution to this problem is to ask the Node runtime to perform slow operations and pass in a Javascript function that the runtime calls when the slow work is done:

```javascript
function printAFile(name, callback) {
  require('fs').readFile(function (err, data) {
    console.log("%s", data);
  });
}
```

This type of slow running function is called an _error first callback function_ because the first argument of the callback is reserved for details on a possible error.


### Promises

Error first callbacks put a lot of pressure on callers to ensure that errors are handled properly.  If an error isn't handled, bad things could happen...like a request handler hanging indefinitely.

Another approach to running code asynchronously is to have the slow operation return a stand-in for its result, a _Promise_.

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printAFile(name) {
  var apromise = fs.readFileAsync(name);

  apromise.then(function (data) {
    console.log("%s", data);
  });
} 
```

Promises are neat in that they allow you to use synchronous code to handle the results of asynchronous functions.  They also allow you to defer error handling...or not handle it at all and have an operation immediately crash-but-not-hang (crashing is usually bad, but hanging is *always* bad).

#### `.then()` returns a Promise

Another cool benefit of Promises is that they can be chained because `.then()` returns a `Promise`.  All promises represent a future result and what the one returned by `.then()` is no exception:  It represents the result (the return value) of the function that processed the `Promise`.  This result could be a plain old Javascript object, or a `Promise` that represents some future value.

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printTwoFiles(name1, name2) {
  var apromise = fs.readFileAsync(name1);

  var anotherpromise = apromise.then(function (data) {
    console.log("%s", data);
    
    return fs.readFileSync(name2);
  });
  
  anotherpromise.then(function (data2) {
    console.log("%s", data2);
  });
} 
```

Note here that the code that handled the first `Promise` returned a `Promise` representing a future value:  The data read from file, `name2`.  `.then()` returns a promise that represents this same value.  As with all Promises, fetching this value involves using `.then()`.

#### Chaining, FTW.

Note that this code actually seems more complicated, but it only looks that way beacuse we're storing all of the intermediary `Promises` in variables.  We don't have to.  Here's an equivalent function:

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printTwoFiles(name1, name2) {
  var apromise = fs.readFileAsync(name1)
  .then(function (data) {
    console.log("%s", data);
    return fs.readFileSync(name2);
  })
  .then(function (data2) {
    console.log("%s", data2);
  });
} 
```

#### Paying it forward: Always return a Promise

This chaining is only possible because `fs.readFileAsync()` actually returns a promise.  To allow `printTwoFiles` to be called as part of a chain, it should always return a Promise, even if no useful value is returned.

The _time at when it returns_ is as important as the value, when it comes to controlling the flow of a program's execution:

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printTwoFiles(name1, name2) {
  var apromise = fs.readFileAsync(name1)
  .then(function (data) {
    console.log("%s", data);
    return fs.readFileSync(name2);
  })
  .then(function (data2) {
    console.log("%s", data2);
  });
  
  return apromise;
} 
```

#### Promises in a nutshell: Sync code and a lot of boilerplate

That's about it on using `Promise`s.  All it involves is writing a bunch of synchronous code:

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printTwoFiles(name1, name2) {
  var apromise = fs.readFileAsync(name1)
  
    console.log("%s", data);
    fs.readFileSync(name2);
    
  
    console.log("%s", data2);
  
  return apromise;
} 
```

...and wrapping it up in all of this boilerplate:

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
function printTwoFiles(name1, name2) {
  
  .then(function () {
        
        
  }).then(function (data) {
   
   
  })
  .then(function (data2) {
  
  });
  
  
} 
```

### Creating a Promise

In rare cases, you may need to create a Promise.  An example is when you need to run a function that doesn't hand you a `Promise`.  Take, for example, `setTimeout`.

To create a function that adds a delay, create a `Promise` by running `new Promise()`:

```javascript
function waitsASecond() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('hello');
    }, 1000)
  })
}

// prints 'hello' after a 1s delay
waitASecond().then(function (message) {
  console.log(message);
})
```

Here, the two functions `resolve` and `reject` passed into the callback provided to the `Promise` constructor control when the `Promise` resolves (i.e. when the callback to `.then()` is called) and with what value (i.e. what value is provided to the callback given to `then()`).

### `async` and `await`

`async` and `await` are keywords that tell the Javascript compiler that you're working with `Promises`, but would rather write code that looks like the easy to understand synchronous code.

`async` is an annotation you can add to a function that tells the Javascript compiler that this function will call `Promise`-returning-functions.  

Behind the scenes, the Javascript compiler will instrument this function to make it easier for it to work with `Promises` with far less boilerplate.  

Oh and remember way back when I mentioned you should _pay it forward_ and return a `Promise` from any function that uses `Promise`s?  When you use the `async` keyword, the compiler will handle this for you and wrap whatever the function returns in a `Promise`:

```javascript
async function return1 () {
  return 1
}

// return1 actually returns a Promise that represents the value returned.

return1().then(function (one) {
  console.log(one); // prints 1
})
```

`await` is a special keyword that asks Javascript takes a `Promise` and asks the Javascript runtime to pause execution until the `Promise` is resolved.  When execution resumes, the `await` statement will evaluate to the _future value_ represented by the `Promise`.

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
async function printTwoFiles(name1, name2) {
  var data1 = await fs.readFileAsync(name1);
  console.log("%s", data1);
  var data2 = await fs.readFileAsync(name2);
  console.log("%s", data2);
} 
```

...or simply...

```javascript
var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));
    
async function printTwoFiles(name1, name2) {
  console.log("%s", await fs.readFileAsync(name1));
  console.log("%s", await fs.readFileAsync(name2));
} 
```