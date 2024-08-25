import WriteArtworkState from "@/apps/admin/application/states/writeArtworkState";
import EditArtworkViewModel from "@/apps/admin/application/viewmodels/editArtworkViewModel";
import { Status } from "@/apps/core/data/models/artwork";
import { DefaultImageUploadComponent, DefaultMultiFileUPloadComponent } from "@/apps/core/presentation/components/DefaultFileUploadComponent";
import DateFieldComponent from "@/lib/components/form/DateFieldComponent";
import EnumFieldComponent from "@/lib/components/form/EnumFieldComponent";
import ListFieldComponent from "@/lib/components/form/ListFieldComponent";
import TextFieldComponent, { TextBoxComponent } from "@/lib/components/form/TextFieldComponent";
import Field from "@/lib/forms/fields";
import { AsyncStatus } from "@/lib/state/asyncState";
import React, { FormEvent, useEffect, useState } from "react";
import { UnitFieldComponent } from "@/lib/components/form/PrefixInputFieldComponent";
import StatusToast from "@/lib/components/status/StatusToast";
import Upload from '@/assets/Upload.png'
import MultiFileUploadFieldComponent from "@/lib/components/form/MultipleFileUploadFieldComponent";
import ArtistPrimaryKeyFieldComponent from "@/apps/admin/presentation/components/form/ArtistPrimaryKeyFieldComponent";
import ViewModelView from "@/lib/components/views/ViewModelView";
import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";
import BooleanFieldComponent from "@/lib/components/form/BooleanFieldComponent";


export default abstract class WriteArtworkView<P> extends ViewModelView<EditArtworkViewModel, P, WriteArtworkState>{

	handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if(this.state.status === AsyncStatus.loading){
			return;
		}
		await this.getViewModel().save()
	}

	onCreateMain(): React.ReactNode {
		if(this.state.status === AsyncStatus.done){
			return <SuccessfullView title="Successfull" subTitle="Artwork set Successfully!" />
		}

		return (
			<div>
				<form onSubmit={this.handleSubmit} className="px-14 py-12 ">
					<a href="/admin/Dashboard" className="text-xl font-medium">Dashboard/<span className="text-[#A1A6B3]">Upload Art</span></a>
					<div className="w-full pt-10 pb-6 mb-3 border-b-2 border-[#C1C1C1] flex flex-row justify-between">
						<p className="text-3xl lg:text-4xl font-bold">Upload Art</p>
						<button type="submit" className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-full">
							<div className="justify-center text-sm lg:text-xl">{(this.state.status === AsyncStatus.loading) ? "Loading..." : "Publish" }</div>
						</button>
					</div>
					<div className="lg:pl-8">
						<p className="mt-8 mb-4">⚫<span className="text-2xl font-medium">   Art details</span></p>
						<div className="w-full lg:w-4/6 ">
							<StatusToast asyncState={this.state} errorText={this.state.error?.message}/>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Art name  <span className="text-red-500 required-dot"> *</span></p> <TextFieldComponent field={this.state.form.name} syncer={this.getViewModel().syncState}/>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Artist ID  <span className="text-red-500 required-dot"> *</span></p> <ArtistPrimaryKeyFieldComponent field={this.state.form.artistID} choices={this.state.allArtists!} />
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Creation Date<span className="text-red-500 required-dot"> *</span></p> <DateFieldComponent field={this.state.form.creationDate} syncer={this.getViewModel().syncState} /></div>

							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Description <span className="text-red-500 required-dot"> *</span></p> 
							<TextBoxComponent field={this.state.form.description} />
							<div className="h-4"></div>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Picture  <span className="text-red-500 required-dot"> *</span></p>
							<DefaultMultiFileUPloadComponent field={this.state.form.images} />
							<div className="h-4"></div>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Dimension  <span className="text-red-500 required-dot"> *</span></p>
							<div className="flex flex-row justify-between">
								<div className="w-full"><p className="text-l text-[#5E5E64] font-medium mt-2 mb-2">Width<span className="text-red-500 required-dot"> *</span></p> <UnitFieldComponent field={this.state.form.dimensionWidth} options={["In"]} syncer={this.getViewModel().syncState}/></div>
								<div className="w-16"></div>
								<div className="w-full"><p className="text-l text-[#5E5E64] font-medium mt-2 mb-2">Height<span className="text-red-500 required-dot"> *</span></p> <UnitFieldComponent field={this.state.form.dimensionHeight} options={["In"]} syncer={this.getViewModel().syncState}/></div>
								<div className="w-16"></div>
								<div className="w-full"><p className="text-l text-[#5E5E64] font-medium mt-2 mb-2">Depth<span className="text-red-500 required-dot"> *</span></p> <UnitFieldComponent field={this.state.form.dimensionDepth} options={["In"]} syncer={this.getViewModel().syncState}/></div>
							</div>
							
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Material</p> <TextFieldComponent field={this.state.form.mediaUsed} syncer={this.getViewModel().syncState}/>
							{/* <p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Full name:</p> <TextFieldComponent field={this.state.form} syncer={this.getViewModel().syncState}/> */}
							
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Price  <span className="text-red-500 required-dot"> *</span></p>
							<UnitFieldComponent field={this.state.form.price} syncer={this.getViewModel().syncState} options={["USD","ETB"]}/>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Status  <span className="text-red-500 required-dot"> *</span></p>
							<EnumFieldComponent enumClass={Status} field={this.state.form.status} syncer={this.getViewModel().syncState}/>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Visibility</p><BooleanFieldComponent field={this.state.form.visible}/>

						</div>
					</div>
				</form>
				
			</div>
		)
	}

	
}



type ImageUploaderProps = {};

const ImageUploader: React.FC<ImageUploaderProps> = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            setSelectedImages((prevImages) => prevImages.concat(fileArray));
        }
    };

	const removeImage = (removeIndex: number) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== removeIndex));
    };

    useEffect(() => {
        return () => {
            // Make sure to revoke the data uris to avoid memory leaks
            selectedImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedImages]);

    return (
        <div className="flex flex-col p-6 justify-center items-center border-dashed border-2 rounded-lg border-[#D6D6D6]">
			<div className="flex flex-col lg:flex-row justify-between items-center w-full">
				<img className="h-16 bg-contain" src={Upload}  />
				<div className="mb-2 lg:mb-0 text-center lg:text-start">
					<p className="text-xl  font-medium">Upload your images here</p>
					<p className="text-xl  text-[#D6D6D6]">Supported formates: JPEG, JPG</p>
					<p className="text-md  text-black">Upload 3-5 photos</p>
				</div>
				<label htmlFor="image-upload" className="flex justify-center items-center px-12  h-11 bg-white text-black rounded-full border-2 border-[#D6D6D6] cursor-pointer">
				<p className="justify-center text-xl">Browse</p>
				</label>
				<input 
					id="image-upload"
					type="file"
					accept="image/*"
					multiple
					onChange={handleImageChange}
					className="hidden"
				/>
			</div>
            <div className="flex flex-wrap px-8">
                {selectedImages.map((image, idx) => (
                    <div key={idx} className="w-32 h-48 mr-3 relative">
                        <img src={image} className="object-cover w-full h-full mt-4" alt=""/>
						<button className="absolute top-2 right-2 bg-red-500 text-white font-bold px-2 rounded-full" onClick={() => removeImage(idx)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}; 