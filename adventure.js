class AdventureScene extends Phaser.Scene {

    init(data, ishooman = [], placeditems = []) {
        this.inventory = data.inventory || [];
        this.ishooman = ishooman;
        this.placeditems = placeditems;
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);
        this.meow = this.add.text(this.w * 0.75 + this.s, this.h * 0.56)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Meow!")
            .setAlpha(1)
            .setInteractive()
            .on("pointerdown", ()=>{
                //put meow sound here
            })
        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory, ishooman: this.ishooman, placeditems: this.placeditems});
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }

    //modifications begin here

    floatup(item, dist, message, itemname, sound = null, duration = 500){
        item.on('pointerdown', () => {
            this.showMessage(message);
            this.gainItem(itemname);
            this.tweens.add({
                targets: item,
                y: `-=${dist * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: duration,
                onComplete: () => item.destroy()
            });
            if(sound != null){
                sound.play();
            }
        });
    }

    flyaround(item, message, sound = null, duration = 500){
        item.setInteractive()
        item.on('pointerover', () => {
            this.showMessage(message);
            this.tweens.add({
                targets: item,
                x: this.s + (this.h - 2 * this.s) * Math.random(),
                y: this.s + (this.h - 2 * this.s) * Math.random(),
                ease: 'Sine.inOut',
                duration: duration
            });
            if(sound != null){
                sound.play();
            }
        })
    }
    nonowiggle(item, dist, message, sound = null, duration = 500){
        item.on('pointerdown', () => {
            this.showMessage(message);
            this.tweens.add({
                targets: item,
                x: '+=' + this.s*dist,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: duration
            });
            if(sound != null){
                sound.play();
            }
        });
    }
    addmessage(item, message){
        item.on('pointerover', () => {
            this.showMessage(message)
        })
    }
    placeitem(requreditemname, message, changeditem, changedtext) {
        if (this.hasItem(requreditemname)) {
            this.loseItem(requreditemname);
            this.showMessage(message);
            changeditem.setText(changedtext);
            this.placeditems.push(requreditemname);
            if((placeditems.find("Glass") != undefined) && 
            (placeditems.find("Annoying cat toy") != undefined) && 
            (placeditems.find("Hoomans favorite thing") != undefined)){
                this.ishooman.push(this.name);
                this.showMessage("Just need to meow now...")
            }
            else{
                this.showMessage("Hmm... hooman is still not awake. Need more");
            }
        }
    }
    textinits(...items){
        items.map(items => {
            items.setInteractive();
            items.setFontSize(this.s * 2)
        })
    }

    placething(placement){
        placement.on("pointerdown", ()=>{
            console.log("clicked")
            this.placeitem("Glass", "tink, tink", placement, "Noisy pile of glass🍺❌");
            this.placeitem("Hoomans favorite thing", "crunch", placement, "Hoomans favorite thing📱");
            this.placeitem("Annoying cat toy", "Squeak!!", placement, "TOY 🐁");
        });
    }


}