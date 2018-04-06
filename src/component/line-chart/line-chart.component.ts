import {ScaleLinear, scaleLinear} from "d3-scale";
import {line, area} from "d3-shape";
import {ChartImage, ChartImageType} from "../../core/chart-image.class";
import {select} from "d3-selection";

require("./line-chart.style.less");

export interface LineChartBindings {
    metadata: {
        currentValue: any
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

    public constructor(private $element: JQuery) {
        let svg = this.$element.find("svg")[0];
        let chartImage = new ChartImage<[number, number]>(select(svg), {
            selector: ["chart-image"],
            dataType: [ChartImageType.LINE, ChartImageType.AREA]
        });
        chartImage.render([
            [[[0, 0], [20, 30], [40, 0]]],
            [[[0, 0], [20, 30], [40, 0]]]
        ]);
    }
}
