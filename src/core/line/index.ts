import {module} from "angular";

import {LineComponent} from "./line.component";

export default module("ng-d3-asset.core.line", [])
    .component(LineComponent.$name, LineComponent.$component)
    .name;
