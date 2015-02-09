goog.provide('ft.taskapi');

goog.require('ft.settings.urlutil');
goog.require('ft.urlutil');
goog.require('ft.xhr');

ft.taskapi.Error = function(json, opt_originalError) {
  // Chaining to the Error constructor doesn't work, so we hack up
  // something that does.
  this.name = 'ft.taskapi.Error';
  this.message = json.message || '';
  if (opt_originalError) {
    if (!this.message) {
      this.message = opt_originalError.message;
    }
    this.stack = opt_originalError.stack;
  } else {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ft.taskapi.Error);
    } else {
      this.stack = new Error().stack || '';
    }
  }

  this.code = json.code || -1;
  var firstError = ft.taskapi.Error.getFirstErrorOrNull_(json);
  this.reason = firstError.reason || '';
  this.domain = firstError.domain || '';
  this.location = firstError.location || '';
};
goog.inherits(ft.taskapi.Error, Error);

ft.taskapi.Error.getFirstErrorOrNull_ = function(err) {
  if ('errors' in err) {
    var errors = err['errors'];
    if (errors.length > 0) {
      return errors[0];
    }
  }
  return null;
};

ft.taskapi.getTaskApiUrl_ = function(urlComponents, params) {
  var apiUrl = [ft.settings.taskapi.BASE_URL].concat(urlComponents).join('/');
  return ft.urlutil.appendParamsAsQueryString(apiUrl, params);
};

ft.taskapi.getTasklistApiUrl_ = function(tasklistId, params) {
  return ft.taskapi.getTaskApiUrl_(['lists', tasklistId, 'tasks'], params);
};

ft.taskapi.onTasklistResponse_ = function(tasklistResponse) {
  if ('error' in tasklistResponse) {
    throw new ft.taskapi.Error(tasklistResponse['error']);
  }
  return new ft.dto.Tasks(tasklistResponse);
};

ft.taskapi.onTasklistError_ = function(err) {
  // See if the error's message is parseable JSON. If so, attempt to
  // extract additional error information using
  // ft.taskapi.Error. Otherwise, re-throw the original error.
  try {
    var errJson = JSON.parse(err.message);
  } catch (ex) {
    throw err;
  }
  if ('error' in errJson) {
    throw new ft.taskapi.Error(errJson['error'], err);
  }
  throw err;
};

ft.taskapi.createTasklistPromise = function(authAccessToken, opt_tasklistId) {
  var tasklistId = opt_tasklistId || '@default';
  var params = {};
  params['access_token'] = authAccessToken;
  var tasklistApiUrl = ft.taskapi.getTasklistApiUrl_(tasklistId, params);
  return ft.xhr.createJsonPromise(tasklistApiUrl).then(
      ft.taskapi.onTasklistResponse_, ft.taskapi.onTasklistError_);
};
