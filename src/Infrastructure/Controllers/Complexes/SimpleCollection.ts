import { TC_AtLeastOne } from "../../types";
import C_Button from "../Simples/Button";
import C_Field from "../Simples/Field";
import {
    TC_ControllerNameToParameters,
    TC_ControllersConstructor,
    TD_ControllerNames,
    T_Controllers,
} from "../Simples/types";
import { TC_AggregatedComplex } from "./types";

export default class C_SimpleCollection<
    TE_Collection extends TF_SimpleCollection,
> {
    private _buttons: TE_Collection["buttons"] | null;
    private _fields: TE_Collection["fields"] | null;

    private _genButtons: () => TE_Collection["buttons"];
    private _genFields: () => TE_Collection["fields"];

    public constructor(
        params: TC_ParameterizedSimpleCollection<TE_Collection>,
    ) {
        this._buttons = null;
        this._fields = null;

        this._genButtons = () =>
            this.buildController<"buttons", C_Button>(C_Button, params.buttons);

        this._genFields = () =>
            this.buildController<"fields", C_Field>(C_Field, params.fields);
    }

    public get buttons(): TE_Collection["buttons"] {
        if (this._genButtons) {
            if (!this._buttons) this._buttons = this._genButtons();
            return this._buttons;
        }
    }

    public get fields(): TE_Collection["fields"] {
        if (this._genFields) {
            if (!this._fields) this._fields = this._genFields();
            return this._fields;
        }
    }

    public buildController<
        Type extends keyof TF_SimpleCollection,
        Controller extends T_Controllers,
    >(
        c: TC_ControllersConstructor<Controller>,
        params: TC_ParameterizedSimpleCollection<TE_Collection>[Type],
    ): TE_Collection[Type] {
        const keys: object = {};
        for (const key of Object.keys(params)) {
            keys[key] = new c(params[key]);
        }
        return keys as TE_Collection[Type];
    }
}

export type TF_SimpleCollection = TC_AtLeastOne<{
    [Class in keyof TD_ControllerNames]?: Record<
        string,
        TD_ControllerNames[Class]
    >;
}>;

export type TC_AggregatedSimpleCollection<
    T extends TF_SimpleCollection,
    K extends TF_SimpleCollection,
> = TC_AggregatedComplex<keyof TF_SimpleCollection, TF_SimpleCollection, T, K>;

export type TC_ParameterizedSimpleCollection<T extends TF_SimpleCollection> = {
    [ControllerName in keyof T & keyof TD_ControllerNames]: {
        [str in keyof T[ControllerName]]: TC_ControllerNameToParameters<ControllerName>;
    };
};