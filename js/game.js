var Game = function(screenWidth, screenHeight) {
  this._screenWidth = screenWidth;
  this._screenHeight = screenHeight;

  this._atlas = new Atlas();
  this._atlas.addLocation(314921);

  this._statusbar = new StatusBar(this);

  this.displayStatus();
}

Game.prototype.displayStatus = function() {
  var text = this.getStatusbar().view();
  var x = Math.floor((ROME_WIDTH - ROT.Text.measure(text, 100).width) / 2);
  Rome.display.drawText(x,0,text)
}

Game.prototype.getStatusbar = function() {
  return this._statusbar;
}

Game.prototype.getPlayer = function() {
  return this._player;
}

//Should return an array of lines for Ironwood to draw
Game.prototype.display = function() {
  //Finish HIM
  return this.getStatusBar().view();
}
