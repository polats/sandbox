class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'assets/background.png');
        // this.load.image('logo-enclave', 'img/logo-enclave.png');
        // this.load.image('loading-background', 'img/loading-background.png');
        // WebFont.load({ custom: { families: ['Berlin'], urls: ['fonts/BRLNSDB.css'] } });
    }
    create() {
        GameManager.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        this.scene.start('Preloader');
    }
}

class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
		this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        // var logoEnclave = this.add.sprite(EPT.world.centerX, EPT.world.centerY-100, 'logo-enclave');
        // logoEnclave.setOrigin(0.5, 0.5);
		// var loadingBg = this.add.sprite(EPT.world.centerX, EPT.world.centerY+100, 'loading-background');
		// loadingBg.setOrigin(0.5, 0.5);

		// var progress = this.add.graphics();
		// this.load.on('progress', function (value) {
		// 	progress.clear();
		// 	progress.fillStyle(0xffde00, 1);
		// 	progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		// });

		// var resources = {
		// 	'image': [
		// 		['title', 'img/title.png']
		// 	],
		// 	'spritesheet': [
		// 		['button-start', 'img/button-start.png', {frameWidth:180,frameHeight:180}],
		// 		['button-settings', 'img/button-settings.png', {frameWidth:80,frameHeight:80}],
		// 		['loader', 'img/loader.png', {frameWidth:45,frameHeight:45}]
		// 	]
		// };
		// for(var method in resources) {
		// 	resources[method].forEach(function(args) {
		// 		var loader = this.load[method];
		// 		loader && loader.apply(this.load, args);
		// 	}, this);
		// };
    }
    create() {
		// GameManager.fadeOutScene('MainMenuScene', this);
	}
}

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


var GameManager = {}

GameManager.config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 768, // 1366, 768, 360 // most common resolutions: desktop, tablet, mobile
		height: 1024 // 768 1024 640
    },
    scene: [BootScene, PreloaderScene]
};

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


GameManager.startGame = function() {

    var game = new Phaser.Game(GameManager.config);

}


module.exports.GameManager = GameManager;