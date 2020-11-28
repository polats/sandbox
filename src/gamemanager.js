var GameManager = {};

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

  