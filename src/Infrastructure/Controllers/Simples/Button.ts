import { TI_Parented } from "../types";
import { TC_ControllerParams } from "./types";
import C_WEController, { TF_WEController } from "./WEController";

export default class C_Button
    extends C_WEController
    implements TI_Parented<TF_ButtonAllMembers, TF_WEController>
{
    private _clickedCounter: number;
    private _buttonName: string;

    public constructor(params: TC_ControllerParams<C_Button>) {
        super({ ...params });
        this._buttonName = params.name;
        this._clickedCounter = 0;
    }

    public build(param: TC_ControllerParams<C_Button>): C_Button {
        return new C_Button(param);
    }

    private clickedCounterInc(): void {
        this._clickedCounter++;
    }

    public async click(): Promise<void> {
        this.clickedCounterInc();
        await this.element.click();
    }

    public get counter(): number {
        return this._clickedCounter;
    }

    public get name(): string {
        return this._buttonName;
    }

    public printName(): void {
        console.log(this._buttonName);
    }
}

type TF_ButtonOwnMembers = {
    name: string;
    counter: number;
};

export type TF_ButtonAllMembers = TF_ButtonOwnMembers & TF_WEController;

export type TI_ButtonParams = {
    name: string;
};
