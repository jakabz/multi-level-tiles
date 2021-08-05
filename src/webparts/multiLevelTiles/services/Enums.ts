export class NamedEntity {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class OpenType extends NamedEntity {
    public static Null = new OpenType(0, '');
    public static NewTab = new OpenType(1, 'Blank window');
    public static SelfTab = new OpenType(2, 'Self window');
    public static Panel = new OpenType(3, 'Panel');
    public static PopUp = new OpenType(4, 'PopUp');
}

export class LayoutMode extends NamedEntity {
    public static Vertical = new LayoutMode(0, 'Vertical');
    public static Horizontal = new LayoutMode(1, 'Horizontal');
}