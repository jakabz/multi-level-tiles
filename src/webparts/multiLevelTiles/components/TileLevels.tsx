import * as React from 'react';
import { ITile, ITilesList } from '../services/IListItem';
import styles from './MultiLevelTiles.module.scss';
import Tile from './Tile';

export interface ITileLevelsProps {
    tiles: ITilesList;
    layout: number;
    fontSize: number;
    iconSize: number;
    openUrl: Function;
    currentUserGroups: any[];
    pageContext: any;
    levelPositioning: boolean;
}

export interface ITileLevelsState {
    breadcrumbs: ITile[];
    levelTop: number[];
    levelLeft: number[];
}

export default class TileLevels extends React.Component<ITileLevelsProps, ITileLevelsState> {

  constructor(props: ITileLevelsProps) {
    super(props);

    this.state = {
        breadcrumbs: [null],
        levelTop: [0],
        levelLeft: [0],
    };
  }

  public render(): React.ReactElement<ITileLevelsProps> {

    const getLevelElemts = (parent:ITile) => {
        if(parent) {
            return parent.Childs;
        } else {
            return this.props.tiles;
        }
    };

    const toogleLevel = (breadcrumbs:ITile[], tile:ITile, level:number) => {
        if(breadcrumbs[level+1]){
            if(breadcrumbs[level+1].Id === tile.Id) {
                breadcrumbs = breadcrumbs.slice(0,level+1);
            } else {
                breadcrumbs = breadcrumbs.slice(0,level+1);
                breadcrumbs.push(tile);
            }
        } else {
            breadcrumbs.push(tile);
        }
        return breadcrumbs;
    };

    const setMargin = (event:React.MouseEvent,i:number) => {
        let top:number[] = this.state.levelTop;
        let left:number[] = this.state.levelLeft;
        const parent:HTMLElement = event.target['parentElement'];
        const parentPositions = parent.getBoundingClientRect();
        const containerPositions = document.getElementById('tilesAllLevel').getBoundingClientRect();
        top[i+1] = parentPositions.top - containerPositions.top - 3 < 0 ? 0 : parentPositions.top - containerPositions.top - 3;
        left[i+1] = parentPositions.left - containerPositions.left - 3 < 0 ? 0 : parentPositions.left - containerPositions.left - 3;
        return [top,left];
    };

    const tileClick = (tile:ITile,level:number,event:React.MouseEvent) => {
        let breadcrumbs:ITile[] = this.state.breadcrumbs;
        breadcrumbs = toogleLevel(breadcrumbs,tile,level);
        const positions:number[][] = setMargin(event,level);
        this.setState({breadcrumbs:breadcrumbs,levelLeft:positions[1],levelTop:positions[0]});
    };

    const isDisabled = (index:number, tile:ITile) => {
        if(this.state.breadcrumbs[index+1]) {
            if(this.state.breadcrumbs[index+1].Id === tile.Id){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    const isSelected = (index:number, tile:ITile) => {
        if(this.state.breadcrumbs[index+1]) {
            if(this.state.breadcrumbs[index+1].Id === tile.Id){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const allLevelClass = () => {
        let className = [styles.tilesAllLevel];
        this.props.layout === 1 ? className.push(styles.horizontal) : className.push(styles.vertical);
        return className.join(' ');
    };

    const isAudience = (tile:ITile) => {
        let show:boolean = false;
        if(tile.AudienceId.length > 0) {
            tile.AudienceId.forEach(AudienceId => {
                if(AudienceId === this.props.pageContext.userId){
                    show = true;
                } else {
                    this.props.currentUserGroups.forEach(group => {
                        if(group.Id === AudienceId) {
                            show = true;
                        }
                    });
                }
                
            });
        } else {
            show = true;
        }
        return show;
    };

    const getLevelStyle = (i:number) => {
        let style:React.CSSProperties = {marginTop:0,marginLeft:0};
        if(this.props.levelPositioning){
            if(this.props.layout === 0){    
                style.marginTop = this.state.levelTop[i];
            }else{
                style.marginLeft = this.state.levelLeft[i];
            }
        }
        return style;
    };
 
    return (
        <div id="tilesAllLevel" className={ allLevelClass() } style={{fontSize:this.props.fontSize}}>
            {
                this.state.breadcrumbs.map((parent:ITile, index:number) => (
                    <div className={ styles.tileLevel } style={getLevelStyle(index)}>
                        {
                            getLevelElemts(parent)
                            //.filter((tile:ITile) => isAudience(tile))
                            .map((tile:ITile) => 
                                <Tile
                                    layout={this.props.layout} 
                                    attributes={tile} 
                                    select={(item,event) => tileClick(item,index,event)} 
                                    hide={isDisabled(index,tile)}
                                    selected={isSelected(index,tile)}
                                    iconSize={this.props.iconSize}
                                    openUrl={this.props.openUrl}
                                    visible={isAudience(tile)}
                                />
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
  }
}
