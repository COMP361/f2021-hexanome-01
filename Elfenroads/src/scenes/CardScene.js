import Phaser from 'phaser';

export default class CardScene extends Phaser.Scene {
  constructor() {
    super('cardscene');
  }

  create() {
    const {width, height} = this.scale;

    const dragonCard = this.add.sprite(width / 2, height / 4, 'dragon-card');
    dragonCard
        .setData({
          name: 'dragonCard',
        })
        .setScale(0.2);

    const giantPigCard = this.add.sprite(width / 2, height / 4, 'giant-pig-card');
    giantPigCard
        .setData({
          name: 'giantPigCard',
        })
        .setScale(0.2);

    const elfCycleCard = this.add.sprite(width / 2, height / 4, 'elf-cycle-card');
    elfCycleCard
        .setData({
          name: 'elfCycleCard',
        })
        .setScale(0.2);

    const magicCloudCard = this.add.sprite(width / 2, height / 4, 'magic-cloud-card');
    magicCloudCard
        .setData({
          name: 'magicCloudCard',
        })
        .setScale(0.2);

    const unicornCard = this.add.sprite(width / 2, height / 4, 'unicorn-card');
    unicornCard
        .setData({
          name: 'unicornCard',
        })
        .setScale(0.2);

    const trollWagonCard = this.add.sprite(width / 2, height / 4, 'troll-wagon-card');
    trollWagonCard
        .setData({
          name: 'trollWagonCard',
        })
        .setScale(0.2);

    const raftCard = this.add.sprite(width / 2, height / 4, 'raft-card');
    raftCard
        .setData({
          name: 'raftCard',
        })
        .setScale(0.2);

    const witchCard = this.add.sprite(width / 2, height / 4, 'witch-card');
    witchCard
        .setData({
          name: 'witchCard',
        })
        .setScale(0.2);
  }
}
