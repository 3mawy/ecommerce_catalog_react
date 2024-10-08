import { ComponentProps } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

interface FormProps<T extends FieldValues = never>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate {...props}>
        <fieldset
          className={props.className}
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}
