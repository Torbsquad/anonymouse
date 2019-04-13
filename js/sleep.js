module.exports = time =>
  new Promise((res, rej) => {
    setTimeout(function() {
      res();
    }, time * 1000);
  });
