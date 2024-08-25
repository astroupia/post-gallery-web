import EditExhibitionViewModel from "./editExhibitionViewModel";
import Exhibition from "@/apps/core/data/models/exhibition";
import ExhibitionForm from "../forms/exhibitionForm";


export default class AddExhibitionViewModel extends EditExhibitionViewModel{

	protected syncFormToExhibition(form: ExhibitionForm): void {
		this.state.exhibition = new Exhibition(
			null,
			"",
			"",
			"", 
			{
				startDate: new Date(Date.now()),
				endDate: new Date(Date.now()),
			},
			{
				startTime: 0,
				endTime: 0
			},
			"",
			"",
			"",
			[],
			0,
			true
		)
		super.syncFormToExhibition(form);
	}

}