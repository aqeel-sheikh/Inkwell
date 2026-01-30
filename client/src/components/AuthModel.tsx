import { useRef, useState } from "react";
import { Model } from "./Model";
import { Button } from "@/components";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthModel = () => {
  const loginFormRef = useRef<HTMLDivElement>(null);
  const registerFormRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<boolean>(false);

  const handleModelOpen = () => {
    setModel(true);
  };
  const handleModelClose = () => {
    setModel(false);
  };
  return (
    <>
      <Model isOpen={model} onClose={handleModelClose} size="sm">
        <LoginForm
          setModel={setModel}
          onClose={handleModelClose}
          registerFormRef={registerFormRef as React.RefObject<HTMLDivElement>}
          myRef={loginFormRef as React.RefObject<HTMLDivElement>}
        />
        <RegisterForm
          setModel={setModel}
          onClose={handleModelClose}
          loginFormRef={loginFormRef as React.RefObject<HTMLDivElement>}
          myRef={registerFormRef as React.RefObject<HTMLDivElement>}
        />
      </Model>
      <Button
        variant="default"
        className="cursor-pointer"
        onClick={() => handleModelOpen()}
      >
        Sign In
      </Button>
    </>
  );
};
export default AuthModel;
