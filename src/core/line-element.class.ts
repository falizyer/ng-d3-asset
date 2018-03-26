import {GroupElement} from "./group-element.class";
import {Selection} from "d3-selection";
import {line} from "d3-shape";

export class LineElement extends GroupElement {

    protected margin;
    private selector: Array<string>;
    private line;
    private x: (d: number[]) => number;
    private y: (d: number[]) => number;

    public constructor($element, settings) {
        super($element, settings);
        const {
            margin = {},
            selector = {},
            x = d => d[0],
            y = d => d[1]
        } = settings;
        const {
            top = 0,
            left = 0,
            bottom = 0,
            right = 0,
        } = margin;
        this.margin = {
            top,
            left,
            bottom,
            right
        };
        this.x = x;
        this.y = y;
        this.selector = selector;
        this.line = line()
            .x(d => this.x(d))
            .y(d => this.y(d));
    }

    public render(data: Array<number[][][]>): Selection<any, any, any, any> {
        let selection: Selection<any, any, any, any> = super.render(data);

        selection.selectAll(this.getLineSelector()).remove();

        let uSelection: Selection<any, any, any, any> = selection.selectAll(this.getLineSelector())
            .data(d => d);

        uSelection.enter()
            .append("path")
            .attr("class", (d, i) => this.getLineClass(d, i))
            .attr("transform", `translate(${[this.margin.left, this.margin.top]})`)
            .attr("d", this.line);

        uSelection
            .exit()
            .remove();

        return uSelection;
    }

    public getSelector(): string {
        return `g.${this.selector.join(".")}`;
    };

    public getClassName(d, i): string {
        return this.selector.join(" ");
    };

    public getLineSelector(): string {
        return "path.line-element";
    }

    public getLineClass(d, i): string {
        return `line-element line-${i}`;
    }
}
