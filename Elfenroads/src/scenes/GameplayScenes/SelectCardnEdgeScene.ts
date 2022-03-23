import UIScene from '../UIScene';
import {CardManager} from '../../managers/CardManager';
import RoadManager from '../../managers/RoadManager';
import {CardUnit} from '../../classes/CardUnit';
import Edge from '../../classes/Edge';
import PlayerManager from '../../managers/PlayerManager';

export default class SelectionScene extends Phaser.Scene {
  private selected: Array<Phaser.GameObjects.Sprite> = [];
  private checkSprites: Array<Phaser.GameObjects.Sprite> = [];
  public static seletedCards: Array<CardUnit> = [];
  public static selectedEdge: Edge;

  constructor() {
    super('selectionscene');
  }

  create() {
    // Create text to notify that it is draw counter phase
    const selectCardnEdgeText: Phaser.GameObjects.Text = this.add.text(
      10,
      6,
      'To Select Cards & Edge',
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

    this.makeCardsSelectable();
    this.makeEdgeSelectable();
  }

  private removeChecksExcept(check: Phaser.GameObjects.Sprite) {
    for (const s of this.checkSprites) {
      if (s === check) continue;
      this.checkSprites.splice(this.checkSprites.indexOf(s), 1);
      s.destroy();
    }
  }

  makeEdgeSelectable() {
    const graphics = this.add.graphics();
    graphics.lineStyle(8, 0xd3d3d3, 0.5);
    // make a check sprite for each selectable edge
    RoadManager.getInstance()
      .getEdges()
      .forEach(edge => {
        if (edge.getItems().length > 0) {
          const check = this.add.sprite(
            (edge.getPosition()[0] / 1600) * this.cameras.main.width,
            (edge.getPosition()[1] / 750) * this.cameras.main.height,
            'check'
          );
          check.setScale(0.5);
          check
            .setInteractive()
            .on('pointerdown', () => {
              check.setTint(0xd3d3d3);
            })
            .on('pointerout', () => {
              check.clearTint();
            })
            .on('pointerup', () => {
              check.clearTint();
              SelectionScene.selectedEdge = edge;
              this.removeChecksExcept(check);
            });
          this.checkSprites.push(check);
        }
      });
  }

  private isSeleted(card: Phaser.GameObjects.Sprite): number {
    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i] === card) {
        return i;
      }
    }
    return -1;
  }

  makeCardsSelectable(): void {
    const {height} = this.scale;
    // Create confirm button at bottom right corner to confirm selection.
    const confirmButton = this.add.sprite(
      height + 25,
      height - 40,
      'brown-box'
    );
    this.add.image(confirmButton.x, confirmButton.y, 'check').setScale(0.5);

    confirmButton
      .setInteractive()
      .on('pointerdown', () => {
        confirmButton.setTint(0xd3d3d3);
      })
      .on('pointerout', () => {
        confirmButton.clearTint();
      })
      .on('pointerup', () => {
        confirmButton.clearTint();
        if (this.selected.length > 0) {
          for (const card of this.selected) {
            const c = CardManager.getInstance().getSelectedCard(
              PlayerManager.getInstance().getCurrentPlayer(),
              card.name
            );
            if (c === undefined) {
              card.y += 50;
              this.selected.splice(this.selected.indexOf(card), 1);
            } else {
              card.removeInteractive();
              SelectionScene.seletedCards.push(c);
            }
          }
          const currPlayer = PlayerManager.getInstance().getCurrentPlayer();
          const cards = SelectionScene.seletedCards;
          const edge = SelectionScene.selectedEdge;
          if (edge === undefined) return;
          if (cards.length <= 0) return;
          if (CardManager.getInstance().playCards(currPlayer, cards, edge)) {
            for (const card of this.selected) {
              const c = CardManager.getInstance().getSelectedCard(
                PlayerManager.getInstance().getCurrentPlayer(),
                card.name
              );
              if (c === undefined) {
                this.selected.splice(this.selected.indexOf(card), 1);
              } else {
                card.destroy();
                SelectionScene.seletedCards.splice(
                  SelectionScene.seletedCards.indexOf(c),
                  1
                );
              }
            }
            this.scene.get('uiscene').scene.restart();
            console.log('YOOOOO ITS WORKING!');
          }
        }
      });
    // make every cards in hand selectable
    for (const card of UIScene.cardSprites) {
      // make it possible to select card
      card
        .setInteractive()
        .on('pointerover', () => {
          card.setTint(0xffffff);
          card.y -= 50;
        })
        .on('pointerdown', () => {
          card.setTint(0x808080);
          const index: number = this.isSeleted(card);
          if (index === -1) {
            card.y -= 50;
            this.selected.push(card);
          } else {
            card.y += 50;
            this.selected.splice(index, 1);
          }
        })
        .on('pointerout', () => {
          card.clearTint();
          card.y += 50;
        })
        .on('pointerup', () => {
          card.clearTint();
        });
    }
  }
}
