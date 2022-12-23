// Build folder structure.
const commands = document.body.textContent.trim().split('\n');

class FileSystem {
    directories = [];
    currentDirectory = null;

    constructor(commands) {
        commands.forEach(c => {
            if(/^\$ cd/.test(c)) this.cd(c);
            if(/^\d+ /.test(c)) this.file(c);
        });
    }

    cd(command) {
        const name = command.split(' ').pop();
        if(name === '..') {
            this.currentDirectory = this.currentDirectory.parent;
        } else if(name === '/' && this.directories.length) {
            this.currentDirectory = this.directories[0];
        } else {
            const newDirectory = new Directory(name);
            newDirectory.parent = this.currentDirectory;
            this.currentDirectory?.children.push(newDirectory);
            this.currentDirectory = newDirectory;
            this.directories.push(newDirectory);
        }
    }

    file(command) {
        const [size, name] = [...command.split(' ')];
        this.currentDirectory.files.push(new File(name, size));
    }
}

class Directory {
    constructor(name) {
        this.name  = name;
    }

    files = [];
    children = [];
    parent = null;

    get size() {
        return [
            ...this.files.map(f => f.size),
            ...this.children.map(getSize)
        ].reduce((a, b) => a + b);
    }
}

class File {
    constructor(name, size) {
        this.name  = name;
        this.size  = Number(size);
    }    
}

// 7.1
const fs = new FileSystem(commands);
fs.directories.map(d => d.size)
    .filter(s => s <= 100000)
    .reduce((a, b) => a + b);
// 1423358 

// 7.2
const bytesTotal = 70000000;
const bytesRequired = 30000000;
const bytesUsed = fs.directories[0].size;
const bytesToRemove = bytesUsed - (bytesTotal - bytesRequired);
const smallestDir = fs.directories.filter(d => d.size >= bytesToRemove).sort((a, b) => a.size - b.size)[0];

smallestDir.size;
// 545729
