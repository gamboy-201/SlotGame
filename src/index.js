import Phaser from "phaser";
import Game from "./Game";
class SlotGame extends Phaser.Scene {
    constructor() {
        super();
        this.reelCheatIndex = [0,0,0];
        this.cheatActive = false;
    }

    preload() {
        this.load.image('Arrow', './Assets/Arrow.png');
        this.load.image('Background', './Assets/Background.png');
        this.load.image('Banana', './Assets/Banana.png');
        this.load.image('Blackberry', './Assets/Blackberry.png');
        this.load.image('CheatToolBackground', './Assets/CheatToolBackground.png');
        this.load.image('CheatToolInput', './Assets/CheatToolInput.png');
        this.load.image('Cherry', './Assets/Cherry.png');
        this.load.image('Spin', './Assets/Spin.png');
        this.load.image('Win', './Assets/Win.png');
    }

    create() {
        this.gameObject = new Game(0,0, this, 3, 4, 3);
        let normalContainer = this.add.container(window.innerWidth / 2, window.innerWidth / 2);
        this.normalContainer = normalContainer;
        normalContainer.add(this.gameObject);
        var background = this.add.sprite(0, 0, 'Background');
        this.background=background;
        normalContainer.add(background);
        console.log(this.gameObject);
        console.log(normalContainer);
        this.scale.on('resize', this.resize, this);
        this.resizeInit();


        
        this.addSpinButton();
        this.addCheatTool();
        this.setCheatToolButtons();     
        this.addBigWin();   
    }
    addSpinButton(){
        this.spinBtn = this.add.sprite(0, 350, 'Spin');
        this.normalContainer.add(this.spinBtn);
        this.spinBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', this.spinClicked.bind(this));
    }

    addBigWin(){
        this.bigWin = this.add.sprite(0, -350, 'Win');
        this.normalContainer.add(this.bigWin);
        this.bigWin.visible = false;
    }

    addCheatTool(){
        let toolsContainer = this.add.container(-700, -620);
        this.normalContainer.add(toolsContainer);
        this.toolsContainer = toolsContainer;
        this.CheatToolBackground = this.add.sprite(0, 0, 'CheatToolBackground');
        toolsContainer.add(this.CheatToolBackground);
        this.CheatToolInput1 = this.add.sprite(-120, 0, 'CheatToolInput');
        toolsContainer.add(this.CheatToolInput1);
        this.CheatToolInput2 = this.add.sprite(0, 0, 'CheatToolInput');
        toolsContainer.add(this.CheatToolInput2);
        this.CheatToolInput3 = this.add.sprite(120, 0, 'CheatToolInput');
        toolsContainer.add(this.CheatToolInput3);
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.toolsText = this.add.text(-180, 80, "Tools", style);
        toolsContainer.add(this.toolsText);
        var style = { font: "bold 26px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.toolsTextUp = this.add.text(-200, -100, "SYMBOL POSITION IN THE REEL", style);
        toolsContainer.add(this.toolsTextUp);
        this.showToolArrow = this.add.sprite(-50,100,"Arrow");
        toolsContainer.add(this.showToolArrow);
        this.showToolArrow.setInteractive({ useHandCursor: true })
        .on('pointerdown', this.showCheatTool.bind(this));

        var style = { font: "bold 26px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.reelInput1 = this.add.text(-125, -13, "0", style);
        toolsContainer.add(this.reelInput1);
        var style = { font: "bold 26px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.reelInput2 = this.add.text(-5, -13, "0", style);
        toolsContainer.add(this.reelInput2);
        var style = { font: "bold 26px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.reelInput3 = this.add.text(115, -13, "0", style);
        toolsContainer.add(this.reelInput3);

        this.reelDown1 = this.add.sprite(-120, 35,"Arrow");
        toolsContainer.add(this.reelDown1);
        this.reelUp1 = this.add.sprite(-120, -35,"Arrow");
        toolsContainer.add(this.reelUp1);
        this.reelUp1.rotation = Math.PI;

        this.reelDown2 = this.add.sprite(0, 35,"Arrow");
        toolsContainer.add(this.reelDown2);
        this.reelUp2 = this.add.sprite(0, -35,"Arrow");
        toolsContainer.add(this.reelUp2);
        this.reelUp2.rotation = Math.PI;

        this.reelDown3 = this.add.sprite(120, 35,"Arrow");
        toolsContainer.add(this.reelDown3);
        this.reelUp3 = this.add.sprite(120, -35,"Arrow");
        toolsContainer.add(this.reelUp3);
        this.reelUp3.rotation = Math.PI;
    }

    setCheatToolButtons(){
        this.reelUp1.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[0]<7){
                this.cheatActive=true;
                this.reelCheatIndex[0]++;
                this.reelInput1.text = this.reelCheatIndex[0];
            }
        },this);
        this.reelDown1.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[0]>0){
                this.cheatActive=true;
                this.reelCheatIndex[0]--;
                this.reelInput1.text = this.reelCheatIndex[0];
            }
        },this);
        this.reelUp2.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[1]<7){
                this.cheatActive=true;
                this.reelCheatIndex[1]++;
                this.reelInput2.text = this.reelCheatIndex[1];
            }
        },this);
        this.reelDown2.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[1]>0){
                this.cheatActive=true;
                this.reelCheatIndex[1]--;
                this.reelInput2.text = this.reelCheatIndex[1];
            }
        },this);
        this.reelUp3.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[2]<7){
                this.cheatActive=true;
                this.reelCheatIndex[2]++;
                this.reelInput3.text = this.reelCheatIndex[2];
            }
        },this);
        this.reelDown3.setInteractive({ useHandCursor: true })
        .on('pointerdown', ()=>{
            if(this.reelCheatIndex[2]>0){
                this.cheatActive=true;
                this.reelCheatIndex[2]--;
                this.reelInput3.text = this.reelCheatIndex[2];
            }
        },this);
    }


    showCheatTool(){
        this.showToolArrow.setInteractive(false);
        this.showToolArrow.off('pointerdown',this.showCheatTool);
        var tween = this.tweens.add({
            targets: this.toolsContainer,
            y: -400,
            ease: 'linear',
            duration: 300,
            yoyo: false
        });
        setTimeout(()=>{
            this.showToolArrow.rotation=Math.PI;
            this.showToolArrow.setInteractive({ useHandCursor: true })
            .on('pointerdown', this.hideCheatTool.bind(this));
        },350);
    }

    hideCheatTool(){
        this.showToolArrow.setInteractive(false);
        this.showToolArrow.off('pointerdown',this.showCheatTool);
        var tween = this.tweens.add({
            targets: this.toolsContainer,
            y: -620,
            ease: 'linear',
            duration: 300,
            yoyo: false
        });
        setTimeout(()=>{
            this.showToolArrow.rotation=0;
            this.showToolArrow.setInteractive({ useHandCursor: true })
            .on('pointerdown', this.showCheatTool.bind(this));
        },350);
    }

    spinClicked(){
        this.bigWin.visible = false;
        clearTimeout(this.spinTimeOutStop);
        clearTimeout(this.timeoutSpinBtn);
        this.gameObject.spinReels(3);
        this.spinBtn.setInteractive(false);
        this.spinBtn.alpha = 0.5;
        this.spinTimeOutStop = setTimeout(()=>{
            this.gameObject.stopReelSpin(3);
        },1000);
    }

    enableSpinClick(){
        this.spinBtn.alpha = 1;
        this.spinBtn.setInteractive({ useHandCursor: true })
        if(this.gameObject.checkForWin()){
            this.bigWin.visible = true;
        }
    }

    addAnimation(key) {
        //
    }

    resizeInit() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        let scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        this.normalContainer.setScale(scale, scale);

        this.cameras.resize(width, height);

        this.normalContainer.setSize(width, height);
        this.normalContainer.setPosition(width / 2, height / 2);
        this.gameObject.setPosition(-768, -361);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        var width = gameSize.width;
        var height = gameSize.height;

        let scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        this.normalContainer.setScale(scale, scale);

        this.cameras.resize(width, height);

        this.normalContainer.setSize(width, height);
        this.normalContainer.setPosition(width / 2, height / 2);
        this.gameObject.setPosition(-768, -361);
    }
}


const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [SlotGame],
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
    }
};


const game = new Phaser.Game(config);