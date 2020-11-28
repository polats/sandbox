var GameManager = {}

GameManager.config = {
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 768, // 1366, 768, 360 // most common resolutions: desktop, tablet, mobile
		height: 1024 // 768 1024 640
	},
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

GameManager.startGame = function() {

    var game = new Phaser.Game(GameManager.config);
    
}

function preload() {
    var assetRoot = '../assets/';
    this.load.image("dummyButton", assetRoot + "sprite.png");
    this.load.image("track", assetRoot + 'track.png');
    this.load.spritesheet('bar', assetRoot + 'bar.png', { frameWidth: 44, frameHeight: 22 });
}

function create() {
    var viewport = new sandbox.Viewport(this, 200, 200, 200, 200);
    var row = new sandbox.Row(this, 0, 0);

    viewport.addNode(row);

    // Add things to the row.
    var dummy_sprite_a = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_b = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_c = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_d = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_e = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_f = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_g = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_h = this.add.image(0, 0, "dummyButton");
    var dummy_sprite_i = this.add.image(0, 0, "dummyButton");

    row.addNode(dummy_sprite_a);
    row.addNode(dummy_sprite_b);
    row.addNode(dummy_sprite_c);
    row.addNode(dummy_sprite_d);
    row.addNode(dummy_sprite_e);
    row.addNode(dummy_sprite_f);
    row.addNode(dummy_sprite_g);
    row.addNode(dummy_sprite_h);
    row.addNode(dummy_sprite_i);

    var scrollbar = new sandbox.Scrollbar(
        this,
        viewport,
        true,
        false,
        "track",
        "bar",
        {'duration': 300, 'ease': Phaser.Math.Easing.Quadratic.Out}
    );

    Phaser.Display.Align.To.BottomCenter(scrollbar, viewport, 0, 128 + 10);

}

function update() {}


GameManager.fadeOutIn = function(passedCallback, context) {
    context.cameras.main.fadeOut(250);
    context.time.addEvent({
      delay: 250,
      callback: function() {
        context.cameras.main.fadeIn(250);
        passedCallback(context);
      },
      callbackScope: context
    });  
  }
  GameManager.fadeOutScene = function(sceneName, context) {
    context.cameras.main.fadeOut(250);
    context.time.addEvent({
        delay: 250,
        callback: function() {
          context.scene.start(sceneName);
        },
        callbackScope: context
    });
  };

class Button extends Phaser.GameObjects.Image {
    constructor(x, y, texture, callback, scene, noframes) {
      super(scene, x, y, texture, 0);
      this.setInteractive({ useHandCursor: true });
      
      this.on('pointerup', function() {
        if(!noframes) {
          this.setFrame(1);
        }
      }, this);
  
      this.on('pointerdown', function() {
        if(!noframes) {
          this.setFrame(2);
        }
        callback.call(scene);
      }, this);
  
      this.on('pointerover', function() {
        if(!noframes) {
          this.setFrame(1);
        }
      }, this);
  
      this.on('pointerout', function() {
        if(!noframes) {
          this.setFrame(0);
        }
      }, this);
  
      scene.add.existing(this);
    }
  };

  module.exports.GameManager = GameManager;