import Phaser from 'phaser';
import Player from '../../classes/Player';
import PlayerManager from '../../managers/PlayerManager';

export default class PlayerTurnScene extends Phaser.Scene {
  constructor() {
    super('playerturnscene');
  }

  create() {
    // Get the currentPlayer because it is their turn
    const currentPlayer: Player =
      PlayerManager.getInstance().getCurrentPlayer();

    // Extract substring of boot color from boot enum
    const bootString: string = currentPlayer
      .getBootColour()
      .slice(0, currentPlayer.getBootColour().indexOf('-'));

    // Create text to notify whose turn it is using boot color substring
    const playerText: Phaser.GameObjects.Text = this.add
      .text(10, 5, `${bootString.toUpperCase()}`, {
        fontFamily: 'MedievalSharp',
        fontSize: '50px',
      })
      .setColor(`${bootString.toLowerCase()}`);

    // Grab width of text to determine size of panel behind
    const textWidth: number = playerText.width;

    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, textWidth + 20, 60, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Grab width of current game to center our container
    const gameWidth: number = this.cameras.main.width;

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      20
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(playerText);
  }
}
