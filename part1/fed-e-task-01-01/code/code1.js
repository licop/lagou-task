/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/
// 直接输出
new Promise(resolve => {
  setTimeout(() => {
    resolve('hello ')
  }, 10)
}).then(value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${value}lagou `)
    }, 10)
  })
}).then(value => {
  setTimeout(() => {
    console.log(`${value}I❤U`)
  }, 10);
})

// 封装timer函数
function timer(str, duration) {
  return new Promise(function(resolve) {
     setTimeout(() => resolve(str), duration);
  })
}

timer('hello ', 10)
  .then(value => timer(`${value}lagou `, 10))
  .then(value => timer(`${value}I❤U`, 10))
  .then(console.log)

