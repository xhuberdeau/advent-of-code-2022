import { Directory } from "./directory";
import { File } from "./file";

const LS_DIR_TYPE = "dir";
const CD_TO_PARENT = "..";
const LS_COMMAND = "$ ls";

export const createFileSystemTree = (
  inputs: string[],
  currentDirectory: Directory
): Directory => {
  if (inputs[0] === "$ cd /") {
    const root = new Directory("/", undefined);
    return createFileSystemTree(inputs.slice(1), root);
  }

  if (inputs.length === 0) {
    return currentDirectory.getRoot();
  }

  const currentLine = inputs[0];
  if (currentLine.startsWith("$")) {
    return parseCommand(currentLine, inputs, currentDirectory);
  }

  return parseDirectoryStructure(currentLine, inputs, currentDirectory);
};

const parseCommand = (
  line: string,
  inputs: string[],
  currentDirectory
): Directory => {
  if (line === LS_COMMAND) {
    return createFileSystemTree(inputs.slice(1), currentDirectory);
  }

  const [_dollar, _cd, directory] = line.split(" ");
  if (directory === CD_TO_PARENT) {
    return createFileSystemTree(inputs.slice(1), currentDirectory.getParent());
  }

  return createFileSystemTree(
    inputs.slice(1),
    currentDirectory.findDirectDir(directory)
  );
};

const parseDirectoryStructure = (
  line: string,
  inputs: string[],
  currentDirectory: Directory
) => {
  const [firstArg, secondArg] = line.split(" ");
  if (firstArg === LS_DIR_TYPE) {
    currentDirectory.addDirectory(new Directory(secondArg, currentDirectory));
  } else {
    currentDirectory.addFile(new File(parseInt(firstArg, 10)));
  }

  return createFileSystemTree(inputs.slice(1), currentDirectory);
};
