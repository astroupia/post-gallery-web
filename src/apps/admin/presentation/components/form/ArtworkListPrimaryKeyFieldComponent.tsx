import Artwork from "@/apps/core/data/models/artwork";
import ArtworkRepository from "@/apps/core/data/repositories/artworkRepository";
import { FieldComponent, FieldComponentProps } from "@/lib/components/form/FieldComponent";
import Field from "@/lib/forms/fields";
import { EventNameString } from "firebase/analytics";
import React from "react";
import { ReactNode } from "react";


interface ArtworkModalProps{

    selectedValues: string[];
    allArtworks: Artwork[]; 
    onChanged: (values: string[]) => void;
    onClose: () => void;

}


class ArtworkModalState{

    selectedValues: string[];
    filteredArtworks: Artwork[] = [];

    constructor(selectedValues: string[], initialArtworks: Artwork[]){
        this.selectedValues = selectedValues;
        this.filteredArtworks = initialArtworks;
    }
}

class ArtworkSelectionModal extends React.Component<ArtworkModalProps, ArtworkModalState>{

    constructor(props: ArtworkModalProps){
        super(props);
        this.state = new ArtworkModalState(props.selectedValues, props.allArtworks);
    }

    handleFilter = () => {
        // this.state.filteredArtworks = this.props.allArtworks;
        // this.setState(this.state);
    }

    componentDidMount(): void {
        this.handleFilter();
    }

    isArtworkSelected(artwork: Artwork): boolean{
        return this.props.selectedValues.includes(artwork.getPK()!);
    }

    handleArtworkClicked = (artwork: Artwork) => {
        let values: string[] = this.props.selectedValues;
        if(this.isArtworkSelected(artwork)){
            values = values.filter((value: string) => {
                return value != artwork.getPK();
            });
        }
        else{
            values.push(artwork.getPK()!);
        }
        this.props.onChanged(values);
    }

    render(): React.ReactNode {
        return (
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
      
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Select Artworks
                    </h3>
                    <div className="mt-2">
                      <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {this.props.allArtworks.map((artwork) => (
                                    <div
                                    key={artwork.id}
                                    className={`relative bg-white rounded-lg shadow-md overflow-hidden ${
                                      this.isArtworkSelected(artwork) ? "border-2 border-green-500" : ""
                                    }`}
                                    onClick={() => this.handleArtworkClicked(artwork)}
                                  >
                                    {this.isArtworkSelected(artwork) && (
                                      <div className="absolute top-0 right-0 p-2 bg-green-500">
                                        <svg
                                          className="h-6 w-6 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                    <img
                                      src={artwork.images[0]}
                                      alt={artwork.name}
                                      className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                      <h3 className="text-lg font-medium text-gray-900">{artwork.name}</h3>
                                      <p className="mt-2 text-sm text-gray-500">{artwork.artist?.fullName}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {this.props.onClose()}}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
        );
    }
    
}

class ArtworkSelectionInputComponentState{

    visible: boolean = false;

}

interface ArtworkSelectionInputProps{

    allArtworks: Artwork[];
    selectedValues: string[];
    onChanged: Function;

}

export class ArtworkSelectionComponent extends React.Component<ArtworkSelectionInputProps, ArtworkSelectionInputComponentState>{

    constructor(props: ArtworkSelectionInputProps){
        super(props);
        this.state = new ArtworkSelectionInputComponentState();
    }

    setVisibility = (state: any, value: boolean) => {
      state.visible = value;
    }

    render(): React.ReactNode {
        return (
            <div>
                <div onClick={() => {
                  this.setVisibility(this.state, true)
                  this.setState(this.state)}
                  }>
                    <div className="flex justify-center w-60 m-auto items-center px-12 col-2 h-11 bg-white text-black rounded-full border-2 border-[#D6D6D6] cursor-pointer">
                        <p className="justify-center font-medium text-xl">Select</p>
                    </div>
                    <div className="text-black text-center m-auto placeholder-[#575757] text-xl py-3">
                        {this.props.selectedValues.length} Artworks Selected
                       
                    </div>
                </div>
                
                <div className={`fixed z-10 inset-0 overflow-y-auto ${this.state.visible ? "block" : "hidden"}`}>
                    <ArtworkSelectionModal 
                    selectedValues={this.props.selectedValues} 
                    allArtworks={this.props.allArtworks}
                    onChanged={(values) => {this.props.onChanged(values)}}
                    onClose={() => {this.setState((state)=>{
                        this.setVisibility(state, false);
                        return state;
                    })}}
                    />
                </div>

            </div>

        )
    }

}


interface ArtworkListPrimaryKeyFieldComponentProps extends FieldComponentProps<string[]>{

    allArtworks: Artwork[];

}

export default class ArtworkListPrimaryKeyFieldComponent extends FieldComponent<string[], ArtworkListPrimaryKeyFieldComponentProps>{


    protected constructInputNode(value: string[] | null, callback: Function): ReactNode {

        return <ArtworkSelectionComponent selectedValues={value??[]} allArtworks={this.props.allArtworks} onChanged={callback}/> 
    }


}