import { InputType } from "../types";
import getTooltip from "./getTooltip";

const getTooltipAttributes = (inputType: InputType) => {
  return {
    'data-toggle': 'tooltip',
    'data-placement': 'top',
    'data-trigger': 'focus',
    'data-original-title': getTooltip(inputType)
  }
}

export default getTooltipAttributes;
