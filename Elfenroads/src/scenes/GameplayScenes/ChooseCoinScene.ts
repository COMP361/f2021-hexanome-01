import {CardUnit} from '../../classes/CardUnit';
import {CardManager} from '../../managers/CardManager';
import PlayerManager from '../../managers/PlayerManager';

export default class ChooseCoinScene extends Phaser.Scene {
  private callback!: Function;
  constructor() {
    super('choosecoinscene');
  }

  create(callback: Function) {
    this.createUIBanner();
    this.createUIChooseButton();
    this.createUIPassButton();
    this.callback = callback;
  }

  // Button to skip turn
  private createUIChooseButton(): void {
    // Create small button with the "next" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const passTurnButton = this.add.sprite(
      width - 60,
      height - 30,
      'brown-box'
    );
    this.add
      .image(passTurnButton.x, passTurnButton.y, 'get-cards')
      .setScale(0.1);

    // Add interactive pointer options for passTurnButton
    // After click, currentPlayer is updated via playerManager
    passTurnButton
      .setInteractive()
      .on('pointerdown', () => {
        passTurnButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        passTurnButton.clearTint();
      })
      .on('pointerup', () => {
        passTurnButton.clearTint();
        PlayerManager.getInstance().getCurrentPlayer().chooseCards();
        this.scene.get('uiscene').scene.restart();
        this.callback();
      });
  }

  // Button to skip turn
  private createUIPassButton(): void {
    // Create small button with the "next" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const passTurnButton = this.add.sprite(
      width - 30,
      height - 30,
      'brown-box'
    );
    this.add.image(passTurnButton.x, passTurnButton.y, 'next').setScale(0.7);

    // Add interactive pointer options for passTurnButton
    // After click, currentPlayer is updated via playerManager
    passTurnButton
      .setInteractive()
      .on('pointerdown', () => {
        passTurnButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        passTurnButton.clearTint();
      })
      .on('pointerup', () => {
        passTurnButton.clearTint();
        this.sound.play('pass');
        PlayerManager.getInstance().getCurrentPlayer().chooseGold();
        this.scene.get('uiscene').scene.restart();
        this.callback();
      });
  }

  // UI banner that displays what Phase of Elfenroads is being played
  private createUIBanner(): void {
    // Create text to notify that it is draw counter phase
    const selectCardnEdgeText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'Choose draw 2 card or getting coins',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    const gameWidth: number = this.cameras.main.width;
    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, selectCardnEdgeText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(selectCardnEdgeText);
  }
}
