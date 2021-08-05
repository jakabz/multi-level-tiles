import { IListInfo, sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

import { convertList } from './convertList';
import { ITilesList } from './IListItem'; 

export class dataService {

    public setup(context: any): void {
        sp.setup({
            spfxContext: context
        });
    }

    public async getCurrentUserGroups(): Promise<any> {  
        return new Promise<any>(async (resolve, reject) => {  
            try {
                sp.web.currentUser.groups().then(groups => {
                    resolve(groups);
                }); 
            }  
            catch (error) {  
                console.log(error);  
            }  
        });  
    }

    public async getTilesList(listName: string): Promise<any> {  
        return new Promise<any>(async (resolve, reject) => {  
            try {
                sp.web.lists.getById(listName).items.orderBy('OrderBy', true).getAll().then((items:any) => { 
                    const result:ITilesList = convertList.toTree(items);
                    resolve(result);
                });  
            }  
            catch (error) {  
                console.log(error);  
            }  
        });  
    }
}

const dataServices = new dataService();
export default dataServices;