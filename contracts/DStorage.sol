pragma solidity >=0.4.21 <0.7.0;

contract DStorage {
    string public name = 'DStorage';
    mapping(uint => File) public files;

    // Struct like an object
    struct File {
        uint fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address payable uploader;
    }


    constructor() public {
    }
}