class Reel extends Phaser.GameObjects.Container {
    constructor(reelsContainer, scene, symbolsPerReel, availableSym, x, y,configuration,reelID) {
        super(scene, x, y);
        this.scene = scene;
        this.reelID = reelID;
        this.reelsContainer = reelsContainer;
        this.symbolArr = [];
        this.symbolObjArr = {};
        this.availableSym = availableSym;
        this.symbolAvailArr = ["Banana", "Blackberry", "Cherry"];
        this.reelsContainer.add(this);
        this.stopSpin = false;
        this.stopCtr = 0;
        this.posArr = [152,456,760,1064];
        this.stopSymId = 0;
        this.configuration = configuration;
        this.configurationCtr = 0;
        this.createReel(symbolsPerReel, availableSym);
    }

    initializeReelPos(){
        this.posArr = [152,456,760,1064];
    }

    createReel(symbolsPerReel, availableSym) {
        for (let i = 0; i < symbolsPerReel; i++) {
            if(this.configurationCtr>=this.configuration.length){
                this.configurationCtr=0;
            }
            this.symbolArr.push(this.configuration[this.configurationCtr++]);
            this.createSymbol(i, this.symbolArr[i]);
        }
    }

    createSymbol(index, symbolNum) {
        this.symbolObjArr[`${index}`] = this.scene.add.sprite(349 / 2, 304 * (index - 1) + 304 / 2, this.symbolAvailArr[symbolNum]);
        this.symbolObjArr[`${index}`].gridPosition = index;
        this.symbolObjArr[`${index}`].name = this.symbolAvailArr[symbolNum];
        this.add(this.symbolObjArr[`${index}`]);
    }

    spinReel() {
        let thisObj = this;
        for (let i in this.symbolObjArr) {
            let yPos = this.symbolObjArr[`${i}`].y;
            var tween = this.scene.tweens.add({
                targets: this.symbolObjArr[`${i}`],
                y: yPos + 304,
                ease: 'linear',
                duration: 200,
                yoyo: false
            });
        }
        if (!this.stopSpin) {
            this.spinTimeOut = setTimeout(() => {
                for (let i in this.symbolObjArr) {
                    thisObj.calculateNextMove.call(thisObj, i);
                }
                thisObj.spinReel();
            }, 200);
        }
        else {
            this.spinTimeOutStop = setTimeout(() => {
                this.stopCtr++;
                if(this.stopCtr==1){
                    for (let i in this.symbolObjArr) {
                        thisObj.calculateStopSymbol.call(thisObj, i);
                    }
                    thisObj.spinReel();
                }
                else{
                    for (let i in this.symbolObjArr) {
                        thisObj.calculateNextMove.call(thisObj, i);
                    }
                    thisObj.stopReelAtPos();
                }
            }, 200);
        }
    }

    calculateNextMove(index) {
        if (this.symbolObjArr[`${index}`].y >= 760) {
            this.symbolObjArr[`${index}`].destroy();

            if(this.configurationCtr>=this.configuration.length){
                this.configurationCtr=0;
            }
            let symbolNum = this.configuration[this.configurationCtr++];
            this.symbolObjArr[`${index}`] = this.scene.add.sprite(349 / 2, 304 * (-1) + 304 / 2, this.symbolAvailArr[symbolNum]);
            this.symbolObjArr[`${index}`].gridPosition = 0;
            this.symbolObjArr[`${index}`].name = this.symbolAvailArr[symbolNum];
            this.add(this.symbolObjArr[`${index}`]);
            let value = this.posArr[0];
            this.posArr.shift();
            this.posArr.push(value);
        }
        else if (this.symbolObjArr[`${index}`].y == -152) {
            this.symbolObjArr[`${index}`].gridPosition = 1;
        }
        else if (this.symbolObjArr[`${index}`].y == 152) {
            this.symbolObjArr[`${index}`].gridPosition = 2;
        }
        else if (this.symbolObjArr[`${index}`].y == 456) {
            this.symbolObjArr[`${index}`].gridPosition = 3;
        }
    }

    calculateStopSymbol(index) {
        if (this.symbolObjArr[`${index}`].y >= 760) {
            this.symbolObjArr[`${index}`].destroy();
            if(this.configurationCtr>=this.configuration.length){
                this.configurationCtr=0;
            }
            if(this.scene.cheatActive){
                if(this.configurationCtr!==this.scene.reelCheatIndex[this.reelID]){
                    this.stopCtr=0;
                }
                else{
                    this.stopCtr=1;
                }
            }
            let symbolNum = this.configuration[this.configurationCtr++];
            this.symbolObjArr[`${index}`] = this.scene.add.sprite(349 / 2, 304 * (-1) + 304 / 2, this.symbolAvailArr[symbolNum]);
            this.symbolObjArr[`${index}`].gridPosition = 0;
            this.symbolObjArr[`${index}`].name = this.symbolAvailArr[symbolNum];
            this.add(this.symbolObjArr[`${index}`]);
            let value = this.posArr[0];
            this.posArr.shift();
            this.posArr.push(value);
            this.stopSymId = symbolNum;
        }
    }

    stopReelAtPos(){
        let thisObj = this;
        for (let i in this.symbolObjArr) {
            let indexN = Number.parseInt(i);
            let yPos = this.posArr[indexN];
            var tween = this.scene.tweens.add({
                targets: this.symbolObjArr[`${i}`],
                y: yPos+100,
                ease: 'linear',
                duration: 352,
                yoyo: false
            });
        }
        this.stopTimeOut = setTimeout(()=>{
            thisObj.setPositionAllSymbols.call(thisObj);
        },360);
    }

    setPositionAllSymbols() {
        let thisObj = this;
        for (let i in this.symbolObjArr) {
            let indexN = Number.parseInt(i);
            let yPos = this.posArr[indexN];
            var tween = this.scene.tweens.add({
                targets: this.symbolObjArr[`${i}`],
                y: yPos,
                ease: 'linear',
                duration: 200,
                yoyo: false
            });
        }
        this.setPositionTimeOut = setTimeout(() => {
            for (let i in this.symbolObjArr) {
                thisObj.calculateNextMoveFinal.call(thisObj, i);
            }
        }, 250);
    }

    calculateNextMoveFinal(index) {
        if (this.symbolObjArr[`${index}`].y >= 1064) {
            this.symbolObjArr[`${index}`].destroy();
            if(this.configurationCtr>=this.configuration.length){
                this.configurationCtr=0;
            }
            let symbolNum = this.configuration[this.configurationCtr++];
            this.symbolObjArr[`${index}`] = this.scene.add.sprite(349 / 2, 304 * (-1) + 304 / 2, this.symbolAvailArr[symbolNum]);
            this.symbolObjArr[`${index}`].gridPosition = 0;
            this.symbolObjArr[`${index}`].name = this.symbolAvailArr[symbolNum];
            this.add(this.symbolObjArr[`${index}`]);
            let value = this.posArr[0];
            this.posArr.shift();
            this.posArr.push(value);
            if(this.reelID==2){
                this.scene.enableSpinClick();
            }
            else{
                this.reelsContainer.stopReelSpin();
            }
        }
    }

    stopSpinReel() {
        this.stopSpin = true;
    }
}
export default Reel;