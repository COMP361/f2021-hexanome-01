import CardManager from './manager/CardManager';
import PlayerManager from './manager/PlayerManager';
import RoadManager from './manager/RoadManager';
import LaunchInfo from './model/LaunchInfo';

export enum GamePhase {
  
}
export default class GameInstance {
  game: string;
  creator: string;
  savegame: string;
  round: number;
  maxRound: number;
  phase: GamePhase;
  playerManager: PlayerManager;
  roadManager: RoadManager;
  cardManager: CardManager;
  itemManager: ItemManager;

  constructor(launchInfo: LaunchInfo) {
    this.game = launchInfo.gameServer;
    this.savegame = launchInfo.savegame;
    this.creator = launchInfo.creator;
    this.playerManager = new PlayerManager(launchInfo.players);
    this.cardManager = new CardManager(null);
    this.roadManager = new RoadManager(launchInfo.players);
    this.itemManager = new this.itemManager();
  }


  

}
