import C_WEController, { TF_WEController } from "./WEController";
import { TC_InstantiableParams, TI_Parented } from "../types";
import { TC_ControllerParams } from "./types";

export default class C_Field
    extends C_WEController
    implements TI_Parented<TF_FieldAllMembers, TF_WEController>
{
    private _somethingThatIsNotInButton: any;
    public constructor(param: TC_ControllerParams<C_Field>) {
        super(param);
    }
}

type TF_FieldOwnMembers = {};

export type TF_FieldAllMembers = TF_FieldOwnMembers & TF_WEController;

export type TI_FieldParams = {};
