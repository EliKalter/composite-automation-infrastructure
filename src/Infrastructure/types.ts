import { WebDriver, WebElementPromise } from "selenium-webdriver";

export type TI_WEPGeneratorFunction = (driver: WebDriver) => WebElementPromise;

export type TC_OneObjectList<Names extends string, K> = {
    [str in Names]: K;
};

export type TC_UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;
