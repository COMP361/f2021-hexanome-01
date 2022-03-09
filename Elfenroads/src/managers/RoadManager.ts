import Edge from '../classes/Edge';
import Town from '../classes/Town';
import {EdgeType} from '../enums/EdgeType';

export default class RoadManager {
  private static instance: RoadManager;
  private allEdges: Array<Edge>;
  private allTowns: Map<string, Town>;

  private constructor() {
    this.allTowns = Town.getAllTowns();

    this.allEdges = [
      // Usselen - wylhien
      new Edge(
        Town.getTown('usselen'),
        Town.getTown('wylhien'),
        EdgeType.Plain,
        [470, 170]
      ),
      // Usselen - parundia
      new Edge(
        Town.getTown('usselen'),
        Town.getTown('parundia'),
        EdgeType.Wood,
        [470, 260]
      ),
      // Usselen - yttar
      new Edge(
        Town.getTown('usselen'),
        Town.getTown('yttar'),
        EdgeType.Wood,
        [400, 270]
      ),
      // wylhien - parundia
      new Edge(
        Town.getTown('wylhien'),
        Town.getTown('parundia'),
        EdgeType.Plain,
        [535, 220]
      ),
      // wylhien - albaran
      new Edge(
        Town.getTown('wylhien'),
        Town.getTown('albaran'),
        EdgeType.Desert,
        [655, 245]
      ),
      // wylhien - jaccaranda
      new Edge(
        Town.getTown('wylhien'),
        Town.getTown('jaccaranda'),
        EdgeType.Mountain,
        [650, 170]
      ),
      // jaccaranda - tichih
      new Edge(
        Town.getTown('jaccaranda'),
        Town.getTown('tichih'),
        EdgeType.Mountain,
        [900, 190]
      ),
      // jaccaranda - throtmanni
      new Edge(
        Town.getTown('jaccaranda'),
        Town.getTown('throtmanni'),
        EdgeType.Mountain,
        [790, 230]
      ),
      // throtmanni - albaran
      new Edge(
        Town.getTown('throtmanni'),
        Town.getTown('albaran'),
        EdgeType.Desert,
        [785, 290]
      ),
      // throtmanni - feodor
      new Edge(
        Town.getTown('throtmanni'),
        Town.getTown('feodor'),
        EdgeType.Desert,
        [855, 300]
      ),
      // throtmanni - rivinia
      new Edge(
        Town.getTown('throtmanni'),
        Town.getTown('rivinia'),
        EdgeType.Wood,
        [950, 275]
      ),
      // throtmanni - tichih
      new Edge(
        Town.getTown('throtmanni'),
        Town.getTown('tichih'),
        EdgeType.Plain,
        [980, 240]
      ),
      // tichih - ergeren
      new Edge(
        Town.getTown('tichih'),
        Town.getTown('ergeren'),
        EdgeType.Wood,
        [1120, 270]
      ),
      // yttar - parundia (water)
      new Edge(
        Town.getTown('yttar'),
        Town.getTown('parundia'),
        EdgeType.Lake,
        [470, 315]
      ),
      // yttar - grangor
      new Edge(
        Town.getTown('yttar'),
        Town.getTown('grangor'),
        EdgeType.Mountain,
        [380, 390]
      ),
      // yttar - grangor (water)
      new Edge(
        Town.getTown('yttar'),
        Town.getTown('grangor'),
        EdgeType.Lake,
        [420, 380]
      ),
      // parundia - grangor (water)
      new Edge(
        Town.getTown('parundia'),
        Town.getTown('grangor'),
        EdgeType.Lake,
        [475, 365]
      ),
      // parundia - albaran
      new Edge(
        Town.getTown('parundia'),
        Town.getTown('albaran'),
        EdgeType.Desert,
        [630, 300]
      ),
      // albaran - dagamura
      new Edge(
        Town.getTown('albaran'),
        Town.getTown('dagamura'),
        EdgeType.Desert,
        [685, 385]
      ),
      // albaran - feodor
      new Edge(
        Town.getTown('albaran'),
        Town.getTown('feodor'),
        EdgeType.Desert,
        [765, 340]
      ),
      // feodor - dagamura
      new Edge(
        Town.getTown('feodor'),
        Town.getTown('dagamura'),
        EdgeType.Desert,
        [760, 390]
      ),
      // feodor - lapphalya
      new Edge(
        Town.getTown('feodor'),
        Town.getTown('lapphalya'),
        EdgeType.Wood,
        [855, 415]
      ),
      // feodor - rivinia
      new Edge(
        Town.getTown('feodor'),
        Town.getTown('rivinia'),
        EdgeType.Wood,
        [915, 325]
      ),
      // rivinia - lapphalya
      new Edge(
        Town.getTown('rivinia'),
        Town.getTown('lapphalya'),
        EdgeType.Wood,
        [940, 380]
      ),
      // ergeren - elvenhold
      new Edge(
        Town.getTown('ergeren'),
        Town.getTown('elvenhold'),
        EdgeType.Wood,
        [1165, 375]
      ),
      // grangor - mahdavikia
      new Edge(
        Town.getTown('grangor'),
        Town.getTown('mahdavikia'),
        EdgeType.Mountain,
        [390, 505]
      ),
      // kihromah - dagamura
      new Edge(
        Town.getTown('kihromah'),
        Town.getTown('dagamura'),
        EdgeType.Wood,
        [615, 420]
      ),
      // dagamura - mahdavikia
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('mahdavikia'),
        EdgeType.Mountain,
        [570, 485]
      ),
      // dagamura - jxara
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('jxara'),
        EdgeType.Wood,
        [670, 495]
      ),
      // dagamura - lapphalya
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('lapphalya'),
        EdgeType.Wood,
        [750, 475]
      ),
      // lapphalya - jxara
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('jxara'),
        EdgeType.Wood,
        [760, 525]
      ),
      // lapphalya - virst
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('virst'),
        EdgeType.Plain,
        [855, 520]
      ),
      // lapphalya - elvenhold
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('elvenhold'),
        EdgeType.Plain,
        [950, 455]
      ),
      // elvenhold - virst (water)
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('virst'),
        EdgeType.Lake,
        [985, 495]
      ),
      // elvenhold - strykhaven (water)
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('strykhaven'),
        EdgeType.Lake,
        [1060, 485]
      ),
      // elvenghold - beata
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('beata'),
        EdgeType.Plain,
        [1150, 455]
      ),
      // mahdavikia - jxara
      new Edge(
        Town.getTown('mahdavikia'),
        Town.getTown('jxara'),
        EdgeType.Mountain,
        [540, 570]
      ),
      // jxara - virst
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('virst'),
        EdgeType.Plain,
        [770, 585]
      ),
      // virst - strykhaven (water)
      new Edge(
        Town.getTown('virst'),
        Town.getTown('strykhaven'),
        EdgeType.Lake,
        [1010, 540]
      ),
      // virst - strykhaven
      new Edge(
        Town.getTown('virst'),
        Town.getTown('strykhaven'),
        EdgeType.Mountain,
        [1025, 595]
      ),
      // strykhaven - beata
      new Edge(
        Town.getTown('strykhaven'),
        Town.getTown('beata'),
        EdgeType.Plain,
        [1190, 545]
      ),
      // Wylhien - Usselen (river)
      new Edge(
        Town.getTown('wylhien'),
        Town.getTown('usselen'),
        EdgeType.River,
        [500, 205]
      ),
      // Elvenhold - rivinia (river)
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('rivinia'),
        EdgeType.River,
        [1080, 340]
      ),
      // rivinia - tichih (river)
      new Edge(
        Town.getTown('rivinia'),
        Town.getTown('tichih'),
        EdgeType.River,
        [1060, 270]
      ),
      // beata - elvenhold (river)
      new Edge(
        Town.getTown('beata'),
        Town.getTown('elvenhold'),
        EdgeType.River,
        [1180, 425]
      ),
      // virst - jxara (river)
      new Edge(
        Town.getTown('virst'),
        Town.getTown('jxara'),
        EdgeType.River,
        [705, 600]
      ),
      // jxara - mahdavikia (river)
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('mahdavikia'),
        EdgeType.River,
        [490, 580]
      ),
      // mahdavikia - grangor (river)
      new Edge(
        Town.getTown('mahdavikia'),
        Town.getTown('grangor'),
        EdgeType.River,
        [430, 505]
      ),
      // all opposite direction edges
      // Usselen - wylhien
      new Edge(
        Town.getTown('wylhien'),
        Town.getTown('usselen'),
        EdgeType.Plain,
        [470, 170]
      ),
      // Usselen - parundia
      new Edge(
        Town.getTown('parundia'),
        Town.getTown('usselen'),
        EdgeType.Wood,
        [470, 260]
      ),
      // Usselen - yttar
      new Edge(
        Town.getTown('yttar'),
        Town.getTown('usselen'),
        EdgeType.Wood,
        [400, 270]
      ),
      // wylhien - parundia
      new Edge(
        Town.getTown('parundia'),
        Town.getTown('wylhien'),
        EdgeType.Plain,
        [535, 220]
      ),
      // wylhien - albaran
      new Edge(
        Town.getTown('albaran'),
        Town.getTown('wylhien'),
        EdgeType.Desert,
        [655, 245]
      ),
      // wylhien - jaccaranda
      new Edge(
        Town.getTown('jaccaranda'),
        Town.getTown('wylhien'),
        EdgeType.Mountain,
        [650, 170]
      ),
      // jaccaranda - tichih
      new Edge(
        Town.getTown('tichih'),
        Town.getTown('jaccaranda'),
        EdgeType.Mountain,
        [900, 190]
      ),
      // jaccaranda - throtmanni
      new Edge(
        Town.getTown('throtmanni'),
        Town.getTown('jaccaranda'),
        EdgeType.Mountain,
        [790, 230]
      ),
      // throtmanni - albaran
      new Edge(
        Town.getTown('albaran'),
        Town.getTown('throtmanni'),
        EdgeType.Desert,
        [785, 290]
      ),
      // throtmanni - feodor
      new Edge(
        Town.getTown('feodor'),
        Town.getTown('throtmanni'),
        EdgeType.Desert,
        [855, 300]
      ),
      // throtmanni - rivinia
      new Edge(
        Town.getTown('rivinia'),
        Town.getTown('throtmanni'),
        EdgeType.Wood,
        [950, 275]
      ),
      // throtmanni - tichih
      new Edge(
        Town.getTown('tichih'),
        Town.getTown('throtmanni'),
        EdgeType.Plain,
        [980, 240]
      ),
      // tichih - ergeren
      new Edge(
        Town.getTown('ergeren'),
        Town.getTown('tichih'),
        EdgeType.Wood,
        [1120, 270]
      ),
      // yttar - parundia (water)
      new Edge(
        Town.getTown('parundia'),
        Town.getTown('yttar'),
        EdgeType.Lake,
        [470, 315]
      ),
      // yttar - grangor
      new Edge(
        Town.getTown('grangor'),
        Town.getTown('yttar'),
        EdgeType.Mountain,
        [380, 390]
      ),
      // yttar - grangor (water)
      new Edge(
        Town.getTown('grangor'),
        Town.getTown('yttar'),
        EdgeType.Lake,
        [420, 380]
      ),
      // parundia - grangor (water)
      new Edge(
        Town.getTown('grangor'),
        Town.getTown('parundia'),
        EdgeType.Lake,
        [475, 365]
      ),
      // parundia - albaran
      new Edge(
        Town.getTown('albaran'),
        Town.getTown('parundia'),
        EdgeType.Desert,
        [630, 300]
      ),
      // albaran - dagamura
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('albaran'),
        EdgeType.Desert,
        [685, 385]
      ),
      // albaran - feodor
      new Edge(
        Town.getTown('feodor'),
        Town.getTown('albaran'),
        EdgeType.Desert,
        [765, 340]
      ),
      // feodor - dagamura
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('feodor'),
        EdgeType.Desert,
        [760, 390]
      ),
      // feodor - lapphalya
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('feodor'),
        EdgeType.Wood,
        [855, 415]
      ),
      // feodor - rivinia
      new Edge(
        Town.getTown('rivinia'),
        Town.getTown('feodor'),
        EdgeType.Wood,
        [915, 325]
      ),
      // rivinia - lapphalya
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('rivinia'),
        EdgeType.Wood,
        [940, 380]
      ),
      // ergeren - elvenhold
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('ergeren'),
        EdgeType.Wood,
        [1165, 375]
      ),
      // grangor - mahdavikia
      new Edge(
        Town.getTown('mahdavikia'),
        Town.getTown('grangor'),
        EdgeType.Mountain,
        [390, 505]
      ),
      // kihromah - dagamura
      new Edge(
        Town.getTown('dagamura'),
        Town.getTown('kihromah'),
        EdgeType.Wood,
        [615, 420]
      ),
      // dagamura - mahdavikia
      new Edge(
        Town.getTown('mahdavikia'),
        Town.getTown('dagamura'),
        EdgeType.Mountain,
        [570, 485]
      ),
      // dagamura - jxara
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('dagamura'),
        EdgeType.Wood,
        [670, 495]
      ),
      // dagamura - lapphalya
      new Edge(
        Town.getTown('lapphalya'),
        Town.getTown('dagamura'),
        EdgeType.Wood,
        [750, 475]
      ),
      // lapphalya - jxara
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('lapphalya'),
        EdgeType.Wood,
        [760, 525]
      ),
      // lapphalya - virst
      new Edge(
        Town.getTown('virst'),
        Town.getTown('lapphalya'),
        EdgeType.Plain,
        [855, 520]
      ),
      // lapphalya - elvenhold
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('lapphalya'),
        EdgeType.Plain,
        [950, 455]
      ),
      // elvenhold - virst (water)
      new Edge(
        Town.getTown('virst'),
        Town.getTown('elvenhold'),
        EdgeType.Lake,
        [985, 495]
      ),
      // elvenhold - strykhaven (water)
      new Edge(
        Town.getTown('strykhaven'),
        Town.getTown('elvenhold'),
        EdgeType.Lake,
        [1060, 485]
      ),
      // elvenghold - beata
      new Edge(
        Town.getTown('beata'),
        Town.getTown('elvenhold'),
        EdgeType.Plain,
        [1150, 455]
      ),
      // mahdavikia - jxara
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('mahdavikia'),
        EdgeType.Mountain,
        [540, 570]
      ),
      // jxara - virst
      new Edge(
        Town.getTown('virst'),
        Town.getTown('jxara'),
        EdgeType.Plain,
        [770, 585]
      ),
      // virst - strykhaven (water)
      new Edge(
        Town.getTown('strykhaven'),
        Town.getTown('virst'),
        EdgeType.Lake,
        [1010, 540]
      ),
      // virst - strykhaven
      new Edge(
        Town.getTown('strykhaven'),
        Town.getTown('virst'),
        EdgeType.Mountain,
        [1025, 595]
      ),
      // strykhaven - beata
      new Edge(
        Town.getTown('beata'),
        Town.getTown('strykhaven'),
        EdgeType.Plain,
        [1190, 545]
      ),
      // Wylhien - Usselen (river)
      new Edge(
        Town.getTown('usselen'),
        Town.getTown('wylhien'),
        EdgeType.River,
        [500, 205]
      ),
      // Elvenhold - rivinia (river)
      new Edge(
        Town.getTown('rivinia'),
        Town.getTown('elvenhold'),
        EdgeType.River,
        [1080, 340]
      ),
      // rivinia - tichih (river)
      new Edge(
        Town.getTown('tichih'),
        Town.getTown('rivinia'),
        EdgeType.River,
        [1060, 270]
      ),
      // beata - elvenhold (river)
      new Edge(
        Town.getTown('elvenhold'),
        Town.getTown('beata'),
        EdgeType.River,
        [1180, 425]
      ),
      // virst - jxara (river)
      new Edge(
        Town.getTown('jxara'),
        Town.getTown('virst'),
        EdgeType.River,
        [705, 600]
      ),
      // jxara - mahdavikia (river)
      new Edge(
        Town.getTown('mahdavikia'),
        Town.getTown('jxara'),
        EdgeType.River,
        [490, 580]
      ),
      // mahdavikia - grangor (river)
      new Edge(
        Town.getTown('grangor'),
        Town.getTown('mahdavikia'),
        EdgeType.River,
        [430, 505]
      ),
    ];
  }

  public static getInstance(): RoadManager {
    if (!RoadManager.instance) {
      RoadManager.instance = new RoadManager();
    }
    return RoadManager.instance;
  }

  // This is not well encapsulated...
  public getTowns() {
    return this.allTowns;
  }

  // This is not well encapsulated...
  public getEdges() {
    return this.allEdges;
  }

  public getDistance(t1: Town, t2: Town): number {
    const adjList: Map<Town, Array<Town>> = new Map();
    const dist: Map<Town, number> = new Map();
    const visited: Map<Town, boolean> = new Map();
    for (const town of this.allTowns.values()) {
      dist.set(town, Infinity);
      visited.set(town, false);
    }
    dist.set(t1, 0);
    for (const edge of this.allEdges) {
      const adjTowns = adjList.get(edge.getSrcTown());
      if (adjTowns === undefined) {
        adjList.set(edge.getSrcTown(), [edge.getDestTown()]);
      } else {
        adjTowns.push(edge.getDestTown());
        adjList.set(edge.getSrcTown(), adjTowns);
      }
    }
    let currTown = t1;
    let neighbours: Town[] | undefined;
    const queue: Town[] = [];
    visited.set(currTown, true);
    queue.push(currTown);
    while (queue.length > 0) {
      neighbours = adjList.get(currTown);
      if (neighbours === undefined) break;
      for (const neighbour of neighbours) {
        if (visited.get(neighbour)) continue;
        visited.set(neighbour, true);
        queue.push(neighbour);
        dist.set(
          neighbour,
          Math.min(dist.get(neighbour)!, dist.get(currTown)! + 1)
        );
        if (neighbour === t2) break;
      }
      currTown = queue.shift()!;
    }
    return dist.get(t2)!;
  }
}
