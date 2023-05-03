import Image from "next/image";
import NavbarItems from "./navbar-items/navbar-items";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex w-full flex-col justify-between border-b border-slate-300 bg-white px-4 py-3  xl:h-screen xl:w-1/6 xl:border-b-0 xl:border-r xl:py-7 ">
      <div className="relative z-50 flex h-full w-full flex-col justify-between ">
        <div className="flex flex-col gap-5">
          <div className="hidden xl:block">
            <Image
              priority
              width="100"
              height="29"
              alt="Instagram logo"
              src={
                "https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
              }
            />
          </div>
          <NavbarItems />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
