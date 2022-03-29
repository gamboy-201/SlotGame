import Reel from "./Reel";
class Game extends Phaser.GameObjects.Container{
    
    constructor(x,y,scene,numberOfReels,symbolsPerReel,availableSym) {
        super(scene,x,y);
        this.scene=scene;
        this.numberOfReels=numberOfReels;
        this.reels = [];
        this.configuration = [[2,1,0,1,0,2,0,1],[1,0,1,2,0,2,1,0],[0,1,2,0,2,1,0,2]];
        this.createReels(numberOfReels,symbolsPerReel,availableSym);
        this.stopIndex=0;
    }

    createReels(numberOfReels,symbolsPerReel,availableSym){
        for(let i=0;i<numberOfReels;i++){
            this.reels.push(new Reel(this,this.scene,symbolsPerReel,availableSym,i*390+200,-115,this.configuration[i],i));
        }
    }

    spinReels(numberOfReels){
        this.stopIndex=0;
        for(let i=0;i<numberOfReels;i++){
            this.reels[i].stopCtr=0;
            this.reels[i].stopSpin=false;
            this.reels[i].spinReel();
        }
    }

    // stopReelSpin(){
    //     let ctr=0;
    //     let thisObj = this;
    //     this.stopInterval = setInterval(()=>{
    //         if(ctr == thisObj.numberOfReels){
    //             clearInterval(this.stopInterval);
    //         }
    //         else{
    //             thisObj.reels[ctr].stopSpinReel();
    //             ctr++;
    //         }
    //     },Math.floor(Math.random() * 1000)+500)
    // }

    stopReelSpin(){
        let thisObj = this;
        this.stopTimeoutReel = setTimeout(()=>{
            if(this.stopIndex == thisObj.numberOfReels){
                clearTimeout(this.stopTimeoutReel);
            }
            else{
                thisObj.reels[this.stopIndex].stopSpinReel();
                this.stopIndex++;
            }
        },Math.floor(Math.random() * 500)+500)
    }

    checkForWin(){
        let commonSym = this.reels[0].stopSymId;
        let isWin = true;
        for(let i=1;i<this.numberOfReels;i++){
            if(this.reels[i].stopSymId !== commonSym){
                isWin = false;
                break;
            } 
        }
        return isWin;
    }
}
export default Game;