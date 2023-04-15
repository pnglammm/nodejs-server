const data = {
 icon: '\u2139',

 blueBg: "\x1b[44m",
 blueFg: "\x1b[36m",
 whiteFg: "\x1b[37m",

 reset: "\x1b[0m",
 reverse: "\x1b[7m"
};
console.old_info =  console.info ;
console.info = function() {
 console.old_info(data.blueBg + data.whiteFg, data.icon, data.reset, data.blueFg, ...arguments, data.reset);
};
module.exports = console.info ;
