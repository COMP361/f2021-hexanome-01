import Edge from '../classes/Edge';
import Town from '../classes/Town';
import {EdgeType} from '../enums/EdgeType';

export default class RoadManager {
  private static instance: RoadManager;
  private allEdges: Array<Edge>;
  private allTowns: {[name: string]: Town};

  private constructor() {
    this.allTowns = {
      elvenhold: new Town('elvenhold', [1050, 400]),
      feodor: new Town('feodor', [835, 370]),
      lapphalya: new Town('lapphalya', [840, 470]),
      rivinia: new Town('rivinia', [1005, 315]),
      ergeren: new Town('ergeren', [1190, 315]),
      beata: new Town('beafa', [1200, 490]),
      strykhaven: new Town('strykhaven', [1090, 540]),
      virst: new Town('virst', [915, 570]),
      jxara: new Town('jxara', [655, 560]),
      mahdavikia: new Town('mahdavikia', [450, 555]),
      grangor: new Town('grangor', [415, 455]),
      kihromah: new Town('kihrimah', [550, 410]),
      dagamura: new Town('dagamura', [680, 435]),
      albaran: new Town('albaran', [685, 335]),
      parundia: new Town('parundia', [555, 285]),
      usselen: new Town('usselen', [400, 225]),
      wylhien: new Town('wylhien', [560, 160]),
      jaccaranda: new Town('jaccaranda', [725, 185]),
      throtmanni: new Town('throtmanni', [890, 250]),
      tichih: new Town('tichih:', [1060, 200]),
      yttar: new Town('yttar', [390, 330]),
    };

    this.allEdges = [
      // Usselen - wylhien
      new Edge(
        this.allTowns.usselen,
        this.allTowns.wylhien,
        EdgeType.Plain,
        [470, 170]
      ),
      // Usselen - parundia
      new Edge(
        this.allTowns.usselen,
        this.allTowns.parundia,
        EdgeType.Wood,
        [470, 260]
      ),
      // Usselen - yttar
      new Edge(
        this.allTowns.usselen,
        this.allTowns.yttar,
        EdgeType.Wood,
        [400, 270]
      ),
      // wylhien - parundia
      new Edge(
        this.allTowns.wylhien,
        this.allTowns.parundia,
        EdgeType.Plain,
        [535, 220]
      ),
      // wylhien - albaran
      new Edge(
        this.allTowns.wylhien,
        this.allTowns.albaran,
        EdgeType.Desert,
        [655, 245]
      ),
      // wylhien - jaccaranda
      new Edge(
        this.allTowns.wylhien,
        this.allTowns.jaccaranda,
        EdgeType.Mountain,
        [650, 170]
      ),
      // jaccaranda - tichih
      new Edge(
        this.allTowns.jaccaranda,
        this.allTowns.tichih,
        EdgeType.Mountain,
        [900, 190]
      ),
      // jaccaranda - throtmanni
      new Edge(
        this.allTowns.jaccaranda,
        this.allTowns.throtmanni,
        EdgeType.Mountain,
        [790, 230]
      ),
      // throtmanni - albaran
      new Edge(
        this.allTowns.throtmanni,
        this.allTowns.albaran,
        EdgeType.Desert,
        [785, 290]
      ),
      // throtmanni - feodor
      new Edge(
        this.allTowns.throtmanni,
        this.allTowns.feodor,
        EdgeType.Desert,
        [855, 300]
      ),
      // throtmanni - rivinia
      new Edge(
        this.allTowns.throtmanni,
        this.allTowns.rivinia,
        EdgeType.Wood,
        [950, 275]
      ),
      // throtmanni - tichih
      new Edge(
        this.allTowns.throtmanni,
        this.allTowns.tichih,
        EdgeType.Plain,
        [980, 240]
      ),
      // tichih - ergeren
      new Edge(
        this.allTowns.tichih,
        this.allTowns.ergeren,
        EdgeType.Wood,
        [1120, 270]
      ),
      // yttar - parundia (water)
      new Edge(
        this.allTowns.yttar,
        this.allTowns.parundia,
        EdgeType.Lake,
        [470, 315]
      ),
      // yttar - grangor
      new Edge(
        this.allTowns.yttar,
        this.allTowns.grangor,
        EdgeType.Mountain,
        [380, 390]
      ),
      // yttar - grangor (water)
      new Edge(
        this.allTowns.yttar,
        this.allTowns.grangor,
        EdgeType.Lake,
        [420, 380]
      ),
      // parundia - grangor (water)
      new Edge(
        this.allTowns.parundia,
        this.allTowns.grangor,
        EdgeType.Lake,
        [475, 365]
      ),
      // parundia - albaran
      new Edge(
        this.allTowns.parundia,
        this.allTowns.albaran,
        EdgeType.Desert,
        [630, 300]
      ),
      // albaran - dagamura
      new Edge(
        this.allTowns.albaran,
        this.allTowns.dagamura,
        EdgeType.Desert,
        [685, 385]
      ),
      // albaran - feodor
      new Edge(
        this.allTowns.albaran,
        this.allTowns.feodor,
        EdgeType.Desert,
        [765, 340]
      ),
      // feodor - dagamura
      new Edge(
        this.allTowns.feodor,
        this.allTowns.dagamura,
        EdgeType.Desert,
        [760, 390]
      ),
      // feodor - lapphalya
      new Edge(
        this.allTowns.feodor,
        this.allTowns.lapphalya,
        EdgeType.Wood,
        [855, 415]
      ),
      // feodor - rivinia
      new Edge(
        this.allTowns.feodor,
        this.allTowns.rivinia,
        EdgeType.Wood,
        [915, 325]
      ),
      // rivinia - lapphalya
      new Edge(
        this.allTowns.rivinia,
        this.allTowns.lapphalya,
        EdgeType.Wood,
        [940, 380]
      ),
      // ergeren - elvenhold
      new Edge(
        this.allTowns.ergeren,
        this.allTowns.elvenhold,
        EdgeType.Wood,
        [1165, 375]
      ),
      // grangor - mahdavikia
      new Edge(
        this.allTowns.grangor,
        this.allTowns.mahdavikia,
        EdgeType.Mountain,
        [390, 505]
      ),
      // kihromah - dagamura
      new Edge(
        this.allTowns.kihromah,
        this.allTowns.dagamura,
        EdgeType.Wood,
        [615, 420]
      ),
      // dagamura - mahdavikia
      new Edge(
        this.allTowns.dagamura,
        this.allTowns.mahdavikia,
        EdgeType.Mountain,
        [570, 485]
      ),
      // dagamura - jxara
      new Edge(
        this.allTowns.dagamura,
        this.allTowns.jxara,
        EdgeType.Wood,
        [670, 495]
      ),
      // dagamura - lapphalya
      new Edge(
        this.allTowns.dagamura,
        this.allTowns.lapphalya,
        EdgeType.Wood,
        [750, 475]
      ),
      // lapphalya - jxara
      new Edge(
        this.allTowns.lapphalya,
        this.allTowns.jxara,
        EdgeType.Wood,
        [760, 525]
      ),
      // lapphalya - virst
      new Edge(
        this.allTowns.lapphalya,
        this.allTowns.virst,
        EdgeType.Plain,
        [855, 520]
      ),
      // lapphalya - elvenhold
      new Edge(
        this.allTowns.lapphalya,
        this.allTowns.elvenhold,
        EdgeType.Plain,
        [950, 455]
      ),
      // elvenhold - virst (water)
      new Edge(
        this.allTowns.elvenhold,
        this.allTowns.virst,
        EdgeType.Lake,
        [985, 495]
      ),
      // elvenhold - strykhaven (water)
      new Edge(
        this.allTowns.elvenhold,
        this.allTowns.strykhaven,
        EdgeType.Lake,
        [1060, 485]
      ),
      // elvenghold - beata
      new Edge(
        this.allTowns.elvenhold,
        this.allTowns.beata,
        EdgeType.Plain,
        [1150, 455]
      ),
      // mahdavikia - jxara
      new Edge(
        this.allTowns.mahdavikia,
        this.allTowns.jxara,
        EdgeType.Mountain,
        [540, 570]
      ),
      // jxara - virst
      new Edge(
        this.allTowns.jxara,
        this.allTowns.virst,
        EdgeType.Plain,
        [770, 585]
      ),
      // virst - strykhaven (water)
      new Edge(
        this.allTowns.virst,
        this.allTowns.strykhaven,
        EdgeType.Lake,
        [1010, 540]
      ),
      // virst - strykhaven
      new Edge(
        this.allTowns.virst,
        this.allTowns.strykhaven,
        EdgeType.Mountain,
        [1025, 595]
      ),
      // strykhaven - beata
      new Edge(
        this.allTowns.strykhaven,
        this.allTowns.beata,
        EdgeType.Plain,
        [1190, 545]
      ),
      // Wylhien - Usselen (river)
      new Edge(
        this.allTowns.wylhien,
        this.allTowns.usselen,
        EdgeType.River,
        [500, 205]
      ),
      // Elvenhold - rivinia (river)
      new Edge(
        this.allTowns.elvenhold,
        this.allTowns.rivinia,
        EdgeType.River,
        [1080, 340]
      ),
      // rivinia - tichih (river)
      new Edge(
        this.allTowns.rivinia,
        this.allTowns.tichih,
        EdgeType.River,
        [1060, 270]
      ),
      // beata - elvenhold (river)
      new Edge(
        this.allTowns.beata,
        this.allTowns.elvenhold,
        EdgeType.River,
        [1180, 425]
      ),
      // virst - jxara (river)
      new Edge(
        this.allTowns.virst,
        this.allTowns.jxara,
        EdgeType.River,
        [705, 600]
      ),
      // jxara - mahdavikia (river)
      new Edge(
        this.allTowns.jxara,
        this.allTowns.mahdavikia,
        EdgeType.River,
        [490, 580]
      ),
      // mahdavikia - grangor (river)
      new Edge(
        this.allTowns.mahdavikia,
        this.allTowns.grangor,
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
