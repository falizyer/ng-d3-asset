import {module} from "angular";

import lineChartModule from "./line-chart/index";

export default module("ng-d3-asset.component",
    [
        lineChartModule
    ]).name;
