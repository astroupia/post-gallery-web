import { FieldComponent, FieldComponentProps } from "@/lib/components/form/FieldComponent"
import FileUploadFieldComponent, { FileUploadFieldComponentProps, ImageUploadFieldComponent } from "@/lib/components/form/FileUploadFIeldComponent"
import CoreProviders from "../../di/coreproviders"
import MultiFileUploadFieldComponent from "@/lib/components/form/MultipleFileUploadFieldComponent"


export default function DefaultFileUploadComponent(props: FieldComponentProps<string>){
	return (
		<FileUploadFieldComponent fileStorage={CoreProviders.provideDefaultFileStorage()} {...props}/>
	)
}

export function DefaultImageUploadComponent(props: FieldComponentProps<string>){
	return (
		<ImageUploadFieldComponent fileStorage={CoreProviders.provideDefaultFileStorage()} {...props}/>
	)
}

export function DefaultMultiFileUPloadComponent(props: FieldComponentProps<string[]>){

	return (
		<MultiFileUploadFieldComponent fileStorage={CoreProviders.provideDefaultFileStorage()} {...props}/>
	)

}