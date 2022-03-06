import Edge, { EdgeType } from '../model/Edge';
import { LaunchPlayer } from '../model/LaunchInfo';
import Town from '../model/Town';

export default class RoadManager {
  private edges: Map<String, Map<String, Array<Object>>>;
  private towns: Town[];
  constructor(launchPlayers: LaunchPlayer[]) {
    this.createTowns(launchPlayers);
    this.createEdges();
  }

  private createTowns(launchPlayers: LaunchPlayer[]): void {
    const colors = launchPlayers.map((player) => player.preferredColour);
    const names: String[] = [
      'elvenhold',
      'feodor',
      'lapphalya',
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
      'yttar',
    ];
    names.map((name) => this.towns.push(new Town(name, colors)));
  }

  private createEdges(): void {
    const edges = [
      // Usselen - wylhien
      new Edge('usselen', 'wylhien', EdgeType.PLAIN, []),
      // Usselen - parundia
      new Edge('usselen', 'parundia', EdgeType.WOOD, []),
      // Usselen - yttar
      new Edge('usselen', 'yttar', EdgeType.WOOD, []),
      // wylhien - parundia
      new Edge('wylhien', 'parundia', EdgeType.PLAIN, []),
      // wylhien - albaran
      new Edge('wylhien', 'albaran', EdgeType.DESERT, []),
      // wylhien - jaccaranda
      new Edge('wylhien', 'jaccaranda', EdgeType.MOUNTAIN, []),
      // jaccaranda - tichih
      new Edge('jaccaranda', 'tichih', EdgeType.MOUNTAIN, []),
      // jaccaranda - throtmanni
      new Edge('jaccaranda', 'throtmanni', EdgeType.MOUNTAIN, []),
      // throtmanni - albaran
      new Edge('throtmanni', 'albaran', EdgeType.DESERT, []),
      // throtmanni - feodor
      new Edge('throtmanni', 'feodor', EdgeType.DESERT, []),
      // throtmanni - rivinia
      new Edge('throtmanni', 'rivinia', EdgeType.WOOD, []),
      // throtmanni - tichih
      new Edge('throtmanni', 'tichih', EdgeType.PLAIN, []),
      // tichih - ergeren
      new Edge('tichih', 'ergeren', EdgeType.WOOD, []),
      // yttar - parundia (water)
      new Edge('yttar', 'parundia', EdgeType.LAKE, []),
      // yttar - grangor
      new Edge('yttar', 'grangor', EdgeType.MOUNTAIN, []),
      // yttar - grangor (water)
      new Edge('yttar', 'grangor', EdgeType.LAKE, []),
      // parundia - grangor (water)
      new Edge('parundia', 'grangor', EdgeType.LAKE, []),
      // parundia - albaran
      new Edge('parundia', 'albaran', EdgeType.DESERT, []),
      // albaran - dagamura
      new Edge('albaran', 'dagamura', EdgeType.DESERT, []),
      // albaran - feodor
      new Edge('albaran', 'feodor', EdgeType.DESERT, []),
      // feodor - dagamura
      new Edge('feodor', 'dagamura', EdgeType.DESERT, []),
      // feodor - lapphalya
      new Edge('feodor', 'lapphalya', EdgeType.WOOD, []),
      // feodor - rivinia
      new Edge('feodor', 'rivinia', EdgeType.WOOD, []),
      // rivinia - lapphalya
      new Edge('rivinia', 'lapphalya', EdgeType.WOOD, []),
      // ergeren - elvenhold
      new Edge('ergeren', 'elvenhold', EdgeType.WOOD, []),
      // grangor - mahdavikia
      new Edge('grangor', 'mahdavikia', EdgeType.MOUNTAIN, []),
      // kihromah - dagamura
      new Edge('kihromah', 'dagamura', EdgeType.WOOD, []),
      // dagamura - mahdavikia
      new Edge('dagamura', 'mahdavikia', EdgeType.MOUNTAIN, []),
      // dagamura - jxara
      new Edge('dagamura', 'jxara', EdgeType.WOOD, []),
      // dagamura - lapphalya
      new Edge('dagamura', 'lapphalya', EdgeType.WOOD, []),
      // lapphalya - jxara
      new Edge('lapphalya', 'jxara', EdgeType.WOOD, []),
      // lapphalya - virst
      new Edge('lapphalya', 'virst', EdgeType.PLAIN, []),
      // lapphalya - elvenhold
      new Edge('lapphalya', 'elvenhold', EdgeType.PLAIN, []),
      // elvenhold - virst (water)
      new Edge('elvenhold', 'virst', EdgeType.LAKE, []),
      // elvenhold - strykhaven (water)
      new Edge('elvenhold', 'strykhaven', EdgeType.LAKE, []),
      // elvenghold - beata
      new Edge('elvenhold', 'beata', EdgeType.PLAIN, []),
      // mahdavikia - jxara
      new Edge('mahdavikia', 'jxara', EdgeType.MOUNTAIN, []),
      // jxara - virst
      new Edge('jxara', 'virst', EdgeType.PLAIN, []),
      // virst - strykhaven (water)
      new Edge('virst', 'strykhaven', EdgeType.LAKE, []),
      // virst - strykhaven
      new Edge('virst', 'strykhaven', EdgeType.MOUNTAIN, []),
      // strykhaven - beata
      new Edge('strykhaven', 'beata', EdgeType.PLAIN, []),
      // Wylhien - Usselen (river)
      new Edge('wylhien', 'usselen', EdgeType.RIVER, []),
      // Elvenhold - rivinia (river)
      new Edge('elvenhold', 'rivinia', EdgeType.RIVER, []),
      // rivinia - tichih (river)
      new Edge('rivinia', 'tichih', EdgeType.RIVER, []),
      // beata - elvenhold (river)
      new Edge('beata', 'elvenhold', EdgeType.RIVER, []),
      // virst - jxara (river)
      new Edge('virst', 'jxara', EdgeType.RIVER, []),
      // jxara - mahdavikia (river)
      new Edge('jxara', 'mahdavikia', EdgeType.RIVER, []),
      // mahdavikia - grangor (river)
      new Edge('mahdavikia', 'grangor', EdgeType.RIVER, []),
    ];

    for (const town of this.towns) {
      this.edges.set(town.name, new Map());
    }

    for (const edge of edges) {
      this.edges
        .get(edge.edgeStart)
        .set(edge.edgeEnd, [edge.edgeType, edge.obstacles]);

      if (!(edge.edgeType === EdgeType.RIVER)) {
        this.edges
          .get(edge.edgeEnd)
          .set(edge.edgeStart, [edge.edgeType, edge.obstacles]);
      }
    }
  }

  placeCounter(startTown: string, endTown: string, obstacle: String): void {
    (this.edges.get(startTown).get(endTown)[1] as String[]).push(obstacle);
    (this.edges.get(endTown).get(startTown)[1] as String[]).push(obstacle);
  }

  getCounters(startTown: string, endTown: string): String[] {
    return this.edges.get(startTown).get(endTown)[1] as String[];
  }

  removeCounter(
    startTown: string,
    endTown: string,
    obstacleIndex: number,
  ): void {
    (this.edges.get(startTown).get(endTown)[1] as String[]).splice(
      obstacleIndex,
      1,
    );
  }
}
