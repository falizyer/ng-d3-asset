import {BaseType, Selection} from "d3-selection";

export interface GroupElementSettings {
    onMouseMove?: () => void;
    onMouseLeave?: () => void;
    margin?: {
        top: number,
        left: number,
        bottom: number,
        right: number
    }
}

/**
 * @desc
 * Base Group Element Class
 */
export abstract class GroupElement<T> {

    private margin: {
        top: number,
        left: number,
        bottom: number,
        right: number
    };
    private data: T[][];

    public constructor(
        private parentNode: Selection<any, any, any, any>,
        settings: GroupElementSettings) {
        const {
            onMouseMove,
            onMouseLeave,
            margin = {top: 0, left: 0, bottom: 0, right: 0}
        } = settings;
        this.data = [];
        this.margin = margin;
        onMouseMove === void 0 || this.parentNode.on("mousemove", onMouseMove);
        onMouseLeave === void 0 || this.parentNode.on("mouseleave", onMouseLeave);
    }

    /**
     * @desc
     * Method for preinitialization
     * @param {GroupElementSettings} settings
     */
    public init(settings: GroupElementSettings): void {
        const {
            margin = this.margin
        } = settings;
        this.margin = margin;
    }

    /**
     * @desc
     * Method for performing render
     * @param {Array<T>} data
     * @returns {Selection<BaseType, T, BaseType, T[]>}
     */
    public render(data: T[][]): Selection<BaseType, T[], BaseType, T[][]> {
        this.data = data;
        this.parentNode.selectAll(this.getGroupSelector()).remove();
        let selection: Selection<BaseType, any, BaseType, any> = this.parentNode.selectAll(this.getGroupSelector())
            .data<T[]>(data);

        let result: Selection<BaseType, any, BaseType, any> = selection.enter()
            .append("g")
            .attr("class", (d: T[], i: number) => this.getGroupClass(d, i))
            .attr("transform", `translate(${[this.margin.left, this.margin.top]})`);

        selection.exit().remove();
        return result;
    }

    /**
     * @desc
     * Method for getting the data
     * @returns {T[][]}
     */
    public getData(): T[][] {
        return this.data;
    }

    /**
     * @desc
     * Method for getting default selector
     * @returns {string}
     */
    public abstract getGroupSelector(): string;

    /**
     * @desc
     * Method for getting group node class name
     * @param {T} d
     * @param {number} i
     * @returns {string}
     */
    public abstract getGroupClass(d: T[], i: number): string;
}
