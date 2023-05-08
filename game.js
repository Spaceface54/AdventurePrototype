class livingroom extends AdventureScene {
    constructor() {
        super("livingroom", "Living room");
    }

    onEnter() {

        /*let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });
        this.addmessage(clip, "metal, bent");*/
        /*
        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                this.useitem("key", "*squeak*", door, "unlocked door",() => this.gotoScene("demo2"));  
            })
        */
        let toy = this.add.text(this.w * 0.1, this.h *0.2, "TOY 🐁");
        let bag = this.add.text(this.w * 0.5, this.h *0.1, "Oooh bag 👜");
        let hthing = this.add.text(this.w * 0.35, this.h *0.7, "Hoomans favorite thing📱");
        let bowl = this.add.circle(this.w * 0.1, this.h *0.85, 60);
        bowl.setInteractive();
        bowl.setFillStyle(0xFFFFFF);
        let bowltext = this.add.text(this.w * 0.05, this.h *0.9, "Food bowl\n(sad,empty, hungry)");
        this.textinits(toy, bag, hthing,bowltext);

        this.addmessage(toy, "*squeak*");
        this.addmessage(bag, "Oh, comforting darkness");
        this.addmessage(hthing, "Maybe I shouldn't...");
        this.addmessage(bowltext, "HUNGRY HUNGRY HUNGRY");
        this.addmessage(bowl, "*sad empty noises*");

        this.floatup(toy, 2, "*squeak!!*", "annoying cat toy");
        this.floatup(hthing, 2, "Did it annyway", "Hoomans favorite thing");
        this.nonowiggle(bowl, 1, "clink, clank", null, 200);

        bag.on("pointerdown", ()=>{
            this.gotoScene("paperbag");
        })
    }
}

class paperbag extends AdventureScene {
    constructor() {
        super("paperbag", "Paper Bag");
    }
    onEnter() {
        this.cameras.main.setBackgroundColor(0x000000);
        let text1;
        let text2;
        for(let i = 0; i<10; i++){
            text1 =this.add.text(this.s + (this.h - 2 * this.s) * Math.random(), this.s + (this.h - 2 * this.s) * Math.random(), "So cozy....");
            text2 =this.add.text(this.s + (this.h - 2 * this.s) * Math.random(), this.s + (this.h - 2 * this.s) * Math.random(), "So dark....");
            this.textinits(text1, text2);
        }
        let exittext = this.add.text(this.w * 0.6, this.h * 0.2, "Leave?");
        this.textinits(exittext);
        this.flyaround(exittext, "Maybe here?", null, 500);
        exittext.setOrigin(0.5,0.5);
        this.tweens.add({
            targets:exittext,
            angle: {from: -5, to: 5},
            duration: 300,
            yoyo: true,
            repeat: -1
        })
        exittext.on("pointerdown", ()=>{
            this.gotoScene("livingroom");
        })
    }
}

class kitchen extends AdventureScene {
    constructor() {
        super("kitchen", "First Room");
    }
    onEnter() {
    }
}
class roomdoor extends AdventureScene {
    constructor() {
        super("roomdoor", "First Room");
    }
    onEnter() {
    }
}
class closet extends AdventureScene {
    constructor() {
        super("closet", "First Room");
    }
    onEnter() {
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('livingroom'));
        });
    }
}

class goodending extends Phaser.Scene {
    constructor() {
        super('goodending');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}
class badending extends Phaser.Scene {
    constructor() {
        super('badending');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [livingroom, Intro, paperbag, kitchen, roomdoor, goodending, badending],
    title: "Adventure Game",
});

