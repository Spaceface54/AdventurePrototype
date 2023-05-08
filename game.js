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
        let kitchentext = this.add.text(this.w * 0.6, this.h *0.9, "Food place 🔥");
        let roomtext = this.add.text(this.w * 0.5, this.h *0.45, "hoomans' room 🚪");
        this.textinits(toy, bag, hthing,bowltext, kitchentext, roomtext);

        this.addmessage(toy, "*squeak*");
        this.addmessage(bag, "Oh, comforting darkness");
        this.addmessage(hthing, "Maybe I shouldn't...");
        this.addmessage(bowltext, "HUNGRY HUNGRY HUNGRY");
        this.addmessage(bowl, "*sad empty noises*");
        this.addmessage(kitchentext, "Hooman gives me food here...");
        this.addmessage(roomtext, "Hooman sleeps there");

        this.floatup(toy, 2, "*squeak!!*", "Annoying cat toy");
        this.floatup(hthing, 2, "Did it annyway", "Hoomans favorite thing");
        this.nonowiggle(bowl, 1, "clink, clank", null, 200);

        bag.on("pointerdown", ()=>{
            this.gotoScene("paperbag");
        })
        kitchentext.on("pointerdown", ()=>{
            this.gotoScene("kitchen");
        })
        roomtext.on("pointerdown", ()=>{
            this.gotoScene("roomdoor");
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
        for(let i = 0; i<5; i++){
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
        super("kitchen", "Kitchen");
    }
    onEnter() {
        let counter = this.add.rectangle(this.w*0.25, this.h*0.4, this.w*0.5, this.h*0.06);
        let closettext = this.add.text(this.w*0.55, this.h*0.5, "Dark Food Hole 🚪");
        let livingroomtext = this.add.text(this.w*0.02, this.h*0.75, "Den 🛏️");
        
        this.textinits(closettext, livingroomtext);
        this.addmessage(closettext, "Hmmm food...");
        this.addmessage(livingroomtext, "Sleepy place");

        closettext.on("pointerdown",()=>{
            this.gotoScene("closet");
        });
        livingroomtext.on("pointerdown",()=>{
            this.gotoScene("livingroom");
        });

        counter.setFillStyle(0xFFFFFF);
        for( let i  = 1; i<6; i++){
            let cup = this.add.text(this.w *(0.1*i-0.05), this.h*0.3, "Cup?\n🍺");
            this.textinits(cup);
            this.addmessage(cup, "So close to the edge...")
            let wobble;
            cup.on('pointerover', ()=>{
                
                wobble = this.tweens.add({
                    targets:cup,
                    angle: {from: 0, to: 15},
                    duration: 300,
                    yoyo: true,
                    repeat: -1
                })
            })
            cup.on('pointerout', ()=>{
                console.log("out");
                wobble.stop()
                cup.angle = 0;
            })
            cup.on('pointerdown', ()=>{
                this.tweens.add({
                    targets:cup,
                    y: this.h*0.9,
                    angle: {from: 0, to: 90},
                    duration: 300,
                    onComplete:()=>{
                        let cup2 = this.add.text(cup.x, cup.y, "Glass\n🍺❌");
                        cup2.angle = cup.angle;
                        cup.destroy();
                        this.textinits(cup2);
                        this.floatup(cup2, 2, "Sparkly, loud", "Glass");
                        this.addmessage(cup2, "Tink, Tink");
                    }
                })
            })
        }
        
    }
}
class roomdoor extends AdventureScene {
    constructor() {
        super("roomdoor", "Bedroom");
    }
    onEnter() {
        let hooman = this.add.text(this.w*0.2, this.h*0.5, "Sleeping Hooman 😴");
        let placement1 = this.add.text(this.w*0.4, this.h*0.1,"Place thing?");
        let placement2 = this.add.text(this.w*0.4, this.h*0.3,"Place thing?");
        let placement3 = this.add.text(this.w*0.4, this.h*0.6,"Place thing?");
        let livingroomtext = this.add.text(this.w*0.55, this.h*0.9,"Den 🛏️");

        this.textinits(hooman, placement1, placement2, placement3, livingroomtext);

        this.placething(placement1);
        this.placething(placement2);
        this.placething(placement3);

        livingroomtext.on("pointerdown",()=>{
            this.gotoScene("livingroom");
        });

        this.meow.on("pointerdown", ()=>{
            if(this.placeditems.length >0){
                hooman.setText("Awake hooman 🥱");
                this.time.addEvent({
                    delay: 2000,
                    loop: false,
                    callback: () =>{
                        hooman.setText("Awake hooman 😑");
                        this.tweens.add({
                            targets:hooman,
                            x: livingroomtext.x,
                            y: livingroomtext.y,
                            duration: 2000,
                            onComplete:()=>{
                                this.tweens.add({
                                    targets:hooman,
                                    alpha:0,
                                    duration: 500,
                                })
                            }
                        })
                    }
                });
            }
        })
        
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
        this.add.text(50,100, "Meow to begin").setFontSize(20);
        let meow = this.add.text(70,100, "Meow!").setFontSize(20);
        meow.setInteractive();
        meow.on('pointerdown', () => {
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
    scene: [livingroom, kitchen, Intro, paperbag, roomdoor, goodending, badending],
    title: "Adventure Game",
});

