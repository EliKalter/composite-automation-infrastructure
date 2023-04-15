import { TC_AggregatedProperties, TC_InstantiableParams } from "../types";
import C_ComplexCollection, {
    TC_ParameterizedComplexCollection,
    TF_ComplexCollection,
} from "./ComplexCollection";

import C_ComplexController, {
    TC_ParameterizedComplexController,
    TF_ComplexControllerAllMembers,
} from "./ComplexController";
import C_SimpleCollection, {
    TC_ParameterizedSimpleCollection,
    TF_SimpleCollection,
} from "./SimpleCollection";

export type T_ComplexesForms =
    | TF_ComplexControllerAllMembers
    | TF_ComplexCollection;

export type TC_FormToComplex<T extends T_ComplexesForms> =
    T extends TF_ComplexControllerAllMembers
        ? C_ComplexController<T>
        : T extends TF_ComplexCollection
        ? C_ComplexCollection<T>
        : never;

export type TD_ComplexParameters<T extends T_ComplexesForms> =
    T extends TF_ComplexControllerAllMembers
        ? TC_ParameterizedComplexController<T>
        : T extends TF_ComplexCollection
        ? TC_ParameterizedComplexCollection<T>
        : never;

export type TD_ComplexesNames = {
    complexCollections: TF_ComplexCollection;
    complexControllers: TF_ComplexControllerAllMembers;
};

export type TC_AggregatedComplex<
    K extends string,
    Both extends T_ComplexesForms,
    F extends Both,
    S extends Both,
> = TC_AggregatedProperties<K, Both, F, S>;

export type TC_ComplexParameters<T extends T_ComplexesForms> =
    TC_InstantiableParams<TD_ComplexParameters<T>>;

export type TC_ComplexConstructor<T extends T_ComplexesForms> = {
    new (params: TC_ComplexParameters<T>): any;
};
