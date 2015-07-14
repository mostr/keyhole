# keyhole

Make projections out of your objects, as you'd look at them via keyhole. Define which object properties you want to keep and resulting object will have these properties only (also supports nested properties via dot notation e.g. `foo.bar.baz`). 

## Installation

    $ npm install keyhole

## Basic Usage

```js
import keyhole from 'keyhole';

const source = {
    name: 'john doe',
	age: 29,
	emails: {
		work: 'john@work.com',
		priv: 'john@priv.com',
	},
	colors: ['red', 'green', 'blue']
};

const projection = keyhole(source, 'name', 'emails.work', 'colors');
```

`projection` will be as follows:


``` js
{ 
	name: 'john doe',
	emails: {
		work: 'john@work.com'
	},
	colors: ['red', 'green', 'blue']
}
```	

For more examples see [tests](test/) directory


## Build and test
  
    $ npm run build
    $ npm test

to run tests in "watch" mode issue `npm run test-watch`


## License

[MIT](http://opensource.org/licenses/MIT)
