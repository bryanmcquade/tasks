goog.provide('ft.xhr');

ft.xhr.onloadCallback_ = function(resolve, reject) {
  if (this.readyState !== XMLHttpRequest.DONE) {
    return;
  }
  if (this.status === 200) {
    resolve(this.response);
  } else {
    reject(Error(this.response || this.statusText));
  }
};

ft.xhr.promiseCallback_ = function(url, resolve, reject) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = goog.partial(ft.xhr.onloadCallback_, resolve, reject);
  xhr.onerror = function() { reject(Error('Network error.')); };
  xhr.send();
};

ft.xhr.createPromise = function(url) {
  return new Promise(goog.partial(ft.xhr.promiseCallback_, url));
};

ft.xhr.createJsonPromise = function(url) {
  return ft.xhr.createPromise(url).then(JSON.parse);
};
