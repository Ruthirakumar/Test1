import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class LocaleService {
public resource = {
  totalLocaleList : [],
  selectedLocale: {}
}
constructor() { 
}

//Get the Locale details from Excel
public getResourceDetails = () => {
  return new Promise((resolve, reject) => {
    if(this.resource.totalLocaleList.length > 0){
      resolve(this.resource);
    } else {
      var url = "assets/ConfigData_SW3.xlsx";
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url,true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {

            var arraybuffer = xhr.response;

            /* convert data to binary string */
              var data = new Uint8Array(arraybuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, {type:"binary"});

            /* DO SOMETHING WITH workbook HERE */
            var first_sheet_name = workbook.SheetNames[0];
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            var rawLocaleList = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            var formattedLocaleList = [];
            
            rawLocaleList.forEach( (item,index)=> {
              this.resource.totalLocaleList.push({
                id:index,
                language : item["Language"],
                code: item["Code"],
                flagFile: item["Flag File"],
                loginTitle: item["Login Title"],
                password: item["Password"],
                login: item["Login"],
                copyRights: item["Copy Rights"],
                issueSelectionMatrix: item["Issue Selection Matrix"],
                toolFamily: item["Tool Family"],
                toolType: item["Tool Type"],
                issueObservation: item["Issue Observation"],
                receivedAlarm: item["Received Alarm"],
                parts: item["Parts"],
                document: item["Document"],
                image: item["Image"],
                video: item["Video"],
                troubleShootingDetails: item["Troubleshooting Detials"],
                troubleShootingDefaultText: item["Troubleshooting Default Text"]
              })
            })
            this.resource.selectedLocale = this.resource.totalLocaleList[0];
            resolve(this.resource);
          } else {
              reject(xhr.statusText);
          }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    }
    
  });
};

// Update Locale details based on selected language
public setSelectedLocale(id) {
  this.resource.selectedLocale = this.resource.totalLocaleList.filter(item => item.id == id )[0];
  return this.resource.selectedLocale;
}
}

