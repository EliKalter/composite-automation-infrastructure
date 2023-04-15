import { WebElementPromise } from "selenium-webdriver";
import { TI_WEPGeneratorFunction } from "../../../types";
import { TC_ControllerParams } from "./types";

export default class C_WEController {
    private _element: WebElementPromise | null;

    private _elementGenerator: () => WebElementPromise;

    public constructor(param: TC_ControllerParams<C_WEController>) {
        this._elementGenerator = () => param.element(param.driver);
    }

    public get element(): WebElementPromise {
        if (!this._element) this._element = this._elementGenerator();
        return this._element;
    }
}

export type TF_WEController = {
    element: WebElementPromise;
};

export type TC_WEController = TF_WEController;

export type TI_WEControllerParams = {
    element: TI_WEPGeneratorFunction;
};
