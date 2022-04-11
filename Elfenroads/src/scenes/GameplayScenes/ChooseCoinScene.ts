import PlayerManager from '../../managers/PlayerManager';

export default class ChooseCoinScene extends Phaser.Scene {
  private callback!: Function;

  constructor() {
    super('choosecoinscene');
  }

  create(callback: Function) {
    this.scene.get('selectionscene').scene.pause();
    this.createUIBanner();
    this.createUIGetButton();
    this.createUIGoldButton();
    this.callback = callback;
  }

  // Button to make a choice
  private createUIGetButton(): void {
    // Create small button with the "get-cards" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const getCardsButton = this.add.sprite(
      width - 90,
      height - 30,
      'brown-box'
    );
    this.add
      .image(getCardsButton.x, getCardsButton.y, 'get-cards')
      .setScale(0.05);

    // Add interactive pointer options for passTurnButton
    // After click, currentPlayer is updated via playerManager
    getCardsButton
      .setInteractive()
      .on('pointerdown', () => {
        getCardsButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        getCardsButton.clearTint();
      })
      .on('pointerup', () => {
        getCardsButton.clearTint();
        PlayerManager.getInstance().getCurrentPlayer().chooseCards();
        this.scene.launch('drawtwocardscene', () => {
          this.scene.get('drawtwocardscene').scene.stop();
          this.callback();
        });
      });
  }

  // Button to skip turn
  private createUIGoldButton(): void {
    // Create small button with the "next" icon
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const passTurnButton = this.add.sprite(
      width - 30,
      height - 30,
      'brown-box'
    );
    const goldImage = this.add
      .image(passTurnButton.x, passTurnButton.y, 'gold-cirle')
      .setScale(1);

    this.add
      .text(
        goldImage.getCenter().x,
        goldImage.getCenter().y,
        `${PlayerManager.getInstance().getCurrentPlayer().getGoldToAdd()}`,
        {
          fontFamily: 'MedievalSharp',
          fontSize: '19px',
          color: 'black',
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(4);

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
        this.callback();
      });
  }

  // UI banner that displays what Phase of Elfenroads is being played
  private createUIBanner(): void {
    // Create text to notify that it is draw counter phase
    const selectCardnEdgeText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Draw Two Cards or Collect Coins',
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
