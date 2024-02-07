import { Todo } from "../models/Todo";
import path from "path";

const TODO_JSON_FILE = process.env.TODO_JSON_FILE || "";

const readTodosFromFile = (): Todo[] => {
    try {
        const filePath = path.join(process.cwd(), TODO_JSON_FILE);
        const data = require(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading todos from file:", error);
        return [];
    }
}

const writeTodosToFile = (todos: Todo[]) => {
    try {
        const filePath = path.join(process.cwd(), TODO_JSON_FILE);
        const jsonData = JSON.stringify(todos);
        require("fs").writeFileSync(filePath, jsonData, "utf8");
    } catch (error) {
        console.error("Error writing todos to file:", error);
    }
}

export const getTodos = async (): Promise<Todo[]> => {
    // ファイルからTODOデータを読み取る
    return readTodosFromFile();
}

export const postTodos = async (todos: Todo[]): Promise<void> => {
    // ファイルにTODOデータを書き込む
    writeTodosToFile(todos);
}
