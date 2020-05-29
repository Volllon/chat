import * as yup from 'yup';
import { InputType } from '~/components/forms/types';

export type ValidationSchemas = Readonly<Record<InputType, yup.Schema<any> | null>>;
