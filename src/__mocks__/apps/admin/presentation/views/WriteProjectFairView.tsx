import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";
import ArtFairForm from "@/apps/admin/application/forms/artFairForm";
import WritePublishmentState from "@/apps/admin/application/states/writePublishmentState";
import EditPublishmentViewModel from "@/apps/admin/application/viewmodels/editPublishmentViewModel";
import { PublishmentType } from "@/apps/core/data/models/publishment";
import DefaultFileUploadComponent, { DefaultImageUploadComponent } from "@/apps/core/presentation/components/DefaultFileUploadComponent";
import BooleanFieldComponent from "@/lib/components/form/BooleanFieldComponent";
import TextFieldComponent from "@/lib/components/form/TextFieldComponent";
import StatusToast from "@/lib/components/status/StatusToast";
import ViewModelView from "@/lib/components/views/ViewModelView";
import Field from "@/lib/forms/fields";
import { AsyncStatus } from "@/lib/state/asyncState";
import React from "react";
import { FormEvent, ReactNode, useState } from "react";

export default abstract class WriteProjectFairView<P> extends ViewModelView<EditPublishmentViewModel, P, WritePublishmentState>{
	
	private dummyField: Field<boolean> = new Field<boolean>();
	private PUBLISHMENT_TYPE = [
		"Blog",
		"Press",
		"Project",
		"Art Fair"
	]
	private handleSubmit = async (event: FormEvent) => {

		event.preventDefault()
		if(this.state.status === AsyncStatus.loading){
			return;
		}
		if(this.state.form.publishmentType.getValue()! === PublishmentType.artFair){
			await this.getViewModel().saveArtFair();
		}
		else{
			await this.getViewModel().save();
		}
	}

	onCreateMain(): ReactNode {
		if(this.state.status === AsyncStatus.done){
			return <SuccessfullView title="Successfull" subTitle={`${this.PUBLISHMENT_TYPE[this.state.form.publishmentType.getValue()!]} set Successfully!`} />
		}
		this.dummyField.setValue(this.state.form.publishmentType.getValue()! === PublishmentType.project);
		return (
		<div>
			<form onSubmit={this.handleSubmit} className={"px-6 lg:px-14 py-12"}>
				<a href="/admin/Dashboard" className="text-xl font-medium">Dashboard/<span className={` ${this.state.form.publishmentType.value == PublishmentType.artFair ? 'inline' : 'hidden'} text-[#A1A6B3]`}>Upload Art Fair</span><span className={` ${this.state.form.publishmentType.value == PublishmentType.project ? 'inline' : 'hidden'} text-[#A1A6B3]`}>Upload Project</span></a>
				<div className="w-full pt-10 pb-6 mb-3 border-b-2 border-[#C1C1C1] flex flex-row justify-between">
					<div className="flex flex-row justify-center items-center">
						<p className="text-3xl lg:text-4xl font-bold mr-5">Upload {this.PUBLISHMENT_TYPE[this.state.form.publishmentType.getValue()!]}</p>
						<BooleanFieldComponent 
						field={this.dummyField}
						onText="Project"
						offText="Art Fair" 
						onChanged={(value: boolean) => {

							if(value){
								this.state.form.publishmentType.setValue(PublishmentType.project);
							}
							else{
								this.state.form.publishmentType.setValue(PublishmentType.artFair);
							}
							this.getViewModel().syncState()
						}}/>
					</div>
					<button type="submit" className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-full">
						<div className="justify-center text-sm lg:text-xl">{(this.state.status === AsyncStatus.loading) ? "Loading..." : "Publish" }</div>
					</button>
				</div>

				<div className="lg:pl-8 ">
					<p className="mt-8 mb-6">⚫<span className="text-2xl font-medium">   {this.PUBLISHMENT_TYPE[this.state.form.publishmentType.getValue()!]} details</span></p>
					<StatusToast asyncState={this.state} errorText={this.state.error?.message}/>
					
					{
							(this.state.form.publishmentType.getValue()! === PublishmentType.artFair)?
							<>
												<div className="w-full lg:w-4/6 mb-4">
								<div className="text-xl text-[#5E5E64] font-medium mt-4 mb-2">
									<label htmlFor="name">Title: <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<TextFieldComponent field={this.state.artFairform.name} syncer={this.getViewModel().syncState} />
								</div>
								<div className="h-4"></div>
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Link <span className="text-red-500 required-dot"> *</span></p>
								<TextFieldComponent field={this.state.artFairform.link} syncer={this.getViewModel().syncState}/>
								<div className="h-4"></div>
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Cover <span className="text-red-500 required-dot"> *</span></p>
								<DefaultFileUploadComponent field={this.state.artFairform.cover}/>


							</div>
								
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Visibility</p><BooleanFieldComponent field={this.state.artFairform.visible}/>

							</>:
							<>
									<div className="w-full lg:w-4/6 mb-4">
								

								<div className="text-xl text-[#5E5E64] font-medium mt-4 mb-2">
									<label htmlFor="name">Title: <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<TextFieldComponent field={this.state.form.title} syncer={this.getViewModel().syncState} />
								</div>
								<div className="h-4"></div>
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Cover <span className="text-red-500 required-dot"> *</span></p>
								<DefaultImageUploadComponent field={this.state.form.cover}/>
								<div className="h-4"></div>
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Content <span className="text-red-500 required-dot"> *</span></p>
								<DefaultFileUploadComponent field={this.state.form.content}/>
								</div>
								<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Visibility</p><BooleanFieldComponent field={this.state.form.visible}/>
							</>
					}

					
				</div>
			</form>
			{/* <form onSubmit={this.handleSubmit} className={"px-6 lg:px-14 py-12"}>
				<a href="/admin/Dashboard" className="text-xl font-medium">Dashboard/<span className="text-[#A1A6B3]">Upload Press</span></a>
				<div className="w-full pt-10 pb-6 mb-3 border-b-2 border-[#C1C1C1] flex flex-row justify-between">
					<div className="flex flex-row justify-center items-center">
						<p className="text-3xl lg:text-4xl font-bold mr-5">Upload Press</p>
						<Switcher />
					</div>
					<button type="submit" className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-full">
						<div className="justify-center text-sm lg:text-xl">Publish</div>
					</button>
				</div>

				<div className="lg:pl-8 ">
					<p className="mt-8 mb-6">⚫<span className="text-2xl font-medium">   Press details</span></p>
					<StatusToast asyncState={this.state} errorText={this.state.error?.message}/>
					
					<div className="w-full lg:w-4/6">
						<div className="text-xl text-[#5E5E64] font-medium mt-4 mb-2">
							<label htmlFor="name">Title: <span className="text-red-500 required-dot"> *</span></label>
							<div className="h-2"></div>
							<TextFieldComponent field={this.state.form.title} syncer={this.getViewModel().syncState} />
						</div>
						<div className="h-4"></div>
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Cover <span className="text-red-500 required-dot"> *</span></p>
						<DefaultImageUploadComponent field={this.state.form.cover}/>
						<div className="h-4"></div>
						<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Content <span className="text-red-500 required-dot"> *</span></p>
						<DefaultFileUploadComponent field={this.state.form.content}/>
					</div>
				</div>
			</form> */}
		</div>)
	}

}



interface ArtFairFormProps{
	form: ArtFairForm;
}

class ArtFairFormComponent extends React.Component<ArtFairFormProps>{
	
	render(): React.ReactNode {
		return <>
		
		</>
	}

}