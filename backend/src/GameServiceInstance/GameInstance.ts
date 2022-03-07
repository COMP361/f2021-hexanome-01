import CardManager from './manager/CardManager';
import ItemManager from './manager/ItemManager';
import PlayerManager from './manager/PlayerManager';
import RoadManager from './manager/RoadManager';
import LaunchInfo from './model/LaunchInfo';

export enum GamePhase {
  DEALTRAVELCARD = 'deal travel card',
  DRAWCOUNTER = 'draw counter',
  DRAWADDITIONALCOUNTER = 'draw additional counter',
  PLANROUTE = 'plan routes',
  MOVEBOOT = 'move boots',
  FINISH = 'finish',
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
    this.round = 1;
    this.maxRound = 3;
    this.phase = GamePhase.DEALTRAVELCARD;
    this.playerManager = new PlayerManager(launchInfo.players);
    this.cardManager = new CardManager(null);
    this.roadManager = new RoadManager(launchInfo.players);
    this.itemManager = new ItemManager(
      launchInfo.gameServer,
      launchInfo.players.length,
    );
  }
}
