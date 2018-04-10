import {BaseType, Selection} from "d3-selection";
import {line, Line, area, Area} from "d3-shape";
import {GroupElement, GroupElementSettings} from "./group-element.class";

export enum ChartImageType {
    LINE,
    AREA
}

export interface ChartImageSettings<T> extends GroupElementSettings {
    selector?: string[];
    dataType?: ChartImageType[];
    alias?: string[];
    x?: (d: T, i: number) => any;
    y?: (d: T, i: number) => any;
}

export class ChartImage<T> extends GroupElement<T[]> {

    private selector: string[];
    private alias: string[];
    private dataType: ChartImageType[];
    private x: (d: T, i: number) => any;
    private y: (d: T, i: number) => any;

    private line: Line<T>;
    private area: Area<T>;

    public constructor(
        parentNode: Selection<any, any, any, any>,
        settings: ChartImageSettings<T> = {}) {
        super(parentNode, settings);
        const {
            selector = [],
            dataType = [],
            alias = [],
            x = (d: T) => d[0],
            y = (d: T) => d[1]
        } = settings;
        this.selector = selector;
        this.dataType = dataType;
        this.alias = alias;
        this.x = x;
        this.y = y;

        this.line = line<T>()
            .x((d: T, i: number) => this.x(d, i))
            .y((d: T, i: number) => this.y(d, i));
        this.area = area<T>()
            .x((d: T, i: number) => this.x(d, i))
            .y1((d: T, i: number) => this.y(d, i));
    }

    public init(settings: ChartImageSettings<T> = {}, isRenderFlag: boolean = false): void {
        const {
            selector = this.selector,
            dataType = this.dataType,
            alias = this.alias,
            x = this.x,
            y = this.y
        } = settings;
        this.selector = selector;
        this.alias = alias;
        this.dataType = dataType;
        this.x = x;
        this.y = y;
        isRenderFlag === true && this.render(this.getData());
    }

    /**
     * @override
     */
    public render(data: T[][][]): Selection<BaseType, T[][], BaseType, T[][][]> {
        const parent: Selection<BaseType, T[][], BaseType, T[][][]> = super.render(data);
        let selection: Selection<BaseType, T[], BaseType, T[][]> = parent.selectAll(this.getElementSelector())
            .data<T[]>((d: T[][], i: number) => {
                d.forEach((datum: T[]) => {
                    datum["DataNumber"] = i;
                });
                return d;
            });

        selection.enter()
            .append("path")
            .attr("class", (d: T[], i: number) => this.getElementClass(d, i))
            .attr("d", (d: T[], i: number) => {
                console.log(d);
                let processor: Line<T> | Area<T>;
                switch (this.dataType[d["DataNumber"]]) {
                    case ChartImageType.LINE:
                        processor = this.line;
                        break;
                    case ChartImageType.AREA:
                        processor = this.area;
                        break;
                    default:
                        break;
                }
                return processor(d);
            });

        return parent;
    }

    public getElementSelector(): string {
        return ["path", "chart-image-path"].join(".");
    }

    public getElementClass(d: T[], i: number): string {
        return ["path", "chart-image-path", `element-${i}`].join(" ");
    }

    /**
     * @override
     */
    public getGroupSelector(): string {
        return ["g", ...this.selector].join(".");
    }

    /**
     * @override
     */
    public getGroupClass(d: T[][], i: number): string {
        return [...this.selector, this.alias[i]].join(" ");
    }
}
