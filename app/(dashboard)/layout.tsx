import React from "react";

const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-56">

            </div>
            {children}
        </div>
     );
}
 
export default AuthLayout;