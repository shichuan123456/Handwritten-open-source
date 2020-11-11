Array.from(document.querySelectorAll('div'))
Array.prototype.slice.call(document.querySelectorAll('div'))

let arr = [...document.querySelectorAll('div')]
Array.prototype.concat.apply([], document.querySelectorAll('div'));



