import {
  Counter,
  GoldPiece,
  ItemUnit,
  Obstacle,
  Spell,
} from '../classes/ItemUnit';
import Player from '../classes/Player';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';

export class BidManager {
  private static bidManagerInstance: BidManager;
  private bidItems: Array<ItemUnit>;
  private currentItem: number;
  private highestBid: number;
  private highestBidPlayer: Player | null;
  private auctionedOffItems: Array<ItemUnit>;
  private isActive: boolean;

  private constructor() {
    this.bidItems = [];
    this.currentItem = 0;
    this.highestBid = 0;
    this.highestBidPlayer = null;
    this.auctionedOffItems = [];
    this.isActive = false;
  }

  public static getInstance(): BidManager {
    if (!BidManager.bidManagerInstance) {
      BidManager.bidManagerInstance = new BidManager();
    }
    return BidManager.bidManagerInstance;
  }

  public startBid(): boolean {
    // "open the auction" and draw items from pile
    if (!this.isActive) {
      this.isActive = true;
      const playerInstance = PlayerManager.getInstance();
      // draw the double amount of players
      const totalItems = 2 * playerInstance.getPlayers().length;
      const itemInstance = ItemManager.getInstance();
      for (let i = 0; i < totalItems; i++) {
        const item = itemInstance.getRandomItem();
        this.bidItems.push(item);
      }
      return true;
    }
    // auction already started
    return false;
  }

  // made it a bool so that we can display whether the setBid was sucessful
  public setBid(player: Player, bid: number): boolean {
    if (this.isActive && bid > this.highestBid) {
      this.highestBidPlayer = player;
      this.highestBid = bid;
      return true;
    }
    // display error message: "your bid must be higher than the highest bid"
    return false;
  }

  // run this function when bidding over an item is over
  public endBid(): boolean {
    if (this.isActive) {
      // check if we have a bidder
      if (this.highestBidPlayer !== null) {
        const goldAmount = this.highestBidPlayer.getGold();
        const remainingAmount = goldAmount - this.highestBid;
        // player gives all their coins and restart auction on the same item
        if (remainingAmount < 0) {
          this.highestBidPlayer.setGold(0);
        }
        // player won the bid and set next item to auction
        else {
          this.highestBidPlayer.setGold(remainingAmount);
          const item = this.bidItems[this.currentItem];
          this.auctionedOffItems.push(item);
          this.highestBidPlayer.addItem(item);
          this.currentItem++;
        }
        // reset bid
        this.highestBid = 0;
        this.highestBidPlayer = null;
      }
      // set next item since everyone passed
      else {
        this.currentItem++;
      }
      // we are done with the whole auction
      if (this.currentItem === this.bidItems.length) {
        const itemManager = ItemManager.getInstance();
        // put items back to pile if they are not auctioned off
        this.bidItems.forEach(item => {
          if (!this.auctionedOffItems.includes(item)) {
            itemManager.addToPile(item);
          }
        });
        // reset everything "close the auction"
        this.bidItems = [];
        this.currentItem = 0;
        this.highestBid = 0;
        this.highestBidPlayer = null;
        this.auctionedOffItems = [];
        this.isActive = false;
        return true;
      }
    }
    // the whole auction is not over yet
    return false;
  }

  public getHighestBid(): number {
    return this.highestBid;
  }

  public getHighestBidPlayer(): Player | null {
    return this.highestBidPlayer;
  }

  public getBidItems(): Array<ItemUnit> {
    return this.bidItems;
  }

  public getCurrentItem(): number {
    return this.currentItem;
  }

  public getActive(): boolean {
    return this.isActive;
  }

  public update(manager: any): void {
    this.bidItems = manager.bidItems.map((item: any) => {
      if (item.type === 'spell') {
        return new Spell(item.name, item.allowedEdges, item.isHidden);
      } else if (item.type === 'counter') {
        return new Counter(
          item.name,
          item.allowedEdges,
          item.cardsNeeded,
          item.isHidden
        );
      } else if (item.type === 'gold-piece') {
        return new GoldPiece(item.allowedEdges, item.isHidden);
      } else {
        return new Obstacle(
          item.name,
          item.allowedEdges,
          item.needsCounter,
          item.isHidden
        );
      }
    });
    this.currentItem = manager.currentItem;
    this.highestBid = manager.highestBid;
    let highestBidPlayer = null;
    if (manager.highestBidPlayer) {
      highestBidPlayer = PlayerManager.getInstance()
        .getPlayers()
        .find(
          (player: any) =>
            manager.highestBidPlayer.bootColour === player.getBootColour()
        )
        ?.update(manager.highestBidPlayer);
    }
    this.highestBidPlayer = highestBidPlayer || null;
    this.auctionedOffItems = manager.auctionedOffItems.map((item: any) => {
      if (item.type === 'spell') {
        return new Spell(item.name, item.allowedEdges, item.isHidden);
      } else if (item.type === 'counter') {
        return new Counter(
          item.name,
          item.allowedEdges,
          item.cardsNeeded,
          item.isHidden
        );
      } else if (item.type === 'gold-piece') {
        return new GoldPiece(item.allowedEdges, item.isHidden);
      } else {
        return new Obstacle(
          item.name,
          item.allowedEdges,
          item.needsCounter,
          item.isHidden
        );
      }
    });
    this.isActive = manager.isActive;
    console.log(this);
  }
}
