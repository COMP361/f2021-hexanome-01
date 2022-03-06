import { Obstacle } from './Obstacle';
import Town from './Town';

export default class Edge {
  edgeStart: Town;
  edgeEnd: Town;
  edgeType: EdgeType;
  obstacles: Obstacle[];
}

export enum EdgeType {
  PLAIN = 'plain',
  WOOD = 'wood',
  DESERT = 'desert',
  MOUNTAIN = 'mountain',
  RIVER = 'river',
  LAKE = 'lake',
}
