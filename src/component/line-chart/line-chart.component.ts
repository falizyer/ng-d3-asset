import {ScaleLinear, scaleLinear} from "d3-scale";
import {ChartImage, ChartImageSettings, ChartImageType} from "../../core/chart-image.class";
import {select} from "d3-selection";
import {AxisImage, AxisImageType} from "../../core/axis-image.class";

require("./line-chart.style.less");

export interface LineChartBindings {
    metadata: {
        currentValue: {
            chartImage: ChartImageSettings<any>,
            xAxisImage: any,
            yAxisImage: any,
            margin?: {
                top: number,
                left: number,
                bottom: number,
                right: number
            }
        }
    };
    data: {
        currentValue: any
    }
}

export class LineChartComponent {

    public static get $name(): string {
        return "ngD3LineChart";
    }

    public static get $component() {
        return {
            bindings: {
                metadata: "<",
                data: "<"
            },
            controller: LineChartComponent,
            template: require("./line-chart.tpl.html")
        };
    }

    public static get $inject(): string[] {
        return ["$element"];
    }

    private chartImage: ChartImage<[number, number]>;
    private xAxisImage: AxisImage;
    private yAxisImage: AxisImage;
    private xScale: ScaleLinear<number, number>;
    private yScale: ScaleLinear<number, number>;
    private onPreRender: ($ctrl: LineChartComponent, data) => any;

    public constructor(private $element: JQuery) {
        this.xScale = scaleLinear();
        this.yScale = scaleLinear();
        this.onPreRender = () => void 0;
    }

    public init() {
        const imageContainer = this.$element[0].querySelector(".image-container.chart-image svg");
        const xAxisContainer = this.$element[0].querySelector(".image-container.x-axis svg");
        const yAxisContainer = this.$element[0].querySelector(".image-container.y-axis svg");
        const {clientWidth, clientHeight} = imageContainer;
        this.xScale.range([0, clientWidth - 10]);
        this.yScale.range([0, clientHeight - 10]);
        this.chartImage = new ChartImage<[number, number]>(select(imageContainer), {
            selector: ["chart-image"],
            x: (d: number[]) => this.xScale(d[0]),
            y: (d: number[]) => this.yScale(d[1]),
            margin: {top: 10, left: 0, bottom: 0, right: 10}
        });
        this.xAxisImage = new AxisImage(select(xAxisContainer), {
            selector: ["axis-image", "x-axis"],
            imageType: AxisImageType.BOTTOM,
            scale: this.xScale,
            margin: {top: clientHeight, left: 0, bottom: 0, right: 10}
        });
        this.yAxisImage = new AxisImage(select(yAxisContainer), {
            selector: ["axis-image", "y-axis"],
            imageType: AxisImageType.LEFT,
            scale: this.yScale,
            margin: {top: 10, left: 35, bottom: 0, right: 0}
        });
    }

    public $onChanges(changes) {
        const {metadata, data} = changes;

        if (this.chartImage === void 0) {
            this.init();
        }

        metadata !== void 0 && this.updateMetadata(metadata.currentValue, data === void 0);
        data !== void 0 && this.render(data.currentValue);
    }

    public updateMetadata(metadata, isVoidData: boolean): void {
        const {chartImage, xAxisImage, yAxisImage, margin, onPreRender = this.onPreRender} = metadata;
        this.onPreRender = onPreRender;
        if (margin !== void 0) {
            const {clientWidth, clientHeight} = this.$element[0].querySelector(".image-container.chart-image svg");
            this.xScale.range([0, clientWidth - margin.left - margin.right]);
            this.yScale.range([0, clientHeight - margin.bottom - margin.top]);
        }
        this.chartImage.init(chartImage, isVoidData);
        this.xAxisImage.init(xAxisImage, isVoidData);
        this.yAxisImage.init(yAxisImage, isVoidData);
    }

    public render(data) {
        this.onPreRender(this, data);
        this.xScale.domain([0, 100]);
        this.yScale.domain([0, 100]);
        this.xAxisImage.render([[0, 20, 50, 70, 100]]);
        this.yAxisImage.render([[0, 20, 50, 70, 100]]);
        this.chartImage.render(data);
    }
}
