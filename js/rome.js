var Rome = {
  game: null,

  init: function() { //Init the required variables
    window.addEventListener("keypress", this);
  },

  handleEvent: function(e) {
    if(e.type == "keypress" && e.keyCode == ROT.VK_RETURN) { //Load the game
      window.removeEventListener("keypress", this);
      var displayOptions = {
        width: ROME_WIDTH,
        height: ROME_HEIGHT,
        spacing: .9,
        fontFamily: "arial"
      }
      this.display = new ROT.Display(displayOptions);
      document.getElementById('content').innerHTML = "";
      document.getElementById('content').appendChild(this.display.getContainer());

      this.scheduler = new ROT.Scheduler.Simple();
      this.engine = new ROT.Engine(this.scheduler);

      //Make the game
      this.game = new Game(this.WIDTH, this.HEIGHT);

      //this.scheduler.add(this.game.getPlayer(), true);
      this.engine.start();
    }
  },

  getScheduler: function() {
    return this.scheduler;
  },

  getEngine: function() {
    return this.engine;
  }


}
