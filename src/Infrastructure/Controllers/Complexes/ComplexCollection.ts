import C_ComplexController, {
    TF_ComplexControllerAllMembers,
} from "./ComplexController";
import C_SimpleCollection, {
    TC_AggregatedSimpleCollection,
    TC_ParameterizedSimpleCollection,
    TF_SimpleCollection,
} from "./SimpleCollection";
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
> extends C_SimpleCollection<TE_Collection> {
    private _complexCollections: TE_Collection["complexCollections"] | null;
    private _complexControllers: TE_Collection["complexControllers"] | null;

    private _genComplexCollections: () => TE_Collection["complexCollections"];
    private _genComplexControllers: () => TE_Collection["complexControllers"];

    public constructor(params: TC_ComplexParameters<TE_Collection>) {
        super(params);
        this._complexCollections = null;
        this._complexControllers = null;

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

    public buildComplex<
        Type extends keyof TF_ComplexCollection,
        Form extends T_ComplexesForms,
    >(
        Class: TC_ComplexConstructor<Form>,
        params: TC_ComplexParameters<TE_Collection>[Type],
    ): TE_Collection[Type] {
        type InstantiableClass = TC_ComplexConstructor<Form>;
        type ParamsKeys = keyof TC_ComplexParameters<TE_Collection>[Type];
        const keys: object = {};
        for (const key of Object.keys(params)) {
            // Todo check carefully if this as as as can be removed sense it removes a lot of the type safety
            (keys as Record<ParamsKeys, InstantiableClass>)[key as ParamsKeys] =
                new Class(
                    params[
                        key as keyof ParamsKeys
                    ] as unknown as TC_ComplexParameters<Form>,
                );
        }
        return keys as TE_Collection[Type];
    }
}

export type TF_ComplexCollection = TF_SimpleCollection & {
    [complex in keyof TD_ComplexesNames]?: Record<
        string,
        TD_ComplexesNames[complex]
    >;
};

export type TC_AggregatedComplexCollection<
    T extends TF_ComplexCollection,
    K extends TF_ComplexCollection,
> = TC_AggregatedSimpleCollection<T, K> &
    TC_AggregatedComplex<
        keyof TF_ComplexCollection,
        TF_ComplexCollection,
        T,
        K
    >;

export type TC_ParameterizedComplexCollection<T extends TF_ComplexCollection> =
    TC_ParameterizedSimpleCollection<T> & {
        [complex in keyof T & keyof TD_ComplexesNames]: {
            [str in keyof T[complex]]: T[complex][str] extends T_ComplexesForms
                ? TD_ComplexParameters<T[complex][str]>
                : never;
        };
    };
