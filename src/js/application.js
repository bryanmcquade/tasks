goog.provide('ft.Application');

goog.require('ft.taskapi');

ft.Application = function() {};

ft.Application.prototype.start = function(accessToken) {
  return ft.taskapi.createTasklistPromise(accessToken)
      .then(goog.bind(this.onTasklist_, this));
};

ft.Application.prototype.onTasklist_ = function(taskList) {
  // For now, just write the list of tasks to the console.
  for (var i = 0; i < taskList.getNumItems(); ++i) {
    var task = taskList.getItem(i);
    console.log(task.getTitle());
  }
};
