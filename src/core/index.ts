import {module} from "angular";

import lineModule from "./line/index";

export default module("ng-d3-asset.core",
    [
        lineModule
    ]).name;
