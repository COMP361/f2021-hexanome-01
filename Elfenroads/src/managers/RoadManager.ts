import Edge from '../classes/Edge';
import Town from '../classes/Town';
import {EdgeType} from '../enums/EdgeType';

export default class RoadManager {
  private static instance: RoadManager;
  private allEdges: Array<Edge>;
  private allTowns: Map<string, Town>;

  private constructor() {
    this.allTowns = new Map<string, Town>([
      ['elvenhold', new Town('elvenhold', [1050, 400])],
      ['feodor', new Town('feodor', [835, 370])],
      ['lapphalya', new Town('lapphalya', [840, 470])],
      ['rivinia', new Town('rivinia', [1005, 315])],
      ['ergeren', new Town('ergeren', [1190, 315])],
      ['beata', new Town('beata', [1200, 490])],
      ['strykhaven', new Town('strykhaven', [1090, 540])],
      ['virst', new Town('virst', [915, 570])],
      ['jxara', new Town('jxara', [655, 560])],
      ['mahdavikia', new Town('mahdavikia', [450, 555])],
      ['grangor', new Town('grangor', [415, 455])],
      ['kihromah', new Town('kihromah', [550, 410])],
      ['dagamura', new Town('dagamura', [680, 435])],
      ['albaran', new Town('albaran', [685, 335])],
      ['parundia', new Town('parundia', [555, 285])],
      ['usselen', new Town('usselen', [400, 225])],
      ['wylhien', new Town('wylhien', [560, 160])],
      ['jaccaranda', new Town('jaccaranda', [725, 185])],
      ['throtmanni', new Town('throtmanni', [890, 250])],
      ['tichih', new Town('tichih', [1060, 200])],
      ['yttar', new Town('yttar', [390, 330])],
    ]);

    this.allEdges = [
      // Usselen - wylhien
      new Edge(
        this.allTowns.get('usselen')!,
        this.allTowns.get('wylhien')!,
        EdgeType.Plain,
        [470, 170]
      ),
      // Usselen - parundia
      new Edge(
        this.allTowns.get('usselen')!,
        this.allTowns.get('parundia')!,
        EdgeType.Wood,
        [470, 260]
      ),
      // Usselen - yttar
      new Edge(
        this.allTowns.get('usselen')!,
        this.allTowns.get('yttar')!,
        EdgeType.Wood,
        [400, 270]
      ),
      // wylhien - parundia
      new Edge(
        this.allTowns.get('wylhien')!,
        this.allTowns.get('parundia')!,
        EdgeType.Plain,
        [535, 220]
      ),
      // wylhien - albaran
      new Edge(
        this.allTowns.get('wylhien')!,
        this.allTowns.get('albaran')!,
        EdgeType.Desert,
        [655, 245]
      ),
      // wylhien - jaccaranda
      new Edge(
        this.allTowns.get('wylhien')!,
        this.allTowns.get('jaccaranda')!,
        EdgeType.Mountain,
        [650, 170]
      ),
      // jaccaranda - tichih
      new Edge(
        this.allTowns.get('jaccaranda')!,
        this.allTowns.get('tichih')!,
        EdgeType.Mountain,
        [900, 190]
      ),
      // jaccaranda - throtmanni
      new Edge(
        this.allTowns.get('jaccaranda')!,
        this.allTowns.get('throtmanni')!,
        EdgeType.Mountain,
        [790, 230]
      ),
      // throtmanni - albaran
      new Edge(
        this.allTowns.get('throtmanni')!,
        this.allTowns.get('albaran')!,
        EdgeType.Desert,
        [785, 290]
      ),
      // throtmanni - feodor
      new Edge(
        this.allTowns.get('throtmanni')!,
        this.allTowns.get('feodor')!,
        EdgeType.Desert,
        [855, 300]
      ),
      // throtmanni - rivinia
      new Edge(
        this.allTowns.get('throtmanni')!,
        this.allTowns.get('rivinia')!,
        EdgeType.Wood,
        [950, 275]
      ),
      // throtmanni - tichih
      new Edge(
        this.allTowns.get('throtmanni')!,
        this.allTowns.get('tichih')!,
        EdgeType.Plain,
        [980, 240]
      ),
      // tichih - ergeren
      new Edge(
        this.allTowns.get('tichih')!,
        this.allTowns.get('ergeren')!,
        EdgeType.Wood,
        [1120, 270]
      ),
      // yttar - parundia (water)
      new Edge(
        this.allTowns.get('yttar')!,
        this.allTowns.get('parundia')!,
        EdgeType.Lake,
        [470, 315]
      ),
      // yttar - grangor
      new Edge(
        this.allTowns.get('yttar')!,
        this.allTowns.get('grangor')!,
        EdgeType.Mountain,
        [380, 390]
      ),
      // yttar - grangor (water)
      new Edge(
        this.allTowns.get('yttar')!,
        this.allTowns.get('grangor')!,
        EdgeType.Lake,
        [420, 380]
      ),
      // parundia - grangor (water)
      new Edge(
        this.allTowns.get('parundia')!,
        this.allTowns.get('grangor')!,
        EdgeType.Lake,
        [475, 365]
      ),
      // parundia - albaran
      new Edge(
        this.allTowns.get('parundia')!,
        this.allTowns.get('albaran')!,
        EdgeType.Desert,
        [630, 300]
      ),
      // albaran - dagamura
      new Edge(
        this.allTowns.get('albaran')!,
        this.allTowns.get('dagamura')!,
        EdgeType.Desert,
        [685, 385]
      ),
      // albaran - feodor
      new Edge(
        this.allTowns.get('albaran')!,
        this.allTowns.get('feodor')!,
        EdgeType.Desert,
        [765, 340]
      ),
      // feodor - dagamura
      new Edge(
        this.allTowns.get('feodor')!,
        this.allTowns.get('dagamura')!,
        EdgeType.Desert,
        [760, 390]
      ),
      // feodor - lapphalya
      new Edge(
        this.allTowns.get('feodor')!,
        this.allTowns.get('lapphalya')!,
        EdgeType.Wood,
        [855, 415]
      ),
      // feodor - rivinia
      new Edge(
        this.allTowns.get('feodor')!,
        this.allTowns.get('rivinia')!,
        EdgeType.Wood,
        [915, 325]
      ),
      // rivinia - lapphalya
      new Edge(
        this.allTowns.get('rivinia')!,
        this.allTowns.get('lapphalya')!,
        EdgeType.Wood,
        [940, 380]
      ),
      // ergeren - elvenhold
      new Edge(
        this.allTowns.get('ergeren')!,
        this.allTowns.get('elvenhold')!,
        EdgeType.Wood,
        [1165, 375]
      ),
      // grangor - mahdavikia
      new Edge(
        this.allTowns.get('grangor')!,
        this.allTowns.get('mahdavikia')!,
        EdgeType.Mountain,
        [390, 505]
      ),
      // kihromah - dagamura
      new Edge(
        this.allTowns.get('kihromah')!,
        this.allTowns.get('dagamura')!,
        EdgeType.Wood,
        [615, 420]
      ),
      // dagamura - mahdavikia
      new Edge(
        this.allTowns.get('dagamura')!,
        this.allTowns.get('mahdavikia')!,
        EdgeType.Mountain,
        [570, 485]
      ),
      // dagamura - jxara
      new Edge(
        this.allTowns.get('dagamura')!,
        this.allTowns.get('jxara')!,
        EdgeType.Wood,
        [670, 495]
      ),
      // dagamura - lapphalya
      new Edge(
        this.allTowns.get('dagamura')!,
        this.allTowns.get('lapphalya')!,
        EdgeType.Wood,
        [750, 475]
      ),
      // lapphalya - jxara
      new Edge(
        this.allTowns.get('lapphalya')!,
        this.allTowns.get('jxara')!,
        EdgeType.Wood,
        [760, 525]
      ),
      // lapphalya - virst
      new Edge(
        this.allTowns.get('lapphalya')!,
        this.allTowns.get('virst')!,
        EdgeType.Plain,
        [855, 520]
      ),
      // lapphalya - elvenhold
      new Edge(
        this.allTowns.get('lapphalya')!,
        this.allTowns.get('elvenhold')!,
        EdgeType.Plain,
        [950, 455]
      ),
      // elvenhold - virst (water)
      new Edge(
        this.allTowns.get('elvenhold')!,
        this.allTowns.get('virst')!,
        EdgeType.Lake,
        [985, 495]
      ),
      // elvenhold - strykhaven (water)
      new Edge(
        this.allTowns.get('elvenhold')!,
        this.allTowns.get('strykhaven')!,
        EdgeType.Lake,
        [1060, 485]
      ),
      // elvenghold - beata
      new Edge(
        this.allTowns.get('elvenhold')!,
        this.allTowns.get('beata')!,
        EdgeType.Plain,
        [1150, 455]
      ),
      // mahdavikia - jxara
      new Edge(
        this.allTowns.get('mahdavikia')!,
        this.allTowns.get('jxara')!,
        EdgeType.Mountain,
        [540, 570]
      ),
      // jxara - virst
      new Edge(
        this.allTowns.get('jxara')!,
        this.allTowns.get('virst')!,
        EdgeType.Plain,
        [770, 585]
      ),
      // virst - strykhaven (water)
      new Edge(
        this.allTowns.get('virst')!,
        this.allTowns.get('strykhaven')!,
        EdgeType.Lake,
        [1010, 540]
      ),
      // virst - strykhaven
      new Edge(
        this.allTowns.get('virst')!,
        this.allTowns.get('strykhaven')!,
        EdgeType.Mountain,
        [1025, 595]
      ),
      // strykhaven - beata
      new Edge(
        this.allTowns.get('strykhaven')!,
        this.allTowns.get('beata')!,
        EdgeType.Plain,
        [1190, 545]
      ),
      // Wylhien - Usselen (river)
      new Edge(
        this.allTowns.get('wylhien')!,
        this.allTowns.get('usselen')!,
        EdgeType.River,
        [500, 205]
      ),
      // Elvenhold - rivinia (river)
      new Edge(
        this.allTowns.get('elvenhold')!,
        this.allTowns.get('rivinia')!,
        EdgeType.River,
        [1080, 340]
      ),
      // rivinia - tichih (river)
      new Edge(
        this.allTowns.get('rivinia')!,
        this.allTowns.get('tichih')!,
        EdgeType.River,
        [1060, 270]
      ),
      // beata - elvenhold (river)
      new Edge(
        this.allTowns.get('beata')!,
        this.allTowns.get('elvenhold')!,
        EdgeType.River,
        [1180, 425]
      ),
      // virst - jxara (river)
      new Edge(
        this.allTowns.get('virst')!,
        this.allTowns.get('jxara')!,
        EdgeType.River,
        [705, 600]
      ),
      // jxara - mahdavikia (river)
      new Edge(
        this.allTowns.get('jxara')!,
        this.allTowns.get('mahdavikia')!,
        EdgeType.River,
        [490, 580]
      ),
      // mahdavikia - grangor (river)
      new Edge(
        this.allTowns.get('mahdavikia')!,
        this.allTowns.get('grangor')!,
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
}
