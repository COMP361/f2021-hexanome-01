import Phaser from 'phaser';

export default class Hand {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container
  isOpen: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const {height} = this.scene.scale;
    const {width} = this.scene.scale;
    const CARD_UP = height / 1.12;
    const CARD_SIZE = 0.2;

    // Initialize container to group elements
    this.container = scene.add.container(width / 4.2, CARD_UP);

    // Initialize/make settings menu hidden
    this.isOpen = true;

    // Create All Card Objects
    const dragonCard = this.scene.add.sprite(0, 0, 'dragon-card');
    dragonCard
        .setData({
          name: 'dragonCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(dragonCard);

    const giantPigCard = this.scene.add.sprite(30, 0, 'giant-pig-card');
    giantPigCard
        .setData({
          name: 'giantPigCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(giantPigCard);

    const elfCycleCard = this.scene.add.sprite(60, 0, 'elf-cycle-card');
    elfCycleCard
        .setData({
          name: 'elfCycleCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(elfCycleCard);


    const magicCloudCard = this.scene.add.sprite(90, 0, 'magic-cloud-card');
    magicCloudCard
        .setData({
          name: 'magicCloudCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(magicCloudCard);

    const unicornCard = this.scene.add.sprite(120, 0, 'unicorn-card');
    unicornCard
        .setData({
          name: 'unicornCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(unicornCard);

    const trollWagonCard = this.scene.add.sprite(150, 0, 'troll-wagon-card');
    trollWagonCard
        .setData({
          name: 'trollWagonCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(trollWagonCard);

    const raftCard = this.scene.add.sprite(180, 0, 'raft-card');
    raftCard
        .setData({
          name: 'raftCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(raftCard);

    const witchCard = this.scene.add.sprite(210, 0, 'witch-card');
    witchCard
        .setData({
          name: 'witchCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(witchCard);

    const goldCard = this.scene.add.sprite(240, 0, 'gold-card');
    goldCard
        .setData({
          name: 'goldCard',
        })
        .setScale(CARD_SIZE);
    this.container.add(goldCard);
  }


  // Show entire settings menu
  show() {
    if (this.isOpen) {
      return;
    }
    const {height} = this.scene.scale;
    const CARD_UP = height / 1.12;
    this.scene.tweens.add({targets: this.container, y: CARD_UP, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});
    this.isOpen = true;
  }

  // Hide entire settings menu
  hide() {
    if (!this.isOpen) {
      return;
    }
    const {height} = this.scene.scale;
    this.scene.tweens.add({targets: this.container, y: height + 100, duration: 300, ease: Phaser.Math.Easing.Sine.InOut});
    this.isOpen = false;
  }
}