import { OpenType } from "./Enums";

export interface ITile{
    Id: number;
    Title: string;
    BgColor: string;
    FontColor: string;
    Childs: ITilesList;
    OpenType: OpenType;
    Icon: string;
    OrderBy: number;
    PanelWidth: number;
    ParentId: number;
    PopUpHeight: number;
    PopUpWidth: number;
    Url: string;
    Description: string;
    AudienceId: number[];
    ShowInaccessible: boolean;
}

export interface ITilesList extends Array<ITile> {}