import Phaser from 'phaser';

export default class CardScene extends Phaser.Scene {
  constructor() {
    super('cardscene');
  }

  create() {
    // position
    const {width, height} = this.scale;
    const CARD_UP = height/1.12;
    const CARD_SIZE = 0.2;

    const dragonCard = this.add.sprite(width / 4.3, CARD_UP, 'dragon-card');
    dragonCard
        .setData({
          name: 'dragonCard',
        })
        .setScale(CARD_SIZE);

    const giantPigCard = this.add.sprite(width / 3.9, CARD_UP, 'giant-pig-card');
    giantPigCard
        .setData({
          name: 'giantPigCard',
        })
        .setScale(CARD_SIZE);

    const elfCycleCard = this.add.sprite(width / 3.5, CARD_UP, 'elf-cycle-card');
    elfCycleCard
        .setData({
          name: 'elfCycleCard',
        })
        .setScale(CARD_SIZE);

    const magicCloudCard = this.add.sprite(width / 3.2, CARD_UP, 'magic-cloud-card');
    magicCloudCard
        .setData({
          name: 'magicCloudCard',
        })
        .setScale(CARD_SIZE);

    const unicornCard = this.add.sprite(width / 2.95, CARD_UP, 'unicorn-card');
    unicornCard
        .setData({
          name: 'unicornCard',
        })
        .setScale(CARD_SIZE);

    const trollWagonCard = this.add.sprite(width / 2.7, CARD_UP, 'troll-wagon-card');
    trollWagonCard
        .setData({
          name: 'trollWagonCard',
        })
        .setScale(CARD_SIZE);

    const raftCard = this.add.sprite(width / 2.5, CARD_UP, 'raft-card');
    raftCard
        .setData({
          name: 'raftCard',
        })
        .setScale(CARD_SIZE);

    const witchCard = this.add.sprite(width / 2.3, CARD_UP, 'witch-card');
    witchCard
        .setData({
          name: 'witchCard',
        })
        .setScale(CARD_SIZE);
  }
}
