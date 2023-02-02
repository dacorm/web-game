export const checkIsImageFileType = (theFile: File) => {
    const fileType: string = theFile.type;
    const regex = /image\//;
    return fileType.match(regex);
};
