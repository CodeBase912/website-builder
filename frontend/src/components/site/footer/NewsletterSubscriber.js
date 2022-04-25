import classNames from "classnames";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/Button";
import Input from "../../common/forms/Input";
import { Icons } from "../../common/icons/icons";

const NewsletterSubscriber = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Newsletter Submit Data: ", data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={classNames("flex flex-wrap gap-3")}
        >
          <Input
            name={"email"}
            type={"email"}
            placeholder={"Enter your email address"}
            className="text-grey-lighter"
          />
          <Button type="submit" className={"text-sm"}>
            {"Subscribe"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewsletterSubscriber;
