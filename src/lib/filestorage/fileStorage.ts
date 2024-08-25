export default interface FileStorage{
	store(file: File): Promise<string>
}