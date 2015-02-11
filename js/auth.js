goog.provide('ft.auth');

goog.require('ft.urlutil');
goog.require('ft.settings.auth');

ft.auth.Params = function(opt_params) {
  this.params_ = opt_params || {};
};

ft.auth.Params.prototype.getError = function() {
  return this.params_['error'];
};

ft.auth.Params.prototype.getAccessToken = function() {
  return this.params_['access_token'];
};

ft.auth.Params.prototype.getRedirectCount = function() {
  // We store the redirect count in the oauth 'state' field.
  return Number(this.params_['state']) || 0;
};

ft.auth.getCurrentAuthParams = function() {
  return new ft.auth.Params(
      ft.urlutil.extractQueryStringParams(window.location.hash));
};

ft.auth.getAuthUrl_ = function(opt_previousParams) {
  var params = {
    'scope': ft.settings.auth.REQUIRED_SCOPES.join(' '),
    'client_id': ft.settings.auth.CLIENT_ID,
    'redirect_uri': ft.settings.auth.APP_REDIRECT_URL,
    'response_type': 'token'
  };
  if (opt_previousParams) {
    // Increment the redirect count, which is stored in the 'state'
    // field, in order to prevent inadvertent infinite redirect loops.
    var redirectCount = opt_previousParams.getRedirectCount();
    params['state'] = ++redirectCount;
  }
  return ft.urlutil.appendParamsAsQueryString(
      ft.settings.auth.BASE_URL, params);
};

ft.auth.redirectToAuthUrl = function(authParams) {
  if (authParams.getRedirectCount() > 2) {
    // We've encountered too many redirects. To avoid going into an
    // infinite redirect loop, abort without issuing a redirect.
    return false;
  }
  var authUrl = ft.auth.getAuthUrl_(authParams);
  window.location.replace(authUrl);
  return true;
};

ft.auth.clearAuthInfoInUrl = function() {
  if (history && history.replaceState) {
    var u = new URL(window.location.href);
    u.hash = '';
    history.replaceState('', document.title, u.toString());
  } else {
    window.location.hash = '';
  }
};
