import {Selection} from "d3-selection";

export interface GroupElementSettings {
}

/**
 * @desc
 * Base Group Element Class
 */
export abstract class GroupElement<T> {

    public constructor(
        private parentNode: Selection<any, any, any, any>,
        settings: GroupElementSettings) {

    }

    /**
     * @desc
     * Method for performing render
     * @param {Array<T>} data
     * @returns {Selection<any, T, any, T[]>}
     */
    public render(data: T[][]): Selection<any, T[], any, T[][]> {
        let selection: Selection<any, any, any, any> = this.parentNode.selectAll(this.getGroupSelector())
            .data<T[]>(data);

        return selection.enter()
            .append("g")
            .attr("class", (d: T[], i: number) => this.getGroupClass(d, i));
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
