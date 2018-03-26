require("./line-chart.style.less");

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

    public constructor(private $element) {
        
    }
}
