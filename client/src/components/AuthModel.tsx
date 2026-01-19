import { useRef, useState } from "react";
import { Model } from "./Model";
import { Button } from "./Button";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthModel = () => {
  const loginFormRef = useRef<HTMLDivElement>(null);
  const registerFormRef = useRef<HTMLDivElement>(null);

  const [model, setModel] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setModel(true);
  };
  return (
    <>
      <Model isOpen={model} onClose={() => setModel(false)} size="sm">
        <LoginForm
          setModel={setModel}
          registerFormRef={registerFormRef as React.RefObject<HTMLDivElement>}
          myRef={loginFormRef as React.RefObject<HTMLDivElement>}
        />
        <RegisterForm
          setModel={setModel}
          loginFormRef={loginFormRef as React.RefObject<HTMLDivElement>}
          myRef={registerFormRef as React.RefObject<HTMLDivElement>}
        />
      </Model>
      <Button
        variant="primary"
        className="cursor-pointer"
        onClick={() => handleDeleteClick()}
      >
        Sign In
      </Button>
    </>
  );
};
export default AuthModel;
