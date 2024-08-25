import Artist from "@/apps/core/data/models/artist";
import { PrimaryKeyFieldComponent } from "@/lib/components/form/PrimaryKeyFieldComponent";
import { ReactNode } from "react";



export default class ArtistPrimaryKeyFieldComponent extends PrimaryKeyFieldComponent<string, Artist>{

    protected keyToString(pk: string | null): string {
        return pk??"";
    }

    protected constructOption(item: Artist | null): {value: string | null, label: ReactNode} {
        if(item == null){
            return {
                value: null,
                label: "Select an Artist"
            }
        }
        return {
            value: item.getPK(),
            label: (<div
            key={item.getPK()??""}
                className="flex items-center justify-start p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <img
                src={item.avatar}
                  alt={`${item.fullName} profile`}
                  className="w-8 h-8 rounded-full mr-4"
                />
                <span className="text-sm font-medium">{item.fullName}</span>
              </div>)
        }
    }

}