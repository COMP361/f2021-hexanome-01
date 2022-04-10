import {io} from 'socket.io-client';
import {Counter} from '../classes/ItemUnit';
import {
  getGame,
  getSession,
  getSessionId,
  getUser,
} from '../utils/storageUtils';
import {CardManager} from './CardManager';
import ItemManager from './ItemManager';
import PlayerManager from './PlayerManager';
import RoadManager from './RoadManager';

const demapItem = (item: any) => {
  const newItem = {...item};
  if (item instanceof Counter) {
    newItem.cardsNeeded = Object.fromEntries(item.getCardsNeeded());
  }
  return newItem;
};

export default class SocketManager {
  private static instance: SocketManager;
  private socket: any;
  private headers: Object;
  private initialized: boolean;
  private isHost: boolean;
  private scene: any;
  private ui: any;

  private constructor() {
    this.socket = io('http://elfenroads.westus3.cloudapp.azure.com:3455/');
    this.headers = {
      game: getGame() || 'ElfenlandVer1',
      session_id: getSessionId(),
    };
    this.initialized = false;
    this.isHost = getUser().name === getSession().gameSession.creator;
    // Subscribe to socket events
    this.socket.emit('joinLobby', this.headers);

    // If we aren't the host, we need to alert the host that we've joined
    // so they can send the initial state.
    if (!this.isHost) {
      this.socket.emit('chat', this.headers);
      // If we are the host, we need to listen for players joining so we can
      // send them the initial state.
    } else {
      this.socket.on('chat', () => {
        this.emitStatusChange({
          roundSetup: true,
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
        });
      });
    }

    // Whenever we receive a statusChange emission, update our managers.
    this.socket.on('statusChange', (data: any) => {
      const managers = data.msg.data;

      // If we've already received the initial round state, no need to
      // update any managers.
      if (managers.roundSetup && this.initialized) return;

      // When a round is initialized, the host sends the state to all
      // players any time a new player joins, so we keep track of
      // whether or not we've already received the initial state.
      if (managers.roundSetup) this.initialized = true;

      // For each manager received, update our local managers.
      if (managers['CardManager']) {
        CardManager.getInstance().update(managers['CardManager']);
        console.log(CardManager.getInstance());
      }

      if (managers['ItemManager']) {
        ItemManager.getInstance().update(managers['ItemManager']);
        console.log(ItemManager.getInstance());
      }

      if (managers['PlayerManager']) {
        PlayerManager.getInstance().update(managers['PlayerManager']);
        console.log(PlayerManager.getInstance());
      }

      if (managers['RoadManager']) {
        RoadManager.getInstance().update(managers['RoadManager']);
        console.log(RoadManager.getInstance());
      }

      // We always restart the UI after receiving a state update.
      this.getUI().restart();

      // If we need to move to the next phase, call the scene callback,
      if (managers.nextPhase) {
        this.getScene().scene.nextPhase();
        // otherwise, restart the scene.
      } else {
        this.getScene()?.restart();
      }
    });

    // If we're the host of the game, we handle initial round state
    // (i.e. dealing cards to players, flipped over counters, etc.),
    // so anytime a player joins the game, we send the state to
    // everyone. Players who have already received the initial state
    // will ignore the emission.
    if (this.isHost) {
      this.socket.on('chat', () => {
        this.emitStatusChange({
          roundSetup: true,
          CardManager: CardManager.getInstance(),
          ItemManager: ItemManager.getInstance(),
          PlayerManager: PlayerManager.getInstance(),
        });
      });
    }

    // These are references to the gameplay/UI scenes, set within the
    // scenes themselves via the setScene method.
    this.scene = null;
    this.ui = null;
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public emitStatusChange(data: any): void {
    // Maps can't be converted to objects, so we need to convert them manually
    if (data.PlayerManager) {
      const newPlayerManager = {...data.PlayerManager};
      newPlayerManager.players = data.PlayerManager.players.map(
        (player: any) => {
          const newPlayer = {...player};
          newPlayer.myItems = player.myItems.map(demapItem);
          return newPlayer;
        }
      );
      data.PlayerManager = newPlayerManager;
    }
    if (data.ItemManager) {
      const newItemManager = {...data.ItemManager};
      newItemManager.itemPile = [...data.ItemManager.itemPile.map(demapItem)];
      newItemManager.faceUpPile = [
        ...data.ItemManager.faceUpPile.map(demapItem),
      ];
      data.ItemManager = newItemManager;
    }
    if (data.RoadManager) {
      const newRoadManager = {...data.RoadManager};
      newRoadManager.allEdges = [
        ...data.RoadManager.allEdges.map((edge: any) => {
          const newEdge = {...edge};
          newEdge.items = edge.items.map(demapItem);
          return newEdge;
        }),
      ];
      data.RoadManager = newRoadManager;
    }
    // Send the cleaned managers to all active users
    this.socket.emit('statusChange', {
      ...this.headers,
      data: {
        ...data,
      },
    });
  }

  public getSocket(): any {
    return this.socket;
  }

  public setScene(scene: any): void {
    this.scene = scene;
  }

  public getScene(): any {
    return this.scene;
  }

  public setUI(scene: any): void {
    this.ui = scene;
  }

  public getUI(): any {
    return this.ui;
  }
}
