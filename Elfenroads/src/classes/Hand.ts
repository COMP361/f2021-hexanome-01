import Phaser from 'phaser';

export default class Hand {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container
  isOpen: boolean;
  numCards: number;
  store: Map<string, string> = new Map([
    ['dragonCard', 'dragon-card'],
    ['giantPigCard', 'giant-pig-card'],
    ['elfCycleCard', 'elf-cycle-card'],
    ['magicCloudCard', 'magic-cloud-card'],
    ['uicornCard', 'unicorn-card'],
    ['trollWagonCard', 'troll-wagon-card'],
    ['raftCard', 'raft-card'],
    ['witchCard', 'witch-card'],
    ['goldCard', 'gold-card'],
  ]);

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.numCards = 0;

    // Define all variables required
    const {height} = this.scene.scale;
    const {width} = this.scene.scale;
    const CARD_UP = height / 1.12;

    // Initialize container to group elements
    this.container = scene.add.container(width / 4.2, CARD_UP);

    // Initialize/make settings menu hidden
    this.isOpen = true;
  }

  addCard(cardName: string) {
    const CARD_SIZE = 0.2;
    const img = this.store.get(cardName);

    if (img !== undefined) {
      const card = this.scene.add.sprite(this.numCards * 30, 0, img);
      card.setData({
            name: cardName,
          })
          .setScale(CARD_SIZE);
      this.container.add(card);
      this.numCards++;
    }
  }

  removeCard(cardName: string) {
    const children = this.scene.children;
    const child = children.getByName(cardName);
    if (child !== null) {
      child.destroy(true);
      this.numCards--;
    }
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