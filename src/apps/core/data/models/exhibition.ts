import Model from "@/lib/models/model";
import Artist from "./artist";
import Artwork from "./artwork";
import VisibilityModel from "./visiblityModel";


interface DateRange{

	startDate: Date
	endDate: Date

}

interface TimeRange{

	startTime: number;
	endTime: number;

}

export enum ExhibitionStatus{

	past,
	current,
	upcoming

}

export default class Exhibition extends VisibilityModel<string>{

	public id: string | null;

	public artistId: string;

	public name: string;
	public description: string;

	public dateRange: DateRange
	public timeFrame: TimeRange

	public venue: string;
	public curator: string;

	public coverImage: string;
	public artworkIds: string[];

	public status: ExhibitionStatus;

	public artist?: Artist;
	public artworks?: Artwork[];

	constructor(
		id: string | null,
		artistId: string,
		name: string,
		description: string,
		dateRange: DateRange,
		timeFrame: TimeRange,
		venue: string,
		curator: string,
		coverImage: string,
		artworkIds: string[],
		status: ExhibitionStatus,
		visible: boolean
	){
		super(visible);
		this.id = id;
		this.artistId = artistId;
		this.name = name;
		this.description = description;
		this.dateRange = dateRange;
		this.venue = venue;
		this.curator = curator;
		this.timeFrame = timeFrame
		this.coverImage = coverImage
		this.artworkIds = artworkIds
		this.status = status;
	}

	getPK(): string | null {
		return this.id
	}

	setPK(pk: string): void {
		this.id = pk;
	}

	isActive(): boolean{
		let now = new Date(Date.now())
		return (this.dateRange.startDate < now ) && (now < this.dateRange.endDate)
	}

	isUpcoming(): boolean{
		return (this.dateRange.startDate > new Date(Date.now())) 
	}

}