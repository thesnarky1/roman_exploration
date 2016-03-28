var Atlas = function() {
  this._roads = [];
  this._places = [];
}

Atlas.prototype.addLocation = function(id) {
  if(!this.getRoad(id) && !this.getPlace(id)) {
    this._fetchLocation(id);
  }
}

Atlas.prototype.getRoad = function(id) {
  return this._roads[id];
}

Atlas.prototype.getPlace = function(id) {
  return this._places[id];
}

Atlas.prototype._fetchLocation = function(id) {
  var tmpPlace = new Place(id);

  //Need to hit http://pleiades.stoa.org/places/<id>/json
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if(client.readyState == 4 && client.status == 200) {
      var responseArray = JSON.parse(client.responseText);

      //This place has a name
      if(responseArray['title']) {
        tmpPlace.setName(responseArray['title']);
        console.log("Added " + tmpPlace.getName() + " to the place listing!");
      }

      //This place connects with others, fill in the roads section
      if(responseArray['connectsWith']) {
        console.log(responseArray['connectsWith']);
      }
    }
  }
  client.open("GET", "http://pleiades.stoa.org/places/" + id + "/json");
  client.send()
}
