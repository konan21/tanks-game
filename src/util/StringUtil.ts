export namespace StringUtil {
    export const getFileName = (path: string): string => {
        return path.split(".")[0].split("/").pop();
    };
}
