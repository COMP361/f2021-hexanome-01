import Phaser from 'phaser';
import {CardUnit, GoldCard} from '../../classes/CardUnit';
import {CardManager} from '../../managers/CardManager';
import PlayerManager from '../../managers/PlayerManager';

export default class DrawCardsScene extends Phaser.Scene {
  private callback!: Function;
  private amountToDraw!: number;

  constructor() {
    super('drawcardssscene');
  }

  create(callback: Function) {
    this.callback = callback;
    this.amountToDraw = 3;

    // Create UI banner in the middle of the screen
    this.createUIBanner();

    // Create pass turn button
    this.createPassTurnButton();

    // Render all cards
    this.renderFaceUpPile();
    this.renderFaceDownPile();
    this.renderGoldPile();
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

  private renderFaceUpPile() {
    const gameWidth: number = this.cameras.main.width;
    let previousWidth: integer = gameWidth - 45;

    // Render the 3 face up cards
    const faceUpPile: Array<CardUnit> =
      CardManager.getInstance().getFaceUpPile();
    for (let i = 0; i < faceUpPile.length; i++) {
      this.renderFaceUpCard(previousWidth, faceUpPile[i], i);
      previousWidth -= 70;
    }

    // Create a panel underneath all 3 cards
    this.add
      .nineslice(gameWidth - 5, 170, 220, 120, 'brown-panel', 24)
      .setOrigin(1, 0.5)
      .setDepth(3);
  }

  private renderFaceUpCard(
    previousWidth: integer,
    card: CardUnit,
    index: number
  ): void {
    const currentCard = card;
    const cardSprite = this.add
      .sprite(previousWidth, 170, currentCard.getName())
      .setScale(0.15)
      .setInteractive()
      .setDepth(4);

    // Make counter interactive if it's the current player's turn.
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    if (currentPlayer === localPlayer) {
      cardSprite
        .on('pointerdown', () => {
          cardSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          cardSprite.clearTint();
        })
        .on('pointerup', () => {
          cardSprite.clearTint();
          this.sound.play('collect');
          CardManager.getInstance().claimFaceUpCard(currentPlayer, index);
          this.checkFinished();
        });
    }

    // If not player's turn, disable the counters
    else {
      cardSprite.setTint(0xd3d3d3);
      this.add
        .sprite(cardSprite.getCenter().x, cardSprite.getCenter().y, 'cross')
        .setDepth(5);
    }
  }

  private renderFaceDownPile(): void {
    const gameWidth: number = this.cameras.main.width;

    const faceDownSprite = this.add
      .sprite(gameWidth - 65, 300, 'unknown-card')
      .setScale(0.15)
      .setInteractive()
      .setDepth(4);

    // Make counter interactive if it's the current player's turn.
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    if (currentPlayer === localPlayer) {
      faceDownSprite
        .on('pointerdown', () => {
          faceDownSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          faceDownSprite.clearTint();
        })
        .on('pointerup', () => {
          faceDownSprite.clearTint();
          this.sound.play('collect');
          CardManager.getInstance().claimFaceDownCard(currentPlayer);
          this.checkFinished();
        });
    }

    // If not player's turn, disable the counters
    else {
      faceDownSprite.setTint(0xd3d3d3);
      this.add
        .sprite(
          faceDownSprite.getCenter().x,
          faceDownSprite.getCenter().y,
          'cross'
        )
        .setDepth(5);
    }

    // Create a panel underneath
    this.add
      .nineslice(
        faceDownSprite.getCenter().x,
        faceDownSprite.getCenter().y,
        80,
        120,
        'brown-panel',
        24
      )
      .setOrigin(0.5, 0.5)
      .setDepth(3);
  }

  private renderGoldPile(): void {
    const gameWidth: number = this.cameras.main.width;

    const goldPile: Array<GoldCard> =
      CardManager.getInstance().getGoldCardPile();

    const goldPileSprite = this.add
      .sprite(gameWidth - 160, 300, 'gold-card')
      .setScale(0.15)
      .setInteractive()
      .setDepth(4);

    // Make counter interactive if it's the current player's turn.
    const currentPlayer = PlayerManager.getInstance().getCurrentPlayer();
    const localPlayer = PlayerManager.getInstance().getLocalPlayer();
    if (currentPlayer === localPlayer && goldPile.length !== 0) {
      goldPileSprite
        .on('pointerdown', () => {
          goldPileSprite.setTint(0xd3d3d3);
        })
        .on('pointerout', () => {
          goldPileSprite.clearTint();
        })
        .on('pointerup', () => {
          goldPileSprite.clearTint();
          this.sound.play('collect');
          CardManager.getInstance().claimGoldCardPile(currentPlayer);
          this.checkFinished();
        });
    }

    // If not player's turn, disable the counters
    else {
      goldPileSprite.setTint(0xd3d3d3);
      this.add
        .sprite(
          goldPileSprite.getCenter().x,
          goldPileSprite.getCenter().y,
          'cross'
        )
        .setDepth(5);
    }

    // Create a panel underneath
    this.add
      .nineslice(
        goldPileSprite.getCenter().x,
        goldPileSprite.getCenter().y,
        80,
        120,
        'brown-panel',
        24
      )
      .setOrigin(0.5, 0.5)
      .setDepth(3);

    // Display number of cards
    const yellowPanel: Phaser.GameObjects.Sprite = this.add
      .sprite(
        goldPileSprite.getTopLeft().x - 15,
        goldPileSprite.getTopLeft().y + 15,
        'yellow-slider'
      )
      .setDepth(3);

    this.add
      .text(
        yellowPanel.getCenter().x - 3,
        yellowPanel.getCenter().y - 1,
        `${goldPile.length * 3}`,
        {
          fontFamily: 'MedievalSharp',
          fontSize: '19px',
          color: 'black',
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(4);
  }

  private checkFinished(): void {
    // If the currentPlayer has drawn the correct amount, then switch players
    if (this.amountToDraw === CardManager.getInstance().getAmountDrawn()) {
      CardManager.getInstance().setAmountDrawn(0);
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

      if (finishedPlayers === PlayerManager.getInstance().getPlayers().length) {
        this.callback();
      } else {
        this.scene.restart();
      }
    }

    // Else, currentPlayer needs to go again
    else {
      this.scene.get('uiscene').scene.restart();
      this.scene.restart();
    }
  }
}
