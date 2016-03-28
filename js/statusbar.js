var StatusBar = function(game) {
  this._game = game;
}

StatusBar.prototype.view = function() { //Removed 'game' arg from original as we already track that
  var toReturn = "%b{" + STATUSBAR_BACKGROUND_COLOR + "}%c{" + STATUSBAR_TEXT_COLOR + "}";
  toReturn += "Test";
  toReturn += "%b{}";
  return toReturn;
}

StatusBar.prototype.getGame = function() {
  return this._game;
}
