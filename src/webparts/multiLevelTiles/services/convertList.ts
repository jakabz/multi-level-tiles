import { ITile } from './IListItem'; 
import { OpenType } from './Enums';

export class mapper {
    public static toTile(tile):ITile {
        return { 
            Id: Number(tile.Id),
            Title: tile.Title,
            BgColor: tile.BgColor,
            FontColor: tile.FontColor,
            Childs: tile.Childs,
            OpenType: OpenType[tile.OpenType],
            Icon: tile.Icon,
            OrderBy: tile.OrderBy,
            PanelWidth: tile.PanelWidth ? Number(tile.PanelWidth) : 400,
            ParentId: tile.ParentId,
            PopUpHeight: tile.PopUpHeight ? Number(tile.PopUpHeight) : 400,
            PopUpWidth: tile.PopUpWidth ? Number(tile.PopUpWidth) : 600,
            Url: tile.Url,
            Description: tile.Description,
            AudienceId: tile.AudienceId ? tile.AudienceId : [],
            ShowInaccessible: tile.ShowInaccessible
        };
    } 
}

export class convertList {

    public static toTree(items) {

        const getChilds = (parentId) => {
            const childrens = items.filter(item => item.ParentId === parentId);
            return childrens.map(child => {
                child.Childs = getChilds(child.Id);
                return mapper.toTile(child);
            });
        };

        return items.filter(item => !item.ParentId).map(item => {
            item.Childs = getChilds(item.Id);
            return mapper.toTile(item);
        });
    }
    
}