import {ScaleLinear, scaleLinear} from "d3-scale";
import {line, area} from "d3-shape";
import {ChartImage, ChartImageSettings, ChartImageType} from "../../core/chart-image.class";
import {select} from "d3-selection";

require("./line-chart.style.less");

export interface LineChartBindings {
    metadata: {
        currentValue: {
            chartImage: ChartImageSettings<any>
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

    public constructor(private $element: JQuery) {

    }

    public init() {
        let svg = this.$element[0].querySelector(".chart-image-container svg");
        this.chartImage = new ChartImage<[number, number]>(select(svg));
    }

    public $onChanges(changes) {
        const {metadata, data} = changes;

        if (this.chartImage === void 0) {
            this.init();
        }

        if (metadata !== void 0) {
            const {chartImage} = metadata.currentValue;
            this.chartImage.init(chartImage, data === void 0);
        }

        if (data !== void 0) {
            this.chartImage.render(data.currentValue);
        }
    }
}
