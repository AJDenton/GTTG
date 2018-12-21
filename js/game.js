//Main Menu Scene
let Menu = new Phaser.Scene('Menu')

//Initiate background image
this.menubg;

//Menu Preload
Menu.preload = function () {
    this.load.image('menubg', 'assets/startMenu.png');
    this.load.image('button', 'assets/startBtn.png');
    this.load.image('mutebutton', 'assets/mute.png');
    this.load.image('helpBtn', 'assets/helpBtn.png');
}

//Menu Create
Menu.create = function () {

    //Initialise sprites
    let menubg = this.add.sprite(0, 0, 'menubg');
    let button = this.add.sprite(517, 525, 'button');
    let mutebutton = this.add.sprite(150, 50, 'mutebutton');
    let helpBtn = this.add.sprite(50, 50, 'helpBtn');

    //Set scale of mute button
    mutebutton.setScale(.35);

    //Set origin of menu assets
    menubg.setOrigin(0, 0);
    button.setOrigin(0, 0);
    mutebutton.setOrigin(0, 0);
    helpBtn.setOrigin(0, 0);

    //Make start button interactive and change scene to game
    button.setInteractive();
    button.on('pointerdown', () => this.scene.start(gameScene));

    //Make help button interactive and change scene to help
    helpBtn.setInteractive();
    helpBtn.on('pointerdown', () => this.scene.start(help));

    //Make mute button interactive to toggle mute
    mutebutton.setInteractive();
    mutebutton.on('pointerdown', () => toggleMute());
}


//Game Over Scene
var gameOver = new Phaser.Scene('gameOver');

//Initialise text object
var gameOverText;

//This is gameover scene
this.gameOver;

//Game Over preload
gameOver.preload = function () {

    //Preload images into scene
    this.load.image('restart', 'assets/restart.png');
    this.load.image('gameOverScrn', 'assets/gameOver.png');

}

//Game Over Create
gameOver.create = function () {

    //Add sprite game over background
    this.add.sprite(667, 360, 'gameOverScrn');

    //Initialise Restart button
    let restart = this.add.sprite(667, 580, 'restart');

    //Console log to ensure this function works
    console.log('gameover!');

    //Make restart button interactive and bring back to start of game scene
    restart.setInteractive();
    restart.on('pointerdown', () => this.scene.start(gameScene));
}

//Game Over Update
gameOver.update = function () {

    //Initialise width, height and use to set position of text in game over scene
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var finalScore = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: 'Your final distance is ' + distance + ' m!',
        style: {
            font: '60px monospace',
            fill: '#ffffff'
        }
    });

    //Set origin of the text
    finalScore.setOrigin(0.5, 0.5);
}


//Help scene
var help = new Phaser.Scene('help');

//Help Preloader
help.preload = function () {

    //Load images into scene
    this.load.image('helpScrn', 'assets/helpScrn.png');
    this.load.image('back', 'assets/arrow.png');

    //Console log to ensure scene working
    console.log("Help screen!");
}

//Help create
help.create = function () {

    //Initialise 'back to main menu' sprite
    let back = this.add.sprite(100, 80, 'back');

    //Add sprites into help scene
    this.add.sprite(667, 360, 'helpScrn');
    this.add.sprite(100, 80, 'back');

    //Set back button to interactive to bring user back to main menu
    back.setInteractive();
    back.on('pointerdown', () => this.scene.start(Menu));

    //Set scale of back arrow
    back.setScale(1);

    //Initialise width, height and use to set position of text in help scene
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var helpText = this.make.text({
        x: width / 2 - 470,
        y: height / 2,
        text: 'Help Shiv navigate through the streets in \n order to get to her gig! See how far you \ncan make it by tapping the screen to jump \n            over obstacles!',
        style: {
            font: '40px monospace',
            fill: '#ffffff'
        }
    });
}

//Help update
help.update = function () {


}

//Game scene 
var gameScene = new Phaser.Scene(game);

//Game scene config
var config = {
    type: Phaser.AUTO,
    width: 1334,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 700
            },
            debug: false
        }
    },
    scene: [Menu, help, gameScene, gameOver]

};


let mute = false;

var images = [];
var game = new Phaser.Game(config);

//Animation variables
var test;
var test2;

//Distance score initialising
var distance = 0;
var distanceText;

//speed variable
var speed;

//For calculations on random barrel appearing
var randomNo = 120;


//Game Scene preload
gameScene.preload = function () {

    //Loading Screen Preload
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2, height / 2, 320, 50);

    //Loading text
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    //Percentage text
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    //Load sky background into game scene
    this.load.image('sky', 'assets/bg.png');

    //Load spritesheet into game and initiate frame sizes
    this.load.spritesheet('player',
        'assets/spritesheet3.png', {
            frameWidth: 120,
            frameHeight: 120
        }
    );

    //Load jump spritesheet into game and initiate frame sizes
    this.load.spritesheet('jump',
        'assets/jumpSpritesheet.png', {
            frameWidth: 120,
            frameHeight: 120
        }
    );

    //Load barrel into game
    this.load.image('barrel', 'assets/barrel.png');

    //Platforms
    this.load.image('platform', 'assets/road2.png');

    //Initiate keyboard controls
    cursors = this.input.keyboard.createCursorKeys();

    //Audio load
    this.load.audio('theme', [
                'assets/audio/8-bit.wav'
            ]);

}

//variable for platforms
var platforms;

//Game Scene Create
gameScene.create = function () {

    //distance score starts at 0
    distance = 0;

    //player is alive
    this.isPlayerAlive = true;

    //If the mute is not initialised, music plays when game begins
    if (!mute) {
        let music = this.sound.add('theme');
        music.play();
    }

    //Add music to game when game begins
    var music = this.sound.add('theme');

    //Add physics to background platform for character to collide with
    platforms = this.physics.add.group({
        key: 'platform',
        repeat: 20,
        setXY: {
            x: -50,
            y: 672,
            stepX: 100
        }
    });

    //Moving platforms
    platforms.children.iterate(function (child) {

        child.setCollideWorldBounds(true);
    });

    //Begin animating sky
    gameScene.test2 = gameScene.add.tileSprite(667, 375, 1334, 750, "sky");

    //Begin animating platform
    gameScene.test = gameScene.add.tileSprite(670, 667, 1334, 100, "platform");

    //Place sprite at set co-ordinates
    player = this.physics.add.sprite(200, 550, 'player');

    //Player does not slide/bounce
    player.setBounce(0);

    //Adding distance text
    distanceText = this.add.text(16, 16, 'distance: 0', {
        fontSize: '32px',
        fill: '#fff'
    });

    //Spritesheet animation incorporated into the game. Player continuously runs right. Spritesheet has 10 frames.
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 9
        }),
        frameRate: 20,
        repeat: -1
    });

    //Spritesheet animation incorporated into the game. Player jumps when in the air. Spritesheet has 6 frames.
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', {
            start: 0,
            end: 4
        }),
        frameRate: 5,
        repeat: 0
    });

    //Add physics to platforms and player
    gameScene.physics.add.collider(platforms, player);
}

//Variable for wait
var wait = 0;

//Game Scene Update
gameScene.update = function () {

    //Checks if player is dead
    if (!this.isPlayerAlive) {
        return;
    }

    //Console log to ensure barrel functionality is being accessed
    console.log(randomNo);
    console.log(wait);

    //Distance divides into a random number and no remainder AND wait is greater than 15 - Barrel will appear
    wait = wait + 0.5;
    if (distance % randomNo == 0 && wait > 15) {
        randomNo = Phaser.Math.Between(150, 400);
        barrel = this.physics.add.sprite(1400, 550, 'barrel');
        this.physics.add.collider(platforms, barrel);
        this.physics.add.overlap(player, barrel, this.hitBarrel, null, this);
        barrel.setCollideWorldBounds(false);
        barrel.setVelocityX(-600);
        barrel.setScale(1);
        wait = 0;
    }

    //move platforms
    gameScene.test.tilePositionX += 8;

    //move sky
    gameScene.test2.tilePositionX += 2;

    //Player automaically starts running when game is started, and remains in fixed position
    player.setVelocityX(0);

    //Player jump!
    if (player.y >= 550) {
        player.anims.play('right', true);
    } else {
        player.anims.play('jump', true);
    }

    //Player jumps when left mouse button is pressed. Velocity is -500. When combined with the game's gravity, the jump is quick enough to avoid objects.
    if (player.body.touching.down && this.input.activePointer.isDown) {
        player.setVelocityY(-500);

        //Console Log to ensure jump is accessed
        console.log("Jump!");

    }

    //continuously add 1 onto distance score when game scene has started and player is still alive
    distance += 1;

    //Distance score at top left
    distanceText.setText('Distance: ' + distance + 'm');
}

//Hit Barrel function
gameScene.hitBarrel = function (player, barrel) {

    //Delayed call if player hits a barrel. Camera fades and shakes
    this.time.delayedCall(100, function () {
        this.cameras.main.fade(500);
    }, [], this);

    //replace this.scene.restart with a camera Shake effect
    this.cameras.main.shake(100);

    //player alive flag set to dead
    this.isPlayerAlive = false;

    //Set player tint to red
    player.setTint(0xff0000);

    //Stop all animations of player
    player.anims.stop();

    //Stop all physics
    this.physics.pause();

    //Launch Game over scene
    this.scene.launch('gameOver');

}

//Game over function
gameScene.gameOver = function () {

    this.currentScene = new gameOver();

    //Reset distance to 0
    distance = 0;
}

//Mute function
function toggleMute() {
    //If mute not initiated, play sound. If mute initiated, play music
    if (!mute) {
        mute = true;
    } else {
        mute = false;
    }
}
