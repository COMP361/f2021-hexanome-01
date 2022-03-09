import {EdgeType} from '../enums/EdgeType';
import {ItemUnit} from './ItemUnit';
import Town from './Town';

export default class Edge {
  private srcTown: Town;
  private destTown: Town;
  private edgeType: EdgeType;
  private position: Array<number>;
  private items: Array<ItemUnit>;

  constructor(
    srcTown: Town,
    destTown: Town,
    edgeType: EdgeType,
    position: Array<number>
  ) {
    this.srcTown = srcTown;
    this.destTown = destTown;
    this.edgeType = edgeType;
    this.position = position;
    this.items = [];
  }

  public getSrcTown(): Town {
    return this.srcTown;
  }

  public getDestTown(): Town {
    return this.destTown;
  }

  public getPosition(): Array<number> {
    return this.position;
  }

  public getType(): EdgeType {
    return this.edgeType;
  }
}
