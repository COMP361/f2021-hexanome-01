import { Towns } from "../scenes/MoveBootScene";
import { Town } from "./Towns";

export enum BootColour {
    Black,
    Blue,
    Red,
    Yellow,
    Purple,
    Green,
    None,
}

export class PlayerManager {
    private static instance: PlayerManager;
    private currentPlayer: number;
    private players: Array<String>;
    private bootColour: Array<BootColour>;
    private totalPoints: Array<number>;
    private totalCoins: Array<number>;
    private currentTown: Array<Town>;
    private visitedTowns: Array<Array<Town>>;

    private constructor() {
        this.currentPlayer = 0;
        this.players = [];
        this.bootColour = [];
        this.totalPoints = [];
        this.totalCoins = [];
        this.currentTown = [];
        this.visitedTowns = [];
    }

    public static getInstance() {
        if (!PlayerManager.instance) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    }

    public addPlayer(player: String, bootColour: BootColour) {
        this.players.push(player);
        this.bootColour.push(bootColour);
        this.totalPoints.push(0);
        this.totalCoins.push(0);
        this.currentTown.push(Towns.elvenhold);
        this.visitedTowns.push([]);
    }

    public removePlayer(playerIndex: number) {
        let attr = [this.players, this.bootColour, this.totalPoints, 
            this.totalCoins, this.currentTown, this.visitedTowns];
        attr.forEach(element => {
            element.splice(playerIndex, 1);
        });
    }
    
    public resetPlayers() {
        for (let i = 0; i < this.players.length; i++) {
            this.totalPoints[i] = 0;
            this.totalCoins[i] = 0;
            this.currentTown[i] = Towns.elvenhold;
            this.visitedTowns[i] = [];
        }
    }

    public getCurrentPlayer() {
        return this.currentPlayer;
    }

    public setCurrentPlayer(playerIndex: number) {
        this.currentPlayer = playerIndex;
    }

    public setNextPlayer() {
        if (this.currentPlayer < this.players.length-1) {
            this.currentPlayer++;
        }
        else {
            this.currentPlayer = 0;
        }
    }

    public addPoint(playerIndex: number) {
        this.totalPoints[playerIndex]++;
    }

    public addCoins(playerIndex: number, coinAmount: number) {
        this.totalCoins[playerIndex] += coinAmount;
    }

    public setTown(playerIndex: number, town: Town) {
        this.currentTown[playerIndex] = town;
    }

    public addTown(playerIndex: number, town: Town) {
        this.visitedTowns[playerIndex].push(town);
    }
}