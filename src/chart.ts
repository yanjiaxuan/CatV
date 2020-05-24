import * as d3 from "d3"

abstract class Chart {
    protected el: HTMLElement|undefined
    protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
    protected elProperties: Record<string, any> = {
        width: 0,
        height: 0
    }

    constructor(el: HTMLElement, elProperties: Record<string, any>) {
        if (!window) {
            throw new Error('please run in browser')
        }
        this.el = el
        this.elProperties = Object.assign(this.elProperties, elProperties)
        this.svg = d3.select(this.el).append('svg').attr('width', '100%').attr('height', '100%')
    }

    public abstract render(): void

    public abstract rerender(): void
}

export default Chart