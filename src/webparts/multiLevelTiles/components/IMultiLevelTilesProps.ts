import { DisplayMode } from '@microsoft/sp-core-library';
import { LayoutMode } from '../services/Enums';
import { ITilesList } from '../services/IListItem';

export interface IMultiLevelTilesProps {
  title: string;
  layout: number;
  tiles: ITilesList;
  fontSize: number;
  iconSize: number;
  pageContext: any;
  levelPositioning: boolean;
}
