import {EdgeType} from '../enums/EdgeType';
import {ItemUnit} from './ItemUnit';
import {Town} from './Town';

export class Edge {
  town1: Town;
  town2: Town;
  edgeType: EdgeType;
  position: Array<number>;
  items: Array<ItemUnit>;

  constructor(
    town1: Town,
    town2: Town,
    edgeType: EdgeType,
    position: Array<number>
  ) {
    this.town1 = town1;
    this.town2 = town2;
    this.edgeType = edgeType;
    this.position = position;
    this.items = [];
  }
}
