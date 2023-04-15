import { WebDriver } from "selenium-webdriver";

export type TI_InstantiableParams = {
    driver: WebDriver;
};

export type TC_InstantiableParams<T> = TI_InstantiableParams & T;

export type TI_Parented<Child extends Parent, Parent> = {
    [str in keyof Parent]: Child[str];
} & Child;

export type TC_AggregatedProperties<
    Properties extends string,
    Both extends { [str in Properties]?: any },
    F extends Both,
    S extends Both,
> = {
    [property in keyof F | keyof S]: property extends keyof F
        ? property extends keyof S
            ? F[property] & S[property]
            : F[property]
        : property extends keyof S
        ? S[property]
        : never;
};
