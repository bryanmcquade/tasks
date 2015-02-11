goog.provide('ft.Application');

goog.require('ft.taskapi');

ft.Application = function(taskRootElt) {
  this.taskRootElt_ = taskRootElt;
};

ft.Application.prototype.start = function(accessToken) {
  return ft.taskapi.createTasklistPromise(accessToken)
      .then(goog.bind(this.onTasklist_, this));
};

ft.Application.prototype.onTasklist_ = function(taskList) {
  for (var i = 0; i < taskList.getNumItems(); ++i) {
    var task = taskList.getItem(i);
    var itemElt = document.createElement('a');
    itemElt.className = 'list-group-item';
    itemElt.innerText = task.getTitle();
    this.taskRootElt_.appendChild(itemElt);
  }
};
