import { TC_AtLeastOne } from "../../../types";
import C_ComplexController, {
    TF_ComplexControllerAllMembers,
} from "./ComplexController";
import C_SimpleCollection, { TF_SimpleCollection } from "./SimpleCollection";
import {
    TC_AggregatedComplex,
    TC_ComplexConstructor,
    TC_ComplexParameters,
    TD_ComplexesNames,
    TD_ComplexParameters as TD_ComplexParameters,
    T_ComplexesForms as T_ComplexesForms,
} from "./types";

export default class C_ComplexCollection<
    TE_Collection extends TF_ComplexCollection,
> {
    private _complexCollections: TE_Collection["complexCollections"] | null;
    private _complexControllers: TE_Collection["complexControllers"] | null;
    private _simpleCollection: TE_Collection["simpleCollections"] | null;

    private _genComplexCollections: () => TE_Collection["complexCollections"];
    private _genComplexControllers: () => TE_Collection["complexControllers"];
    private _genSimpleCollection: () => TE_Collection["simpleCollections"];

    public constructor(params: TC_ComplexParameters<TE_Collection>) {
        this._complexCollections = null;
        this._complexControllers = null;
        this._simpleCollection = null;

        this._genComplexCollections = () =>
            this.buildComplex<"complexCollections", TF_ComplexCollection>(
                C_ComplexCollection<TF_ComplexCollection>,
                params.complexCollections,
            );

        this._genComplexControllers = () =>
            this.buildComplex<
                "complexControllers",
                TF_ComplexControllerAllMembers
            >(
                C_ComplexController<TF_ComplexControllerAllMembers>,
                params.complexControllers,
            );

        this._genSimpleCollection = () =>
            this.buildComplex<"simpleCollections", TF_SimpleCollection>(
                C_SimpleCollection<TF_SimpleCollection>,
                params.simpleCollections,
            );
    }

    public get complexCollections(): TE_Collection["complexCollections"] {
        if (!this._complexCollections)
            this._complexCollections = this._genComplexCollections();
        return this._complexCollections;
    }

    public get complexControllers(): TE_Collection["complexControllers"] {
        if (!this._complexControllers)
            this._complexControllers = this._genComplexControllers();
        return this._complexControllers;
    }

    public get simpleCollections(): TE_Collection["simpleCollections"] {
        if (!this._simpleCollection)
            this._simpleCollection = this._genSimpleCollection();
        return this._simpleCollection;
    }

    public buildComplex<
        Type extends keyof TF_ComplexCollection,
        Form extends T_ComplexesForms,
    >(
        Class: TC_ComplexConstructor<Form>,
        params: TC_ComplexParameters<TE_Collection>[Type],
    ): TE_Collection[Type] {
        const keys: object = {};
        for (const key of Object.keys(params)) {
            keys[key] = new Class(params[key]);
        }
        return keys as TE_Collection[Type];
    }
}

export type TF_ComplexCollection = TC_AtLeastOne<{
    [complex in keyof TD_ComplexesNames]?: Record<
        string,
        TD_ComplexesNames[complex]
    >;
}>;

export type TC_AggregatedComplexCollection<
    T extends TF_ComplexCollection,
    K extends TF_ComplexCollection,
> = TC_AggregatedComplex<
    keyof TF_ComplexCollection,
    TF_ComplexCollection,
    T,
    K
>;

export type TC_ParameterizedComplexCollection<T extends TF_ComplexCollection> =
    {
        [complex in keyof T & keyof TD_ComplexesNames]: {
            [str in keyof T[complex]]: T[complex][str] extends T_ComplexesForms
                ? TD_ComplexParameters<T[complex][str]>
                : never;
        };
    };
