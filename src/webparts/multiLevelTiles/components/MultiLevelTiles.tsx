import * as React from "react";
import styles from "./MultiLevelTiles.module.scss";
import { IMultiLevelTilesProps } from "./IMultiLevelTilesProps";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import TileLevels from "./TileLevels";
import { Modal, Panel, PanelType } from "@fluentui/react";
import { ITile } from "../services/IListItem";
import { OpenType } from "../services/Enums";
import dataServices from "../services/services";

export interface IMultiLevelTilesState {
  panelOpen: boolean;
  popupOpen: boolean;
  selectedTile: ITile;
  currentUserGroups: any[];
}

export default class MultiLevelTiles extends React.Component<IMultiLevelTilesProps,IMultiLevelTilesState> {

  constructor(props: IMultiLevelTilesProps) {
    super(props);

    this.state = {
        panelOpen: false,
        popupOpen: false,
        selectedTile: null,
        currentUserGroups: []
    };
    dataServices.getCurrentUserGroups().then((groups) => {
      this.setState({currentUserGroups: groups});
    });
  }

  public render(): React.ReactElement<IMultiLevelTilesProps> {

    const openUrl = (panelTypeId:number, tile:ITile) => {
      if(panelTypeId === OpenType.Panel.id){
        this.setState({selectedTile: tile, panelOpen: true});
      } else {
        this.setState({selectedTile: tile, popupOpen: true});
      }
    };

    return (
      <div className={styles.multiLevelTiles}>
        <div className={styles.container}>
          
          <WebPartTitle displayMode={1} title={this.props.title} updateProperty={null} />

          <TileLevels 
            tiles={this.props.tiles} 
            layout={this.props.layout} 
            fontSize={this.props.fontSize} 
            iconSize={this.props.iconSize}
            openUrl={openUrl}
            currentUserGroups={this.state.currentUserGroups}
            pageContext={this.props.pageContext}
            levelPositioning={this.props.levelPositioning}
          />

          {
            this.state.selectedTile &&
            <React.Fragment>
              <Panel 
                isOpen={this.state.panelOpen}
                onDismiss={ () => this.setState({panelOpen: false}) }
                type={PanelType.custom}
                customWidth={this.state.selectedTile.PanelWidth+'px'}
              >
                <iframe src={this.state.selectedTile.Url} width="100%" height={window.innerHeight-75} frameBorder="0"></iframe>
              </Panel>
              <Modal
                isOpen={this.state.popupOpen}
                onDismiss={ () => this.setState({popupOpen: false}) }
              >
                <iframe 
                  src={this.state.selectedTile.Url} 
                  width={this.state.selectedTile.PopUpWidth}
                  height={this.state.selectedTile.PopUpHeight}  
                  frameBorder="0"
                ></iframe>
              </Modal>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}