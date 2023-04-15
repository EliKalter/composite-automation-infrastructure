import { WebElementPromise } from "selenium-webdriver";
import C_WEController, {
    TF_WEController,
    TI_WEControllerParams,
} from "../Simples/WEController";
import C_ComplexCollection, {
    TC_AggregatedComplexCollection,
    TC_ParameterizedComplexCollection,
    TF_ComplexCollection,
} from "./ComplexCollection";
import { TC_AggregatedComplex, TC_ComplexParameters } from "./types";

export default class C_ComplexController<
    TE_Collection extends TF_ComplexControllerAllMembers,
> extends C_ComplexCollection<TE_Collection> {
    // Todo fix Parented now that controller have to have something
    // implements
    //     TI_Parented<TF_ComplexControllerAllMembers, TF_ComplexCollection>
    private _wec: C_WEController | null;

    private _genWEController: () => C_WEController;

    public constructor(params: TC_ComplexParameters<TE_Collection>) {
        super({ ...params });

        this._wec = null;

        this._genWEController = () => new C_WEController({ ...params });
    }

    public get element(): WebElementPromise {
        if (!this._wec) this._wec = this._genWEController();
        return this._wec.element;
    }
}

export type TF_ComplexControllerOWnMembers = TF_WEController;
export type TF_ComplexControllerParent = TF_ComplexCollection;
export type TF_ComplexControllerAllMembers = TF_ComplexControllerOWnMembers &
    TF_ComplexControllerParent;

export type TC_AggregatedComplexController<
    T extends TF_ComplexControllerAllMembers,
    K extends TF_ComplexControllerAllMembers,
> = TC_AggregatedComplexCollection<T, K> &
    TC_AggregatedComplex<
        keyof TF_ComplexControllerOWnMembers,
        TF_ComplexControllerAllMembers,
        T,
        K
    >;

export type TC_ParameterizedComplexController<
    T extends TF_ComplexControllerAllMembers,
> = TC_ParameterizedComplexCollection<T> & TI_WEControllerParams;
