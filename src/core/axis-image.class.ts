import {GroupElement, GroupElementSettings} from "./group-element.class";
import {BaseType, Selection} from "d3-selection";
import {axisLeft, axisBottom, Axis, axisTop, axisRight} from "d3-axis";
import {ScaleLinear, scaleLinear} from "d3-scale";

export enum AxisImageType {
    TOP,
    LEFT,
    BOTTOM,
    RIGHT
}

export interface AxisImageSettings extends GroupElementSettings {
    selector?: string[];
    imageType?: AxisImageType;
    scale?: ScaleLinear<number, number>;
}

export class AxisImage extends GroupElement<number> {

    private selector: string[];
    private imageType: AxisImageType;
    private axis: Axis<number>;
    private scale: ScaleLinear<number, number>;

    public constructor(parentNode, settings: AxisImageSettings = {}) {
        super(parentNode, settings);
        const {
            selector = [],
            imageType = AxisImageType.LEFT,
            scale = scaleLinear()
        } = settings;
        this.selector = selector;
        this.imageType = imageType;
        this.scale = scale;
        switch (this.imageType) {
            case AxisImageType.TOP:
                this.axis = axisTop<number>(this.scale);
                break;
            case AxisImageType.LEFT:
                this.axis = axisLeft<number>(this.scale);
                break;
            case AxisImageType.BOTTOM:
                this.axis = axisBottom<number>(this.scale);
                break;
            case AxisImageType.RIGHT:
                this.axis = axisRight<number>(this.scale);
                break;
            default:
                break;
        }

    }

    /**
     * @override
     */
    public init(settings: AxisImageSettings = {}, isFlagRender: boolean = false) {
        super.init(settings);
        const {
            selector = this.selector,
            imageType = this.imageType,
            scale = this.scale
        } = settings;
        this.selector = selector;
        this.imageType = imageType;
        this.scale = scale;
        this.axis.scale(this.scale);
        isFlagRender === true && this.render(this.getData());
    }

    /**
     * @override
     */
    public render(data: number[][]): Selection<BaseType, number[], BaseType, number[][]> {
        const [tickValues] = data;
        let selector = super.render([tickValues]);
        this.axis.tickValues(tickValues);
        selector.call(this.axis);
        return selector;
    }

    /**
     * @override
     */
    public getGroupSelector(): string {
        return ["g", ...this.selector].join(".");
    };

    /**
     * @override
     */
    public getGroupClass(d: number[], i: number): string {
        return this.selector.join(" ");
    };
}