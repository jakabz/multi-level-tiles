import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import MultiLevelTiles from './components/MultiLevelTiles';
import { IMultiLevelTilesProps } from './components/IMultiLevelTilesProps';
import dataServices from './services/services'; 
import { LayoutMode } from './services/Enums';

export interface IMultiLevelTilesWebPartProps {
  title: string;
  layout: number;
  listName: string;
  tiles: any[];
  fontSize: number;
  iconSize: number;
  levelPositioning:boolean;
}

export default class MultiLevelTilesWebPart extends BaseClientSideWebPart<IMultiLevelTilesWebPartProps> {

  protected onInit(): Promise<void> {   
    return super.onInit().then(() => { 
      dataServices.setup(this.context);
      if (!this.renderedOnce) {
        import('./workbenchFullWidth.module.scss');
      } 
    });
  }

  public render(): void {
    if(this.properties.listName != ''){
      dataServices.getTilesList(this.properties.listName).then(tilesList => {
        //console.info(tilesList);
        const element: React.ReactElement<IMultiLevelTilesProps> = React.createElement(
          MultiLevelTiles,
          {
            title: this.properties.title,
            layout: this.properties.layout,
            tiles: tilesList,
            fontSize: this.properties.fontSize,
            iconSize: this.properties.iconSize,
            pageContext: this.context.pageContext.legacyPageContext,
            levelPositioning: this.properties.levelPositioning
          }
        );
        ReactDom.render(element, this.domElement);
      });
    } else {
      const element:React.ReactElement = React.createElement('h3',{style:{textAlign:'center',paddingTop:20,paddingBottom:20}},
        React.createElement('span',null,`Please setting source list!`)
      );
      ReactDom.render(element, this.domElement);
    }
    
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //@ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getParents = () => {
    return this.properties.tiles.map(tile => {
      return {key: tile.uniqueId, text: tile.Title};
    });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'WebPart title'
                }),
                PropertyPaneChoiceGroup('layout', {
                  label: 'Layout',
                  options: [
                    {
                      key: LayoutMode.Vertical.id,
                      text: LayoutMode.Vertical.name,
                      iconProps: {
                        officeFabricIconFontName: 'AlignHorizontalLeft'
                      }
                    },
                    {
                      key: LayoutMode.Horizontal.id,
                      text: LayoutMode.Horizontal.name,
                      iconProps: {
                        officeFabricIconFontName: 'AlignVerticalTop'
                      }
                    }
                  ]
                }),
                PropertyFieldListPicker('listName', {
                  label: 'Source list',
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneSlider('fontSize',{
                  label: 'Font Size',
                  min:10,  
                  max:36,  
                  value:this.properties.fontSize,  
                  showValue:true,  
                  step:1
                }),
                PropertyPaneSlider('iconSize',{
                  label: 'Icon size',
                  min:10,  
                  max:72,  
                  value:this.properties.iconSize,  
                  showValue:true,  
                  step:1
                }),
                PropertyPaneToggle('levelPositioning',{
                  label:'Level positioning',
                  onText:'On',
                  offText:'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
