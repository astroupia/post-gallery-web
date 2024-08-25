import WriteArtistState from "@/apps/admin/application/states/writeArtistState";
import EditArtistViewModel from "@/apps/admin/application/viewmodels/editArtistViewModel";
import { Gender } from "@/apps/core/data/models/gender";
import DefaultFileUploadComponent, { DefaultImageUploadComponent } from "@/apps/core/presentation/components/DefaultFileUploadComponent";
import DateFieldComponent from "@/lib/components/form/DateFieldComponent";
import EnumFieldComponent from "@/lib/components/form/EnumFieldComponent";
import TextFieldComponent, { TextBoxComponent } from "@/lib/components/form/TextFieldComponent";
import { AsyncStatus } from "@/lib/state/asyncState";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import Upload from '@/assets/Upload.png'
import { FieldComponent, FieldComponentProps } from "@/lib/components/form/FieldComponent";
import PrefixInputField from "@/lib/components/form/PrefixInputFieldComponent";
import StatusToast from "@/lib/components/status/StatusToast";
import ViewModelView from "@/lib/components/views/ViewModelView";
import BooleanFieldComponent from "@/lib/components/form/BooleanFieldComponent";
import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";


export default abstract class WriteArtistView<P> extends ViewModelView<EditArtistViewModel, P, WriteArtistState>{
	
	constructor(props: any){
		super(props)
	}

	handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if(this.state.status === AsyncStatus.loading){
			return;
		}
		await this.getViewModel().save()
	}

	onCreateMain(): React.ReactNode {

		if(this.state.status === AsyncStatus.done){
			return <SuccessfullView title="Successfull" subTitle="Artist set Successfully!" />
		}
		return (
			<div>
			<form onSubmit={this.handleSubmit} className="px-6 lg:px-14 py-12 ">
				<a href="/admin/Dashboard" className="text-xl font-medium">Dashboard/<span className="text-[#A1A6B3]">Upload Artist</span></a>
				
				<div className="w-full pt-10 pb-6 mb-3 border-b-2 border-[#C1C1C1] flex flex-row justify-between">
					<p className="text-3xl lg:text-4xl font-bold">Upload Artist</p>
					<button className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-full">
						<div className="justify-center text-sm lg:text-xl">{(this.state.status === AsyncStatus.loading) ? "Loading..." : "Publish" }</div>
					</button>
				</div>

				<div className="lg:pl-8">
					<p className="mt-8 mb-4">⚫<span className="text-2xl font-medium">   Art details</span></p>
					<div className="w-full lg:w-4/6 ">
						<StatusToast asyncState={this.state} errorText={this.state.error?.message}/>
						
						<div className="flex flex-row justify-between">
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">First name <span className="text-red-500 required-dot"> *</span></p> <TextFieldComponent field={this.state.form.firstName} syncer={this.getViewModel().syncState}/></div>
							<div className="w-16"></div>
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Last name <span className="text-red-500 required-dot"> *</span></p> <TextFieldComponent field={this.state.form.lastName} syncer={this.getViewModel().syncState}/></div>
						</div>
						<div className="flex flex-row justify-between">
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Birthdate <span className="text-red-500 required-dot"> *</span></p> <DateFieldComponent field={this.state.form.dateOfBirth} syncer={this.getViewModel().syncState} /></div>
							<div className="w-16"></div>
							<div className="w-full mt-2.5 ">
								<p className="text-xl text-[#5E5E64] font-medium lg:mb-2">Gender <span className="text-red-500 required-dot"> *</span></p>
								<EnumFieldComponent field={this.state.form.gender} enumClass={Gender} />
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Email <span className="text-red-500 required-dot"> *</span></p> <TextFieldComponent field={this.state.form.email} syncer={this.getViewModel().syncState}/></div>
							<div className="w-12"></div>
							<div className="w-full"><p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Phone number <span className="text-red-500 required-dot"> *</span></p> <PrefixInputField options={['+251']} field={this.state.form.phoneNumber} syncer={this.getViewModel().syncState} /></div>
						</div>
						<div className="h-4"></div>
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Picture <span className="text-red-500 required-dot"> *</span></p>
						<DefaultImageUploadComponent field={this.state.form.avatar}/>
						{/* <ListFieldComponent field={this.state.form.a} syncer={this.getViewModel().syncState} generator={
						(field: Field<string>, removeCallback: () => void) => (<DefaultImageUploadComponent field={field} syncer={this.getViewModel().syncState}/>)
						}/> */}
						<div className="h-4"></div>
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Biography</p> 
						<TextBoxComponent field={this.state.form.biography}/>
						
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Nationality</p> <TextFieldComponent field={this.state.form.nationality} syncer={this.getViewModel().syncState}/>
						
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Visibility</p><BooleanFieldComponent field={this.state.form.visible}/>
						

					</div>
				</div>
			</form>
			
		</div>
		)
	}


}


type MyInputProps = {
    options: string[]
}

const MyInput: React.FC<MyInputProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [textInput, setTextInput] = useState<string>('');

    return (
        <div className="flex rounded-md h-14 text-black pl-3 border-[#D6D6D6] border-[3px]  lg:h-16 overflow-hidden">
            <select 
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="bg-white pr-2">
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full pl-4 "
            />
        </div>
    );
}
