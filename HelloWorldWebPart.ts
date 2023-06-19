import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';


export interface IHelloWorldWebPartProps {
  url: string;
  dropdownValue: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private dropdownOptions: IPropertyPaneDropdownOption[] = [
    { key: 'Self service', text: 'Self service' },
    { key: 'WI Talent', text: 'WI Talent' },
    { key: 'learning', text: 'learning' },
    { key: 'Splash Events', text: 'Splash Events' },
    { key: 'Seismic', text: 'Seismic' }

  ];

  public render(): void {
    this.domElement.innerHTML = `
      <div >
        <div >
          <div >
            <div >
              <span >API Call Web Part</span>
              <p >Enter a URL and select a dropdown value.</p>
              <div >
                <input type="text" id="urlInput" placeholder="Enter a URL"/>
                <select id="dropdown">
                  ${this.dropdownOptions.map(option => `<option value="${option.key}">${option.text}</option>`).join('')}
                </select>
                <button id="submitButton">Submit</button>
                <div id="resultContainer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    this.bindEvents();
  }

  private bindEvents(): void {
    const submitButton: HTMLButtonElement = this.domElement.querySelector('#submitButton');
    submitButton.addEventListener('click', () => this.handleButtonClick());
  }

  private handleButtonClick(): void {
    const urlInput: HTMLInputElement = this.domElement.querySelector('#urlInput');
    const dropdown: HTMLSelectElement = this.domElement.querySelector('#dropdown');
    const resultContainer: HTMLDivElement = this.domElement.querySelector('#resultContainer');

    const apiUrl: string = ``; // Replace "/api/data" with your API endpoint
    const jsonData = [      // Define your JSON data here
    { name: 'Self service', guid: '123456' },
    { name: 'Item 2', guid: '789012' },
    { name: 'Item 3', guid: '345678' },
    // Add more items as needed
  ];
  console.log(urlInput)
  console.log(dropdown)
  console.log(resultContainer)
  console.log(apiUrl)















    const matchingItem = jsonData.find((item: any) => item.name === dropdown.value);
    if (matchingItem) {
      // resultContainer.innerText = `GUID: ${matchingItem.guid}`;
      
  const apiUrls: string = 'https://api-ssl.bitly.com/v4/shorten';
  console.log(apiUrls)

  const headers = {
    'Authorization': 'Bearer c5e59588362ef7521a5624942ef705280c171bc7',
    'Content-Type': 'application/json',
  };
  const requestData = {
    long_url: urlInput.value,
    domain: 'link.fidelity.com',
    group_guid: 'B0110j6JDxR',
  };
 

  fetch(apiUrls, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      const shortenedLink = data.link;
      alert(`Shortened Link: ${shortenedLink}`);
      resultContainer.innerText = `Shortened Link: ${shortenedLink}`;

      
      
      
      
      
      
      // const qrApiUrl = `https://api-ssl.bitly.com/v4/bitlinks/${shortenedLink}/qr`;
      // const headers = {
      //   'Authorization': 'Bearer c5e59588362ef7521a5624942ef705280c171bc7',
      //   'Content-Type': 'application/json',
      // };
    
    
      // fetch(qrApiUrl, {
      //   method: 'POST',
      //   headers: headers,
      //   body: JSON.stringify({
      //     color: '1133ff',
      //     exclude_bitly_logo: true,
      //     image_format: 'svg',
      //     logo_image_guid: 'I123456789',
      //     is_hidden: true
      //   })
      // })
      //   .then(qrResponse => qrResponse.json())
      //   .then(qrData => {
      //     const qrImageUrl = qrData.qr_code;
      //     resultContainer.innerHTML += `<img src="${qrImageUrl}" alt="QR Code" />`;
      //   })
      //   .catch(qrError => {
      //     resultContainer.innerText += `Error: ${qrError}`;
      //   });
    

    })
    .catch(error => {
      resultContainer.innerText = `Error: ${error}`;
    });




    } else {
      resultContainer.innerText = 'No matching item found.';
    }
    // this.loadApiData(apiUrl, dropdown.value)
    //   .then(data => {
    //     const matchingItem = data.find((item: any) => item.name === dropdown.value);
    //     if (matchingItem) {
    //       resultContainer.innerText = `GUID: ${matchingItem.guid}`;
    //     } else {
    //       resultContainer.innerText = 'No matching item found.';
    //     }
    //   })
    //   .catch(error => {
    //     resultContainer.innerText = `Error: ${error}`;
    //   });
  }

  // private async loadApiData(apiUrl: string, dropdownValue: string): Promise<any[]> {
  //   const response: Response = await fetch(apiUrl);
  //   const data: any[] = await response.json();
  //   return data;
  // }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Property Pane'
          },
          groups: [
            {
              groupName: 'strings.BasicGroupName',
              groupFields: [
                PropertyPaneTextField('url', {
                  label: 'URL'
                }),
                PropertyPaneDropdown('dropdownValue', {
                  label: 'Dropdown',
                  options: this.dropdownOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
