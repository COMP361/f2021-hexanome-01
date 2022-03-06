import { Card } from './Card';
import { Obstacle } from './Obstacle';

export default class Hand {
  hiddenObstacle: Obstacle[];
  availableObstacle: Obstacle[];
  availableCards: Card[];
}
