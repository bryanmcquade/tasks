goog.provide('ft.dto.Tasks');

ft.dto.Tasks = function(json) {
  this.json_ = json;

  this.items_ = undefined;
};

ft.dto.Tasks.prototype.getNumItems = function() {
  return this.getItems_().length;
};

ft.dto.Tasks.prototype.getItem = function(i) {
  return this.getItems_()[i];
};

ft.dto.Tasks.prototype.getItems_ = function() {
  if (!this.items_) {
    var items = this.json_['items'] || [];
    this.items_ = items.map(function(elt) { return new ft.dto.Task(elt); });
  }
  return this.items_;
};
