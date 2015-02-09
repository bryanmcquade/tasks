goog.provide('ft.urlutil');

ft.urlutil.extractQueryStringParams = function(queryString) {
  var PARAM_REGEX = /([^&=]+)=?([^&]*)/g;
  var params = {};
  if (queryString) {
    // strip leading '?' or '#'
    queryString = queryString.substr(1);
    var m;
    while (m = PARAM_REGEX.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
  }
  return params;
};

ft.urlutil.appendParamsAsQueryString = function(baseUrl, params) {
  var encodedParams = [];
  for (var key in params) {
    var val = params[key];
    encodedParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
  }
  return baseUrl + '?' + encodedParams.join('&');
};
