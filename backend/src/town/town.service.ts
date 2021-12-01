import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import e from "cors";
import { GameUser } from "src/user/user.model";
import { Repository } from "typeorm";
import { Town } from "./town.model";

@Injectable()
export class TownService {
    constructor(
        @InjectRepository(Town)
        private townRepository: Repository<Town>,
        @InjectRepository(GameUser)
        private userRepository: Repository<GameUser>
    ) { }

    async getTown(session_id: string, name: string): Promise<Town> {
        return this.townRepository.findOne({
            session_id: session_id,
            name: name
        });
    }

    async getTowns(session_id: string): Promise<Town[]> {
        return this.townRepository.find({
            session_id: session_id
        });
    }

    async createTowns(session_id: string): Promise<Town[]> {
        const names: string[] = ['elvenhold', 'feodor', 'lapphalya',
            'rivinia',
            'ergeren',
            'beafa',
            'strykhaven',
            'virst',
            'jxara',
            'mahdavikia',
            'grangor',
            'kihrimah',
            'dagamura',
            'albaran',
            'parundia',
            'usselen',
            'wylhien',
            'jaccaranda',
            'throtmanni',
            'tichih',
            'yttar'
        ]

        const players = await this.userRepository.find({
            session_id: session_id
        });
        const colors: string[] = players.map(player => player.color);

        const towns: Town[] = [];

        names.forEach(async name => {
            const town = new Town();
            town.name = name;
            town.session_id = session_id;
            town.townPieces = colors;
            if (name == 'elvenhold') {
                town.currentPlayers = players;
            }
            else {
                town.currentPlayers = [];
            }
            towns.push(await this.townRepository.save(town));
        });

        return towns;
    }

    async moveToTown(session_id: string, previous_name: string, new_name: string, player_name: string): Promise<Town[]> {
        const previous_town: Town = await this.townRepository.findOne({
            session_id: session_id,
            name: previous_name
        });

        const new_town: Town = await this.townRepository.findOne({
            session_id: session_id,
            name: new_name
        });

        const player = await this.userRepository.findOne({
            session_id: session_id,
            name: player_name
        })

        const index = new_town.townPieces.indexOf(player.color);
        if (index > -1) {
            player.score ++;
            new_town.townPieces.splice(index, 1);
        }

        new_town.currentPlayers.push(player);
        previous_town.currentPlayers.splice(previous_town.currentPlayers.indexOf(player), 1);

        return [previous_town, new_town];
    }

}