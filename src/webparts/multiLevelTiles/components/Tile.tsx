import { Icon } from '@fluentui/react';
import * as React from 'react';
import { OpenType } from '../services/Enums';
import { ITile } from '../services/IListItem';
import styles from './MultiLevelTiles.module.scss';

export interface ITileProps {
    attributes: ITile;
    select:Function;
    hide:boolean;
    layout: number;
    iconSize: number;
    selected: boolean;
    openUrl: Function;
    visible: boolean;
}

export interface ITileState {
}

export default class Tile extends React.Component<ITileProps, ITileState> {

  constructor(props: ITileProps) {
    super(props);

    this.state = {
    };
  }

  public render(): React.ReactElement<ITileProps> {

    const tile:ITile = this.props.attributes;
    
    const getItemStyle = (item:ITile) => {
        return {
            backgroundColor: item.BgColor,
            color: item.FontColor,
            opacity: this.props.hide ? 0.25 : 1
        };
    };

    const getIconPosition = () => {
        if(this.props.selected) {
            if(this.props.layout === 0) {
                return {transform: 'rotateZ(180deg)'};
            } else {
                return {transform: 'rotateZ(270deg)'};
            }
        } else {
            return {};
        }
    };

    const tileOpenClick = (event?) => {
        if(tile.Childs.length > 0) {
            this.props.select(tile,event);
        } else {

        } 
    };

    const tileLinkClick = () => {
        if(tile.Url){
            switch (tile.OpenType.id) {
                case OpenType.NewTab.id:
                    window.open(tile.Url);
                    break;
                case OpenType.SelfTab.id:
                    window.location.href = tile.Url;
                    break;
                case OpenType.PopUp.id:
                    this.props.openUrl(OpenType.PopUp.id,tile);
                    break;
                case OpenType.Panel.id:
                    this.props.openUrl(OpenType.Panel.id,tile);
                    break;
                default:
                    console.info('OpenType is null');
            }
        } else {
            tileOpenClick();
        }
        
    };

    const getVisibleType = () => {
        let visibleType:string = null;
        if(this.props.visible) {
            visibleType = 'show';
        } else if(!this.props.visible && !this.props.attributes.ShowInaccessible) {
            visibleType = 'hide';
        } else if(!this.props.visible && this.props.attributes.ShowInaccessible) {
            visibleType = 'disabled';
        }
        return visibleType;
    };

    return (
        <React.Fragment>
            {
                getVisibleType() === 'show' &&
                <div className={styles.tileContainer}>
                    <div className={styles.tile} style={getItemStyle(tile)} onClick={tileLinkClick}>
                        {
                            tile.Icon &&
                            <div className={styles.IconContainer}>
                                <Icon iconName={tile.Icon} style={{fontSize:this.props.iconSize}} />
                            </div>
                        }
                        <div className={styles.titleContainer}>
                            {tile.Title}
                        </div>
                    </div>
                    {
                        tile.Childs.length > 0 && 
                        <div className={styles.openContainer} onClick={(event) => tileOpenClick(event)} style={{color:tile.FontColor}}>
                            <Icon iconName={'ChevronRightSmall'} style={getIconPosition()} />
                        </div>
                    }
                </div>
            }
            {
                getVisibleType() === 'disabled' &&
                <div className={styles.tileContainer+' '+styles.disabled}>
                    <div className={styles.tile} style={getItemStyle(tile)}>
                        {
                            tile.Icon &&
                            <div className={styles.IconContainer}>
                                <Icon iconName={tile.Icon} style={{fontSize:this.props.iconSize}} />
                            </div>
                        }
                        <div className={styles.titleContainer}>
                            {tile.Title}
                        </div>
                    </div>
                    {
                        tile.Childs.length > 0 && 
                        <div className={styles.openContainer} onClick={(event) => tileOpenClick(event)} style={{color:tile.FontColor}}>
                            <Icon iconName={'ChevronRightSmall'} style={getIconPosition()} />
                        </div>
                    }
                </div>
            }
        </React.Fragment>
    );
  }
}
