IMAGE_PIXEL_DATAURI =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFNUJGMUI5NjEwRjExRTdCNTdDQUEzMzM1RTIyRjg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFNUJGMUJBNjEwRjExRTdCNTdDQUEzMzM1RTIyRjg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEU1QkYxQjc2MTBGMTFFN0I1N0NBQTMzMzVFMjJGODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEU1QkYxQjg2MTBGMTFFN0I1N0NBQTMzMzVFMjJGODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4FxQZlAAAAHElEQVR42mL8//8/AymAiYFEMKphVMPQ0QAQYABVbQMd0MbiHwAAAABJRU5ErkJggg==";

BASE64_ATLAS =
{
    UI_PNG: require('./assets/uipng')
}

cacheImageViaUri = function(context, imagename, datauri) {

    context.textures.once('addtexture', function (key) {

        // check if it's a base64 atlas
        var b64atlas = BASE64_ATLAS[key];

        // load the atlas as [key]_ATLAS
        if (b64atlas) {
            var source = context.textures.get(key).source[0].source;
            var atlas = b64atlas.data.ATLAS;

            // listener for when atlas is loaded
            context.textures.once('addtexture', function (key) {
                // console.log(context.textures.get(key).getFrameNames())
            }, context);

            context.textures.addAtlasJSONArray(key + "_ATLAS", source, atlas);
        }

    }, context);

    context.textures.addBase64(imagename, datauri);
}

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        cacheImageViaUri(this, 'background', IMAGE_PIXEL_DATAURI);
        // this.load.image('background', 'assets/background.png');
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
		var grayBg = this.add.sprite(
                GameManager.world.centerX, 
                GameManager.world.centerY, 
                'background')
            .setDisplaySize(
                GameManager.world.width, 
                GameManager.world.height)
            .setTintFill(0x000000, 0x000000, 0x888888, 0x888888);

        var progressBarBg = this.add.sprite(
                GameManager.world.centerX, 
                GameManager.world.centerY, 
                'background')
            .setDisplaySize(
                GameManager.world.width * 0.75, 
                GameManager.world.height * 0.05)
            .setOrigin(0.5, 0.5);

        var resources = {
            'image': [
                ['title', 'img/title.png']
            ],
            'spritesheet': [
                ['button-start', 'img/button-start.png', {frameWidth:180,frameHeight:180}],
                ['button-settings', 'img/button-settings.png', {frameWidth:80,frameHeight:80}],
                ['loader', 'img/loader.png', {frameWidth:45,frameHeight:45}]
            ],
            'base64-spritesheet': [
                [BASE64_ATLAS.UI_PNG]
            ]
        };

        var progress = this.add.graphics();

        this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffde00, 1);
			progress.fillRect(
                GameManager.world.width * 0.15, 
                GameManager.world.height / 2 - (GameManager.world.height * 0.0175),
                GameManager.world.width * 0.70 * value,
                GameManager.world.height * 0.035);
        }); 
        

		for(var method in resources) {
			resources[method].forEach(function(args) {
                switch (method)
                {
                    case 'base64-spritesheet':
                        var id = args[0].data.ID;
                        var datauri = args[0].data.DATAURI;
                        cacheImageViaUri(this, id, datauri);   
                        break;

                    default:
                        var loader = this.load[method];
                        loader && loader.apply(this.load, args);
                        break;
                }
			}, this);
		};        
        
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

  GameManager.config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
		width: 360, // 1366, 768, 360 // most common resolutions: desktop, tablet, mobile
		height: 640 // 768 1024 640
    },
    scene: [BootScene, PreloaderScene]
};

GameManager.startGame = function(canvas = null, configOverride = null) {

   var config = 
    {
        ...GameManager.config,
        canvas
    }

    if (canvas === null) {
        config.scale.autoCenter = Phaser.Scale.CENTER_BOTH
    }

    if (configOverride) {
        config = {
            ...config,
            ...configOverride
        }
    }

    GameManager.game = new Phaser.Game(config);
}

module.exports.GameManager = GameManager;