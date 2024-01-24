const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return ( 
        <div className="h-full flex items-center justify-center mt-20 bg-orange-600">
            {children}
        </div>
     );
}
 
export default AuthLayout;