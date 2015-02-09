goog.provide('ft.dto.Task');

ft.dto.Task = function(json) {
  this.json_ = json;
};

ft.dto.Task.prototype.getTitle = function() {
  return this.json_['title'] || '';
};
