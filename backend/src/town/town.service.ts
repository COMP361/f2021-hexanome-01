import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

    async createTowns(session_id: string): Promise<Promise<Town>[]> {
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
        let colors: string = ''
        players.forEach(player => {
            colors += player.color + ',';
        });

        colors = colors.slice(0,colors.lastIndexOf(','));

        return names.map(async name => {
            const town = this.townRepository.create();
            town.name = name;
            town.session_id = session_id;
            town.townPieces = colors;
            if (name == 'elvenhold') {
                town.currentPlayers = players;
                players.forEach(async player => {
                    player.currentTown = town;
                    player = await this.userRepository.save(player);
                })

                town.townPieces = '';
            }
            else {
                town.currentPlayers = [];
            }
            return await this.townRepository.save(town);
        });

        

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

        let player = await this.userRepository.findOne({
            session_id: session_id,
            name: player_name
        })

        if (new_town.currentPlayers.findIndex(player => player.name === player_name) == -1 && previous_town.currentPlayers.findIndex(player => player.name === player_name) > -1) {
            const colorIndex = new_town.townPieces.indexOf(player.color);
            if (colorIndex > -1) {
                await player.score ++;
                await this.userRepository.save(player);
                new_town.townPieces = new_town.townPieces.replace(','+player.color, '');
    
            }

            new_town.currentPlayers.push(player);
            previous_town.currentPlayers.splice(previous_town.currentPlayers.indexOf(player), 1);
            await this.townRepository.save(previous_town);
            await this.townRepository.save(new_town);
            return [previous_town, new_town];
        }

        return [previous_town, new_town];
    }

}