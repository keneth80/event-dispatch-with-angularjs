export class CommandActionMap {

    actionMap: any;

    constructor() {
        this.actionMap = {};
    }

    addAction(action: string, func: any): void {
        if (this.actionMap[action] == null) {
            this.actionMap[action] = [];
        }
        const funcList: Array<any> = this.actionMap[action] as Array<any>;
        if (!funcList.some(x => x === func)) {
            funcList.push(func);
        }
    }

    removeActionFunction(action: string, func: any): void {
        // tslint:disable-next-line:curly
        if (this.actionMap[action] === null) return;
        const funcList: Array<any> = this.actionMap[action] as Array<any>;
        for (let i = 0; i < funcList.length; i++) {
            if (funcList[i] === func) {
                funcList.splice(i, 1);
                return;
            }
        }
    }

    removeAction(action: string): void {
        // tslint:disable-next-line:curly
        if (this.actionMap[action] === null) return;
        const funcList: Array<any> = this.actionMap[action] as Array<any>;
        funcList.length = 0;
        this.actionMap[action] = null;
    }

    executeAction(action: string, data: any): void {
        // tslint:disable-next-line:curly
        if (this.actionMap[action] === null) return;
        const funcList: Array<any> = this.actionMap[action] as Array<any>;
        for (let i = 0; i < funcList.length; i++) {
            funcList[i](data);
        }
    }

    clear(): void {
        for (const action in this.actionMap) {
            if (this.actionMap.hasOwnProperty(action)) {
                this.removeAction(action);
            }
        }
    }

}
