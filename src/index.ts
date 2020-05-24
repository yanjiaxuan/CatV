import Chart from './chart'
import Topology from "./Topology";
import Line from "./Line";
import Bar from "./Bar";
import { ChartType } from './declare';

const charts: Map<ChartType, typeof Topology|typeof Line|typeof Bar> = new Map([
    [ChartType.TOPOLOGY, Topology],
    [ChartType.LINE, Line],
    [ChartType.BAR, Bar]
])

class CatV {
    private chart: Chart|undefined
    constructor() { throw new Error('this is a static method, new is forbidden') }

    public static ChartType = ChartType

    public static init(el: string|Element, type: ChartType): Chart {
        const element = typeof el === 'string' ? document.querySelector(el as any) : el
        if (!element || !(element instanceof HTMLElement)) { throw new Error('element is not found') }
        const elProperties = {
            width: element.offsetWidth,
            height: element.offsetHeight
        }
        const chartC = charts.get(type)
        if (!chartC) { throw new Error(`char type ${type} is not supported`) }
        const chart = new chartC(element, elProperties)
        return chart
    }
}

export default CatV