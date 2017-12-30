
export class FileItem {
    file: File;
    filename: string;
    url: string;
    isUploading: boolean = false;
    progress: number = 0;
    complete: boolean = false;
    error:any;


    constructor(file: File) {
        this.file = file;
        this.filename = file.name;
    }

}