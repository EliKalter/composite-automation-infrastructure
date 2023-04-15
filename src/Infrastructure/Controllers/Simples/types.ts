import { TC_OneObjectList } from "../../../types";
import { TC_InstantiableParams } from "../types";
import C_Button, { TF_ButtonAllMembers } from "./Button";
import C_Field, { TF_FieldAllMembers } from "./Field";
import C_WEController, { TI_WEControllerParams } from "./WEController";

export type T_Controllers = C_Button | C_Field | C_WEController;

export type TD_ControllerParameters<T extends T_Controllers> =
    T extends C_Button
        ? TF_ButtonAllMembers
        : T extends C_Field
        ? TF_FieldAllMembers
        : T extends C_WEController
        ? TI_WEControllerParams
        : never;

export type TD_ControllerNames = {
    buttons: C_Button;
    fields: C_Field;
};

export type TC_ControllerNameToParameters<T extends keyof TD_ControllerNames> =
    TD_ControllerParameters<TD_ControllerNames[T]>;

export type TC_ControllerList<
    Names extends string,
    C extends T_Controllers,
> = TC_OneObjectList<Names, C>;

export type TC_ControllerParams<T extends T_Controllers> =
    TC_InstantiableParams<TI_WEControllerParams & TD_ControllerParameters<T>>;

export type TC_ControllersConstructor<T extends T_Controllers> = {
    new (params: TC_ControllerParams<T>): any;
};
