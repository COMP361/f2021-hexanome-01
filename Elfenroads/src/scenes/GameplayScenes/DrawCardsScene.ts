import Phaser from 'phaser';
import {CardUnit} from '../../classes/CardUnit';
import {CardManager} from '../../managers/CardManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCardsScene extends Phaser.Scene {
  public cardSprites!: Array<Phaser.GameObjects.Sprite>;
  public callback!: Function;

  constructor() {
    super('drawcardssscene');
  }

  create(callback: Function) {
    this.callback = callback;
    this.cardSprites = [];

    // Create UI banner in the middle of the screen
    this.createUIBanner();

    // Create pass turn button
    this.createPassTurnButton();

    // Render the three face up cards
    this.renderCards();
  }

  private createUIBanner() {
    // Create text to notify that it is draw counter phase
    const drawCounterText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Draw Card',
      {
        fontFamily: 'MedievalSharp',
        fontSize: '30px',
      }
    );

    const gameWidth: number = this.cameras.main.width;
    // Create brown ui panel element relative to the size of the text
    const brownPanel: Phaser.GameObjects.RenderTexture = this.add
      .nineslice(0, 0, drawCounterText.width + 20, 40, 'brown-panel', 24)
      .setOrigin(0, 0);

    // Initialize container to group elements
    // Need to center the container relative to the gameWidth and the size of the text box
    const container: Phaser.GameObjects.Container = this.add.container(
      gameWidth / 2 - brownPanel.width / 2,
      90
    );

    // Render the brown panel and text
    container.add(brownPanel);
    container.add(drawCounterText);
  }

  private createPassTurnButton() {
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
    // PlayerTurnScene is rerendered to show whose turn it is
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
        PlayerManager.getInstance().getCurrentPlayer().setPassedTurn(true);
        PlayerManager.getInstance().setNextPlayer();
        this.scene.get('uiscene').scene.restart();
        let finishedPlayers: integer = 0;
        PlayerManager.getInstance()
          .getPlayers()
          .forEach(player => {
            if (player.getPassedTurn() === true) {
              finishedPlayers++;
            }
          });

        if (
          finishedPlayers === PlayerManager.getInstance().getPlayers().length
        ) {
          this.callback();
        } else {
          this.scene.restart();
        }
      });
  }

  private renderCards() {
    const gameWidth: number = this.cameras.main.width;
    let previousWidth: integer = gameWidth / 2 + 200;

    while (this.cardSprites.length) {
      this.cardSprites[0].destroy();
      this.cardSprites.splice(0, 1);
    }

    // Render the 3 face up cards
    const faceUpPile: Array<CardUnit> =
      CardManager.getInstance().getFaceUpPile();
    for (let i = 0; i < faceUpPile.length; i++) {
      this.generateCard(previousWidth, faceUpPile[i], i);
      previousWidth += 60;
    }

    // Render a face down counter pile
    //this.generateRandomCard(previousWidth);
  }

  private generateCard(
    previousWidth: integer,
    card: CardUnit,
    index: number
  ): void {
    const currentCard = card;
    const cardSprites = this.add
      .sprite(previousWidth, 110, currentCard.getName())
      .setScale(0.2)
      .setInteractive();

    // Make counter interactive if it's the current player's turn.
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      cardSprites
        .on('pointerdown', () => {
          cardSprites.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          cardSprites.clearTint();
        })
        .on('pointerup', () => {
          cardSprites.clearTint();
          this.sound.play('collect');
        });
    }

    // If not player's turn, disable the counters
    else {
      cardSprites.setTint(0xd3d3d3);
      this.add.sprite(previousWidth, 110, 'cross');
    }

    this.cardSprites.push(cardSprites);
  }

  private generateRandomCard(previousWidth: integer): void {
    const currentCard = CardManager.getInstance().getRandomCard();
    const cardSprite = this.add
      .sprite(previousWidth, 110, 'unknown-counter')
      .setScale(0.25)
      .setInteractive();

    // Make counter interactive if it's the current player's turn.
    if (
      PlayerManager.getInstance().getCurrentPlayer() ===
      PlayerManager.getInstance().getLocalPlayer()
    ) {
      cardSprite
        .on('pointerdown', () => {
          cardSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          cardSprite.clearTint();
        })
        .on('pointerup', () => {
          cardSprite.clearTint();
        });
    }

    // If not player's turn, disable the counters
    else {
      cardSprite.setTint(0xd3d3d3);
      this.add.sprite(previousWidth, 110, 'cross');
    }

    this.cardSprites.push(cardSprite);
  }
}
