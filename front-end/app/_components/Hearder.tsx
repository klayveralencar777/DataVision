"use client";

import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "../../public/datavision_logo_cyberpunk.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Hearder = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="flex bg-blue-400 w-80 items-center justify-between px-5 py-6">
      <Image src={Logo} alt="DataVision Logo" width={100} height={27.5} />
      <Button variant="outline" size="icon" onClick={handleLoginClick}>
        <LogInIcon />
      </Button>
    </header>
  );
};

export default Hearder;
