import Serializer from "@/lib/serializers/serializer";
import { DocumentData } from "firebase/firestore";
import Exhibition from "../models/exhibition";
import { DateSerializer } from "@/lib/serializers/fieldSerializers";


export default class ExhibitionSerializer extends Serializer<Exhibition, DocumentData> {

  private dateSerializer = new DateSerializer();

  serialize(instance: Exhibition): DocumentData {
    return {
      id: instance.id,
      artist_id: instance.artistId,
      name: instance.name,
      description: instance.description,
      start_date: this.dateSerializer.serialize(instance.dateRange.startDate),
      end_date: this.dateSerializer.serialize(instance.dateRange.endDate),
	  start_time: instance.timeFrame.startTime,
	  end_time: instance.timeFrame.endTime,
      venue: instance.venue,
	  curator: instance.curator,
	  cover_image: instance.coverImage,
	  artworks_ids: instance.artworkIds,
	  status: instance.status,
	  visible: instance.visible
    };
  }

  deserialize(data: DocumentData): Exhibition {
    return new Exhibition(
      data.id,
      data.artist_id,
      data.name,
      data.description,
	  {
		startDate: this.dateSerializer.deserialize(data.start_date),
		endDate: this.dateSerializer.deserialize(data.end_date)
	  },
	  {
		startTime: data.start_time,
		endTime: data.end_time
	  },
      data.venue,
	  data.curator,
	  data.cover_image,
	  data.artworks_ids,
	  data.status,
	  data.visible
    );
  }
}