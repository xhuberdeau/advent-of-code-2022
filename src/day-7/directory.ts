import { File } from "./file";

export class Directory {
  private directories: Directory[];
  private files: File[];

  constructor(private name: string, private parent: Directory) {
    this.directories = [];
    this.files = [];
  }

  getDirectoryName(): string {
    return this.name;
  }

  addDirectory(directory: Directory): this {
    this.directories.push(directory);

    return this;
  }

  addFile(file: File): this {
    this.files.push(file);

    return this;
  }

  getSize(): number {
    return (
      this.files.reduce((acc, file) => acc + file.getSize(), 0) +
      this.directories.reduce((acc, directory) => acc + directory.getSize(), 0)
    );
  }

  getRoot(): Directory {
    if (!this.parent) {
      return this;
    }

    return this.parent.getRoot();
  }

  getParent(): Directory {
    return this.parent;
  }

  findDirectDir(dirName: string): Directory {
    return this.directories.find((dir) => dir.getDirectoryName() === dirName);
  }

  findDirectoriesBySize(
    size: number,
    operator: "most" | "minimum"
  ): Directory[] {
    const dirs = [];
    if (
      (operator === "most" && this.getSize() <= size) ||
      (operator === "minimum" && this.getSize() >= size)
    ) {
      dirs.push(this);
    }

    return [
      ...dirs,
      ...this.directories.reduce(
        (acc, dir) => [...acc, ...dir.findDirectoriesBySize(size, operator)],
        []
      ),
    ];
  }
}
