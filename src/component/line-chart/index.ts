import {module} from "angular";

import {LineChartComponent} from "./line-chart.component";

export default module("ng-d3-asset.component.line-chart", [])
    .component(LineChartComponent.$name, LineChartComponent.$component)
    .name;
