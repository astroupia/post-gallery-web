import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";
import WriteExhibitionState from "@/apps/admin/application/states/writeExhibitionState";
import EditExhibitionViewModel from "@/apps/admin/application/viewmodels/editExhibitionViewModel";
import ArtistPrimaryKeyFieldComponent from "@/apps/admin/presentation/components/form/ArtistPrimaryKeyFieldComponent";
import ArtworkListPrimaryKeyFieldComponent from "@/apps/admin/presentation/components/form/ArtworkListPrimaryKeyFieldComponent";
import { ExhibitionStatus } from "@/apps/core/data/models/exhibition";
import CoreProviders from "@/apps/core/di/coreproviders";
import { DefaultImageUploadComponent } from "@/apps/core/presentation/components/DefaultFileUploadComponent";
import BooleanFieldComponent from "@/lib/components/form/BooleanFieldComponent";
import DateFieldComponent from "@/lib/components/form/DateFieldComponent";
import EnumFieldComponent from "@/lib/components/form/EnumFieldComponent";
import ListFieldComponent from "@/lib/components/form/ListFieldComponent";
import NumberFieldComponent from "@/lib/components/form/NumberFieldComponent";
import TextFieldComponent, { TextBoxComponent } from "@/lib/components/form/TextFieldComponent";
import StatusToast from "@/lib/components/status/StatusToast";
import ViewModelView from "@/lib/components/views/ViewModelView";

import Field from "@/lib/forms/fields";
import { AsyncStatus } from "@/lib/state/asyncState";
import { FormEvent, ReactNode } from "react";




export default abstract class WriteExhibitionView<P> extends ViewModelView<EditExhibitionViewModel, P,  WriteExhibitionState>{
	
	private handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if(this.state.status === AsyncStatus.loading){
			return;
		}
		await this.getViewModel().save();
	}


	onCreateMain(): ReactNode { 
		if(this.state.status === AsyncStatus.done){
			return <SuccessfullView title="Successfull" subTitle="Exhibition set Successfully!" />
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="px-6 lg:px-14 py-12">
					<a href="/admin/Dashboard" className="text-xl font-medium">Dashboard/<span className="text-[#A1A6B3]">Upload Exhibition</span></a>
					<div className="w-full pt-10 pb-6 mb-3 border-b-2 border-[#C1C1C1] flex flex-row justify-between">
						<p className="text-3xl lg:text-4xl font-bold">Upload Exhibition</p>
						<button type="submit" className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-full">
							<div className="justify-center text-sm lg:text-xl">{(this.state.status === AsyncStatus.loading) ? "Loading..." : "Publish" }</div>
						</button>
					</div>

					<div className="lg:pl-8 ">
						<p className="mt-8 mb-6">⚫<span className="text-2xl font-medium">   Exhibition details</span></p>
						<div className="w-full lg:w-4/6">
							<div>
								<label htmlFor="artistId">Artist ID:</label>
								<ArtistPrimaryKeyFieldComponent choices={this.state.allArtists!} field={this.state.form.artistId} syncer={this.getViewModel().syncState} />
							</div>
							<div className="text-xl text-[#5E5E64] font-medium mt-4 mb-2">
								<label htmlFor="name">Name: <span className="text-red-500 required-dot"> *</span></label>
								<div className="h-2"></div>
								<TextFieldComponent field={this.state.form.name} syncer={this.getViewModel().syncState} />
							</div>
							<div className="text-xl text-[#5E5E64] font-medium mt-4 mb-2">
								<label  htmlFor="description">Description: <span className="text-red-500 required-dot"> *</span></label>
								<div className="h-2"></div>
								<TextBoxComponent field={this.state.form.description} syncer={this.getViewModel().syncState} />
							</div>
							<div className="flex flex-row justify-between">
								<div className="mr-8 w-full text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label  htmlFor="curator">Curator:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<TextFieldComponent field={this.state.form.curator} syncer={this.getViewModel().syncState} />
								</div>
								<div className="text-xl w-full text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2"  htmlFor="venue">Venue:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<TextFieldComponent field={this.state.form.venue} syncer={this.getViewModel().syncState} />
								</div>
							</div>
							<p className="text-2xl font-medium pt-5 pb-3.5">Exhibition duration  <span className="text-red-500 required-dot"> *</span></p>
							<div className="flex flex-row">
								<div className="text-xl w-44 mr-8 text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label  htmlFor="startDate">Start Date:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<DateFieldComponent field={this.state.form.startDate} syncer={this.getViewModel().syncState} />
								</div>
								<div className="text-xl w-44 text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label  htmlFor="endDate">End Date:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<DateFieldComponent field={this.state.form.endDate} syncer={this.getViewModel().syncState} />
								</div>
							</div>
							<div  className="flex flex-row ">
								<div className="text-xl w-44 mr-8 text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label  htmlFor="startTime">Start Time:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<NumberFieldComponent field={this.state.form.startTime} syncer={this.getViewModel().syncState} />
								</div>
								<div className="text-xl w-44 text-[#5E5E64] font-medium mt-2.5 mb-2">
									<label  htmlFor="endTime">End Time:  <span className="text-red-500 required-dot"> *</span></label>
									<div className="h-2"></div>
									<NumberFieldComponent field={this.state.form.endTime} syncer={this.getViewModel().syncState} />
								</div>
							</div>
							<div className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">
								<p >Cover Image <span className="text-red-500 required-dot"> *</span></p>
								<DefaultImageUploadComponent field={this.state.form.coverImage}/>
							</div>
							<div className="h-4"></div>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Status  <span className="text-red-500 required-dot"> *</span></p>
							<EnumFieldComponent enumClass={ExhibitionStatus} field={this.state.form.status} syncer={this.getViewModel().syncState}/>
							<div className="h-4"></div>
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Artworks  <span className="text-red-500 required-dot"> *</span></p>
							{/* <ListFieldComponent field={this.state.form.artworkIds} generator={
								(field: Field<string>) => <TextFieldComponent field={field} syncer={this.getViewModel().syncState}/>
							}/> */}
							<ArtworkListPrimaryKeyFieldComponent allArtworks={this.state.allArtworks!} field={this.state.form.artworkIds} syncer={this.getViewModel().syncState} />
							<p className="text-xl text-[#5E5E64] font-medium mt-2.5 mb-2">Visibility</p><BooleanFieldComponent field={this.state.form.visible}/>
						</div>
					</div>
				</form>
			</div>
		);
	}



}