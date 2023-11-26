import {useStore} from "../store.js";
import {useEffect} from "react";

function TestComponent({selector, effect}) {
    const items = useStore(selector);
    useEffect(() => effect(items), [items])
    return null;
}


test("should return default value at the start", () => {

})