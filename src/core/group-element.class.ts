import {select, Selection} from "d3-selection";

export abstract class GroupElement {

    private parentNode: Selection<any, any, any, any>;
    private data: Array<number[][][]>;
    private onMouseMove: () => void;
    private onMouseLeave: () => void;

    public constructor(private $element: JQuery, settings) {
        let svg: JQuery<HTMLElement> = this.$element.find("svg");
        this.parentNode = select(svg[0]);
        const {
            onMouseMove = () => void 0,
            onMouseLeave = () => void 0
        } = settings;
        this.onMouseMove = onMouseMove;
        this.onMouseLeave = onMouseLeave;
        this.parentNode
            .on("mousemove", this.onMouseMove)
            .on("mouseleave", this.onMouseLeave);
    }

    public render(data: Array<number[][][]>): Selection<any, any, any, any> {
        this.parentNode
            .selectAll(this.getSelector())
            .remove();

        let selection = this.parentNode.selectAll(this.getSelector())
            .data(this.data || []);

        selection
            .enter()
            .append("g")
            .attr("class", (d, i) => this.getClassName(d, i));

        selection
            .exit()
            .remove();

        return selection;
    }

    public abstract getSelector(): string;

    public abstract getClassName(d, i): string;
}
