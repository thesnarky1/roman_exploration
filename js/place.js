//Example is Carthage: 314921

var Place = function(id) {
  this._id = id;
  this._name = "";
  this._connectionss = [];
  this._type = false;
}

Place.prototype.getType = function() {
  return this._type;
}

Place.prototype.getID = function() {
  return this._id;
}

Place.prototype.getName = function() {
  return this._name;
}

Place.prototype.getRoads = function() {
  return this._roads;
}

Place.prototype.setName = function(newName) {
  this._name = newName;
}

Place.prototype.setType = function(newType) {
  this._type = newType;
}

Place.prototype.addConnection = function(newConnection) {
  this._roads.push(newConnection);
}
