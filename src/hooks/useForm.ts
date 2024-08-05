import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  // FormProvider,
  // UseFormReturn,
  // FieldValues,
  // SubmitHandler,
  // useFormContext,
} from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'

interface UseFormProps<T extends ZodSchema<T>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T
}

export const useForm = <T extends ZodSchema>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  })
}
