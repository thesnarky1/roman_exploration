var Atlas = function(id) {
  if(!id) {
    id = 314921;
  }
  this._places = [];
  this._placesToFetch = [];
  this.addLocation(id, 1);
  this._currentPlace = false;
}

Atlas.prototype.addLocation = function(id, depth) {
  console.log("Adding place " + id + " with a depth of " + depth);
  if(!this.getPlace(id) && depth >= 0) {
    console.log("--Place is unknown, fetching");
    this._fetchLocation(id, depth);
  } else {
    console.log("--Place is already known or depth is too low");
  }
}

Atlas.prototype.getPlace = function(id) {
  return this._places[id];
}

Atlas.prototype.addPlace = function(id, place) {
  this._places[id] = place;
}

Atlas.prototype.getPlaces = function() {
  return this._places;
}

Atlas.prototype.getCurrentPlace = function() {
  return this._currentPlace;
}

Atlas.prototype.setCurrentPlace = function(id) {
  this._currentPlace = this.getPlace(id);
}

Atlas.prototype._fetchLocation = function(id, depth) {
  var thisAtlas = this;
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

      thisAtlas.addPlace(id, tmpPlace);

      //Ensure we always have a current place
      if(!thisAtlas.getCurrentPlace()) {
        thisAtlas.setCurrentPlace(id);
      }

      //This place connects with others, fill in the roads section
      if(responseArray['connectsWith']) {
        var newConnections = responseArray['connectsWith'];
        for(var x = 0; x < newConnections.length; x++) {
          var newPlaceID = newConnections[x];
          thisAtlas.addLocation(newPlaceID, depth - 1);
        }
      }
    }
  }
  client.open("GET", "http://pleiades.stoa.org/places/" + id + "/json");
  client.send()
}
