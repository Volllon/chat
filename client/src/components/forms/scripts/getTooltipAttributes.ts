import getTooltip from "./getTooltip";
import { InputType } from "../types";

const getTooltipAttributes = (inputType: InputType) => {
  return {
    'data-toggle': 'tooltip',
    'data-placement': 'top',
    'data-trigger': 'focus',
    'data-original-title': getTooltip(inputType)
  }
}

export default getTooltipAttributes;
