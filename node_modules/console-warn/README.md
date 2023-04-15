# console.warn :

 ![console-warn demo](https://raw.githubusercontent.com/rathath/bucket/master/img/console-warn-node.png)

- The purpose of this module is not to give many options for logging , it is just give you lightweight the missing API of console : which is here `console.warn`.

- No need documentation, because `console.warn` takes the same arguments as `console.log` . However `console.warn` will be displayed on terminal like above.

# Install :

```
npm install console-warn --save;
```

# How to use :

```js
require('console-warn');
// or in babel: import info from 'console-warn';

console.warn(new Date()); // log time now
console.warn({firstname: "Abdesslem", age:32}) ; // log Object
console.warn(new Date,[4, 65, 9], {a:"b"}); // I told you : it is like console.log
```



# Related modules :

Use also :

- [**console.info**](https://www.npmjs.com/package/console-info)

- [**console.error**](https://www.npmjs.com/package/console-error)

```
npm install console-info --save;
npm install console-error --save;
```
