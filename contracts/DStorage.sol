pragma solidity >=0.4.21 <0.7.0;

contract DStorage {
    string public name = 'DStorage';
    uint public fileCount = 0;
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

    function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {
        fileCount = fileCount + 1;

        // now generate a time stamp
        files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);
    }
}