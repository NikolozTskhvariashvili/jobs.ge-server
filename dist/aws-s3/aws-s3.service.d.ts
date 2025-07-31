export declare class AwsS3Service {
    private bucketName;
    private s3;
    constructor();
    UploadFile(fileId: any, file: any): Promise<any>;
    deleteFileById(fileId: any): Promise<any>;
}
