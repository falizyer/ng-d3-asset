require("./line.style.less");

export class LineComponent {

    public static get $name(): string {
        return "ngD3Line";
    }

    public static get $component() {
        return {
            bindings: {},
            controller: LineComponent,
            template: require("./line.tpl.html")
        };
    }

    public static get $inject(): string[] {
        return ["$element"];
    }

    public constructor(private $element) {

    }
}
