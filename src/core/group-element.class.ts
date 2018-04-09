import {BaseType, Selection} from "d3-selection";

export interface GroupElementSettings {
    onMouseMove?: () => void;
    onMouseLeave?: () => void;
}

/**
 * @desc
 * Base Group Element Class
 */
export abstract class GroupElement<T> {

    private data: T[][];

    public constructor(
        private parentNode: Selection<any, any, any, any>,
        settings: GroupElementSettings) {
        const {
            onMouseMove,
            onMouseLeave
        } = settings;
        this.data = [];
        onMouseMove === void 0 || this.parentNode.on("mousemove", onMouseMove);
        onMouseLeave === void 0 || this.parentNode.on("mouseleave", onMouseLeave);
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
            .attr("class", (d: T[], i: number) => this.getGroupClass(d, i));

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
