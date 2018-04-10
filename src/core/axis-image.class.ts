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
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;
}

export class AxisImage extends GroupElement<number> {

    private selector: string[];
    private imageType: AxisImageType;
    private axis: Axis<number>;
    private scale: ScaleLinear<number, number>;
    private tickSizeInner: number;
    private tickSizeOuter: number;
    private tickPadding: number;

    public constructor(parentNode, settings: AxisImageSettings = {}) {
        super(parentNode, settings);
        const {
            selector = [],
            imageType = AxisImageType.LEFT,
            scale = scaleLinear(),
            tickSizeInner = -400,
            tickSizeOuter = 5,
            tickPadding = 10
        } = settings;
        this.selector = selector;
        this.imageType = imageType;
        this.scale = scale;
        this.tickSizeInner = tickSizeInner;
        this.tickSizeOuter = tickSizeOuter;
        this.tickPadding = tickPadding;
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
        this.axis.tickSizeInner(this.tickSizeInner);
        this.axis.tickSizeOuter(this.tickSizeOuter);
        this.axis.tickPadding(this.tickPadding);

    }

    /**
     * @override
     */
    public init(settings: AxisImageSettings = {}, isFlagRender: boolean = false) {
        super.init(settings);
        const {
            selector = this.selector,
            imageType = this.imageType,
            scale = this.scale,
            tickSizeInner = this.tickSizeInner,
            tickSizeOuter = this.tickSizeOuter,
            tickPadding = this.tickPadding
        } = settings;
        this.selector = selector;
        this.imageType = imageType;
        this.scale = scale;
        this.tickSizeInner = tickSizeInner;
        this.tickSizeOuter = tickSizeOuter;
        this.tickPadding = tickPadding;
        this.axis.scale(this.scale);
        this.axis.tickSizeInner(this.tickSizeInner);
        this.axis.tickSizeOuter(this.tickSizeOuter);
        this.axis.tickPadding(this.tickPadding);
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