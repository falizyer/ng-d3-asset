import {Selection} from "d3-selection";
import {line, Line, area, Area} from "d3-shape";
import {GroupElement, GroupElementSettings} from "./group-element.class";

export enum ChartImageType {
    LINE,
    AREA
}

export interface ChartImageSettings<T> extends GroupElementSettings {
    selector: string[];
    dataType: ChartImageType[];
    x?: (d: T, i: number) => any;
    y?: (d: T, i: number) => any;
    onMouseMove?: () => void;
    onMouseLeave?: () => void;
}

export class ChartImage<T> extends GroupElement<T[]> {

    private selector: string[];
    private dataType: ChartImageType[];

    private line: Line<T>;
    private area: Area<T>;

    public constructor(
        parentNode: Selection<any, any, any, any>,
        settings: ChartImageSettings<T>) {
        super(parentNode, settings);
        const {
            selector,
            dataType,
            x = (d: T) => d[0],
            y = (d: T) => d[1]
        } = settings;
        this.selector = selector;
        this.dataType = dataType;

        this.line = line<T>()
            .x((d: T, i: number) => x(d, i))
            .y((d: T, i: number) => y(d, i));
        this.area = area<T>()
            .x((d: T, i: number) => x(d, i))
            .y((d: T, i: number) => y(d, i));
    }

    /**
     * @override
     */
    public render(data: T[][][]): Selection<any, T[][], any, T[][][]> {
        const parent: Selection<any, T[][], any, T[][][]> = super.render(data);
        let selection: Selection<any, T[], any, T[][]> = parent.selectAll(this.getElementSelector())
            .data<T[]>((d: T[][]) => d);

        selection.enter()
            .append("path")
            .attr("class", (d: T[], i: number) => this.getElementClass(d, i))
            .attr("d", (d: T[], i: number) => {
                let processor: Line<T> | Area<T>;
                switch (i) {
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
        return ["path", "chart-image"].join(".");
    }

    public getElementClass(d: T[], i: number): string {
        return ["path", "chart-image", `element-${i}`].join(" ");
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
        return this.selector.join(" ");
    }
}
