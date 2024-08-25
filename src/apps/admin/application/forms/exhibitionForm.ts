import { ExhibitionStatus } from "@/apps/core/data/models/exhibition"
import ArtistRepository from "@/apps/core/data/repositories/artistRepository"
import CoreProviders from "@/apps/core/di/coreproviders"
import Field, { ListField, PrimaryKeyField, TextField } from "@/lib/forms/fields"
import Form from "@/lib/forms/form"



export default class ExhibitionForm extends Form{
	
	public artistId = new PrimaryKeyField(new ArtistRepository(false))

	public name = new TextField()
	public description = new TextField()

	public curator = new TextField()
	public venue = new TextField()

	public startDate = new Field<Date>()
	public endDate = new Field<Date>()

	public startTime = new Field<number>()
	public endTime = new Field<number>()

	public status = new Field<ExhibitionStatus>();

	public coverImage = new TextField()
	public artworkIds = new Field<string[]>()
	visible: Field<boolean>  = new Field<boolean>();

	getFields(): Field<any>[] {
		return [
			this.artistId,
			this.name,
			this.description,
			this.curator,
			this.venue,
			this.startDate,
			this.endDate,
			this.startTime,
			this.endTime,
			this.coverImage,
			this.artworkIds,
			this.visible,
			this.status
		]
	}


}
