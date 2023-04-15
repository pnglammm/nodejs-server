# console.info :

 ![console-info demo](https://raw.githubusercontent.com/rathath/bucket/master/img/console-info-node.png)

- The purpose of this module is not to give many options for logging , it is just give you lightweight the missing API of console : which is here `console.info`.

- No need documentation, because `console.info` takes the same arguments as `console.log` . However `console.info` will be displayed on terminal like below.

# Install :

```
npm install console-info --save;
```

# How to use :

```js
require('console-info');
// or in babel: import info from 'console-info';

console.info(new Date()); // log time now
console.info({firstname: "Abdesslem", age:32}) ; // log Object
console.info(new Date,[4, 65, 9], {a:"b"}); // I told you : it is like console.log
```



# Related modules :

Use also :

- [**console.warn**](https://www.npmjs.com/package/console-warn)

- [**console.error**](https://www.npmjs.com/package/console-error)

```
npm install console-warn --save;
npm install console-error --save;
```
