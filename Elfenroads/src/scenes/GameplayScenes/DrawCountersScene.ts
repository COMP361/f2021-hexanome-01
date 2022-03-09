import Phaser from 'phaser';
import ItemManager from '../../managers/ItemManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCountersScene extends Phaser.Scene {
  // Global array to store buttons in this scene

  constructor() {
    super('drawcountersscene');
  }

  create() {
    // Create text to notify that it is draw counter phase
    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Draw Counter',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, drawCounterText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Grab width of current game to center our container
    const gameWidth: number = this.cameras.main.width;

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(drawCounterText);

    let previousWidth: integer = 0;
    for (let i = 0; i < 4; i++) {
      let currentItem = ItemManager.getInstance().getRandomItem();

      previousWidth += 50;

      const itemSprite = this.add
        .sprite(gameWidth / 2 + 150 + previousWidth, 110, currentItem.getName())
        .setScale(0.25)
        .setInteractive()
        .on('pointerdown', () => {
          itemSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          itemSprite.clearTint();
        })
        .on('pointerup', () => {
          itemSprite.clearTint();
          PlayerManager.getInstance().getCurrentPlayer().addItem(currentItem);
          currentItem = ItemManager.getInstance().getRandomItem();
          itemSprite.destroy();
          this.scene.stop('inventoryscene');
          this.scene.launch('inventoryscene');
          this.scene.stop('playericonscene');
          this.scene.launch('playericonscene');
        });
    }
  }

  generateCounter(): void {}
}
