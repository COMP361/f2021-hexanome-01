import Phaser from 'phaser';

export default class WinnerScene extends Phaser.Scene {
  public callback!: Function;

  constructor() {
    super('winnerscene');
  }

  create(callback: Function) {
    this.callback = callback;

    // Create UI banner with GAME OVER text
    this.gameOverBanner();

    this.createSmokeBackground();
  }

  private gameOverBanner(): void {
    // Create text to notify whose turn it is using boot color substring
    const playerText: Phaser.GameObjects.Text = this.add
      .text(10, 5, 'GAMEOVER', {
        fontFamily: 'MedievalSharp',
        fontSize: '50px',
      })
      .setColor('white');

    // Grab width of text to determine size of panel behind
    const textWidth: number = playerText.width;

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, textWidth + 20, 60, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Grab width of current game to center our container
    const gameWidth: number = this.scale.width;

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      20
    );

    // Render the brown panel and text
    container.add(brownPanel).setDepth(4);
    container.add(playerText).setDepth(4);
  }

  private createSmokeBackground(): void {
    this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff)
      .setDepth(3)
      .setOrigin(0, 0);
  }
}
