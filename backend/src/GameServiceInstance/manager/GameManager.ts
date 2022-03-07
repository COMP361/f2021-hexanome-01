import GameInstance from '../GameInstance';
import LaunchInfo from '../model/LaunchInfo';

export default class GameManager {
  private static _instance: GameManager = new GameManager();
  private gameInstances: Map<string, Map<string, GameInstance>> = new Map();

  private constructor() {
    GameManager._instance = this;
  }

  public static getInstance(): GameManager {
    return this._instance;
  }

  getGame(game: string, game_id: string): GameInstance {
    if (
      !this.gameInstances.has(game) ||
      !this.gameInstances.get(game).has(game_id)
    ) {
      throw Error('no such game');
    }

    return this.gameInstances.get(game).get(game_id);
  }

  addGame(game: string, game_id: string, launchInfo: LaunchInfo): GameInstance {
    if (!this.gameInstances.has(game)) {
      this.gameInstances.set(game, new Map());
    }
    this.gameInstances.get(game).set(game_id, new GameInstance(launchInfo));

    return this.getGame(game, game_id);
  }

  deleteGame(game: string, game_id: string): String {
    if (!this.getGame(game, game_id)) {
      throw Error('no such game');
    }

    this.gameInstances.get(game).delete(game_id);

    return 'Game deleted';
  }
}
