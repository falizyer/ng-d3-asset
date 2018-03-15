import {module} from "angular";

import componentModule from "./component/index";
import coreModule from "./core/index";

export default module("ng-d3-asset",
    [
        componentModule,
        coreModule
    ]).name;
