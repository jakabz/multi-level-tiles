import * as React from 'react';
import { LayoutMode } from '../services/Enums';
import { ITilesList } from '../services/IListItem';
import styles from './../workbenchFullWidth.module.scss';

export interface ILevelTilesProps {
    tiles: ITilesList;
    parent: number;
    layout: LayoutMode;
}

export interface ILevelTilesState {}

export default class LevelTiles extends React.Component<ILevelTilesProps, ILevelTilesState> {

  constructor(props: ILevelTilesProps) {
    super(props);

    this.state = {
      
    };
  }

  public render(): React.ReactElement<ILevelTilesProps> {
    return (
      <div>
        
      </div>
    );
  }
}
